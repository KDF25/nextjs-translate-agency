"use client";

import { useTranslation } from "@/app/i18n/client";
import { languageEnum } from "@/app/i18n/settings";
import { SCROLL_OFFSET, scrollEnum } from "@/types/constansts";
import styles from "./../../styles/Header.module.scss";

interface BurgerNavigationProps {
  lng: languageEnum;
  onChange: () => void;
}

const BurgerNavigation: React.FC<BurgerNavigationProps> = ({
  lng,
  onChange,
}) => {
  const { t } = useTranslation(lng);

  const scrollToSection = (sectionId: scrollEnum) => {
    onChange();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = SCROLL_OFFSET;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={styles.burger__navigation}>
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
export default BurgerNavigation;
