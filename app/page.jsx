"use client";

import React from "react";
import HeroSection from "../components/sections/homepage/HeroSection";
import InTheNews from "../components/sections/homepage/InTheNews";
import CoownSection from "../components/sections/homepage/CoownSection";
import HowFsWorks from "../components/sections/homepage/HowFsWorks";
import FeaturedProperties from "../components/sections/homepage/FeaturedProperties";
import WhyInvestWithFs from "../components/sections/homepage/WhyInvestWithFs";
import HowToInvest from "../components/sections/homepage/HowToInvest";
import Investors from "../components/sections/homepage/Investors";
import InvestorVideos from "../components/sections/homepage/InvestorVideos";
import HomeBlogSection from "../components/sections/homepage/HomeBlogSection";
import HomeFaqSection from "../components/sections/homepage/HomeFaqSection";
import BottomBanner from "../components/sections/homepage/BottomBanner";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <InTheNews />
      <CoownSection />
      <HowFsWorks />
      <FeaturedProperties />
      <WhyInvestWithFs />
      <HowToInvest />
      <Investors />
      <InvestorVideos />
      <HomeBlogSection />
      <HomeFaqSection />
      <BottomBanner />
    </main>
  );
}
