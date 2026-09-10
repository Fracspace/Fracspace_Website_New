"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroImg from "../../../assets/herobg.webp";

function AboutSection() {
  return (
    <div className="w-full font-manrope">
      {/* Hero Section */}
      <section
        id="about"
        className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#16418C] text-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 84px)"
          }}
        ></div>

        <div className="relative max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
              About us
            </span>
            <h1 className="font-jakarta text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.1] text-balance">
              Redefining how India invests in real estate
            </h1>
            <p className="text-base sm:text-lg text-[#B7C6E4] leading-relaxed max-w-xl text-pretty">
              Fracspace is a modern fractional real estate investment platform built to make premium property ownership accessible, transparent and simplified for every investor.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/properties"
                className="bg-white hover:bg-[#DCE7FF] text-[#0B2452] px-8 py-3.5 rounded-full text-sm font-bold transition shadow-md"
              >
                Explore properties →
              </Link>
              <a
                href="#team"
                className="border border-white/35 hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition"
              >
                Meet the team
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3.2] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-br from-[#14315F] to-[#10294F]">
              <Image
                src={heroImg}
                alt="Fracspace Luxury Properties"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A38]/60 to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-5">
            <h2 className="font-jakarta text-2xl sm:text-4xl lg:text-[38px] font-bold text-[#14203A] tracking-tight leading-tight">
              Who we are
            </h2>
            <div className="w-14 h-1 bg-[#16418C] mt-4 rounded-full"></div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <p className="text-base sm:text-lg leading-relaxed text-[#33415F]">
              Fracspace is a modern fractional real estate investment platform designed to make premium property ownership accessible, transparent and simplified.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C6B8A]">
              We enable investors to co-own high-quality real estate assets with structured legal frameworks, professional management and technology-driven portfolio tracking.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#5C6B8A]">
              Our approach combines real estate expertise with digital convenience — making property investment smarter and more accessible.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#E7EBF2]">
              <div>
                <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-[#0B2452]">
                  200+
                </div>
                <div className="text-xs text-[#7B8AA8] mt-1 font-medium">
                  Properties listed
                </div>
              </div>
              <div>
                <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-[#0B2452]">
                  300+
                </div>
                <div className="text-xs text-[#7B8AA8] mt-1 font-medium">
                  Investors onboarded
                </div>
              </div>
              <div>
                <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-[#0B2452]">
                  15+
                </div>
                <div className="text-xs text-[#7B8AA8] mt-1 font-medium">
                  Destinations
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Our Vision Section */}
      <section className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#0F2A57] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 96px)"
          }}
        ></div>

        <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
              Our vision
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Ownership defined by trust, not by capital
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#B7C6E4]">
              To redefine real estate ownership by making premium property investments accessible to a wider community of investors through structured and transparent co-ownership models.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#B7C6E4]">
              We envision a future where property ownership is not limited by capital barriers, but enabled by technology and trust.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-br from-[#16315F] to-[#122A52]">
              <Image
                src={heroImg}
                alt="Fracspace Vision"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[#071A38]/30"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutSection;
