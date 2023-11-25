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

  return (
    <AuthContext.Provider value={{ sharedState, authToken }}>
      <div id="page-content" className="w-full bg-bgColor flex-col min-h-screen">
        <header className="h-32 bg-bgColor">
          <nav className="text-3xl font-bold flex items-center">
            <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
              <Dropdown.Toggle
                className="dropdown-toggle flex items-center"
                onClick={toggleDropdown}
              >
                <span className="ml-2">
                  Samur<em className="italic">AI</em>{" "}
                  <span className="font-light">Stock</span>
                </span>
                <img className="navLogo" src={myImage} alt="Logo" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className={`dropdown-menu flex flex-col space-y-2 ${
                  dropdownOpen ? "block" : "hidden"
                }`}
                style={{
                  border: ".1px",
                  borderRadius: "10px",
                  zIndex: 1,
                }}
              >
                <Dropdown.Item as={Link} to="/">
                  <HomeIcon />
                  Home
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="dashboard/explore">
                  <ExploreIcon />
                  Explore
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/dashboard/news">
                  <CellTowerIcon />
                  News
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/dashboard">
                  <DashboardIcon />
                  Personal Dashboard
                </Dropdown.Item>
                {sharedState.authStatus ? (
                  <>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : null}
              </Dropdown.Menu>
            </Dropdown>
            {sharedState.authStatus ? (
              <div className="ml-auto">Welcome, {username}</div>
            ) : null}
          </nav>
        </header>
        <div className="h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
