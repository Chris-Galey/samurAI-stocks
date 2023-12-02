import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import myImage from "../assets/samurai.png";
import Dropdown from "react-bootstrap/Dropdown";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import CellTowerIcon from "@mui/icons-material/CellTower";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Footer from "./Footer";

export default function Root() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [signedup, setSignedup] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const sharedState = {
    username,
    setUsername,
    authStatus,
    setAuthStatus,
    authToken,
    setAuthToken,
    signedup,
    setSignedup,
  };
  console.log(sharedState);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    sharedState.setUsername("");
    sharedState.setAuthStatus(false);
    sharedState.setAuthToken("");
    sharedState.setSignedup(false);
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AuthContext.Provider value={{ sharedState, authToken }}>
      <div
        id="page-content"
        className="w-full bg-bgColor flex-col min-h-screen"
      >
        <header className="bg-bgColor px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="text-3xl font-bold flex items-center">
              <span>
                Samur<em className="italic">AI</em>{" "}
                <span className="font-light">Stock</span>
              </span>
              <img className="navLogo" src={myImage} alt="Logo" />
            </div>

            {/* Responsive Menu Button */}
            <button
              className="lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <nav
              className={`${
                menuOpen ? "flex" : "hidden lg:flex"
              } lg:flex items-center space-x-4`}
            >
              <Link to="/" className="hover:underline font-bold">
                Home
              </Link>
              <Link
                to="/dashboard/explore"
                className="hover:underline font-inter font-bold"
              >
                Explore
              </Link>
              <Link
                to="/dashboard/news"
                className="hover:underline font-inter font-bold"
              >
                News
              </Link>
              <Link
                to="/dashboard"
                className="hover:underline font-inter font-bold"
              >
                Personal Dashboard
              </Link>
              {sharedState.authStatus && (
                <button
                  onClick={handleLogout}
                  className="hover:underline font-bold"
                >
                  Logout
                </button>
              )}
            </nav>

            {sharedState.authStatus && (
              <div className="ml-4 hidden lg:block">Welcome, {username}</div>
            )}
          </div>

          {menuOpen && (
            <div className="lg:hidden">
              <nav className="flex flex-col space-y-2">
                <Link to="/" onClick={toggleMenu} className="hover:underline">
                  <HomeIcon />
                  Home
                </Link>
                <Link
                  to="/dashboard/explore"
                  onClick={toggleMenu}
                  className="hover:underline"
                >
                  <ExploreIcon />
                  Explore
                </Link>
                <Link
                  to="/dashboard/news"
                  onClick={toggleMenu}
                  className="hover:underline"
                >
                  <CellTowerIcon />
                  News
                </Link>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="hover:underline"
                >
                  <DashboardIcon />
                  Personal Dashboard
                </Link>
                {sharedState.authStatus && (
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                )}
              </nav>
              {sharedState.authStatus && (
                <div className="ml-4">Welcome, {username}</div>
              )}
            </div>
          )}
        </header>

        <div className="h-full">
          <Outlet />
        </div>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
