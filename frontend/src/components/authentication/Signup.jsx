import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/AuthApi";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { sharedState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(username, password);
    const res = data;
    setUsername("");
    setPassword("");
    if (res == 201) {
      sharedState.setSignedup(true);
      navigate("/auth/login");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="flex flex-col place-items-center gap-5 p-10 w-1/4 min-h-[40vh]">
      <h2>Register a new account</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col place-items-center gap-5 p-10"
      >
        <input
          id="user"
          placeholder="username"
          value={username}
          className="p-2 text-left rounded"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          id="pass"
          placeholder="password"
          type="password"
          value={password}
          className="p-2 text-left rounded"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>{loginError && "username or password incorrect"}</p>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/auth/login"> Already a user? Login</Link>
    </div>
  );
}
