const baseUrl = import.meta.env.VITE_BASE_URL;

export const getWatchList = async () => {
  const data = await fetch(`http://${baseUrl}/api/watchlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  const res = await data.json();
  return res;
};

export const addToWatchList = async (stock) => {
  try {
    const data = await fetch(`http://${baseUrl}/api/watchlist/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: stock.name,
        ticker: stock.ticker,
        logo: stock.logo,
        industry: stock.finnhubIndustry,
      }),
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error during addToWatchList:", error);
    // Handle the error as needed, throw, or return an error object
    throw error;
  }
};

export const removeFromWatchList = async (id) => {
  const data = await fetch(`http://${baseUrl}/api/watchlist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  const res = await data.json();
  return res;
};
