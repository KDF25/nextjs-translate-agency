"use client";

import { YOUTUBE_URL } from "@/config";
import ReactPlayer from "react-player";
import styles from "../styles/FourthHome.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/scrollbar';


const FourthHome: React.FC = ({}) => {
  
  return (
    <section className={`${styles.wrapper} container`}>
      <Swiper
        slidesPerView={2}
        loop={true}
        navigation={true}
        modules={[Navigation, Scrollbar, Pagination]}
        speed={500}
        centeredSlides={true}
        className={`${styles.swipper__wrapper} youtube`}
        spaceBetween={-250}
        scrollbar={{
          hide: true,
        }}
        pagination={{
          type: 'fraction',
        }}
      >
        {YOUTUBE_URL.map((url, index) => (
          <SwiperSlide key={index}>
            <ReactPlayer
              light
              url={url}
              width="675px"
              height="575px"
              playing
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FourthHome;
