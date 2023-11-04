import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { sharedState } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await login(username, password);

    if (data.token !== undefined) {
      localStorage.setItem("token", data.token);
      setLoginError(false);
      setPassword("");
      setUsername("");
      sharedState.setAuthStatus(true);
      sharedState.setAuthToken(data.token);
      sharedState.setUsername(username);
      sharedState.setSignedup(false);
      navigate("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Sign in</h2>

      <input
        id="username"
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p>{loginError && "username or password incorrect"}</p>
      <button type="submit">Login</button>
    </form>
  );
}
