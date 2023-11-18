from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import Watchlist
from .serializers import WatchlistSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
import finnhub
import requests
import json
import time
import os

#watchlist view

class WatchlistView(ListCreateAPIView):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        user_id = self.request.user.id
        stock = Watchlist.objects.filter(user=user_id)
        serializer = WatchlistSerializer(stock, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data['user'] = self.request.user.id
        serializer = WatchlistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class WatchlistRetrieveDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, stock_id=None):
        stock = Watchlist.objects.get(id=stock_id)
        serializer = WatchlistSerializer(stock)
        return Response(serializer.data)
    
    def destroy(self, request, stock_id=None):
        stock = Watchlist.objects.get(id=stock_id)
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Finnhub API view

# finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))

finnhub_client = finnhub.Client(api_key='cla12j1r01qk1fmlonkgcla12j1r01qk1fmlonl0')

class MarketStatusView(APIView):
    # finnhub_client = finnhub.Client(api_key='cla12j1r01qk1fmlonkgcla12j1r01qk1fmlonl0')
    permission_classes = [IsAuthenticated]

    def get(self, request):
        market_status = finnhub_client.market_status(exchange='US')

        return JsonResponse(market_status)

class MarketHolidaysView(APIView):
    # finnhub_client = finnhub.Client(api_key='cla12j1r01qk1fmlonkgcla12j1r01qk1fmlonl0')
    permission_classes = [IsAuthenticated]

    def get(self, request):
        market_holidays = finnhub_client.market_holiday(exchange='US')

        return JsonResponse(market_holidays, safe=False)

class StockSymbolsView(APIView):
    # finnhub_client = finnhub.Client(api_key='cla12j1r01qk1fmlonkgcla12j1r01qk1fmlonl0')
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stock_symbols = finnhub_client.stock_symbols(exchange='US')

        return JsonResponse(stock_symbols, safe=False)

class StockSymbolLookupView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        symbol = request.query_params.get('symbol', '')

        if not symbol:
            return JsonResponse({'error': 'Symbol parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            symbol_info = finnhub_client.symbol_lookup(symbol)
            return JsonResponse(symbol_info, safe=False)
        except finnhub.FinnhubAPIException as e:
            return JsonResponse({'error': str(e)}, status=e.http_status)
        
class CompanyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        symbol = request.query_params.get('symbol')

        if symbol:
            company_profile = finnhub_client.company_profile2(symbol=symbol)
            return JsonResponse(company_profile, safe=False)
        else:
            return JsonResponse({'error': 'Symbol parameter is required'})

def get_finnhub_api_key(request):
    api_key = os.getenv("FINNHUB_API_KEY")

    if api_key:
        return JsonResponse({'api_key': api_key})
    else:
        return JsonResponse({'error': 'Finnhub API key not found'}, status=500)