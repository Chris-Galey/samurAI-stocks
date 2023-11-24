from django.db import models
from django.contrib.auth.models import User

class Watchlist(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    stock = models.CharField()
