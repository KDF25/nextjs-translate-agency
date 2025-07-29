import { IHomePageProps } from "@/types/user";
import { dir } from "i18next";
import { Metadata } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { languages } from "../i18n/settings";
import "./../styles/global.scss";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Vip-perevod",
  description: "Vip-perevod",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ""),
  openGraph: {
    title: "Vip-perevod",
    description:
      "Vip-perevod - ваш надежный партнер в точных и оперативных переводческих услугах. От документов до сайтов, мы преодолеваем языковые барьеры с профессионализмом и точностью.",
    url: process.env.NEXT_PUBLIC_API_BASE_URL,
    siteName: "Vip-perevod",
    images: [
      {
        url: "/logoOG.png",
        width: 800,
        height: 600,
        alt: "Vip-perevod",
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
      <html lang={lng} dir={dir(lng)} prefix="og: http://ogp.me/ns#">
        {/* Google Ads script */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17380143692"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17380143692');
        `}
        </Script>
        
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
