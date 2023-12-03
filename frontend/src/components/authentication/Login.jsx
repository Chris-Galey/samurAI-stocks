import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/AuthApi";
import { Link } from "react-router-dom";

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
      navigate("/dashboard/explore");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="flex flex-col place-items-center gap-5 p-10  w-1/4 min-h-[40vh]">
      <h2>Sign in</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col place-items-center gap-5 p-10"
      >
        <input
          id="username"
          placeholder="username"
          className="p-2 text-left rounded"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-2 text-left rounded"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>{loginError && "username or password incorrect"}</p>
        <button type="submit">Login</button>
      </form>
      <Link to="/auth/signup"> Not a user? Sign up</Link>
    </div>
  );
}
