"use client";

import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import { useTranslation } from "@/app/i18n/client";
import { scrollEnum } from "@/types/constansts";
import { IHomePageProps } from "@/types/user";
import Image from "next/image";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/SeventhHome.module.scss";

const SeventhHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = useTranslation(lng);
  const firstBlock = section?.blocks[0];

  return (
    <div id={scrollEnum.clients} className={`${styles.wrapper} container`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{t("HomePage.SeventhHome.title")}</h2>
        <div className={styles.image__wrapper}>
          <Image
            src={firstBlock?.files[0]?.url}
            alt={firstBlock?.files[0]?.alts[0]?.text}
            width={525}
            height={480}
            priority
          />
        </div>
        {isAdmin && pageId && (
          <>
            <div></div>
            <div className="admin__change">
              <ContentAdminEdit block={firstBlock} pageId={pageId} lng={lng} />
            </div>
          </>
        )}
      </div>
      <div className={styles.bottom}>
        {section?.blocks.slice(1).map((block, index) => (
          <div className={styles.partner} key={index}>
            <Image
              className={styles.image}
              src={block?.files[0]?.url}
              alt={block?.files[0]?.alts[0]?.text}
              width={300}
              height={150}
              priority
            />
            {isAdmin && pageId && (
              <div>
                <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`${styles.carousel} main__swiper__wrapper`}>
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          speed={500}
          centeredSlides={true}
          className={`parthers`}
          spaceBetween={100}
          pagination={{
            type: "bullets",
          }}
        >
          {section?.blocks?.slice(1).map((block, index) => (
            <SwiperSlide key={index} className={styles.partner}>
              <Image
                className={styles.image}
                src={block?.files[0]?.url}
                alt={block?.files[0]?.alts[0]?.text}
                width={300}
                height={150}
                priority
              />
              {isAdmin && pageId && (
                <div>
                  <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SeventhHome;
