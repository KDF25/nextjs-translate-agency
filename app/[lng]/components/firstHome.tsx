import ContentAdminEdit from "@/app/adminvenkon/components/contentAdminEdit";
import { IHomePageProps } from "@/types/user";
import Image from "next/image";
import styles from "../styles/FirstHome.module.scss";
import { useTranslation } from "@/app/i18n";

const FirstHome: React.FC<IHomePageProps> = async ({
  section,
  isAdmin,
  pageId,
  lng,
}) => {
  const { t } = await useTranslation(lng);
  return (
    <>
      {section?.blocks?.map((block) => (
        <section key={block.id}>
          <div className={`${styles.wrapper} container`}>
            <div className={styles.left}>
              <div className={styles.texts}>
                <h1 className={styles.title}>{block?.texts[0]?.text}</h1>
                <h2 className={styles.text}>{block?.texts[1]?.text}</h2>
              </div>
              <div className={styles.buttons}>
                <button className={styles.order}>
                  {t("HomePage.FirstHome.orderButton")}
                </button>
                <button className={styles.contact}>
                  {t("HomePage.FirstHome.contactButton")}
                </button>
              </div>
            </div>
            <div className={styles.image__wrapper}>
              <Image
                className={styles.image}
                src={block?.files[0]?.url}
                alt={block?.files[0]?.alts[0]?.text}
                width={475}
                height={445}
                priority
              />
            </div>
          </div>
          {isAdmin && pageId && (
            <ContentAdminEdit
              key={block.id}
              block={block}
              pageId={pageId}
              lng={lng}
            />
          )}
        </section>
      ))}
    </>
  );
};

export default FirstHome;
