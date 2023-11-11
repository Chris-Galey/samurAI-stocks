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

finnhub_client = finnhub.Client(api_key=os.getenv("FINNHUB_API_KEY"))



class MarketStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        market_status = finnhub_client.market_status(exchange='US')

        return JsonResponse(market_status)

class MarketHolidaysView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        market_holidays = finnhub_client.market_holiday(exchange='US')

        return JsonResponse(market_holidays, safe=False)

class StockSymbolsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stock_symbols = finnhub_client.stock_symbols(exchange='US')

        return JsonResponse(stock_symbols, safe=False)

class StockSymbolLookupView(APIView):
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     symbol = request.query_params.get('symbol')

    #     if symbol:
    #         symbol_lookup = finnhub_client.symbol_lookup(symbol)
    #         return JsonResponse(symbol_lookup, safe=False)
    #     else:
    #         return JsonResponse({'error': 'Symbol parameter is required'})

    def get(self, request, *args, **kwargs):
        # Extract the 'symbol' parameter from the query parameters of the GET request
        symbol = request.query_params.get('symbol', '')

        # Check if the 'symbol' parameter is missing or empty
        if not symbol:
            # Return a JSON response with an error message and a 400 Bad Request status code
            return JsonResponse({'error': 'Symbol parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Attempt to fetch symbol information from the Finnhub API using the provided symbol
            symbol_info = finnhub_client.symbol_lookup(symbol)

            # Return a JSON response with the symbol information
            return JsonResponse(symbol_info, safe=False)
        except finnhub.FinnhubAPIException as e:
            # If an exception (error) occurs during the API request, handle it
            # Return a JSON response with the error message and the HTTP status code from the exception
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
