import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export const metadata: Metadata = {
  title: "Fracspace",
  description: "Fracspace | Co-own Luxury Properties"
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta"
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${dmsans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="fixed z-40 w-[100vw] bg-white h-[12vh]">
          <Navbar />
        </div>
        <div className="mt-[12vh] w-[100%]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
