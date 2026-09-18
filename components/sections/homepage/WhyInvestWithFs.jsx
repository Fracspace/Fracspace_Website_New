"use client";

import React from "react";
import Image from "next/image";
import hilltopImg from "../../../assets/hilltopImg.webp";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

function WhyInvestWithFs() {
  const benefits = [
    {
      icon: "⚖",
      title: "Secure legal structure",
      body: "Legally defined co-ownership with transparent documentation, registered for every investor."
    },
    {
      icon: "⚙",
      title: "Fully managed assets",
      body: "We handle operations, tenants, maintenance and compliance so ownership stays effortless."
    },
    {
      icon: "₹",
      title: "Dual income stream",
      body: "Earn monthly rental income while your asset appreciates in value — returns from both sides."
    },
    {
      icon: "✦",
      title: "Complimentary stays",
      body: "Enjoy exclusive stay privileges and private-owner benefits across every property in your portfolio."
    }
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#0A1F42] via-[#0D265A] to-[#14357A] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-manrope">
      <div className="max-w-[1180px] mx-auto">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-12 text-center">
          Why invest with Fracspace?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual with Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/4.2] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-br from-[#16315F] to-[#122A52]">
              <Image
                src={hilltopImg}
                alt="Fracspace Resort"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F42]/60 to-transparent"></div>
            </div>

            {/* Floating 100+ Badge */}
            <div className="absolute -top-4 -left-4 sm:top-4 sm:-left-4 bg-white text-[#0B2452] rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-100 z-10 min-w-[140px] text-center">
              <div className="font-jakarta text-2xl sm:text-3xl font-extrabold text-[#0B2452]">
                <AnimatedCounter target={100} suffix="+" delay={150} duration={1600} />
              </div>
              <div className="text-xs text-[#5C6B8A] font-medium mt-0.5">
                Satisfied investors
              </div>
            </div>
          </div>

          {/* Right Benefits Column */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="flex gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 sm:p-6 transition duration-300 backdrop-blur-xs"
              >
                <span className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center text-base font-bold shrink-0">
                  {b.icon}
                </span>
                <div>
                  <h3 className="font-jakarta text-base font-bold text-white mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#A9BDE2]">
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyInvestWithFs;
