from django.db import models
from django.contrib.auth.models import User

class Watchlist(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default='stock')  
    ticker = models.CharField(max_length=10, default='ticker') 
    logo = models.CharField(max_length=255, default='logo')  
    industry = models.CharField(max_length=255, default='industry')
