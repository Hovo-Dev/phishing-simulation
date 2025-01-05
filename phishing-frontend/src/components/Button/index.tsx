import type { FC } from "react";

import styles from "./Button.module.scss";
import classNames from "classnames";

export type TButtonProps = {
  children?: any;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
};

const Button: FC<TButtonProps> = ({
  children,
  type,
  onClick,
  className,
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames(styles.wrapper, className)}
  >
    {children}
  </button>
);

export default Button;
