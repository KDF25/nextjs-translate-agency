import { useTranslation } from "@/app/i18n";
import { ILangPageProps } from "@/types/user";
import styles from "../styles/Footer.module.scss";
import { BsPinMapFill, BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import {
  CONTACT_FIRST,
  CONTACT_SECOND,
  EMAIL,
  FACEBOOK_REF,
  INSTAGRAM_REF,
  TELEGRAM_REF,
  WHATSUP_REF,
} from "@/config";
import {
  InstagramIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsUpIcon,
} from "../icons";

const TheContacts: React.FC<ILangPageProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

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
      <div className={styles.column}>
        <BsTelephoneFill />
        <div className={styles.number}>
          <p>{CONTACT_FIRST}</p>
          <p>{CONTACT_SECOND}</p>
        </div>
      </div>
      <div className={styles.column}>
        <BsEnvelopeFill />
        <p className={styles.email}>{EMAIL}</p>
      </div>
      <div className={styles.social_media}>
        <a href={INSTAGRAM_REF} target="_blank" className={styles.icon}></a>
        <a href={TELEGRAM_REF} target="_blank" className={styles.icon}></a>
        <a href={FACEBOOK_REF} target="_blank" className={styles.icon}></a>
        <a href={WHATSUP_REF} target="_blank" className={styles.icon}></a>
      </div>
    </nav>
  );
};
export default TheContacts;
