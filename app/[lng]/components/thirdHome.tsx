"use client";

import ContentAdminAdd from "@/app/admin/components/contentAdminAdd";
import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import ContentAdminRemove from "@/app/admin/components/contentAdminRemove";
import { useTranslation } from "@/app/i18n/client";
import { SCROLL_OFFSET, scrollEnum } from "@/types/constansts";
import { IHomePageProps } from "@/types/user";
import Image from "next/image";
import { EffectCards, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/ThirdHome.module.scss";


const ThirdHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = useTranslation(lng);

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
    <div id={scrollEnum.aboutUs} className={`${styles.wrapper} container`}>
      <div className={styles.title__wrapper}>
        <h2 className={styles.title}>{t("HomePage.ThirdHome.title")}</h2>
      </div>
      <div className={`${styles.content} main__swiper__wrapper`}>
        <div className={styles.image__wrapper}>
          <Image
            className={styles.image}
            src={section?.blocks?.[0].files[0]?.url}
            alt={section?.blocks?.[0].files[0]?.alts[0]?.text}
            width={475}
            height={445}
            priority
          />
        </div>
        <div className={`${styles.carousel} main__swiper__wrapper`}>
          <Swiper
            loop={true}
            cardsEffect={{
              rotate: false,
              slideShadows: false,
              perSlideOffset: 12,
            }}
            pagination={{
              type: "bullets",
            }}
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation, Pagination]}
            className={`cards`}
          >
            {section?.blocks.slice(1).map((block, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`${styles.card} ${
                    styles[`card_${(index % 5) + 1}`]
                  }`}
                >
                  <div className={styles.texts}>
                    <div>
                      <p>{block?.texts[0]?.text}</p>
                    </div>
                    <span>{block?.texts[1]?.text}</span>
                  </div>
                  <div className={"next_button"} />
                </div>
                {isAdmin && pageId && (
                  <div className="admin__change">
                    <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
                    {section.blocks?.length > 2 ? (
                      <ContentAdminRemove blockId={block.id} pageId={pageId} />
                    ) : (
                      <span>Последний блок удалять нельзя</span>
                    )}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {isAdmin && pageId && (
        <div className="admin__change">
          <ContentAdminEdit
            block={section?.blocks[0]}
            pageId={pageId}
            lng={lng}
          />
          <ContentAdminAdd
            sectionId={section.id}
            block={section.blocks[1]}
            pageId={pageId}
          />
        </div>
      )}
      <div className={styles.button}>
        <button onClick={() => scrollToSection(scrollEnum.form)}>
          {t("HomePage.ThirdHome.orderButton")}
        </button>
      </div>
    </div>
  );
};

export default ThirdHome;
