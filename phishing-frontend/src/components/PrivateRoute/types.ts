import { ReactElement } from "react";

export type TPrivateRoute = {
  isPrivate?: boolean;
  children: ReactElement;
  isAuthenticated: boolean;
};
