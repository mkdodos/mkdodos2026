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
import SupaDemo from "../pages/SupaDemo/Index";

import InvTask from "../pages/InvTask/Index";
import InvSched from "../pages/InvSched/Index";
import InvStock from "../pages/InvStock/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />, // 佈局骨架
    children: [
      {
        path: "supa-demo",
        element: <SupaDemo />,
      },
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
      {
        path: "/inv-task",
        element: <InvTask />,
      },
      {
        path: "/inv-sched",
        element: <InvSched />,
      },
      {
        path: "/inv-stock",
        element: <InvStock />,
      },
      // {
      //   path: "mobile-list",
      //   element: <MobileDataList />,
      // },
    ],
  },
]);

export default router;
