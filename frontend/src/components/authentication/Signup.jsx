import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signup } from "../../api/AuthApi";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const { sharedState } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = await signup(username, password);
    const res = data;
    setUsername("");
    setPassword("");
    if (res == 201) {
      sharedState.setSignedup(true);

      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col place-content-center gap-5 p-10 bg-green/50 w-1/4 min-h-[40vh]"
    >
      <h2>Register a new account</h2>

      <input
        id="user"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        id="pass"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p>{loginError && "username or password incorrect"}</p>
      <button type="submit">Sign Up</button>
    </form>
  );
}
