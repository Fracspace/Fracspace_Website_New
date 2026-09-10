"use client";

import React from "react";
import Image from "next/image";
import investingMockup from "../../../assets/investingMockup.png";
import { useDownloadApp } from "@/context/DownloadAppContext";

function HowToInvest() {
  const { openDownloadModal } = useDownloadApp();

  const journey = [
    {
      n: "01",
      title: "Browse properties",
      body: "Explore curated listings on the Fracspace app. Filter by location, ticket size and expected returns."
    },
    {
      n: "02",
      title: "Consult our experts",
      body: "Speak to a specialist about the asset, its documentation and the ownership terms — no obligation."
    },
    {
      n: "03",
      title: "Invest & own",
      body: "Complete your investment digitally and receive your legally documented ownership share."
    },
    {
      n: "04",
      title: "Track & earn",
      body: "Monitor performance, rental yields and appreciation in real time through your investor dashboard."
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left App Highlights Column */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#14203A] leading-tight">
            Start investing in four simple steps
          </h2>

          <div className="relative aspect-[4/3.4] rounded-2xl overflow-hidden border border-[#E7EBF2] bg-white shadow-md flex items-center justify-center p-4">
            <Image
              src={investingMockup}
              alt="Fracspace App Workflow"
              className="w-full h-full object-contain"
            />
          </div>

          <p className="text-sm sm:text-[15px] text-[#5C6B8A] leading-relaxed">
            A seamless, app-first experience — from discovery to earnings, in days.
          </p>

          <button
            onClick={openDownloadModal}
            className="inline-block bg-[#0B2452] hover:bg-[#16418C] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
          >
            Download app ↓
          </button>
        </div>

        {/* Right 4 Steps Timeline */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-[#E4E9F1]">
          {journey.map((j, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr] gap-4 sm:gap-6 py-6 sm:py-8 first:pt-0 last:pb-0"
            >
              <span className="font-jakarta text-2xl sm:text-3xl font-extrabold text-[#C3CEE2]">
                {j.n}
              </span>
              <div>
                <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mb-2">
                  {j.title}
                </h3>
                <p className="text-xs sm:text-[14px] leading-relaxed text-[#5C6B8A]">
                  {j.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowToInvest;
