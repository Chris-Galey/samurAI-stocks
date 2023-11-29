// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import LineChart from "../routes/LineChart";
// import Button from '@mui/material/Button';
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import AddchartIcon from '@mui/icons-material/Addchart';

// export default function CompanyProfile() {
//   const [apiKey, setApiKey] = useState('');
//   const [companyProfile, setCompanyProfile] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [currentSymbol, setCurrentSymbol] = useState(new URLSearchParams(location.search).get('symbol')); 
//   const fetchApiKey = async () => {
//     const baseUrl = 'http://localhost:8000';
//     const response = await fetch(`${baseUrl}/watchlist/get_finnhub_api_key/`);
//     const data = await response.json();

//     if (data.api_key) {
//       setApiKey(data.api_key);
//     }
//   };

//   const fetchCompanyData = async () => {
//     if (currentSymbol && apiKey) {
//       const response = await fetch(
//         `http://localhost:8000/watchlist/companyprofile/?symbol=${currentSymbol}`,{
//         headers: {
//             Authorization: `token ${localStorage.getItem('token')}`,
//           },
//         });
//       const data = await response.json();
//       setCompanyProfile(data);
//     }
//   };
//   useEffect(() => {
//     fetchApiKey();
//   }, []);

//   useEffect(() => {
//     if (apiKey && currentSymbol) {
//       fetchCompanyData();
//     }
//   }, [apiKey, currentSymbol]);

//   const handleSearchChange = (event) => {
//     setCurrentSymbol(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); 
//       const newSymbol = currentSymbol;
//       const currentURL = new URL(document.location);
//       currentURL.searchParams.set('symbol', newSymbol);
//       navigate(currentURL.toString()); 
//     }
//   };

// return (
//   <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">

//     <Link to={'/dashboard/explore/'}>
//       <Button variant="outlined" startIcon={<KeyboardReturnIcon />}>       
//           Go back
//       </Button>
//     </Link>

//     <div className="flex flex-col items-center mb-4 mt-2">
//       <input
//         className="w-full mx-auto text-center bg-secondaryColor rounded"
//         type="search"
//         placeholder="Search... for other stocks"
//         onChange={handleSearchChange}
//         onKeyDown={handleSearchSubmit}
//       />
//       <button className="mt-2 px-4 py-2 text-white bg-blue-500 rounded">Search</button>
//     </div>

//     <LineChart symbol={currentSymbol} />
//     <h1 className="text-3xl font-bold text-center mb-4">{companyProfile.name || 'Company Profile'}</h1>
//     {companyProfile.logo && <img className="w-1/2 h-auto mx-auto mb-4" src={companyProfile.logo} alt="Company Logo" />}
//     <div className="text-lg">
//       <p className="mb-2 text-center"><strong>Symbol:</strong> {companyProfile.ticker || 'Not Available'}</p>
//       <p className="mb-2 text-center"><strong>Website:</strong> {companyProfile.weburl || 'Not Available'}</p>
//       <p className="mb-2 text-center"><strong>Phone Number:</strong> {companyProfile.phone || 'Not Available'}</p>
//       <p className="mb-2 text-center"><strong>Industry:</strong> {companyProfile.finnhubIndustry || 'Not Available'}</p>
//     </div>

//     <Button variant="outlined" startIcon={<AddchartIcon />}>
//       Add!
//     </Button>
//   </div>
// );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LineChart from "../routes/LineChart";
import Predictions from "../routes/Predictions";
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AddchartIcon from '@mui/icons-material/Addchart';
// import Button from "@mui/material/Button";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// import AddchartIcon from "@mui/icons-material/Addchart";
import { addToWatchList } from "../api/WatchListApi";

export default function CompanyProfile() {
  const [apiKey, setApiKey] = useState("");
  const [companyProfile, setCompanyProfile] = useState([]);
  const [addStatus, setAddStatus] = useState(""); // [false, true, false
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSymbol, setCurrentSymbol] = useState(new URLSearchParams(location.search).get('symbol'));
  const [showPredictions, setShowPredictions] = useState(false);

  const fetchApiKey = async () => {
    try {
      // const baseUrl = 'http://localhost:8000';
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const response = await fetch(`${baseUrl}/watchlist/get_finnhub_api_key/`);
      const data = await response.json();

      if (data.api_key) {
        setApiKey(data.api_key);
      }
    } catch (error) {
      console.error('Error fetching Finnhub API key', error);
    }
  };

  const fetchCompanyData = async () => {
    if (currentSymbol && apiKey) {
      const response = await fetch(
        `http://${baseUrl}/watchlist/companyprofile/?symbol=${currentSymbol}`,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setCompanyProfile(data);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  useEffect(() => {
    if (apiKey && currentSymbol) {
      fetchCompanyData();
    }
  }, [apiKey, currentSymbol]);

  const handleSearchChange = (event) => {
    setCurrentSymbol(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newSymbol = currentSymbol;
      const currentURL = new URL(document.location);
      currentURL.searchParams.set('symbol', newSymbol);
      navigate(currentURL.toString());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link to={'/dashboard/explore/'}>
        <Button variant="outlined" startIcon={<KeyboardReturnIcon />}>       
          Go back
        </Button>
      </Link>

      <div className="flex flex-col items-center mb-4 mt-2">
        <input
          className="w-full mx-auto text-center bg-secondaryColor rounded"
          type="search"
          placeholder="Search... for other stocks"
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
        <button className="mt-2 px-4 py-2 text-white bg-blue-500 rounded">Search</button>
      </div>

      <LineChart symbol={currentSymbol} showPredictions={showPredictions} />

      {/* <Button
        variant="outlined"
        startIcon={<AddchartIcon />}
        onClick={() => setShowPredictions(!showPredictions)}
      >
        {showPredictions ? 'Show Stock Data' : 'Show Predictions'}
      </Button> */}

<Button
  variant="outlined"
  startIcon={<AddchartIcon />}
  onClick={() => setShowPredictions((prevShowPredictions) => !prevShowPredictions)}
>
  {showPredictions ? 'Show 7 Day Historical Data' : 'Show Predictions'}
</Button>

      <h1 className="text-3xl font-bold text-center mb-4">{companyProfile.name || 'Company Profile'}</h1>
      {companyProfile.logo && <img className="w-1/2 h-auto mx-auto mb-4" src={companyProfile.logo} alt="Company Logo" />}
      <div className="text-lg">
        <p className="mb-2 text-center"><strong>Symbol:</strong> {companyProfile.ticker || 'Not Available'}</p>
        <p className="mb-2 text-center"><strong>Website:</strong> {companyProfile.weburl || 'Not Available'}</p>
        <p className="mb-2 text-center"><strong>Phone Number:</strong> {companyProfile.phone || 'Not Available'}</p>
        <p className="mb-2 text-center"><strong>Industry:</strong> {companyProfile.finnhubIndustry || 'Not Available'}</p>
      </div>

      <Button variant="outlined" startIcon={<AddchartIcon />}>
        Add!
      </Button>

      {/* {showPredictions && <Predictions symbol={currentSymbol} />} Display Predictions if showPredictions is true */}
    </div>
  );
}
