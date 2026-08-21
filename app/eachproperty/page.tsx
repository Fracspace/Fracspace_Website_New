"use client"


import HeroSection from "@/components/sections/eachproperty/HeroSection";
import EachProperty from "@/components/sections/eachproperty/EachProperty";
import PropertyAvailability from "@/components/sections/eachproperty/PropertyAvailability";
import PropertyDetails from "@/components/sections/eachproperty/PropertyDetails";
import ImageCarousal from "@/components/sections/eachproperty/ImagesCaraousal";
import React, { useState } from "react";

function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <HeroSection />
      <EachProperty />
      <PropertyAvailability />
      <PropertyDetails />
      <ImageCarousal isOpen={isOpen} onClose={()=>setIsOpen(false)} />
    </section>
  );
}

export default Page;
