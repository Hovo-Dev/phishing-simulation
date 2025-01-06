import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginScheme } from "utils";
import { Button, Input } from "components";
import { signIn } from "store/auth/actions";
import {useAppDispatch, useAppSelector} from "libraries/redux";
import { ERoutePaths } from "libraries/router/types";

import styles from "./LogIn.module.scss";
import {AuthSelectors} from "../../store/auth/selectors";

export type TLogInProps = {
  email: string;
  password: string;
};

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {errors: responseErrors} = useAppSelector(AuthSelectors.authSignIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TLogInProps>({
    mode: "onChange",
    resolver: yupResolver(loginScheme),
  });

  const onSubmit = useCallback(
    (data: TLogInProps) => {
      dispatch(signIn({ email: data.email, password: data.password }));
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Log In</h1>

      <form className={styles.wrapper__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          register={register}
          label="Email"
          placeholder="Enter email address"
          className={styles.wrapper__input__inp}
          error={errors?.email?.message as string}
        />

        <Input
          name="password"
          register={register}
          label="Password"
          type="password"
          className={styles.wrapper__input__inp}
          placeholder="Enter password"
          error={errors?.password?.message as string}
        />

        {responseErrors && (responseErrors?.map((error) => <p className={styles.wrapper__form__err}>{error.message}</p>))}

        <Button
          type="submit"
          disabled={!isValid && isDirty}
          className={styles.wrapper__form__btn}
        >
          Sign In
        </Button>
      </form>

      <Button
        className={styles.wrapper__register}
        onClick={() => navigate(ERoutePaths.Register)}
      >
        Registration
      </Button>
    </div>
  );
};

export default LogIn;
