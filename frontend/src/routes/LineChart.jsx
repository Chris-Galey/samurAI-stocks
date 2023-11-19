import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineChart = () => {
  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState('AAPL');
  const [apiKey, setApiKey] = useState('');
  const newApikEY = 'cl23fq1r01qinfqoear0cl23fq1r01qinfqoearg'

  const fetchApiKey = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`http://${baseUrl}/watchlist/get_finnhub_api_key/`);
      const data = await response.json();

      if (data.api_key) {
        setApiKey(data.api_key);
        fetchData()
      } else {
        console.error('Error fetching Finnhub API key');
      }
  }; 

  useEffect(() => {
    fetchApiKey();
    if(apiKey){
      fetchStockData()
    }
  }, [apiKey]);

  const fetchStockData = async (symbol) => {
    const now = Math.floor(Date.now() / 1000);
    const oneWeekAgo = now - 7 * 24 * 60 * 60;

    const chartData = {};

    for (let timestamp = oneWeekAgo; timestamp <= now; timestamp += 24 * 60 * 60) {
      const apiUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${timestamp}&to=${timestamp}&token=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();

        if (responseData.t && responseData.c && responseData.t.length === 1 && responseData.c.length === 1) {
          const timestampValue = new Date(responseData.t[0] * 1000);
          const price = responseData.c[0];

          chartData[timestampValue] = { x: timestampValue, y: price };
        }
    }
    return [{ id: 'Stock Price', data: Object.values(chartData) }];
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const fetchData = () => {
    fetchStockData(symbol).then((data) => {
      setData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <div>
      <div className='flex justify-center'>
        <input
          type="text"
          value={symbol}
          onChange={handleSymbolChange}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button onClick={fetchData}>Get Data!</button>
      </div>
      <div style={{ width: '500px', height: '300px' }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: '%s', useUTC: false }}
          xFormat="time:%Y-%m-%d"
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisLeft={{
            legend: 'Price',
            legendOffset: -40,
          }}
          axisBottom={{
            format: '%b %d',
            tickRotation: -45,
          }}
          colors={{ scheme: 'set3' }}
          enablePoints={false}
          enableSlices="x"
        />
      </div>
    </div>
  );
};

export default LineChart;