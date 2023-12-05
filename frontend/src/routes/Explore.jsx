import React, { useState, useEffect } from "react";
import LineChart from "./LineChart";
// import StockCandles from './stockCandles';
import StockQuote from "./Qoute";
import CompanyProfile from "../components/CompanyProf";
import { Link, Navigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

export default function Explore() {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [stockData, setStockData] = useState({});
  const [allSymbols, setAllSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [cachedSymbols, setCachedSymbols] = useState([]);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const baseUrl = 'localhost:8000'
  const pageSize = 10;

  useEffect(() => {
    fetchAllSymbols();
  }, [localStorage.getItem("token")]);

  const fetchAllSymbols = async () => {
    const response = await fetch(
      `http://${baseUrl}/api/watchlist/stocksymbols/`,
      {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const symbols = data;
      setAllSymbols(symbols);
      setCachedSymbols(symbols);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setSelectedSymbol(stock.symbol);
  };

  const handleCloseCard = () => {
    setSelectedStock(null);
  };

  const handleSearch = () => {
    const filteredSymbols = cachedSymbols.filter((stock) =>
      stock.symbol.toLowerCase().includes(newSymbol.toLowerCase())
    );

    setAllSymbols(filteredSymbols);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center">
          <LineChart />
          <h1 className="mt-8 mb-4 text-2xl font-bold">Explore Page</h1>
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
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Search
          </button>
        </div>
      </div>

          <div className="watchlist-container w-full">
            {allSymbols
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((stock) => (
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
                      <span className="stock-description text-sm">
                        {stock.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {selectedStock && (
            <div className=" flex flex-col gap-2 floating-card">
              <h2>{selectedStock.name}</h2>
              <p>{selectedStock.description}</p>
              <StockQuote symbol={selectedStock.symbol} />
              <div className="flex flex-row gap-2">
                <Link
                  to={`/dashboard/companyProfile/?symbol=${selectedStock.symbol}`}
                >
                  <button>Company Profile</button>
                </Link>
                <Link to={`/dashboard/predictions/${selectedStock.symbol}`}>
                  <button>Predictions</button>
                </Link>
                <button onClick={handleCloseCard}>Close</button>
              </div>
            </div>
          )}
          <div className="pagination-controls">
            <TablePagination
              component={"div"}
              count={allSymbols.length}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
