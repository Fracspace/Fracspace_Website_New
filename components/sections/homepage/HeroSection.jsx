"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "../../../assets/herobg.webp";
import { useDownloadApp } from "@/context/DownloadAppContext";

function HeroSection() {
  const { openDownloadModal } = useDownloadApp();

  return (
    <section
      id="home"
      className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#16418C] text-white overflow-hidden font-manrope"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 84px)"
        }}
      ></div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="font-jakarta text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.1] text-balance">
            Invest in premium real estate through{" "}
            <span className="text-[#EAF1FF] font-extrabold">
              co-ownership
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#B7C6E4] leading-relaxed max-w-xl text-pretty">
            Own a curated share of premium holiday homes and resorts — transparent co-ownership, backed by professional management and predictable returns.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/properties"
              className="bg-white hover:bg-[#DCE7FF] text-[#0B2452] px-8 py-3.5 rounded-full text-sm font-bold transition duration-200 shadow-md flex items-center gap-2 cursor-pointer"
            >
              Explore Properties →
            </Link>
            <a
              href="#how"
              className="border border-white/35 hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition duration-200 cursor-pointer"
            >
              How it works
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                200+
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Properties
              </div>
            </div>
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                15+
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Locations
              </div>
            </div>
            <div>
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-white">
                300+
              </div>
              <div className="text-xs text-[#93A8CE] mt-1 font-medium">
                Investors
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

        {/* Right Hero Image Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full aspect-[4/3.4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-[#071A38]/50 bg-gradient-to-br from-[#14315F] to-[#10294F]">
            <Image
              src={heroImg}
              alt="Fracspace Luxury Co-ownership Villa"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white flex items-center justify-between">
              <span className="font-jakarta font-semibold">Premium Managed Holiday Homes</span>
              <span className="font-mono-plex text-[#8FB4FF]">From ₹10L</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
