import React from "react";
import heroBgImg from "../../../assets/herobg.webp";
import Image from "next/image";
import mainImg from "../../../assets/mainImg.webp";

import { ArrowRight, MapPin } from "lucide-react";
import { useMediaQuery } from "react-responsive";

function HeroSection() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  return (
    <div>
      <div className="relative w-full min-h-screen lg:min-h-[60vh] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]">
        {!isMobile && (
          <Image
            alt="hero bg image"
            src={heroBgImg}
            className="w-full h-full absolute top-0 left-0"
          />
        )}
        <div className="w-full h-full bg-[linear-gradient(to_right,#021265cc,#003399aa),radial-gradient(circle_at_top,#00a6ff55,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed55,transparent_30%)] md:bg-[#0d2d63]/75 z-10 absolute top-0 left-0"></div>

        <div className="z-40 gap-8 relative flex flex-col lg:flex-row items-center mx-auto px-6 sm:px-10 lg:px-12 2xl:max-w-7xl pt-14 pb-25">
          <div className="flex-1">
            <h1 className="text-white leading-[1.2] z-100 text-3xl sm:text-4xl md:text-6xl font-thin font-jakarta">
              Invest in premium real estate through{" "}
              <span className="font-semibold text-blue-300">co-ownership</span>
            </h1>
            <p className="text-white z-100 mt-6 md:mt-8 font-dm text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
              Invest in curated premium properties through transparent
              co-ownership, backed by professional management and predictable
              returns.
            </p>
            <button className="bg-white text-[#021265] px-6 py-3 rounded-full font-dm flex items-center justify-between cursor-pointer mt-8 hover:bg-gray-100 transition shadow-lg">
              Explore Properties <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-between mt-12 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div>
                <p className="text-white text-2xl sm:text-3xl font-jakarta font-bold">
                  200+
                </p>
                <p className="text-gray-300 text-xs sm:text-sm font-dm mt-1">Fracs Sold</p>
              </div>
              <div>
                <p className="text-white text-2xl sm:text-3xl font-jakarta font-bold">
                  15+
                </p>
                <p className="text-gray-300 text-xs sm:text-sm font-dm mt-1">Locations</p>
              </div>
              <div>
                <p className="text-white text-2xl sm:text-3xl font-jakarta font-bold">
                  300+
                </p>
                <p className="text-gray-300 text-xs sm:text-sm font-dm mt-1">Investors</p>
              </div>
              <div>
                <p className="text-white text-2xl sm:text-3xl font-jakarta font-bold font-sans">
                  8-12%
                </p>
                <p className="text-gray-300 text-xs sm:text-sm font-dm mt-1">Target ROI</p>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-[400px] lg:max-w-none lg:w-[400px] flex-shrink-0">
            <Image
              alt="featured image"
              src={mainImg}
              className="w-full aspect-square rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute inset-x-4 bottom-4 z-20">
              <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-4 rounded-xl shadow-lg border border-white/20">
                <div className="w-[70%]">
                  <p className="text-xs font-semibold text-gray-500 font-dm uppercase tracking-wider">Featured Property</p>
                  <p className="text-md sm:text-lg py-1 font-jakarta font-semibold text-gray-900">
                    Hilltop Munnar
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#e42525]" />
                    <span className="text-xs text-gray-600 font-dm">Kerala</span>
                  </p>
                </div>
                <div className="w-[30%] flex justify-end">
                  <span className="bg-[#021265] text-white rounded-xl px-3 py-2 text-center text-xs font-jakarta font-bold leading-tight block">
                    10% <br /> <span className="text-[9px] font-light">Annual ROI</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
