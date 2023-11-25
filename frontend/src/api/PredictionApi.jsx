const baseUrl = import.meta.env.VITE_BASE_URL;
console.log(localStorage.getItem("token"));

export const getDetailPrediction = async (symbol) => {
  const data = await fetch(
    `http://${baseUrl}/alpha_api/csvview?symbol=${symbol}`,
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
