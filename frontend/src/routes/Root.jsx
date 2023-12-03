import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import myImage from "../assets/samurai.png";
// import Dropdown from "react-bootstrap/Dropdown";
import HomeIcon from "@mui/icons-material/Home";
// import ExploreIcon from "@mui/icons-material/Explore";
// import CellTowerIcon from "@mui/icons-material/CellTower";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Root() {
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [signedup, setSignedup] = useState(false);
  const navigate = useNavigate();
  // const [menuOpen, setMenuOpen] = useState(false);

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
  // console.log(sharedState);
  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  const handleLogout = () => {
    sharedState.setUsername("");
    sharedState.setAuthStatus(false);
    sharedState.setAuthToken("");
    sharedState.setSignedup(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  return (
    <AuthContext.Provider value={{ sharedState, authToken }}>
      <div
        id="page-content"
        className="w-full bg-bgColor flex-col min-h-screen"
      >
        <header className="bg-bgColor flex flex-row px-4">
          <div className="text-3xl font-bold flex items-center basis-1/4">
            <span>
              Samur<em className="italic">AI</em>{" "}
              <span className="font-light">Stock</span>
            </span>
            <img className="navLogo" src={myImage} alt="Logo" />
          </div>

          {/* Responsive Menu Button */}
          {/* <button
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
            </nav> */}

          {/* {sharedState.authStatus && (
              <div className="ml-4 hidden lg:block">Welcome, {username}</div>
            )} */}

          <nav className="flex flex-row gap-10 basis-3/4 ">
            <div className="flex basis-3/4 place-content-end gap-5">
              <Link
                to="/"
                className="flex place-items-center gap-1 hover:underline"
              >
                <HomeIcon />
                Home
              </Link>
              {sharedState.authStatus && (
                <Link
                  to="/dashboard/explore"
                  className="flex place-items-center gap-1 hover:underline"
                >
                  <DashboardIcon />
                  Dashboard
                </Link>
              )}
            </div>
            <div className="flex basis-1/4 gap-5">
              {sharedState.authStatus ? (
                <>
                  <div className="flex place-items-center">
                    Welcome, {username}
                  </div>

                  <div className="flex place-items-center">
                    <button onClick={handleLogout} className="modern-button">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex place-items-center">
                    <Link to="/auth/login" className="modern-button">
                      Login
                    </Link>
                  </div>

                  <div className="flex place-items-center">
                    <Link to="/auth/signup" className="modern-button">
                      Signup
                    </Link>
                  </div>
                </>
              )}
            </div>
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
