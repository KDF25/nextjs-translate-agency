"use client";

import { useTranslation } from "@/app/i18n";
import { IHomePageProps } from "@/types/user";
import Image from "next/image";
import { EffectCards, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/ThirdHome.module.scss";
import { scrollEnum } from "@/types/constansts";

const ThirdHome: React.FC<IHomePageProps> = async ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = await useTranslation(lng);

  return (
    <section id={scrollEnum.aboutUs} className={`${styles.wrapper} container`}>
      <h2 className={styles.title}>{t("HomePage.ThirdHome.title")}</h2>
      <div className={styles.content}>
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
        <div className={styles.carousel}>
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
            className={`${styles.swipper__wrapper} cards`}
          >
            {section?.blocks.map((block, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`${styles.card} ${styles[`card_${index + 1}`]}`}
                >
                  <div className={styles.texts}>
                    <div>
                      <p>{block.texts[0].text}</p>
                    </div>
                    <span>{block.texts[1].text}</span>
                  </div>
                  <div className={"next_button"} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.button}>
        <button>{t("HomePage.ThirdHome.orderButton")}</button>
      </div>
    </section>
  );
};

export default ThirdHome;
