from rest_framework import serializers
from .models import NewsItem, FavoriteArticle
from django.contrib.auth.models import User

class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = '__all__'


class FavoriteArticleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')  

    class Meta:
        model = FavoriteArticle
        fields = ['id', 'user', 'category', 'datetime', 'headline', 'summary', 'url']

    def create(self, validated_data): 
        user = self.context['request'].user
        return FavoriteArticle.objects.create(user=user, **validated_data)
