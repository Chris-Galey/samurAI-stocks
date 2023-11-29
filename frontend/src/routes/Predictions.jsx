import React, { useState, useEffect } from "react";

const Predictions = ({ symbol }) => {
  const [data, setData] = useState([]);

  const fetchPredictions = async () => {
    try {
      // Assuming fetchStockData is a separate function that you use to fetch stock data
      await fetchStockData(); 

      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const todayTimestamp = Math.floor(today.getTime() / 1000);
      const thirtyDaysFromNowTimestamp = Math.floor(thirtyDaysFromNow.getTime() / 1000);

      const forecastResponse = await fetch(
        `http://localhost:8000/alpha_api/csvview/?symbol=${symbol}&start_date=${todayTimestamp}&end_date=${thirtyDaysFromNowTimestamp}`
      );
      const forecastData = await forecastResponse.json();

      const forecast = forecastData.forecast.map((dataPoint) => ({
        x: new Date(dataPoint.ds),
        y: dataPoint.yhat,
      }));

      setData([
        {
          id: '30-Day Forecast',
          data: forecast,
        },
      ]);
    } catch (error) {
      console.error('Error fetching predictions data', error);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [symbol]);

  return (
    <div>
      {/* Render your predictions data here using the 'data' state */}
    </div>
  );
};

export default Predictions;