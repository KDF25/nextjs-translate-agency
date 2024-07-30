"use client";

import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import { useTranslation } from "@/app/i18n/client";
import { SCROLL_OFFSET, scrollEnum } from "@/types/constansts";
import { IHomePageProps } from "@/types/user";
import Image from "next/image";
import styles from "../styles/FirstHome.module.scss";

const FirstHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = useTranslation(lng);
  const block = section?.blocks[0]
  const scrollToSection = (sectionId: scrollEnum) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = SCROLL_OFFSET;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${styles.wrapper} container`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.texts}>
            <h1 className={styles.title}>{block?.texts[0]?.text}</h1>
            <h2 className={styles.text}>{block?.texts[1]?.text}</h2>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.order}
              onClick={() => scrollToSection(scrollEnum.form)}
            >
              {t("HomePage.FirstHome.orderButton")}
            </button>
            <button
              className={styles.contact}
              onClick={() => scrollToSection(scrollEnum.form)}
            >
              {t("HomePage.FirstHome.contactButton")}
            </button>
          </div>
        </div>
        <div className={styles.image__wrapper}>
          <Image
            className={styles.image}
            src={block?.files[0]?.url}
            alt={block?.files[0]?.alts[0]?.text}
            width={2000}
            height={2000}
            priority
          />
        </div>
      </div>
      {isAdmin && pageId && (
        <ContentAdminEdit
          key={block.id}
          block={block}
          pageId={pageId}
          lng={lng}
        />
      )}
    </div>
  );
};

export default FirstHome;
