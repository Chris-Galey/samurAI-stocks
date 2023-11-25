from .views import StockCSVViewSet
from django.urls import path, include

urlpatterns =[
 path('csvview/', StockCSVViewSet.as_view(), name='csvView')
]