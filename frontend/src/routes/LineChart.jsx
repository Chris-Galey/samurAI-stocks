// import React, { useState, useEffect } from 'react';
// import { ResponsiveLine } from '@nivo/line';

// const popularSymbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];

// const LineChart = ({ symbol = 'AAPL' }) => {
//   const [data, setData] = useState([]);
//   const [apiKey, setApiKey] = useState('');


//   const randomSymbol = popularSymbols[Math.floor(Math.random() * popularSymbols.length)];

//   const fetchApiKey = async () => {
//     try {
//       const baseUrl = 'http://localhost:8000';
//       const response = await fetch(`${baseUrl}/watchlist/get_finnhub_api_key/`);
//       const data = await response.json();

//       if (data.api_key) {
//         setApiKey(data.api_key);
//       } else {
//         console.error('Error fetching Finnhub API key');
//       }
//     } catch (error) {
//       console.error('Error fetching Finnhub API key', error);
//     }
//   };

//   useEffect(() => {
//     fetchApiKey();
//   }, []);

//   const fetchStockData = async () => {
//     try {
//       const today = new Date();
//       const sevenDaysAgo = new Date(today);
//       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
//       const fromTimestamp = Math.floor(sevenDaysAgo.getTime() / 1000);
//       const toTimestamp = Math.floor(today.getTime() / 1000);
  
//       const apiUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromTimestamp}&to=${toTimestamp}&token=${apiKey}`;
  
//       const response = await fetch(apiUrl);
//       const responseData = await response.json();
  
//       const stockData = responseData.t.map((timestamp, index) => ({
//         x: new Date(timestamp * 1000).toISOString().slice(0, 10),
//         y: responseData.c[index],
//       }));
  
//       setData([
//         {
//           id: 'Stock Price',
//           data: stockData,
//         },
//       ]);
//     } catch (error) {
//       console.error('Error fetching stock data', error);
//     }
//   };

//   const fetchData = () => {
//     if (apiKey) {
//       fetchStockData();
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [symbol, apiKey]);

//   return (
//     <div>
//       <div className='flex justify-center'>
//         <button onClick={fetchData}>7 day Open/Close for {symbol}!</button>
//       </div>
//       <div style={{ width: '600px', height: '400px' }}>
//         <ResponsiveLine
//           data={data}
//           margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
//           xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false }}
//           xFormat="time:%Y-%m-%d"
//           yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
//           axisLeft={{
//             legend: 'Price',
//             legendOffset: -40,
//           }}
//           axisBottom={{
//             format: '%b %d',
//             tickRotation: -45,
//           }}
//           colors={{ scheme: 'set3' }}
//           enablePoints={false}
//           enableSlices="x"
//         />
//       </div>
//     </div>
//   );
// };

// export default LineChart;



import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Button } from '@mui/material';
import jsonData from '../assets/prophet.json'

const popularSymbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];
const baseUrl = import.meta.env.VITE_BASE_URL;

