import type { FC } from "react";
import { Helmet } from "react-helmet";

import type { HelmetProps } from "./types";
import styles from "./HelmetLayout.module.scss";

const HelmetLayout: FC<HelmetProps> = ({ children, title }) => (
  <div className={styles.wrapper}>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {children}
  </div>
);

export default HelmetLayout;
