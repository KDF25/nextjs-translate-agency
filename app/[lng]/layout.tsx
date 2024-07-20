import { TheFooter } from "@/app/components/footer/footer";
import { TheHeader } from "@/app/components/header/header";
import { IHomePageProps } from "@/types/user";
import { dir } from "i18next";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";
import "../styles/global.scss";
import { languages } from "../i18n/settings";

export const metadata: Metadata = {
  title: "Venkon Communications",
  description: "Пиар агентство",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  openGraph: {
    title: "Агенство переводов",
    description:
      "Venkon Communications - пиар агентство полного цикла. Команда сильных специалистов и профессионалов своего дела помогут вам продвигать ваш бизнес с максимальной отдачей.",
    url: "https://vencom.uz",
    siteName: "Venkon Communication",
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

const montserrat = Montserrat({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
});

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { lng },
}) => {
  return (
    <>
      <html lang={lng} dir={dir(lng)}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <style>{`@font-face { ${montserrat} }`}</style>
        </Head>
        <body>
          <main className="main__layout">
            <TheHeader lng={lng} />
            <div>{children}</div>
            <TheFooter lng={lng} />
          </main>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
