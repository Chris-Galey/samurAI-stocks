import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import { useState } from "react";
export default function Auth() {
  const { sharedState } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="flex flex-col place-items-center">
      {!sharedState.signedup && !showLogin && <Signup />}

      {showLogin && <Login />}
      <button className="mt-4 text-blue-500 hover:underline" onClick={handleLoginClick}>
        Already have an account? Login
      </button>
    </div>
  );
}
