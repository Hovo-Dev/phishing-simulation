import { FC } from "react";

import styles from "./PhishingEmailCard.module.scss";

export type TPhishingEmailCardProps = {
  id: string;
  email: string;
  status: string;
  content: string;
};

const PhishingEmailCard: FC<TPhishingEmailCardProps> = ({
  id,
  email,
  status,
  content,
}) => (
  <div className={styles.email_card}>
    <div className={styles.email_card__header}>
      <span className={styles.email_card__id}>ID: {id}</span>

      <p className={styles.email_card__header_status}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
    </div>

    <p className={styles.email_card__email}>Email: {email}</p>

    <div
      className={styles.email_card__content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
);

export default PhishingEmailCard;
