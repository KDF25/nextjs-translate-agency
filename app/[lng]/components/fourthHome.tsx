"use client";

import ContentAdminAdd from "@/app/adminvenkon/components/contentAdminAdd";
import ContentAdminEdit from "@/app/adminvenkon/components/contentAdminEdit";
import ContentAdminRemove from "@/app/adminvenkon/components/contentAdminRemove";
import { IHomePageProps } from "@/types/user";
import ReactPlayer from "react-player";
import { Navigation, Pagination, Scrollbar } from "swiper";
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
  return (
    <div className={`${styles.wrapper} container`}>
      <Swiper
        slidesPerView={2}
        loop={true}
        navigation={true}
        modules={[Navigation, Scrollbar, Pagination]}
        speed={500}
        centeredSlides={true}
        className={`youtube`}
        breakpoints={{
          1344: {
            spaceBetween: -250,
          },
          992: {
            spaceBetween: -250,
          },
          768: {
            spaceBetween: -150,
          },
          // 576: {
          //   spaceBetween: 150,
          // },
          // 375: {
          //   spaceBetween: 50,
          // },
        }}
        scrollbar={{
          hide: true,
        }}
        pagination={{
          type: "fraction",
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
  );
};

export default FourthHome;
