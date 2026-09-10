"use client";

import React from "react";
import Image from "next/image";
import coOwnImg from "../../../assets/coOwnImg.webp";

function CoownSection() {
  const owners = [
    { label: "Investor A — 25%", color: "#6E9BFF", flex: 25 },
    { label: "Investor B — 28%", color: "#4B7DEB", flex: 28 },
    { label: "Investor C — 22%", color: "#2F5CC4", flex: 22 },
    { label: "Investor D — 25%", color: "#1B3E92", flex: 25 }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white font-manrope">
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Explainer Text */}
        <div className="lg:col-span-6 space-y-5">
          <h2 className="font-jakarta text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#14203A] leading-tight tracking-tight">
            What if you didn't have to own it all?
          </h2>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5C6B8A]">
            Premium holiday homes can be expensive to buy and consuming to maintain. Co-ownership changes that.
          </p>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5C6B8A]">
            Fracspace divides the ownership of select real estate assets into smaller fractional interests, allowing multiple investors to participate in a premium property.
          </p>

          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5C6B8A]">
            You invest in a fraction of the asset, participate in its potential income and appreciation, and enjoy the experience of owning a property without taking on the entire financial and operational burden.
          </p>

          <div className="pt-2 border-t border-[#EEF1F7]">
            <p className="font-jakarta text-base sm:text-lg font-bold text-[#0B2452] leading-snug">
              One premium property. Multiple co-owners.
              <br />
              <span className="text-[#16418C]">Professionally managed.</span>
            </p>
          </div>
        </div>

        {/* Right Graphic / Co-ownership Breakdown Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E7EBF2] shadow-md">
            <Image
              src={coOwnImg}
              alt="Fracspace Co-ownership Villa"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full">
              Single Luxury Asset
            </div>
          </div>

          <div className="bg-[#0B2452] rounded-2xl p-6 text-white shadow-xl">
            <div className="flex justify-between items-center text-xs text-[#A9BDE2] mb-3 font-medium">
              <span>100% Asset Value</span>
              <span>4 Co-owners</span>
            </div>

            {/* Fraction Bar */}
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-4 p-0.5 bg-white/10">
              {owners.map((o, idx) => (
                <div
                  key={idx}
                  style={{ flex: o.flex, backgroundColor: o.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300"
                ></div>
              ))}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs text-[#C6D5F0]">
              {owners.map((o, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: o.color }}
                  ></span>
                  <span>{o.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CoownSection;
