import { IHomePageProps } from "@/types/user";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/SeventhHome.module.scss";
import { useTranslation } from "@/app/i18n";
import Image from "next/image";
import { scrollEnum } from "@/types/constansts";

const SeventhHome: React.FC<IHomePageProps> = async ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = await useTranslation(lng);
  return (
    <section id={scrollEnum.clients} className={`${styles.wrapper} container`}>
      <div className={styles.top}>
        <h2 className={styles.title}>{t("HomePage.SeventhHome.title")}</h2>
        <div className={styles.image}></div>
      </div>
      <div className={styles.bottom}>
        {section?.blocks.map((block, index) => (
          <div className={styles.partners} key={index}>
            <Image
              className={styles.image}
              src={block?.files[0]?.url}
              alt={block?.files[0]?.alts[0]?.text}
              width={300}
              height={150}
              priority
            />
          </div>
        ))}
      </div>

      {/* {isAdmin && pageId && (
              <div>
                <ContentAdminEdit block={block} pageId={pageId} lng={lng} />
                <ContentAdminRemove blockId={block.id} pageId={pageId} />
              </div>
            )}
      {isAdmin && pageId && (
        <ContentAdminAdd
          block={section?.blocks[0]}
          sectionId={section?.id}
          pageId={pageId}
        />
      )} */}
    </section>
  );
};

export default SeventhHome;
