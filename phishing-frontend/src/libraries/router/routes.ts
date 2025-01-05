import { lazy } from "react";

import { ERoutePaths, type TRoutePageType } from "./types";

const Home = lazy(() => import("pages/Home"));
const LogIn = lazy(() => import("pages/LogIn"));
const Register = lazy(() => import("pages/Register"));

const Error = lazy(() => import("pages/Error"));

const routesList: TRoutePageType[] = [
  {
    element: Home,
    path: ERoutePaths.Home,
    isPrivate: true,
    title: "Home",
  },
  {
    element: LogIn,
    path: ERoutePaths.LogIn,
    title: "Login page",
  },
  {
    element: Register,
    path: ERoutePaths.Register,
    title: "Register pages",
  },
  {
    element: Error,
    path: ERoutePaths.Error,
    title: "Error Page",
  },
];

export default routesList;
