
import React, { useEffect, useState } from "react";

const StockQuote = ({ symbol }) => {
  const [quote, setQuote] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiKey = async () => {
    try {
      // const baseUrl = 'http://localhost:8000';
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`http://${baseUrl}/api/watchlist/get_finnhub_api_key/`);
      const data = await response.json();

      if (data.api_key) {
        setApiKey(data.api_key);
      } else {
        console.error('Error fetching Finnhub API key');
      }
    } catch (error) {
      console.error('Error fetching Finnhub API key', error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data. Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.c) {
        setQuote(data);
      } else {
        console.error('Invalid or empty data returned from the API.');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } 
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  useEffect(() => {
    setQuote(null)
    setIsLoading(true);
    // console.log(isLoading)
    const fetchData = async () => {
      try{
        if (apiKey) {
        await fetchStockData();
        }
      } finally {
      setIsLoading(false);
      // console.log(isLoading)
      }
    };
    fetchData();
  }, [symbol, apiKey]);

  if (isLoading) {
    return (
      <div>
        {/* <p className="text-4xl">⊹⋛⋋( ՞ਊ ՞)⋌⋚⊹</p> */}
        <p className="text-4xl">Loading...</p>
      </div>
    );
  }

  if (!quote) {
    return <div>No data available for the specified symbol.</div>;
  }

  return (
    <div className="stock-quote">
      {/* <div className="loading">{isLoading ? <p>Loading....</p> : null}</div> */}
      {/* {isLoading && <p>Loading....</p>} */}
      <div className="current-price">Current Price: {quote.c}</div>
      <div className="previous-close">Previous Close: {quote.pc}</div>
      <div className="open">Open: {quote.o}</div>
      <div className="high">High: {quote.h}</div>
      <div className="low">Low: {quote.l}</div>
    </div>
  );
};

export default StockQuote;