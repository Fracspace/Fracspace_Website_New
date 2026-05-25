import React from "react";
import Image from "next/image";
import bg1 from "../../../assets/herobg.webp";
import teamImg from "../../../assets/teamImg.webp";

function AboutSection() {
  return (
    <div className="w-full bg-[#f5f5f5] overflow-hidden">
      {/* Hero Section */}
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
              Redefining How <span className="font-semibold">India</span>
              <br className="hidden sm:block" />
              Invests in Real Estate
            </h1>

            <p className="mt-6 font-dm text-sm sm:text-base md:text-lg text-gray-200 leading-7 md:leading-8 max-w-2xl">
              Fracspace is a modern fractional real estate investment platform
              designed to make premium property ownership accessible,
              transparent, and simplified for every investor.
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
            <path fill="#f5f5f5" d="M0,224L1440,128L1440,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-jakarta md:text-4xl lg:text-5xl  text-[#111] mb-8">
              Who We Are
            </h2>

            <div className="space-y-6 text-[#444] leading-7 md:leading-8 text-sm sm:text-base">
              <p className="font-dm">
                <span className="font-semibold">Fracspace</span> is a modern
                fractional real estate investment platform designed to make
                premium property ownership accessible, transparent, and
                simplified.
              </p>

              <p className="font-dm">
                We enable investors to co-own high-quality real estate assets
                with structured legal frameworks, professional management, and
                technology-driven portfolio tracking.
              </p>

              <p className="font-dm">
                Our approach combines real estate expertise with digital
                convenience — making property investment{" "}
                <span className="font-semibold">
                  smarter and more accessible.
                </span>
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <Image
              src={teamImg}
              alt="Fracspace Team"
              className="w-full h-auto  object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutSection;
