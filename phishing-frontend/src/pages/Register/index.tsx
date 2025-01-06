import {useCallback, type FC, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerScheme } from "utils";
import { Button, Input } from "components";
import { signUp } from "store/auth/actions";
import {useAppDispatch, useAppSelector} from "libraries/redux";
import { ERoutePaths } from "libraries/router/types";

import styles from "./Register.module.scss";
import {AuthSelectors} from "../../store/auth/selectors";

export type TRegisterProps = {
  email: string;
  password: string;
  fullName: string;
};

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {errors: responseErrors} = useAppSelector(AuthSelectors.authSignUp);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TRegisterProps>({
    mode: "onChange",
    resolver: yupResolver(registerScheme),
  });

  const onSubmit = async  (data: TRegisterProps) => {
      dispatch(
            signUp({
                email: data.email,
                password: data.password,
                full_name: data.fullName,
            }))
            .unwrap()
            .then(() => {
                  navigate(ERoutePaths.LogIn);
            })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Register</h1>

      <form className={styles.wrapper__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="fullName"
          label="Name"
          register={register}
          placeholder="Full Name"
          className={styles.wrapper__input__inp}
          error={errors?.fullName?.message as string}
        />

        <Input
          name="email"
          label="Email"
          register={register}
          placeholder="Email"
          className={styles.wrapper__input__inp}
          error={errors?.email?.message as string}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          register={register}
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
          Sign Up
        </Button>
      </form>

      <Button
        className={styles.wrapper__register}
        onClick={() => navigate(ERoutePaths.LogIn)}
      >
        Login
      </Button>
    </div>
  );
};

export default Register;
