// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Items from "../pages/Items/Index";
import Boxes from "../pages/boxes/Index";
import Cates from "../pages/cates/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 這是我們剛剛聊的佈局骨架
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
    ],
  },
]);

export default router;
