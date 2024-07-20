"use client";

import ContentAdminAdd from "@/app/adminvenkon/components/contentAdminAdd";
import { useTranslation } from "@/app/i18n/client";
import { IBlock, IHomePageProps } from "@/types/user";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FirstIcon } from "../icons/Group 56";
import styles from "../styles/SecondHome.module.scss";
import { scrollEnum } from "@/types/constansts";

const SecondHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const [activeBlock, setActiveBlock] = useState(section.blocks[0]);

  const handleChangeActiveBlock = (block: IBlock) => {
    setActiveBlock(block);
  };

  const { t } = useTranslation(lng);
  return (
    <section id={scrollEnum.services} className={`${styles.wrapper} container`}>
      <h2 className={styles.title}>{t("HomePage.SecondHome.title")}</h2>
      <div className={styles.information}>
        <div className={styles.tab__wrapper}>
          {section?.blocks.map((block, index) => (
            <div
              key={index}
              className={`${styles.tab} ${
                block === activeBlock ? styles.active : ""
              }`}
              onClick={() => handleChangeActiveBlock(block)}
            >
              <div className={styles.tab__content}>
                <FirstIcon/>
                {/* <div className={styles.icon}></div> */}
                <p>{block.texts[0].text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.content__wrapper}>
          <div className={styles.left}>
            <div className={styles.texts}>
              <p>{activeBlock.texts[0].text}</p>
              <span>{activeBlock.texts[1].text}</span>
            </div>
            <div>
              <button className={styles.order}>
                {t("HomePage.SecondHome.orderButton")}
              </button>
            </div>
          </div>
          <div className={styles.right}>
            {/* <img
              src={activeBlock.files[0].url}
              alt={activeBlock.files[0].alts[0].text}
            /> */}
          </div>
        </div>
        {/* {isAdmin && pageId && (
          <div>
            <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
            <ContentAdminRemove blockId={block.id} pageId={pageId} />
          </div>
        )} */}
      </div>
      {isAdmin && pageId && (
        <ContentAdminAdd
          block={section?.blocks[0]}
          sectionId={section?.id}
          pageId={pageId}
        />
      )}
    </section>
  );
};
export default SecondHome;
