from django.urls import path
from .views import WatchlistView, WatchlistRetrieveDestroyView, MarketStatusView, StockSymbolsView, MarketHolidaysView, CompanyProfileView, StockSymbolLookupView, get_finnhub_api_key, StockCandles, Quote

urlpatterns =[
    path('', WatchlistView.as_view(), name='my_watchlist'),

    path('<int:stock_id>/', WatchlistRetrieveDestroyView.as_view(), name='stock_on_watchlist'),

    path('marketstatus/', MarketStatusView.as_view(), name='get_market_status'),

    path('marketholidays/', MarketHolidaysView.as_view(), name='get_market_holidays'),

    path('stocksymbols/', StockSymbolsView.as_view(), name='get_stock_symbols'),

    path('stocksymbollookup/', StockSymbolLookupView.as_view(), name='lookup_stock_symbol'),

    path('companyprofile/', CompanyProfileView.as_view(), name='get_company'),

    path('stockcandles/', StockCandles.as_view(), name='stock_candles'),

    path('quote/', Quote.as_view(), name='quote'),

    path('get_finnhub_api_key/', get_finnhub_api_key, name='get_finnhub_api_key'),
]