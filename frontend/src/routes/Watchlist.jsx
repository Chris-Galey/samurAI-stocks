
import React, { useState, useEffect } from "react";


export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [stockData, setStockData] = useState({});
  const [allSymbols, setAllSymbols] = useState([]); 
  const fetchAllSymbols = async () => {
    try {
      const response = await fetch(`/watchlist/stocksymbols/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAllSymbols(data); 
    } catch (error) {
      console.error("Error fetching stock symbols:", error);
    }
  };

  useEffect(() => {
    fetchAllSymbols();
  }, []);

  const addSymbolToWatchlist = () => {
    const symbol = newSymbol.toUpperCase();

    if (!watchlist.some((stock) => stock.symbol === symbol)) {
      setWatchlist([...watchlist, { symbol, name: 'Stock Name' }]);
    }

    setNewSymbol('');
  };

  useEffect(() => {
    const fetchDataForWatchlist = async () => {
      const stockData = {};
      for (const stock of watchlist) {
        const data = await fetchStockData(stock.symbol);
        stockData[stock.symbol] = data;
      }
      setStockData(stockData);
    };

    fetchDataForWatchlist();
  }, [watchlist]);
  return (
    <>
      <h1>Watchlist</h1>
      <div>
        <div>
          <select
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          >
            <option value="">Select a stock symbol</option>
            {allSymbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
          <button onClick={addSymbolToWatchlist}>Add to Watchlist</button>
        </div>

        <div className="watchlist-container">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="watchlist-item">
              <div className="stock-info">
                <span className="stock-symbol">{stock.symbol}</span>
                <span className="stock-name">{stock.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}