const baseUrl = import.meta.env.VITE_BASE_URL;

export const getDetailPrediction = async (symbol) => {
  const data = await fetch(
    `http://${baseUrl}/api/alpha_api/csvview?symbol=${symbol}`,
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
