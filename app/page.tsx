import Image from "next/image";
import HeroSection from "../components/sections/homepage/HeroSection";
import CoownSection from "../components/sections/homepage/CoownSection";
import HowFsWorks from "../components/sections/homepage/HowFsWorks";
import FeaturedProperties from "../components/sections/homepage/FeaturedProperties";
import WhyInvestWithFs from "../components/sections/homepage/WhyInvestWithFs";
import HowToInvest from "../components/sections/homepage/HowToInvest";
import InTheNews from "../components/sections/homepage/InTheNews";
import Investors from "../components/sections/homepage/Investors";
import BottomBanner from "../components/sections/homepage/BottomBanner";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CoownSection />
      <HowFsWorks />
      <FeaturedProperties />
      <WhyInvestWithFs />
      <HowToInvest />
      <InTheNews />
      <Investors />
      <BottomBanner />
    </div>
  );
}
