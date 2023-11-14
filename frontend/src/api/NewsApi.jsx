const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(localStorage.getItem("token"));

export const getNews = async () => {
  const data = await fetch(`http://${baseUrl}/news/get-news/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  const res = await data.json();
  return res;
};

export const getFavNews = async () => {
  const data = await fetch(`http://${baseUrl}/news/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return await data.json();
};

export const deleteFavNews = async (id) => {
  const data = await fetch(`http://${baseUrl}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  return data.json();
};

export const postFavNews = async (article) => {
  console.log(article);
  const data = await fetch(`http://${baseUrl}/news/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      category: article.category,
      datetime: article.datetime,
      headline: article.headline,
      article_id: article.id,
      source: article.source,
      summary: article.summary,
      url: article.url,
    }),
  });
  return await data.json();
};
