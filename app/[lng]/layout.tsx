import { IHomePageProps } from "@/types/user";
import { dir } from "i18next";
import { Metadata } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { TheFooter } from "../components/footer/footer";
import { TheHeader } from "../components/header/header";
import { languages } from "../i18n/settings";
import "./../styles/global.scss";

export const metadata: Metadata = {
  title: "Translate Agency",
  description: "Агенство переводов",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  openGraph: {
    title: "Агенство переводов",
    description:
      "Translate Agency - ваш надежный партнер в точных и оперативных переводческих услугах. От документов до сайтов, мы преодолеваем языковые барьеры с профессионализмом и точностью.",
    url: "https://translate_agency.uz",
    siteName: "Translate Agency",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
      },
      {
        url: "/logo.svg",
        width: 1800,
        height: 1600,
        alt: "Translate Agency",
      },
    ],
    locale: "uz-UZ",
    type: "website",
  },
};

interface StaticParams {
  lng: string;
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  return languages.map((lng) => ({ lng }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: IHomePageProps;
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { lng },
}) => {
  return (
    <>
      <html lang={lng} dir={dir(lng)}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <main className="main__layout">
            <div>{children}</div>
          </main>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
