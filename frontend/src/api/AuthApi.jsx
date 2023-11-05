const baseUrl = import.meta.env.VITE_BASE_URL;
export const signup = async (username, password) => {
  const data = await fetch(`http://${baseUrl}/accounts/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const res = data.status;
  return res;
};
export const login = async (username, password) => {
  const data = await fetch(`http://${baseUrl}/accounts/get-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const res = await data.json();
  return res;
};
