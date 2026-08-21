import React from "react";
import Image from "next/image";
import bg1 from "../../../assets/herobg.webp";

import { MapPin } from "lucide-react";

function HeroSection() {
  return (
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 text-sm mb-6 text-gray-300">
              <MapPin size={16} />
              <span className="font-dm">Munnar, Kerala</span>
            </div>

            <h2 className="text-4xl md:text-5xl mb-6 font-jakarta">
              Hilltop <span className="font-light">by Fracspace</span>
            </h2>

            <p className="text-gray-200 leading-8 max-w-xl font-dm">
              Hilltop by Fracspace! Nestled amidst the serene hills, Hilltop
              offers a tranquil escape from the hustle and bustle of city life.
              Enjoy breathtaking views of the surrounding landscape while
              indulging in cozy bonfires and engaging indoor activities.
            </p>
          </div>

          {/* Right Image Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-[320px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bg1}
                alt="Hilltop Property"
                fill
                className="object-cover"
              />
            </div>
          </div>
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
  );
}

export default HeroSection;
