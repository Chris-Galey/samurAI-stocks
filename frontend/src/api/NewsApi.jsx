const baseUrl = import.meta.env.VITE_BASE_URL;

export const getNews = async () => {
  const data = await fetch(`${baseUrl}/news`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  });
  return await data.json();
};

export const getFavNews = async () => {
  const data = await fetch(`${baseUrl}/news/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  });
  return await data.json();
};

export const deleteFavNews = async (id) => {
  const data = await fetch(`${baseUrl}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
    },
  });
  return data.json();
};

export const postFavNews = async (article) => {
  const data = await fetch(`${baseUrl}/news/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${localStorage.getItem("token")}`,
      body: JSON.stringify({
        category: article.category,
        datetime: article.datetime,
        headline: article.headline,
        id: article.id,
        source: article.source,
        summary: article.summary,
        url: article.url,
      }),
    },
  });
  return await data.json();
};
