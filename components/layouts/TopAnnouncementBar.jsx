"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function TopAnnouncementBar({ onOpenModal }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToConcert = (e) => {
    if (e) e.preventDefault();

    const doScroll = () => {
      const concertElem = document.getElementById("concert");
      if (concertElem) {
        concertElem.scrollIntoView({ behavior: "smooth", block: "start" });
        concertElem.classList.add("ring-4", "ring-[#FCE079]", "transition-all", "duration-700");
        setTimeout(() => {
          concertElem.classList.remove("ring-4", "ring-[#FCE079]");
        }, 2000);
      }
    };

    if (pathname === "/") {
      doScroll();
    } else {
      router.push("/#concert");
      setTimeout(() => {
        doScroll();
      }, 500);
    }
  };

  return (
    <div
      onClick={handleScrollToConcert}
      className="w-full bg-gradient-to-r from-[#170603] via-[#2A0C04] to-[#170603] hover:from-[#250904] hover:via-[#3B1106] hover:to-[#250904] text-white py-2.5 px-3 sm:px-6 border-b border-[#E5B869]/30 font-manrope z-50 cursor-pointer transition-all duration-300 group select-none shadow-xs"
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm flex-wrap sm:flex-nowrap">
        {/* Brand prefix with icon */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-4 h-4 text-[#FCE079] animate-pulse group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-extrabold tracking-wider text-[#E5B869] uppercase text-[11px] sm:text-xs">
            FRACSPACE PRESENTS
          </span>
        </div>

        {/* Separator Bullet */}
        <span className="text-[#E5B869]/70 hidden xs:inline font-bold">?</span>

        {/* Event Name */}
        <span className="font-extrabold text-[#FCE079] tracking-wide text-[11px] sm:text-xs uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(252,224,121,0.8)]">
          RELIGIOUS INDIA <strong>&mdash;</strong> LIVE IN CONCERT
        </span>

        {/* Action Button */}
        <div
          className="inline-flex items-center gap-1.5 ml-1 sm:ml-2.5 px-3 py-1 rounded-full border border-[#E5B869]/70 bg-[#E5B869]/15 text-[#FCE079] text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300 group-hover:border-[#FCE079] group-hover:bg-[#E5B869]/30 group-hover:shadow-[0_0_16px_rgba(252,224,121,0.6)] group-hover:scale-105 active:scale-95 whitespace-nowrap shadow-xs"
        >
          <span>Know More</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FCE079] group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}
