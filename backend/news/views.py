import requests
import os
from datetime import datetime
import finnhub
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from .models import FavoriteArticle
from .serializers import FavoriteArticleSerializer


FINN_KEY = os.getenv("API_FINN_KEY")
finnhub_client = finnhub.Client(api_key=FINN_KEY)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_finhub_news(request):
    # Access the current user
    current_user = request.user

    # Now you can use current_user for any purpose, e.g., logging
    print(f"Fetching news for user: {current_user.username}")

    # Proceed to fetch news items from Finnhub
    news_items = finnhub_client.general_news('general', min_id=0)

    # Optionally, you could customize this response based on user preferences stored in your database

    return JsonResponse(news_items, safe=False)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def favorite_articles(request):
    if request.method == 'GET':
        articles = FavoriteArticle.objects.filter(user=request.user)
        serializer = FavoriteArticleSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FavoriteArticleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article_id = request.query_params.get('id')
        article = FavoriteArticle.objects.filter(id=article_id, user=request.user)
        if article.exists():
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)