const baseUrl = import.meta.env.VITE_BASE_URL;

export const getNews = async () => {
  const data = await fetch(`http://${baseUrl}/news/get-news`, {
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
  console.log(id);
  const data = await fetch(`http://${baseUrl}/news/favorites/?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  const res = data;
  return res;
};

export const postFavNews = async (article) => {
  console.log(article);
  const data = await fetch(`http://${baseUrl}/news/favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      category: article.category,
      datetime: article.datetime,
      headline: article.headline,
      news_id: article.id,
      related: article.related,
      summary: article.summary,
      source: article.source,
      url: article.url,
      image: article.image,
    }),
  });
};
