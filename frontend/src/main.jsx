import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Landing from "./routes/Landing";
import Auth from "./routes/Auth";
import Dashboard from "./routes/Dashboard";
import Explore from "./routes/Explore";
import Watchlist from "./routes/Watchlist";
import News from "./routes/News";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Predictions from "./routes/Predictions";
import "./index.css";

import CompanyProfile from "./components/CompanyProf";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "explore",
            element: <Explore />,
          },
          {
            path: "watchlist",
            element: <Watchlist />,
          },
          {
            path: "news",
            element: <News />,
          },
          {
            path: "companyprofile",
            element: <CompanyProfile />,
          },
          {
            path: "predictions/:symbol",
            element: <Predictions />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
