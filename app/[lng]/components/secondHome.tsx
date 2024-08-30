"use client";

import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import { useTranslation } from "@/app/i18n/client";
import { MAIN_PAGE_ANIMATION } from "@/types/animation";
import { SCROLL_OFFSET, scrollEnum } from "@/types/constansts";
import { IBlock, IHomePageProps } from "@/types/user";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  OptionFirstIcon,
  OptionFourthIcon,
  OptionSecondIcon,
  OptionThirdIcon,
} from "../icons";
import styles from "../styles/SecondHome.module.scss";

const SecondHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const [activeBlock, setActiveBlock] = useState<IBlock | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleChangeActiveBlock = (block: IBlock) => {
    if (block !== activeBlock) {
      setIsVisible(false);
      setActiveBlock(block);
    }
  };

  useEffect(() => {
    setActiveBlock(section?.blocks[0]);
  }, [section]);

  useEffect(() => {
    setIsVisible(true);
  }, [activeBlock]);

  const { t } = useTranslation(lng);
  const icons = [
    <OptionFirstIcon key="first" />,
    <OptionSecondIcon key="second" />,
    <OptionThirdIcon key="third" />,
    <OptionFourthIcon key="fourth" />,
  ];

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
  let custom = 0;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      variants={MAIN_PAGE_ANIMATION.animationVision}
      id={scrollEnum.services}
      className={`${styles.wrapper} container`}
    >
      <motion.h2
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        className={styles.title}
      >
        {t("HomePage.SecondHome.title")}
      </motion.h2>
      <div className={styles.information}>
        <div className={styles.tab__wrapper}>
          {section?.blocks.map((block, index) => (
            <motion.div
              custom={custom++}
              variants={MAIN_PAGE_ANIMATION.animationUp}
              key={index}
              className={`${styles.tab} ${
                block === activeBlock ? styles.active : ""
              }`}
              onClick={() => handleChangeActiveBlock(block)}
            >
              <div className={styles.tab__top}>
                <div
                  className={`${styles.icon} ${styles[`icon_${index + 1}`]}`}
                >
                  {icons[index]}
                </div>
                <p>{block?.texts[0]?.text}</p>
              </div>
              <span>{block?.texts[1]?.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationUp}
          // className={styles.content__wrapper}
          className={`${styles.content__wrapper} ${
            isVisible ? styles.no_hidden : styles.hidden
          }`}
        >
          <div className={styles.left}>
            <div className={styles.texts}>
              <p>{activeBlock?.texts[0]?.text}</p>
              <span>{activeBlock?.texts[1]?.text}</span>
            </div>
            <div className={styles.order__wrapper}>
              <button
                className={styles.order}
                onClick={() => scrollToSection(scrollEnum.form)}
              >
                {t("HomePage.SecondHome.orderButton")}
              </button>
            </div>
          </div>
          <div className={styles.right}>
            {activeBlock && (
              <img
                className={styles.image}
                src={activeBlock?.files[0]?.url}
                alt={activeBlock?.files[0]?.alts[0]?.text || "image"}
                // width={485}
                // height={425}
                // priority
              />
            )}
          </div>
        </motion.div>
        <div className={`${styles.order__wrapper} ${styles.mobile}`}>
          <button
            className={styles.order}
            onClick={() => scrollToSection(scrollEnum.form)}
          >
            {t("HomePage.SecondHome.orderButton")}
          </button>
        </div>
      </div>
      {isAdmin && pageId && (
        <div>
          <ContentAdminEdit block={activeBlock!} pageId={pageId} lng={lng} />
        </div>
      )}
    </motion.div>
  );
};
export default SecondHome;
