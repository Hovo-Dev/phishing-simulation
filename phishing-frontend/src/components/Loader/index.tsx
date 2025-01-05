import { FC } from "react";
import classNames from "classnames";

import { TLoader } from "./types";

import styles from "./Loader.module.scss";

const emptyArray = new Array(4).fill("");

const Loader: FC<TLoader> = ({
  className = "",
  color = "#fff",
  size = "20px",
}) => {
  const renderEmptyBlocks = emptyArray.map((_, idx) => (
    <div
      key={idx}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
  ));

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ width: size, height: size }}
    >
      {renderEmptyBlocks}
    </div>
  );
};

export default Loader;
