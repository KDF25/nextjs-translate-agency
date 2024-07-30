"use client";

import ContentAdminAdd from "@/app/admin/components/contentAdminAdd";
import ContentAdminEdit from "@/app/admin/components/contentAdminEdit";
import ContentAdminRemove from "@/app/admin/components/contentAdminRemove";
import { IHomePageProps } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Swiper as SwiperType,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/FourthHome.module.scss";

const FourthHome: React.FC<IHomePageProps> = ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const [isClient, setIsClient] = useState(false);
  const playersRef = useRef<(ReactPlayer | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    playersRef.current.forEach((player, index) => {
      if (index !== swiper.activeIndex && player) {
        const internalPlayer = player.getInternalPlayer();
        if (internalPlayer && typeof internalPlayer.pauseVideo === "function") {
          internalPlayer.pauseVideo();
        }
      }
    });
  };

  if (!isClient) {
    return (
      <div className={`${styles.wrapper} container`}>
        <div className={styles.skeleton}>
          <div className={styles.player__wrapper}>
            <div className={`${styles.player} ${styles.empty}`}>
              <div className={` ${styles.loader}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} container`}>
      <div className="main__swiper__wrapper">
        <Swiper
          slidesPerView={2}
          loop={true}
          navigation={true}
          modules={[Navigation, Scrollbar, Pagination]}
          speed={500}
          centeredSlides={true}
          className={`youtube`}
          onSlideChange={handleSlideChange}
          scrollbar={{
            hide: true,
          }}
          breakpoints={{
            1344: {
              spaceBetween: -250,
            },
            1200: {
              spaceBetween: -100,
            },
            992: {
              spaceBetween: -150,
            },
            768: {
              spaceBetween: -150,
            },
          }}
          pagination={{
            type: "fraction",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {section?.blocks?.map((block, index) => (
            <SwiperSlide key={index}>
              <div className={styles.player__wrapper}>
                <ReactPlayer
                  className={styles.player}
                  light
                  url={block?.texts[0].text}
                  playing
                  controls
                  ref={(ref) => {
                    playersRef.current[index] = ref;
                  }}
                  style={{ pointerEvents: "auto" }}
                />
                {isAdmin && pageId && (
                  <div className={`admin__change ${styles.admin}`}>
                    <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
                    <ContentAdminRemove blockId={block.id} pageId={pageId} />
                    <ContentAdminAdd
                      sectionId={section.id}
                      block={section.blocks[1]}
                      pageId={pageId}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FourthHome;
