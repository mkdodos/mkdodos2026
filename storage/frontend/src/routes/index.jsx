// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BasicLayout from "../layouts/BasicLayout";

import Items from "../pages/Items/Index";
import Boxes from "../pages/boxes/Index";
import Cates from "../pages/cates/Index";
import Customers from "../pages/customers/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />, // 佈局骨架
    children: [
      {
        path: "items",
        element: <Items />,
      },
      {
        path: "cates",
        element: <Cates />,
      },
      {
        path: "boxes",
        element: <Boxes />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
]);

export default router;
