"use client";

import FirstHome from "@/app/[lng]/components/firstHome";
import FourthHome from "@/app/[lng]/components/fourthHome";
import SecondHome from "@/app/[lng]/components/secondHome";
import SeventhHome from "@/app/[lng]/components/seventhHome";
import ThirdHome from "@/app/[lng]/components/thirdHome";
import { languageEnum, languages } from "@/app/i18n/settings";
import { PAGE_ID } from "@/config";
import { getData } from "@/services/getData";
import { IUserData } from "@/types/user";
import { useContext, useEffect, useState } from "react";
import "../../styles/global.scss";
import SeoAdmin from "../components/seoAdmin";
import { AuthContext } from "../context";
import styles from "../styles/AuthAdmin.module.scss";

export default function HomeAdmin() {
  const { isAuth } = useContext(AuthContext);

  const [data, setData] = useState<{ language: string; userData: IUserData }[]>(
    []
  );
  const pageId = PAGE_ID;
  const Sections = [FirstHome, SecondHome, ThirdHome, FourthHome];

  useEffect(() => {
    const fetchData = async () => {
      const promises = languages.map((lang) =>
        getData(PAGE_ID, lang).then((data) => ({
          language: lang,
          userData: data,
        }))
      );
      const results = await Promise.all(promises);
      setData(results);
    };
    fetchData();
  }, []);

  return (
    <>
      {isAuth ? (
        <div>
          {data.length === 0 ? (
            <h1 className={styles.loading}>Loading...</h1>
          ) : (
            <div>
              <div className="container">
                <div className={`${styles.all__block} `}>
                  <div className={styles.admin__title}>
                    <p>SEO | Home page</p>
                  </div>
                  <div className={styles.admin__wrapper}>
                    {languages.map((lang, index) => (
                      <SeoAdmin
                        key={index}
                        seo={
                          data.find((item) => item.language === lang)?.userData!
                        }
                        lng={languageEnum[lang]}
                        seoId={
                          data.find((item) => item.language === lang)?.userData
                            ?.seo_id!
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.all__block}>
                <div className={styles.admin__title}>
                  <p>Content | Home page</p>
                </div>

                {Sections.map((SectionComponent, secIndex) => (
                  <div key={secIndex} className={styles.all__block}>
                    {languages.map((lang, index) => (
                      <SectionComponent
                        key={index}
                        lng={languageEnum[lang]}
                        pageId={pageId}
                        section={
                          data.find(
                            (item) => item.language === languageEnum[lang]
                          )?.userData?.sections[secIndex]!
                        }
                        isAdmin={isAuth}
                      />
                    ))}
                  </div>
                ))}
                <SeventhHome
                  lng={languageEnum.ru}
                  pageId={pageId}
                  section={
                    data.find((item) => item.language === languageEnum.ru)
                      ?.userData?.sections[4]!
                  }
                  isAdmin={isAuth}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className={styles.loading}>Вы не админ...</h1>
      )}
    </>
  );
}
