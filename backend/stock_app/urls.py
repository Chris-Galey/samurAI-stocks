from django.urls import path
from .views import WatchlistView, WatchlistRetrieveDestroyView, MarketStatusView, StockSymbolsView, MarketHolidaysView, CompanyProfileView

urlpatterns =[
    path('', WatchlistView.as_view(), name='my_watchlist'),

    path('<int:stock_id>/', WatchlistRetrieveDestroyView.as_view(), name='stock_on_watchlist'),

    path('marketstatus/', MarketStatusView.as_view(), name='get_market_status'),

    path('stocksymbols/', StockSymbolsView.as_view(), name='get_stock_symbols'),

    path('marketholidays/', MarketHolidaysView.as_view(), name='get_market_holidays'),

    path('companyprofile/', CompanyProfileView.as_view(), name='get_company'),
]