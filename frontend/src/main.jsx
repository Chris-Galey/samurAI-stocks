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
import "./index.css";
import Index from "./routes/Index";
import StockDetail from "./routes/StockDetail";

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
            index: true,
            element: <Index />,
          },
          {
            path: "stocks/:symbol",
            element: <StockDetail />,
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
