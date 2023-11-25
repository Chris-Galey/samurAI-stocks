// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";

import { useEffect, useState } from "react";
import { getWatchList } from "../api/WatchListApi";
import { useNavigate } from "react-router-dom";
export default function Watchlist() {
  const [watchList, setWatchList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchList = async () => {
      const data = await getWatchList();
      setWatchList(data);
    };
    fetchWatchList();
  }, []);

  const navigateToDetails = (ticker) => {
    navigate(`/dashboard/companyProfile/?symbol=${ticker}`);
  };

  return (
    <div className=" flex flex-col gap-8 p-10 max-h-[80vh] w-full">
      {/* <div className="flex flex-row min-h-fit place-content-center gap-5">
        <button
          className="modern-button"
          onClick={() => setNewsCategory("all news")}
        >
          All News
        </button>
        <button
          className="modern-button"
          onClick={() => setNewsCategory("top news")}
        >
          Top News
        </button>
        <button
          className="modern-button"
          onClick={() => setNewsCategory("business")}
        >
          Business
        </button>
        <button
          className="modern-button"
          onClick={() => setNewsCategory("technology")}
        >
          Tech
        </button>
      </div>
      <div className="w-full flex grow-0 place-content-center">
        <TextField
          label="Search Headline"
          id="fullWidth"
          className="w-1/2"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div> */}
      <div className="flex flex-col grow p-10 overflow-auto">
        <ul className="flex flex-col gap-5">
          {watchList.map((stock) => (
            <li
              key={stock.id}
              className="flex flex-row place-items-center max-h-5% gap-10 p-5 rounded-md bg-secondaryColor hover:filter hover:brightness-110"
              onClick={() => navigateToDetails(stock.ticker)}
            >
              <img className="h-20" src={stock.logo} alt="logo" />
              <div className="flex flex-col flex-auto gap-5 ">
                <h1 className="text-2xl font-bold">{stock.name}</h1>
                <h1 className="text-xl">{stock.ticker}</h1>
                <h1 className="text-xl">{stock.industry}</h1>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
