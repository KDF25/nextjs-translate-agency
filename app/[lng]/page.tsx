import { getData } from "@/services/getData";
import FirstHome from "./components/firstHome";
import SecondHome from "./components/secondHome";
import ThirdHome from "./components/thirdHome";
import FourthHome from "./components/fourthHome";
import FifthHome from "./components/fifthHome";
import SixthHome from "./components/sixthHome";
import SeventhHome from "./components/seventhHome";
import { ILangPageProps } from "@/types/user";
import { DATA } from "@/config/mockData";

export async function generateMetadata({
  params: { lng },
}: {
  params: ILangPageProps;
}) {
  // const pageId = 1;
  // const response = await getData(pageId, lng);
  // return {
  //   title: response?.seo_title,
  //   description: response?.seo_description,
  //   keywords: response?.seo_keywords,
  // };
}

export default async function Home({
  params: { lng },
}: {
  params: ILangPageProps;
}) {
  const pageId = 2;
  // const response = await getData(pageId, lng);
  const response = DATA;
  const Sections = [
    FirstHome,
    SecondHome,
    ThirdHome,
    // FourthHome,
    // FifthHome,
    // SixthHome,
    // SeventhHome,
  ];

  return (
    <>
      <FirstHome section={response?.sections[0]} lng={lng} />
      <SecondHome section={response?.sections[1]} lng={lng} />
      <ThirdHome section={response?.sections[2]} lng={lng} />
      <FourthHome />
      <FifthHome lng={lng} />
      <SixthHome lng={lng} />
      <SeventhHome section={response?.sections[3]} lng={lng} />
      <div>{/* <EighthHome lng={lng} /> */}</div>
    </>
  );
}
