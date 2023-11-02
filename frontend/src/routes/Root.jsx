import { Outlet } from "react-dom/client";
export default function Root() {
  return (
    <>
      <nav>Nav bar</nav>
      <Outlet />
    </>
  );
}