const LineChart = ({ symbol = 'AAPL', showPredictions }) => {
  const [data, setData] = useState([]);
  const [apiKey, setApiKey] = useState('');

  const fetchApiKey = async () => {
    try {
      // const baseUrl = 'http://localhost:8000';
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const response = await fetch(`${baseUrl}/watchlist/get_finnhub_api_key/`);
      const data = await response.json();

      if (data.api_key) {
        setApiKey(data.api_key);
      }
    } catch (error) {
      console.error('Error fetching Finnhub API key', error);
    }
  };

  const fetchStockData = async () => {
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
      const fromTimestamp = Math.floor(sevenDaysAgo.getTime() / 1000);
      const toTimestamp = Math.floor(today.getTime() / 1000);
  
      const apiUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromTimestamp}&to=${toTimestamp}&token=${apiKey}`;
  
      const response = await fetch(apiUrl);
      const responseData = await response.json();
  
      const stockData = responseData.t.map((timestamp, index) => ({
        x: new Date(timestamp * 1000).toISOString().slice(0, 10),
        y: responseData.c[index],
      }));
  
      setData([
        {
          id: 'Stock Price',
          data: stockData,
        },
      ]);
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  };

  // const fetchPredictionsData = async () => {
  //   try {
  //     const today = new Date();
  //     const thirtyDaysFromNow = new Date(today);
  //     thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  //     const todayTimestamp = Math.floor(today.getTime() / 1000);
  //     const thirtyDaysFromNowTimestamp = Math.floor(thirtyDaysFromNow.getTime() / 1000);

  //     const apiUrl = `http://localhost:8000/alpha_api/csvview/?symbol=${symbol}`;

  //     const response = await fetch(apiUrl, {
  //       headers: {
  //         Authorization: `token ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     const responseData = await response.json();

  //     const predictionsData = responseData.forecast.map((dataPoint) => ({
  //       x: new Date(dataPoint.ds),
  //       y: dataPoint.yhat,
  //     }));

  //     setData([
  //       {
  //         id: '30-Day Forecast',
  //         data: predictionsData,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error('Error fetching predictions data', error);
  //   }
  // };

  // const fetchPredictionsData = () => {
  //   try {
  //     if (jsonData.forecast) {
  //       const today = new Date();
  //       const thirtyDaysFromNow = new Date(today);
  //       thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  //       const predictionsData = jsonData.forecast.filter((dataPoint) => {
  //         const date = new Date(dataPoint.ds);
  //         return date >= today && date <= thirtyDaysFromNow;
  //       }).map((dataPoint) => ({
  //         x: new Date(dataPoint.ds),
  //         y: dataPoint.yhat,
  //       }));
  
  //       setData([
  //         {
  //           id: '30-Day Forecast',
  //           data: predictionsData,
  //         },
  //       ]);
  //     } else {
  //       console.error('No predictions data available.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching predictions data', error);
  //   }
  // };




  const fetchPredictionsData = async () => {
    try {
      const response = await fetch(
        `http://${baseUrl}/alpha_api/csvview/?symbol=${symbol}`,
        {
          headers: {
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch predictions data');
      }

      const jsonData = await response.json();
  
      if (jsonData.forecast) {
        const today = new Date();
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
        const predictionsData = jsonData.forecast
          .filter((dataPoint) => {
            const date = new Date(dataPoint.ds);
            return date >= today && date <= thirtyDaysFromNow;
          })
          .map((dataPoint) => ({
            x: new Date(dataPoint.ds),
            y: dataPoint.yhat,
          }));
  
        setData((prevData) => [
          ...prevData,
          {
            id: '30-Day Forecast',
            data: predictionsData,
          },
        ]);
      } else {
        console.error('No predictions data available.');
      }
    } catch (error) {
      console.error('Error fetching predictions data', error);
    }
  };
  // const fetchPredictionsData = () => {
  //   try {
  //     if (jsonData.forecast) {
  //       const today = new Date();
  //       const thirtyDaysFromNow = new Date(today);
  //       thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  
  //       const predictionsData = jsonData.forecast
  //         .filter((dataPoint) => {
  //           const date = new Date(dataPoint.ds);
  //           return date >= today && date <= thirtyDaysFromNow;
  //         })
  //         .map((dataPoint) => ({
  //           x: new Date(dataPoint.ds),
  //           y: dataPoint.yhat,
  //         }));
  
  //       // Merge predictionsData with existing data
  //       setData((prevData) => [
  //         ...prevData,
  //         {
  //           id: '30-Day Forecast',
  //           data: predictionsData,
  //         },
  //       ]);
  //     } else {
  //       console.error('No predictions data available.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching predictions data', error);
  //   }
  // };
  const fetchData = () => {
    if (apiKey) {
      if (showPredictions) {
        fetchPredictionsData();
      } else {
        fetchStockData();
      }
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  useEffect(() => {
    fetchData();
  }, [symbol, apiKey, showPredictions]);

  return (
    <div>
      <div className='flex justify-center'>
        <button onClick={fetchData}>7 day Open/Close for {symbol}!</button>
      </div>
      <div style={{ width: 'auto',height:'400px', overflowX: 'auto' }}>
        <ResponsiveLine
          data={data}
          width={800}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: '%Y-%m-%d', useUTC: false }}
          xFormat="time:%Y-%m-%d"
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          axisLeft={{
            legend: 'Price',
            legendOffset: -40,
          }}
          axisBottom={{
            format: '%b %d',
            tickRotation: -45,
            tickValues: 'every day',
            legend: 'Date',
            legendOffset: 36,
          }}
          colors={{ scheme: 'set3' }}
          enablePoints={false}
          enableSlices="x"
        />
      </div>
      {showPredictions && <Button onClick={fetchPredictionsData}>Fetch Predictions</Button>} 
    </div>
  );
};

export default LineChart;
