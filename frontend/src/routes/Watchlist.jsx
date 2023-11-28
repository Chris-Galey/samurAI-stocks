import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";
import { getWatchList, removeFromWatchList } from "../api/WatchListApi";
import { useNavigate } from "react-router-dom";
export default function Watchlist() {
  const [watchList, setWatchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchList = async () => {
      const data = await getWatchList();
      setWatchList(data);
    };
    fetchWatchList();
  }, [watchList]);

  const handleDeleteArticle = async (id) => {
    console.log(id);
    await removeFromWatchList(id);
    const updatedWatchList = watchList.filter((stock) => stock.id !== id);
    setWatchList(updatedWatchList);
  };

  const filteredStocks =
    watchList && watchList.length > 0
      ? watchList.filter((stock) => {
          const isMatchingTerm = stock.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return isMatchingTerm;
        })
      : [];

  const navigateToDetails = (ticker) => {
    navigate(`/dashboard/companyProfile/?symbol=${ticker}`);
  };

  return (
    <div className=" flex flex-col gap-8 p-10 max-h-[80vh] w-full">
      <div className="w-full flex grow-0 place-content-center">
        <TextField
          label="Search Portfolio"
          id="fullWidth"
          className="w-1/2"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col grow p-10 overflow-auto">
        {filteredStocks.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {filteredStocks.map((stock) => (
              <li
                key={stock.id}
                className="flex flex-row place-items-center max-h-5% gap-10 p-5 rounded-md bg-secondaryColor hover:filter hover:brightness-110"
              >
                <img className="h-20" src={stock.logo} alt="logo" />
                <div className="flex flex-col flex-auto gap-5 ">
                  <h1 className="text-2xl font-bold">{stock.name}</h1>
                  <h1 className="text-xl">{stock.ticker}</h1>
                  <h1 className="text-xl">{stock.industry}</h1>
                </div>
                <button
                  className="modern-button flex flex-none"
                  onClick={() => {
                    handleDeleteArticle(stock.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="modern-button flex flex-none"
                  onClick={() => navigateToDetails(stock.ticker)}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available stocks in watchlist</p>
        )}
      </div>
    </div>
  );
}
