import { deleteFavNews } from "../../api/NewsApi";
export default function FavNews({
  searchTerm,
  updatedFavs,
  deleteFav,
  searchCategory,
}) {
  const handleDeleteArticle = async (id) => {
    console.log(id);
    await deleteFavNews(id);
    deleteFav();
  };
  const filteredNews = updatedFavs.filter((article) => {
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
          className="flex flex-row place-items-center m-h-5% gap-10 p-5 rounded-md bg-secondaryColor"
          key={article.id}
        >
          <img className="h-20" src={article.image} alt="logo" />

          <div className="flex flex-col flex-auto gap-5 ">
            <h3 className="font-bold">{article.headline}</h3>

            <p>
              {article.summary}...
              <a
                className="underline decoration-green text-green"
                href={article.url}
              >
                Link
              </a>
            </p>
            <p className="italic">- {article.source}</p>
            <p>{new Date(article.datetime * 1000).toLocaleString("en-US")}</p>
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
