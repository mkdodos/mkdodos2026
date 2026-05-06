// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BasicLayout from "../layouts/BasicLayout";

import Items from "../pages/Items/Index";
import Boxes from "../pages/boxes/Index";
import Cates from "../pages/cates/Index";
import Funds from "../pages/funds/Index";

import AutoTable from "../pages/AutoTable/Index";
import MobileDataList from "../components/MobileDataList";

import TransactionList from "../pages/Finance/TransationList";

import StockMaster from "../pages/StockMaster/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />, // 佈局骨架
    children: [
      {
        path: "stock-master",
        element: <StockMaster />,
      },
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
        path: "auto-table",
        element: <AutoTable />,
      },
      {
        path: "funds",
        element: <Funds />,
      },
      {
        path: "/stocks/history",
        element: <TransactionList />,
      },
      // {
      //   path: "mobile-list",
      //   element: <MobileDataList />,
      // },
    ],
  },
]);

export default router;
