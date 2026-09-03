import React from "react";
import Image from "next/image";
import heroBgImg from "../../../assets/herobg.webp";

function PropertiesHero() {
  return (
    <section className="relative w-full min-h-[45vh] lg:min-h-[50vh] overflow-hidden flex items-center">
      {/* Background Image */}
      <Image
        alt="properties hero bg"
        src={heroBgImg}
        fill
        priority
        className="absolute inset-0 object-cover z-0"
      />
      {/* Overlay Gradients */}
      <div className="w-full h-full bg-[linear-gradient(to_right,#021265ee,#003399dd),radial-gradient(circle_at_top,#00a6ff44,transparent_30%)] z-10 absolute inset-0"></div>

      <div className="z-20 relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 text-white">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-jakarta leading-tight">
          Explore Fractional <br className="hidden sm:block" />
          Investment <span className="font-semibold text-blue-300">Properties</span>
        </h1>
        <p className="mt-6 font-dm text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed">
          Discover curated premium real estate opportunities designed for fractional ownership.
          Invest in high-quality stays, villas, and hospitality assets with structured co-ownership models.
        </p>
      </div>
    </section>
  );
}

export default PropertiesHero;
