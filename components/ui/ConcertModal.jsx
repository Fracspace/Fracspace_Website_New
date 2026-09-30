"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function ConcertModal({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!isOpen) return null;

  const scrollToConcertSection = (e) => {
    if (e) e.preventDefault();
    if (onClose) onClose();

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center pt-20 sm:pt-24 pb-4 px-3 pointer-events-none">
      {/* Click outside container to close */}
      <div className="absolute inset-0 pointer-events-auto bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={onClose} />

      {/* Fixed Unscrollable Modal Poster Card */}
      <div
        className="relative max-w-[295px] sm:max-w-[325px] w-full max-h-[82vh] flex flex-col rounded-2xl border border-[#E5B869]/60 bg-[#160502] shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10 pointer-events-auto font-manrope animate-concert-popup overflow-hidden group transition-all duration-300 hover:border-[#FCE079]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Circular Close Button */}
        <button
          onClick={onClose}
          aria-label="Close concert modal"
          className="absolute top-2 right-2 z-30 w-7 h-7 rounded-full border border-white/40 bg-black/75 text-white flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>

        {/* Fixed Poster Image Container (Clickable -> Redirects to #concert) */}
        <div
          onClick={scrollToConcertSection}
          className="relative w-full overflow-hidden select-none cursor-pointer group/poster flex-1 min-h-0"
        >
          <Image
            src="/bandPosterMobile.webp"
            alt="Fracspace Presents Religious India Harish Sagane & Band Live in Concert"
            width={800}
            height={1100}
            className="w-full h-auto max-h-[min(64vh,420px)] object-contain block rounded-t-2xl group-hover/poster:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Bottom Golden Action Bar Button */}
        <button
          onClick={scrollToConcertSection}
          className="w-full py-2.5 px-2.5 bg-gradient-to-r from-[#D89824] via-[#FCE079] to-[#D89824] hover:from-[#FCE079] hover:via-[#FFF8D6] hover:to-[#FCE079] text-[#1A0502] font-black text-[10.5px] sm:text-[11.5px] tracking-wide flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer uppercase shrink-0 border-t border-[#FFF8D6]/40 rounded-b-2xl group-hover:shadow-[0_0_20px_rgba(252,224,121,0.6)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1A0502] fill-[#1A0502] animate-bounce shrink-0" />
          <span className="truncate">View Concert Details & Tickets</span>
        </button>
      </div>
    </div>
  );
}
