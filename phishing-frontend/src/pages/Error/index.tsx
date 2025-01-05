import type { FC } from "react";
import { isNull } from "lodash";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { getCookie } from "libraries/cookie";
import { useAppSelector } from "libraries/redux";
import { ERoutePaths } from "libraries/router/types";
import { AuthSelectors } from "store/auth/selectors";

const Error: FC = () => {
  const navigate = useNavigate();

  const { signIn } = useAppSelector(AuthSelectors.authSystem);
  const isAuthenticatedCookie = getCookie("token") ? true : false;

  const isAuth: boolean =
    isAuthenticatedCookie || !isNull(signIn?.data?.access_token);

  const routeHandler = () => {
    navigate(isAuth ? ERoutePaths.Home : ERoutePaths.LogIn);
  };

  return (
    <div>
      <p>Route does not exist</p>

      <Button onClick={routeHandler}>
        Lets go {isAuth ? "Home" : "Login"} page
      </Button>
    </div>
  );
};

export default Error;
