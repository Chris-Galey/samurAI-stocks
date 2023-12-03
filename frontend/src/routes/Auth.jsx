import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="flex place-content-center">
      <Outlet />
    </div>
  );
}
