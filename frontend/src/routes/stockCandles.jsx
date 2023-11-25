// import React, { useEffect, useState } from "react";

// const StockCandles = ({ symbol }) => {
//   const [candles, setCandles] = useState([]);
//   const [yearHigh, setYearHigh] = useState(null);
//   const [yearLow, setYearLow] = useState(null);

//   useEffect(() => {
//     const finnhubApiKey = 'cl23dr9r01qinfqoe8l0cl23dr9r01qinfqoe8lg';
//     const resolution = 'D';
//     const from = Math.floor((Date.now() - 365 * 24 * 60 * 60 * 1000) / 1000); 

//     fetch(
//       `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${finnhubApiKey}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("API response:", data);

//         setCandles(data);

//         const yearHighValue = Math.max(...data.h);
//         const yearLowValue = Math.min(...data.l);
//         setYearHigh(yearHighValue);
//         setYearLow(yearLowValue);
//       })
//       .catch((error) => {
//         console.error('Error fetching stock data:', error);
//       });
//   }, [symbol]);

//   if (!candles || !Array.isArray(candles.c) || candles.c.length === 0) {
//     return <div>No data available for the specified symbol and time range.</div>;
//   }

//   return (
//     <div className="stock-candles">
//       <div className="year-high">Year High: {yearHigh}</div>
//       <div className="year-low">Year Low: {yearLow}</div>

//       {/* Render individual candles */}
//       {candles.c.map((candle, index) => (
//         <div key={candles.t[index]} className="stock-candle">
//           <div className="stock-price">{candle}</div>
//           <div className="stock-date">{candles.t[index]}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StockCandles;