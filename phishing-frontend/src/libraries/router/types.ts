import type { FC } from "react";

export type TRoutePageType = {
  element: FC;
  path: string;
  title: string;
  isPrivate?: boolean;
};

export enum ERoutePaths {
  Home = "/",
  LogIn = "/login",
  Register = "/register",
  Error = "*",
}
