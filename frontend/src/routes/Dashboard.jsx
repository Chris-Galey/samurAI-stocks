import React, { useState } from "react";
import { Routes, Route, Link, useLocation} from "react-router-dom";
import LineChart from "./LineChart";
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Watchlist from "./Watchlist";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return(
    <div className="flex flex-row min-h-screen">
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 fixed top-20 left-0 h-full w-3/12 bg-bgColor p-4 shadow-md z-20`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white absolute top-4 right-4 bg-primaryColor p-2 rounded-full"
        >
          Close
        </button>
        <h3 className="text-white text-2xl mb-4">Dashboard</h3>
          <a href="/dashboard/explore" className="text-white text-lg mb-2 block">
            Explore
          </a>
          <Link to="/dashboard/watchlist" className="text-white text-lg mb-2 block cursor-pointer">
          Watchlist
          </Link>
          <a href="#news" className="text-white text-lg mb-2 block">
            News
          </a>
        </div>

      <div className="flex justify-between items-center bg-primaryColor p-4 shadow-md ">
        <IconButton
          onClick={toggleSidebar}
          className="text-white bg-primaryColor p-2 rounded-full"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold mb-5 text-center">Stock Price Dashboard</h1>
        <div className="flex justify-center">
          <LineChart />
        </div>
        <Routes>
          <Route path="explore" element={<LineChart />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;