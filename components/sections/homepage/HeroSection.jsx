import React from "react";
import heroBgImg from "../../../assets/herobg.webp";
import Image from "next/image";

import { ArrowRight, MapPin } from "lucide-react";

function HeroSection() {
  return (
    <div>
      <div className="relative w-full min-h-screen lg:min-h-[60vh] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]">
        <Image
          alt="hero bg image"
          src={heroBgImg}
          className="w-full h-full absolute top-0 left-0"
        />
        <div className="w-full h-full bg-gradient-to-r from-slate-900/90 to-blue-900/60 z-10 absolute top-0 left-0"></div>
        <div className="z-40 gap-8 relative flex flex-col md:flex-row items-center mx-auto  px-10  2xl:max-w-7xl pt-14 pb-25">
          <div className="">
            <h1 className="text-white leading-[1.2] z-100 text-3xl md:text-6xl font-thin font-jakarta ">
              Invest in premium real estate through{" "}
              <span className="font-semibold">co-ownership</span>
            </h1>
            <p className="text-white z-100 mt-8 font-jakarta">
              Invest in curated premium properties through transparent
              co-ownership, backed by professional management and predictable
              returns.
            </p>
            <button className="bg-white text-[#021265] px-6 py-2 rounded-full font-dm flex items-center justify-between cursor-pointer mt-8">
              Explore Properties <ArrowRight className="w-[6vw] md:w-[1.5vw]" />
            </button>
            <div className="flex flex-row items-center justify-between mt-8">
              <div>
                <p className="text-white text-xl md:text-3xl font-jakarta">
                  200+
                </p>
                <p className="text-white font-dm">Fracs Sold</p>
              </div>
              <div>
                <p className="text-white text-xl md:text-3xl font-jakarta">
                  15+
                </p>
                <p className="text-white font-dm">Locations</p>
              </div>
              <div>
                <p className="text-white text-xl md:text-3xl font-jakarta">
                  300+
                </p>
                <p className="text-white font-dm">Investors</p>
              </div>
              <div>
                <p className="text-white text-xl md:text-3xl font-jakarta">
                  8-12%
                </p>
                <p className="text-white font-dm">Target ROI</p>
              </div>
            </div>
          </div>
          <div className=" relative">
            <Image
              alt="featured image"
              src={heroBgImg}
              className="max-w-[400px] aspect-[5/5] rounded-lg"
            />
            <div className="absolute flex items-center justify-center  w-[100%] bottom-8">
              <div className=" flex items-center justify-between w-[90%] bg-white  px-4 py-4 rounded-xl">
                <div>
                  <p className="text-xs font-dm">Feature Property</p>
                  <p className="text-lg py-1 font-jakarta">Hilltop Munnar</p>
                  <p className=" flex items-center">
                    <span className="">
                      <MapPin className="w-[14px] text-[#e42525]" />
                    </span>{" "}
                    <span className="text-xs font-dm">Kerala</span>
                  </p>
                </div>
                <div>
                  <button className="bg-[#021265] w-auto text-white rounded-full px-4 py-1">
                    <p className="text-xl font-jakarta">10%</p>{" "}
                    <span className="text-xs font-dm">Annual ROI</span>
                  </button>
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
