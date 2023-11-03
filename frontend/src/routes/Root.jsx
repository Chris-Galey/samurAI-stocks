import { Outlet, Link } from "react-router-dom";
export default function Root() {
  return (
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
  );
}
