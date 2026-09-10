"use client";

import React, { useState } from "react";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";
import coOwnImg from "../../../assets/coOwnImg.webp";
import hilltopImg from "../../../assets/hilltopImg.webp";

function InvestorVideos() {
  const videos = [
    {
      name: "Abdul Basith",
      role: "Bangalore Investor",
      image: heroImg
    },
    {
      name: "Srinivas",
      role: "Hyderabad Investor",
      image: hilltopImg
    },
    {
      name: "Ramya Nair",
      role: "Kerala Investor",
      image: coOwnImg
    }
  ];

  return (
    <section className="bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#12306B] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-manrope">
      <div className="max-w-[1180px] mx-auto">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-10">
          Why our investors chose Fracspace
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((v, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative rounded-2xl aspect-[16/10] overflow-hidden border border-white/15 bg-gradient-to-br from-[#16315F] to-[#122A52] flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-[#071A38]/40"></div>
                
                {/* Play Icon */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 text-[#0B2452] flex items-center justify-center text-sm font-bold pl-0.5 shadow-xl group-hover:scale-110 group-hover:bg-white transition duration-300">
                  ▶
                </div>
              </div>

              <div className="mt-3">
                <div className="font-jakarta text-sm sm:text-base font-bold text-white group-hover:text-[#8FB4FF] transition">
                  {v.name}
                </div>
                <div className="text-xs text-[#9AA9C4]">
                  {v.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InvestorVideos;
