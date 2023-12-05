import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

const popularSymbols = ["AAPL", "GOOG", "MSFT", "AMZN", "TSLA"];
const baseUrl = import.meta.env.VITE_BASE_URL;

const LineChart = ({ symbol = "AAPL" }) => {
  const [data, setData] = useState([]);
  const [apiKey, setApiKey] = useState("");

  const randomSymbol =
    popularSymbols[Math.floor(Math.random() * popularSymbols.length)];

  const fetchApiKey = async () => {
    try {
      const response = await fetch(
        `http://${baseUrl}/api/watchlist/get_finnhub_api_key/`
      );
      const data = await response.json();

      if (data.api_key) {
        setApiKey(data.api_key);
      } else {
        console.error("Error fetching Finnhub API key");
      }
    } catch (error) {
      console.error("Error fetching Finnhub API key", error);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchStockData = async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const fromTimestamp = Math.floor(oneWeekAgo.getTime() / 1000);

      const apiUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromTimestamp}&to=${Math.floor(
        new Date().getTime() / 1000
      )}&token=${apiKey}`;

      const response = await fetch(apiUrl);
      const responseData = await response.json();

      const stockData = responseData.t.map((timestamp, index) => ({
        x: new Date(timestamp * 1000).toISOString(),
        y: responseData.c[index],
      }));

      setData([
        {
          id: "Stock Price",
          data: stockData,
        },
      ]);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  const fetchData = () => {
    if (apiKey) {
      fetchStockData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol, apiKey]);

  return (
    <div>
      <div className="flex justify-center">
        <button onClick={fetchData}>7 day Open/Close for {symbol}!</button>
      </div>
      <div style={{ width: "600px", height: "400px" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
          xScale={{
            type: "time",
            format: "%Y-%m-%dT%H:%M:%S.%LZ",
            useUTC: false,
          }}
          xFormat="time:%Y-%m-%d %H:%M:%S"
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          axisLeft={{
            legend: "Price",
            legendOffset: -40,
          }}
          axisBottom={{
            format: "%b %d",
            tickRotation: -45,
          }}
          colors={{ scheme: "set3" }}
          enablePoints={false}
          enableSlices="x"
        />
      </div>
    </div>
  );
};

export default LineChart;
