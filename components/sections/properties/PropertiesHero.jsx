"use client";

import React from "react";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";

function PropertiesHero({ totalCount = "9" }) {
  return (
    <section className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#16418C] text-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-manrope">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 84px)"
        }}
      ></div>

      <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
            Properties
          </span>
          <h1 className="font-jakarta text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-tight text-white leading-[1.1] text-balance">
            Explore fractional investment properties
          </h1>
          <p className="text-base sm:text-lg text-[#B7C6E4] leading-relaxed max-w-xl text-pretty">
            Curated premium real estate designed for fractional ownership — high-quality stays, villas and hospitality assets with structured co-ownership models.
          </p>

          {/* Key Metrics */}
          <div className="pt-4 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                {totalCount}
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Live listings
              </div>
            </div>
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                5+
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Destinations
              </div>
            </div>
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                8–12%
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Target ROI
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full aspect-[4/3.2] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-br from-[#14315F] to-[#10294F]">
            <Image
              src={heroImg}
              alt="Fracspace Featured Properties"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/60 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PropertiesHero;
