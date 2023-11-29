import csv
import requests
from io import StringIO
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
from prophet import Prophet
from rest_framework.permissions import AllowAny

# Jesus_Api_Key = 'QOFFHL7VLJMFI529'
# API_KEY = "4JM9Z5F99ORWEI9T"
API_KEY = "TU6VKYNEXO4MHL8S"

class StockCSVViewSet(APIView):
    authentication_classes = []  # Disable authentication for this view
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            symbol = request.query_params.get('symbol')
            url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol={symbol}&apikey={API_KEY}&datatype=csv'
            r = requests.get(url)

            if r.status_code == 200:
                # Print raw CSV data
                print("Raw CSV Data:")
                print(r.text)

                csv_reader = csv.reader(StringIO(r.text))

                # Skip the header row
                next(csv_reader)

                # Read CSV data directly into a DataFrame
                df = pd.DataFrame(csv_reader, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
                # Print the DataFrame before modifications
                print("DataFrame Before Modifications:")
                print(df)

                # clean data
                df = df.drop(['open', 'high', 'low', 'volume'], axis=1)
                df['timestamp'] = pd.to_datetime(df['timestamp'])
                df = df[df['timestamp'].dt.year >= 2021]
                df = df.rename(columns={'timestamp': 'ds', 'close': 'y'})
                # Print the DataFrame after modifications
                print("DataFrame After Modifications:")
                print(df)

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
                print(f"Alpha Vantage API Error - Status Code: {r.status_code}, Content: {r.text}")
                return Response({'error': 'Failed to fetch data from Alpha Vantage'}, status=r.status_code)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return Response({'error': 'Internal Server Error'}, status=500)
