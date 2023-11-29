import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSideBar = () => {
    if(isSidebarOpen){
        toggleSidebar()
    }

  }

  return (
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

          <Link to="/dashboard/explore" className="text-white text-lg mb-2 block" onClick={closeSideBar}>
            Explore
          </Link>
          <Link to="/dashboard/watchlist" className="text-white text-lg mb-2 block cursor-pointer" onClick={closeSideBar}>
          Watchlist
          </Link>
          <Link to="/dashboard/news" className="text-white text-lg mb-2 block" onClick={closeSideBar}>
            News
          </Link>
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
      <Outlet />
    </div>
  );
};

export default Dashboard;
