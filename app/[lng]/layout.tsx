import { IHomePageProps } from "@/types/user";
import { dir } from "i18next";
import { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { languages } from "../i18n/settings";
import "./../styles/global.scss";

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
        <head>
          <link rel="icon" href="/favicon.ico" />

          {/* Google Tag Manager */}
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WV9ZKJ46');
          `}
          </Script>

          {/* Google Analytics GA4 */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-C8ETRKVP9H"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C8ETRKVP9H');
          `}
          </Script>

          {/* Google Ads */}
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

          {/* Google Ads Conversion Event */}
          <Script id="google-ads-conversion" strategy="afterInteractive">
            {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17380143692/PSZACOWZ_vQaEMzkv99A',
              'value': 1.0,
              'currency': 'USD'
            });
          `}
          </Script>
        </head>

        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WV9ZKJ46"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          <main className="main__layout">
            <div>{children}</div>
          </main>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
