"use client";

import FifthHome from "@/app/[lng]/components/fifthHome";
import FirstHome from "@/app/[lng]/components/firstHome";
import FourthHome from "@/app/[lng]/components/fourthHome";
import SecondHome from "@/app/[lng]/components/secondHome";
import SeventhHome from "@/app/[lng]/components/seventhHome";
import SixthHome from "@/app/[lng]/components/sixthHome";
import ThirdHome from "@/app/[lng]/components/thirdHome";
import { languageEnum, languages } from "@/app/i18n/settings";
import { getData } from "@/services/getData";
import { IUserData } from "@/types/user";
import { useContext, useEffect, useState } from "react";
import SeoAdmin from "../components/seoAdmin";
import { AuthContext } from "../context";

export default function HomeAdmin() {
  const { isAuth } = useContext(AuthContext);
  const [data, setData] = useState<{ [x: string]: IUserData }[]>([]);
  const pageId = 2;
  const Sections = [
    FirstHome,
    SecondHome,
    ThirdHome,
    FourthHome,
    FifthHome,
    SixthHome,
    SeventhHome,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const promises = languages.map((lang) =>
        getData(pageId, lang).then((data) => ({ [lang]: data }))
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
            <h1>Loading...</h1>
          ) : (
            <div>
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                SEO | Home page
              </div>
              {languages.map((lang, index) => (
                <SeoAdmin
                  key={index}
                  seo={data[index]?.[lang]}
                  lng={languageEnum[lang]}
                  pageId={pageId}
                />
              ))}
              <div>
                <div
                  style={{
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Content | Home page
                </div>
                {Sections.map((SectionComponent, secIndex) => (
                  <div key={secIndex}>
                    {languages.map((lang, index) => (
                      <SectionComponent
                        key={index}
                        lng={languageEnum[lang]}
                        pageId={pageId}
                        section={data[index]?.[lang]?.sections[secIndex]}
                        isAdmin={isAuth}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Вы не админ...</div>
      )}
    </>
  );
}
