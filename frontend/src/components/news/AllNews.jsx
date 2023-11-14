import { useState, useEffect } from "react";
import { getNews, postFavNews } from "../../api/NewsApi";
export default function AllNews({
  searchTerm,
  allFavs,
  updateAllFavs,
  searchCategory,
}) {
  const [news, setNews] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      const allNews = await getNews();
      setNews(allNews);
      setFavs(allFavs);
    };
    fetchAllNews();
  }, [allFavs]);
  const handleCheckFavs = (id) => {
    const favsId = favs.map((fav) => fav.id);
    return favsId.includes(id);
  };
  const handleUpdateFavs = async (article) => {
    await postFavNews(article);
    updateAllFavs(article);
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
                handleCheckFavs(article.id) ? "modern-button:disabled" : ""
              }`}
              disabled={handleCheckFavs(article.id)}
              onClick={() => handleUpdateFavs(article)}
            >
              {handleCheckFavs(article.id) ? "Added" : "Favorite"}
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
