import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Root() {
  const [username, setUsername] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [signedup, setSignedup] = useState(false);
  const sharedState = {
    username,
    setUsername,
    authStatus,
    setAuthStatus,
    authToken,
    setAuthToken,
    signedup,
    setSignedup,
  };

  return (
    <AuthContext.Provider value={{ sharedState }}>
      <div className="w-full bg-bgColor flex-col h-screen overflow-hidden">
        <header className="h-32 bg-buttonColor">
          <nav className="text-3xl font-bold underline">
            Nav bar
            <Link to="/">Home</Link>
            <Link to="/auth">Auth</Link>
            <Link to="/dashboard">dashboard</Link>
          </nav>
        </header>
        <div className="min-h-full">
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  );
}
