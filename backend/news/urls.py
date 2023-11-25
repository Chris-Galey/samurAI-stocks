from django.urls import path
from . import views

urlpatterns = [
    path('get-news/', views.get_finhub_news, name='get_finhub_news'), 
    path('favorites/', views.favorite_articles, name='favorite_articles'),
]

###In order to test this###

#http://localhost:8000/news/get-news/ will show all news from finnhub

#http://localhost:8000/news/favorites/ POST will save an article for the current user
#http://localhost:8000/news/favorites/ GET will show you the saved articles for an user
#http://localhost:8000/news/favorites/?id=1 DELETE Notice you need the id of the specific post to delete it 