"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

function InvestorVideos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const videoList = [
    { id: 1, src: "/videos/AbdulBasith.mp4", position: "center" },
    { id: 2, src: "/videos/PrashantGudipudi.mp4", position: "center" },
    { id: 3, src: "/videos/Srivivasbonnam.mp4", position: "center" },
    { id: 4, src: "/videos/test4.mp4", position: "center" },
    { id: 5, src: "/videos/test5.mp4", position: "center" },
    { id: 6, src: "/videos/test6.mp4", position: "center" },
    { id: 7, src: "/videos/test7.mp4", position: "center 30%" },
    { id: 8, src: "/videos/test8.mp4", position: "center 30%" },
    { id: 9, src: "/videos/test9.mp4", position: "center 30%" }
  ];

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth > 768 ? 400 : 310;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#12306B] text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 font-manrope overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
              Investor Experiences
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mt-2">
              Why our investors chose Fracspace
            </h2>
          </div>

          {/* Scroller Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous videos"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? "bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#0B2452] hover:scale-105"
                  : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Next videos"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? "bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#0B2452] hover:scale-105"
                  : "bg-white/5 border-white/10 text-white/30 cursor-not-allowed opacity-40"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Cards Horizontal Side Scroller */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videoList.map((v) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo(v.src)}
              className="w-[290px] sm:w-[340px] md:w-[380px] shrink-0 snap-start group cursor-pointer"
            >
              <div className="relative rounded-2xl aspect-[16/10] overflow-hidden border border-white/15 bg-gradient-to-br from-[#16315F] to-[#122A52] shadow-xl group-hover:shadow-2xl group-hover:border-white/35 transition-all duration-300">
                <video
                  src={`${v.src}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  style={{ objectPosition: v.position || "center" }}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-[#071A38]/30 group-hover:bg-[#071A38]/10 transition-colors duration-300"></div>

                {/* Centered Play Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white text-[#0B2452] flex items-center justify-center pl-1 shadow-2xl border border-white/80 group-hover:scale-110 group-hover:bg-[#16418C] group-hover:text-white transition-all duration-300 pointer-events-none">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <div className="flex items-center justify-center gap-2 mt-2 sm:hidden text-xs text-[#8FADE2]">
          <span>← Swipe to view more videos →</span>
        </div>

      </div>

      {/* Video Playback Modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fsSlideUp"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/15"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="aspect-[16/9] w-full bg-black flex items-center justify-center">
              <video
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default InvestorVideos;

