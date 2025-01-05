import { type FC } from "react";

import { RoutesWrapper } from "libraries/router";

import styles from "./PageLayout.module.scss";

const PageLayout: FC = () => (
  <main className={styles.wrapper}>
    <RoutesWrapper />
  </main>
);

export default PageLayout;
