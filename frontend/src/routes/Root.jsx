import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import myImage from '../assets/samurai.png';
import Dropdown from 'react-bootstrap/Dropdown';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import CellTowerIcon from '@mui/icons-material/CellTower';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Root() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="w-full bg-bgColor flex-col h-screen overflow-hidden">
      <header className="h-32 bg-bgColor">
        <nav className="text-3xl font-bold flex items-center">
          <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle className="dropdown-toggle flex items-center" onClick={toggleDropdown}>
              <span className="ml-2">Samur<em className="italic">AI</em> <span className="font-light">Stock</span></span>
              <img className="navLogo" src={myImage} alt="Logo" />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={`dropdown-menu flex flex-col space-y-2 ${dropdownOpen ? 'block' : 'hidden'}`}
              style={{
                border: '.1px',
                borderRadius: '10px',
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
              <Dropdown.Item as={Link} to="/news">
                <CellTowerIcon />
                News
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/dashboard">
                <DashboardIcon />
                Personal Dashboard
              </Dropdown.Item>
              {loggedIn ? (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </>
              ) : null}
            </Dropdown.Menu>
          </Dropdown>
          {loggedIn ? (
            <div className="ml-auto">
              Welcome, {username}
            </div>
          ) : null}
        </nav>
      </header>
      <div className="min-h-full">
        <Outlet />
      </div>
    </div>
  );
}