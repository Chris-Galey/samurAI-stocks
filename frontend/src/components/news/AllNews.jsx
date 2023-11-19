import { useState, useEffect } from "react";
import { postFavNews } from "../../api/NewsApi";
export default function AllNews({
  searchTerm,
  updatedFavs,
  updatedNews,
  postFavs,
  searchCategory,
}) {
  const [favs, setFavs] = useState([]);
  const [news, setNews] = useState([]);
  console.log(favs, news);
  useEffect(() => {
    setFavs(updatedFavs);
    setNews(updatedNews);
  }, [updatedFavs, updatedNews]);

  const handleCheckFavs = (id) => {
    const favsId = favs ? favs.map((fav) => fav.news_id) : [];
    return favsId.includes(id);
  };
  const handlePostFavs = async (article) => {
    await postFavNews(article);
    await postFavs();
  };

  const filteredNews = news.filter((article) => {
    const isMatchingCategory = article.category === searchCategory;
    const isMatchingTerm = article.headline
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (searchCategory !== "all news") {
      return isMatchingCategory && isMatchingTerm;
    } else {
      return isMatchingTerm;
    }
  });

  return (
    <>
      {filteredNews.map((article) => (
        <li
          className="flex flex-row  gap-5 p-5 rounded-md bg-secondaryColor"
          key={article.id}
        >
          <div className="flex flex-col flex-auto gap-5 ">
            <h3>{article.headline}</h3>

            <p>
              {article.summary}...
              <a href={article.url}>Link</a>
            </p>
            <p>- {article.source}</p>
            <p>{article.datetime}</p>
          </div>
          <div className="flex flex-col place-content-center">
            <button
              className={` modern-button flex flex-none ${
                handleCheckFavs(article.news_id) ? "modern-button:disabled" : ""
              }`}
              disabled={handleCheckFavs(article.id)}
              onClick={() => handlePostFavs(article)}
            >
              {handleCheckFavs(article.id) ? "Added" : "Favorite"}
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
