import React from "react";
import HeroSection from "../components/sections/homepage/HeroSection";
import InTheNews from "../components/sections/homepage/InTheNews";
import CoownSection from "../components/sections/homepage/CoownSection";
import HowFsWorks from "../components/sections/homepage/HowFsWorks";
import DynamicReligiousIndiaConcert from "../components/sections/homepage/DynamicReligiousIndiaConcert";
import FeaturedProperties from "../components/sections/homepage/FeaturedProperties";
import WhyInvestWithFs from "../components/sections/homepage/WhyInvestWithFs";
import HowToInvest from "../components/sections/homepage/HowToInvest";
import DynamicInvestorVideos from "../components/sections/homepage/DynamicInvestorVideos";
import HomeFaqSection from "../components/sections/homepage/HomeFaqSection";
import BottomBanner from "../components/sections/homepage/BottomBanner";

export const metadata = {
  title: 'Home | Fracspace',
  description: 'Discover fractional ownership in luxury real estate with Fracspace. Invest in high-end properties, enjoy premium vacations, and earn rental income with projected yields of 8% annually.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <InTheNews />
      <CoownSection />
      <HowFsWorks />
      <DynamicReligiousIndiaConcert />
      <FeaturedProperties />
      <WhyInvestWithFs />
      <HowToInvest />
      <DynamicInvestorVideos />
      <HomeFaqSection />
      <BottomBanner />
    </main>
  );
}
