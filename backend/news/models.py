from django.db import models
from django.conf import settings

class NewsItem(models.Model):
    category = models.CharField(max_length=255)
    datetime = models.DateTimeField()
    headline = models.CharField(max_length=255)
    news_id = models.IntegerField(unique=True)
    image = models.URLField()
    related = models.TextField(blank=True)
    source = models.CharField(max_length=255)
    summary = models.TextField()
    url = models.URLField()

    def __str__(self):
        return self.headline

class FavoriteArticle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.CharField(max_length=255)
    datetime = models.IntegerField()
    headline = models.CharField(max_length=255)
    summary = models.TextField()
    url = models.URLField()

    def __str__(self):
        return self.headline
