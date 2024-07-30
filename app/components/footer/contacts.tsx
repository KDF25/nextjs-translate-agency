"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  CONTACT_FIRST,
  CONTACT_SECOND,
  EMAIL,
  INSTAGRAM_REF,
  TELEGRAM_REF,
} from "@/config";
import { ILangPageProps } from "@/types/user";
import { BsEnvelopeFill, BsPinMapFill, BsTelephoneFill } from "react-icons/bs";
import { InstagramIcon, TelegramIcon } from "../icons";
import styles from "../styles/Footer.module.scss";

const TheContacts: React.FC<ILangPageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);

  return (
    <nav className={styles.contacts}>
      <div className={styles.column}>
        <BsPinMapFill />
        <p
          className={styles.address}
          dangerouslySetInnerHTML={{
            __html: t("Footer.contacts.address"),
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.column}>
          <BsEnvelopeFill />
          <p className={styles.email}>{EMAIL}</p>
        </div>
        <div className={styles.column}>
          <BsTelephoneFill />
          <div className={styles.number}>
            <p>{CONTACT_FIRST}</p>
            <p>{CONTACT_SECOND}</p>
          </div>
        </div>
      </div>
      <div className={styles.social_media}>
        <a href={INSTAGRAM_REF} target="_blank" className={styles.icon}>
          <InstagramIcon />
        </a>
        <a href={TELEGRAM_REF} target="_blank" className={styles.icon}>
          <TelegramIcon />
        </a>
      </div>
    </nav>
  );
};
export default TheContacts;
