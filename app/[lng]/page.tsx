import { getData } from "@/services/getData";
import FirstHome from "./components/firstHome";
import SecondHome from "./components/secondHome";
import ThirdHome from "./components/thirdHome";
import FourthHome from "./components/fourthHome";
import FifthHome from "./components/fifthHome";
import SixthHome from "./components/sixthHome";
import SeventhHome from "./components/seventhHome";
import { ILangPageProps } from "@/types/user";
import { PAGE_ID } from "@/config";
import { TheHeader } from "../components/header/header";
import { TheFooter } from "../components/footer/footer";

export async function generateMetadata({
  params: { lng },
}: {
  params: ILangPageProps;
}) {
  const pageId = PAGE_ID;
  const response = await getData(pageId, lng);
  return {
    title: response?.seo_title,
    description: response?.seo_description,
    keywords: response?.seo_keywords,
  };
}

export default async function Home({
  params: { lng },
}: {
  params: ILangPageProps;
}) {
  const response = await getData(PAGE_ID, lng);

  return (
    <>
      <TheHeader lng={lng} />
      <FirstHome section={response?.sections[0]} lng={lng} />
      <SecondHome section={response?.sections[1]} lng={lng} />
      <ThirdHome section={response?.sections[2]} lng={lng} />
      <FourthHome section={response?.sections[3]} lng={lng} />
      <FifthHome lng={lng} />
      <SixthHome lng={lng} />
      <SeventhHome section={response?.sections[4]} lng={lng} />
      <TheFooter lng={lng} />
    </>
  );
}
