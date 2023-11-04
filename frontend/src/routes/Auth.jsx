import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";

export default function Auth() {
  const { sharedState } = useContext(AuthContext);

  return <>{!sharedState.signedup ? <Signup /> : <Login />}</>;
}
