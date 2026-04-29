// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BasicLayout from "../layouts/BasicLayout";


import Customers from "../pages/customers/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />, // 佈局骨架
    children: [
     
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
]);

export default router;
