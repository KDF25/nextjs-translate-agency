"use client";

import { useTranslation } from "@/app/i18n/client";
import { ILangPageProps } from "@/types/user";
import styles from "../styles/Footer.module.scss";
import { scrollEnum } from "@/types/constansts";

const TheNavigation: React.FC<ILangPageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);

  const scrollToSection = (sectionId: scrollEnum) => {
    const section = document.getElementById(sectionId);
    section!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.navigation}>
      <div
        className={styles.tab}
        onClick={() => scrollToSection(scrollEnum.services)}
      >
        <p>{t("Header.nav.services")}</p>
      </div>
      <div
        className={styles.tab}
        onClick={() => scrollToSection(scrollEnum.aboutUs)}
      >
        <p>{t("Header.nav.about_us")}</p>
      </div>
      <div
        className={styles.tab}
        onClick={() => scrollToSection(scrollEnum.contacts)}
      >
        <p>{t("Header.nav.contacts")}</p>
      </div>
      <div
        className={styles.tab}
        onClick={() => scrollToSection(scrollEnum.clients)}
      >
        <p>{t("Header.nav.clients")}</p>
      </div>
    </nav>
  );
};
export default TheNavigation;
