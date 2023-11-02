import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import Landing from "./routes/Landing";
import Auth from "./routes/Auth";
import Dashboard from "./routes/Dashboard";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    children: [
      {
        path: "/home",
        index: true,
        element: <Landing />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
