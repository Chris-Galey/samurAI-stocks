import { useState, useEffect } from "react";
// import { getFavNews } from "../api/NewsApi";
import favorites from "../favs.json";
import AllNews from "../components/news/AllNews";
import FavNews from "../components/news/FavNews";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
export default function News() {
  const [view, setView] = useState("all");
  const [favs, setFavs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newsCategory, setNewsCategory] = useState("all news");
  console.log(newsCategory);
  useEffect(() => {
    setFavs(favorites);
  }, []);
  const handleUpdateFavs = async (article) => {
    // await postFavNews(article);
    setFavs([...favs, article]);
  };
  const handleUpdateDeletedFavs = async (id) => {
    setFavs(favs.filter((fav) => fav.id !== id));
  };

  return (
    <div className=" flex flex-col gap-8 p-10 max-h-[80vh]">
      <FormControl className="w-1/12">
        <InputLabel id="demo-simple-select-label">Select View</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={view}
          label="Select View"
          onChange={(e) => setView(e.target.value)}
        >
          <MenuItem value={"all"}>All news</MenuItem>
          <MenuItem value={"favs"}>Favorites</MenuItem>
        </Select>
      </FormControl>
      <div className="flex flex-row min-h-fit place-content-center gap-5">
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
      </div>

      <div className="flex flex-col grow p-10 overflow-auto">
        <ul className="flex flex-col gap-5">
          {view === "all" ? (
            <AllNews
              searchTerm={searchTerm}
              searchCategory={newsCategory}
              allFavs={favs}
              updateAllFavs={handleUpdateFavs}
            />
          ) : (
            <FavNews
              searchTerm={searchTerm}
              searchCategory={newsCategory}
              allFavs={favs}
              updateDeletedFavs={handleUpdateDeletedFavs}
            />
          )}
        </ul>
      </div>
    </div>
  );
}
