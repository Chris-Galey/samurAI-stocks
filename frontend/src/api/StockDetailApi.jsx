const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(localStorage.getItem("token"));

export const getProfile = async (symbol) => {
  const data = await fetch(
    `http://${baseUrl}/watchlist/companyprofile?symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }
  );
  const res = await data.json();
  return res;
};

export const getCandles = async (symbol) => {
  const data = await fetch(
    `http://${baseUrl}/watchlist/candles?symbol=${symbol}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    }
  );
  const res = await data.json();
  return res;
};
