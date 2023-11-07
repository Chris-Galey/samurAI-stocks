import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";

export default function Auth() {
  const { sharedState } = useContext(AuthContext);

  return (
    <div className="flex flex-col place-items-center">
      {!sharedState.signedup ? <Signup /> : <Login />}
    </div>
  );
}
