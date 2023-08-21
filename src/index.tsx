import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./component/error-page";
import Login from "./login";
import Main from "./main";
import Home from "./home";
import Creation from "./creation";
import Detail from "./detail";
import Writing from "./writing";
import Update from "./update";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/creation",
      element: <Creation />,
    },
    {
      path: "detail/:id",
      element: <Detail />,
    },
    {
      path: "writing/:id",
      element: <Writing />,
    },
    {
      path: "update/:id",
      element: <Update />,
    },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
