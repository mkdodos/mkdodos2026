// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BasicLayout from "../layouts/BasicLayout";

import Customers from "../pages/customers/Index";
import WpStock from "../pages/WpStock/Index";
import WpDemand from "../pages/WpDemand/Index";
import WpCutLogs from "../pages/WpCutLogs/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />, // 佈局骨架
    children: [
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "wp-stock",
        element: <WpStock />,
      },
      {
        path: "wp-demand",
        element: <WpDemand />,
      },
      {
        path: "wp-cut-logs",
        element: <WpCutLogs />,
      },
    ],
  },
]);

export default router;
