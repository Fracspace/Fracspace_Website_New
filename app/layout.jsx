import { Plus_Jakarta_Sans, DM_Sans, Manrope, IBM_Plex_Mono } from "next/font/google";
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
      className={`${jakarta.variable} ${dmsans.variable} ${manrope.variable} ${monoPlex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-manrope text-[#14203A] bg-white">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

