import React from "react";
import AboutSection from "@/components/sections/aboutus/AboutSection";
import VisionMission from "@/components/sections/aboutus/VisionMission";
import OurTeam from "@/components/sections/aboutus/OurTeam";

export const metadata = {
  title: "About Us | Fracspace",
  description: "Learn about Fracspace, our mission, vision, and the leadership team redefining real estate co-ownership in India."
};

function About() {
  return (
    <main>
      <AboutSection />
      <VisionMission />
      <OurTeam />
    </main>
  );
}

export default About;

