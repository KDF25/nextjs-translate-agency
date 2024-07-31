"use client";

import { useTranslation } from "@/app/i18n/client";
import { ADDRESS, CONTACT_FIRST, CONTACT_SECOND, EMAIL } from "@/config";
import { MAIN_PAGE_ANIMATION } from "@/types/animation";
import { scrollEnum } from "@/types/constansts";
import { ILangPageProps } from "@/types/user";
import { Loader } from "@googlemaps/js-api-loader";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { BsEnvelopeFill, BsPinMapFill, BsTelephoneFill } from "react-icons/bs";
import styles from "../styles/SixthHome.module.scss";

const SixthHome: React.FC<ILangPageProps> = ({ lng }) => {
  const { t } = useTranslation(lng);

  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const mapOptions: google.maps.MapOptions = {
        center: ADDRESS,
        zoom: 17,
        mapId: "MY_NEXTJS_MAPID",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new Marker({
        map: map,
        position: ADDRESS,
      });
    };
    initMap();
  }, []);
  let custom = 0;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      variants={MAIN_PAGE_ANIMATION.animationVision}
      id={scrollEnum.contacts}
      className={`${styles.wrapper} container`}
    >
      <motion.h2
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t("HomePage.SixthHome.title")}
      </motion.h2>
      <div className={styles.content}>
        <div className={styles.left} ref={mapRef}></div>
        <div className={styles.right}>
          <motion.div
            custom={(custom += 3)}
            variants={MAIN_PAGE_ANIMATION.animationRight}
            className={styles.contact}
          >
            <div className={styles.icon}>
              <BsTelephoneFill />
            </div>
            <div className={styles.number}>
              <p>{CONTACT_FIRST}</p>
              <p>{CONTACT_SECOND}</p>
            </div>
          </motion.div>
          <motion.div
            custom={custom++}
            variants={MAIN_PAGE_ANIMATION.animationRight}
            className={styles.contact}
          >
            <div className={styles.icon}>
              <BsEnvelopeFill />
            </div>
            <p>{EMAIL}</p>
          </motion.div>
          <motion.div
            custom={custom++}
            variants={MAIN_PAGE_ANIMATION.animationRight}
            className={styles.contact}
          >
            <div className={styles.icon}>
              <BsPinMapFill />
            </div>
            <p
              className={styles.address}
              dangerouslySetInnerHTML={{
                __html: t("HomePage.SixthHome.address"),
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default SixthHome;
