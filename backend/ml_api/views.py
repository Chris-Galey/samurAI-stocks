import csv
import requests
from io import StringIO
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from prophet import Prophet


API_KEY='4JM9Z5F99ORWEI9T'
# API_KEY='demo'


class StockCSVViewSet(APIView):
    
    def get(self, request):
        symbol = request.query_params.get('symbol')
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol={symbol}&apikey={API_KEY}&datatype=csv'
        r = requests.get(url)
        if r.status_code == 200:
            csv_reader = csv.reader(StringIO(r.text))
    
            
            # Skip the header row
            next(csv_reader)
            
            # Read CSV data directly into a DataFrame
            df = pd.DataFrame(csv_reader, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            # clean data
            df = df.drop(['open', 'high', 'low', 'volume'], axis=1)
            df['timestamp'] = pd.to_datetime(df['timestamp'])
            df = df[df['timestamp'].dt.year >= 2021]
            df = df.rename(columns={'timestamp': 'ds', 'close': 'y'})
            # fit data
            m = Prophet(changepoint_prior_scale=.5)
            m.fit(df)
            # predict data
            future = m.make_future_dataframe(periods=30)
            forecast = m.predict(future)
            # Convert forecast to dictionary
            forecast_dict = forecast.to_dict(orient='records')
            
            return Response({'forecast': forecast_dict})
        else:
           
            return Response({'error': 'Failed to fetch data from Alpha Vantage'}, status=r.status_code)
    