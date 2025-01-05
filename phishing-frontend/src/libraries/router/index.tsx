import { type FC, Suspense, useEffect, useMemo } from "react";
import { isNull } from "lodash";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { getCookie } from "libraries/cookie";
import { useAppSelector } from "libraries/redux";
import { AuthSelectors } from "store/auth/selectors";
import { HelmetLayout, RouteLoader, PrivateRoute } from "components";

import routesList from "./routes";
import { ERoutePaths } from "./types";

export const RoutesWrapper: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn } = useAppSelector(AuthSelectors.authSystem);
  const isAuthenticatedCookie = getCookie("token") ? true : false;

  const isAuth = isAuthenticatedCookie || !isNull(signIn?.data?.access_token);

  useEffect(() => {
    if (isAuth && location.pathname.includes(ERoutePaths.LogIn)) {
      navigate(ERoutePaths.Home);
    }
  }, [isAuth, location.pathname, navigate]);

  const renderRoutes = useMemo(
    () =>
      routesList.map(({ element: Element, path, title, isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute isPrivate={isPrivate} isAuthenticated={isAuth}>
              <Suspense fallback={<RouteLoader />}>
                <HelmetLayout key={title} title={title}>
                  <Element />
                </HelmetLayout>
              </Suspense>
            </PrivateRoute>
          }
        />
      )),

    [isAuth]
  );

  return <Routes>{renderRoutes}</Routes>;
};
