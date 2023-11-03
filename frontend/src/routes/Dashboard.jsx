import { Outlet, Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div className="flex flex-row min-h-screen">
      <nav className="flex-col bg-secondaryColor w-3/12 ">
        <h3>Nav</h3>
        <Link to="explore">Explore</Link>
        <Link to="watchlist">watchlist</Link>
        <Link to="news">News</Link>
      </nav>
      <div className="w-9/12">
        <Outlet />
      </div>
    </div>
  );
}
