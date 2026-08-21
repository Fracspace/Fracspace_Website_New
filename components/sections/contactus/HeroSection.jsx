import bg1 from "../../../assets/herobg.webp";

import React from "react";
import Image from "next/image";

function HeroSection() {
  return (
    <div className="">
      <section className="relative w-full min-h-[500px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src={bg1}
          alt="Luxury Property"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0d2d63]/75" />

        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-6 sm:px-10 md:px-8 lg:px-12 py-24">
          <div className="max-w-3xl text-white">
            <h1 className="font-jakarta text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-400 leading-snug md:leading-tight">
              Reach Out For
              <br className="hidden sm:block" />
              Investment Guidence
            </h1>

            <p className="mt-6 font-dm text-sm sm:text-base md:text-lg text-gray-200 leading-7 md:leading-8 max-w-2xl">
              Get in touch with the Fracspace team for investment queries,
              support, or general information. Mon-Sat 9AM-5:30PM.
            </p>
          </div>
        </div>

        {/* Bottom Slant */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[60px] md:h-[50px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
          >
            <path fill="white" d="M0,224L1440,128L1440,320L0,320Z" />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
