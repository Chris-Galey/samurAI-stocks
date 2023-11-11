import { Outlet, Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="flex flex-row h-full">
      <nav className="flex-col bg-secondaryColor w-2/12 ">
        <h3>Nav</h3>
        <Link to="explore">Explore</Link>
        <Link to="watchlist">watchlist</Link>
        <Link to="news">News</Link>
      </nav>
      <div className="w-10/12 p-10">
        <Outlet />
      </div>
    </div>
  );
}
