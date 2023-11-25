import React, { useState, useEffect } from 'react';
import LineChart from "./LineChart";
// import StockCandles from './stockCandles';
import StockQuote from './Qoute';
export default function Watchlist(){

  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [stockData, setStockData] = useState({});
  const [allSymbols, setAllSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);
  const pageSize = 10;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const baseUrl = 'localhost:8000'

  useEffect(() => {
    fetchAllSymbols();
  }, [localStorage.getItem('token')]);

  const fetchAllSymbols = async () => {
    const response = await fetch(`http://${baseUrl}/watchlist/stocksymbols/`, {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`,
      },
  });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const symbols = data;
      setAllSymbols(symbols);

      }
      const stockDataObj = {};
      stockPrices.forEach((item) => {
        stockDataObj[item.symbol] = item.price;
      });
      setStockData(stockDataObj);
    } 

  const handlePaginationChange = (direction) => {
    if (direction === 'next') {
      if (currentPage < Math.ceil(allSymbols.length / pageSize)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else if (direction === 'prev') {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    }
  };

  const handleStockClick = (stock) => {
    console.log('Stock clicked:', stock);
    setSelectedStock(stock);
  };

  const handleCloseCard = () => {
    setSelectedStock(null);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* <LineChart /> */}
  
        <h1 className="mt-8 mb-4 text-2xl font-bold">Watchlist</h1>
  
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative inline-block">
              <input
                type="text"
                placeholder="Enter stock symbol"
                value={newSymbol}
                onChange={(event) => setNewSymbol(event.target.value)}
                className="w-full h-8 pl-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
            </div>
          </div>
          </div>
        </div>
  
        <div className="watchlist-container">
            {allSymbols.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((stock) => (
              <div
                key={stock.symbol}
                className="watchlist-item"
                onClick={() => handleStockClick(stock)}
              >
                <div className="flex justify-between items-center">
                  <div className="stock-info flex justify-between">
                    <span className="stock-symbol">{stock.symbol}</span>
                  </div>
                  <div className="stock-details">
                    <span className="stock-name">{stock.name}</span>
                    <span className="stock-description text-sm">{stock.description}</span>
                </div>
            </div>
          </div>
        ))}
      </div>

        {selectedStock && (
        <div className="floating-card">
          <h2>{selectedStock.name}</h2>
          <p>{selectedStock.description}</p>
          <StockQuote symbol={selectedStock.symbol} />
          {/* <StockCandles symbol={selectedStock.symbol} stockData={stockData} /> */}
          <button onClick={handleCloseCard}>Close</button>
        </div>
      )}

  
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={() => handlePaginationChange('prev')}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(allSymbols.length / pageSize)}
          </span>
          <button
            className="pagination-button"
            onClick={() => handlePaginationChange('next')}
            disabled={currentPage === Math.ceil(allSymbols.length / pageSize)}
          >
            Next
          </button>
        </div>
      </div>
      </>
    )
}


