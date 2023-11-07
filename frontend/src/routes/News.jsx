import { useState, useEffect } from "react";
import newsData from "../../public/news.json";
import TextField from "@mui/material/TextField";
export default function News() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    setNews(newsData);
  }, []);
  console.log(news);
  return (
    <div className=" flex flex-col gap-5 p-10 border-solid border-2 border-black rounded-lg min-h-full">
      <div className="flex flex-row grow-0 place-content-center gap-5">
        <button className="modern-button">Top News</button>
        <button className="modern-button">Business</button>
        <button className="modern-button">Tech</button>
      </div>
      <div>
        <TextField
          fullWidth
          label="Search News"
          id="fullWidth"
          className="grow-0"
        />
      </div>
      <div className="flex flex-col grow p-10">
        <h2>My Favorite News</h2>
        <ul className="flex flex-col gap-5">
          {news.map((article) => (
            <li
              className="flex flex-col gap-5 p-10 rounded-md bg-secondaryColor"
              key={article.id}
            >
              {article.headline}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
