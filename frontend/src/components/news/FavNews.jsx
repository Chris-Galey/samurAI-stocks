import { useState, useEffect } from "react";

export default function FavNews({
  searchTerm,
  allFavs,
  updateDeletedFavs,
  searchCategory,
}) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(allFavs);
  }, [allFavs]);
  const handleDeleteArticle = async (id) => {
    // await deleteFavNews(id);
    updateDeletedFavs(id);
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
          </div>
          <div className="flex flex-col place-content-center">
            <button
              className="modern-button flex flex-none"
              onClick={() => {
                handleDeleteArticle(article.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </>
  );
}
