from rest_framework import serializers
from .models import FavoriteArticle

class FavoriteArticleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')  # Include the user ID

    class Meta:
        model = FavoriteArticle
        fields = ['id', 'user', 'category', 'datetime', 'headline', 'news_id', 'related', 'summary', 'source', 'url', 'image']  

    def create(self, validated_data): 
        user = self.context['request'].user
        return FavoriteArticle.objects.create(user=user, **validated_data)
