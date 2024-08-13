"use client";

import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import { useTranslation } from "@/app/i18n/client";
import { MAIN_PAGE_ANIMATION } from "@/types/animation";
import { scrollEnum } from "@/types/constansts";
import { IHomePageProps } from "@/types/user";
import { motion } from "framer-motion";
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
  let custom = 0;
  let custom2 = 0;
  return (
    <div id={scrollEnum.clients} className={`${styles.wrapper} container`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={MAIN_PAGE_ANIMATION.viewport}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        className={styles.top}
      >
        <motion.h2
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationVision}
          className={styles.title}
        >
          {t("HomePage.SeventhHome.title")}
        </motion.h2>
        <motion.div
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationRight}
          className={styles.image__wrapper}
        >
          <Image
            src={firstBlock?.files[0]?.url}
            alt={firstBlock?.files[0]?.alts[0]?.text || "image"}
            width={525}
            height={480}
            priority
          />
        </motion.div>
        {isAdmin && pageId && (
          <>
            <div></div>
            <div className="admin__change">
              <ContentAdminEdit block={firstBlock} pageId={pageId} lng={lng} />
            </div>
          </>
        )}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={MAIN_PAGE_ANIMATION.viewport}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        className={styles.bottom}
      >
        {section?.blocks.slice(1).map((block, index) => (
          <motion.div
            custom={custom2++}
            variants={MAIN_PAGE_ANIMATION.animationUp}
            className={styles.partner}
            key={index}
          >
            <Image
              className={styles.image}
              src={block?.files[0]?.url}
              alt={block?.files[0]?.alts[0]?.text || "image"}
              width={300}
              height={150}
              priority
            />
            {isAdmin && pageId && (
              <div>
                <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={`${styles.carousel} main__swiper__wrapper`}
      >
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
                alt={block?.files[0]?.alts[0]?.text || "image"}
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
      </motion.div>
    </div>
  );
};

export default SeventhHome;
