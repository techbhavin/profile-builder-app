import { ReactElement, ReactNode } from "react";
import CreateProfile from "../pages/CreateProfile";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import ViewProfile from "../pages/ViewProfile";

export interface RouteType {
  path: string;
  key: string;
  element: ReactNode | ReactElement;
}

const ROUTES: Array<RouteType> = [
  {
    path: "/",
    key: "home-profile",
    element: <Home />,
  },
  {
    path: "/create-profile",
    key: "create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/edit-profile/:id",
    key: "edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/view-profile/:id",
    key: "view-profile",
    element: <ViewProfile />,
  },
];

export default ROUTES;
