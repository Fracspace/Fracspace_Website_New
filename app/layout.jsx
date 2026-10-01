import "react-phone-input-2/lib/style.css";
import { Plus_Jakarta_Sans, DM_Sans, Manrope, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Fracspace | Fractional Real Estate & Luxury Property Co-Ownership",
  description: "Fracspace offers innovative fractional investment opportunities, allowing you to own a curated share of luxury properties and premium holiday homes with predictable returns.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  }
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta"
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope"
});

const monoPlex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono"
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${dmsans.variable} ${manrope.variable} ${monoPlex.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager (GTM) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TBXBVDB');
          `}
        </Script>

        {/* Google Analytics 4 / Google Tag (GA4) */}
        <Script
          id="google-analytics-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17631871581"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-17631871581');
          `}
        </Script>

        {/* Microsoft Clarity - Heavy behavior tracking deferred to lazyOnload */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-manrope text-[#14203A] bg-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5TBXBVDB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
