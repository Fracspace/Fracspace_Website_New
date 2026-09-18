"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Publication Logos
import imgForbes from "../../../assets/newsImages/forbes1.png";
import imgDC from "../../../assets/newsImages/dc-logo-2.png";
import imgEnterprise from "../../../assets/newsImages/the-enterprise-world.png";
import imgETNow from "../../../assets/newsImages/ET_Now.jpg";
import imgETInsights from "../../../assets/newsImages/Et_Insights.png";
import imgBizzBuzz from "../../../assets/newsImages/5.png";
import imgEToday from "../../../assets/newsImages/et.png";
import imgAroundTelugu from "../../../assets/newsImages/aroundtelugu-logo.png";

function InTheNews() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const pressItems = [
    {
      source: "Forbes India · DGEMS 2024",
      title: "Fracspace recognised among the fastest 200 companies",
      body: "Recognised for growth, transparency and category creation in India's holiday-home ownership market.",
      link: "https://images.news18.com/ms/prod/forbesindia/Fracspace_01a7eb15b7.pdf",
      image: imgForbes
    },
    {
      source: "Deccan Chronicle",
      title: "Fracspace revolutionises real estate ownership with mobile app",
      body: "Coverage on how a mobile-first product brings fractional property investment to a wider retail audience.",
      link: "https://www.deccanchronicle.com/general/fracspace-revolutionizes-real-estate-ownership-with-mobile-app-897133",
      image: imgDC
    },
    {
      source: "The Enterprise World",
      title: "The most influential business leaders to watch in 2024",
      body: "A leadership feature on building trust, governance and investor confidence in a young asset class.",
      link: "https://theenterpriseworld.com/unnath-reddy-a-visionary-leader-reforming/",
      image: imgEnterprise
    },
    {
      source: "ET Now",
      title: "Tech Horizons: Unveiling top picks for next global players",
      body: "Special broadcast feature spotlighting high-growth platforms shaping the future of fractional property investments.",
      link: "https://www.youtube.com/watch?v=Z1JVsH6AwDI",
      image: imgETNow
    },
    {
      source: "ET Edge Insights",
      title: "Fracspace launches in-app features for property enthusiasts",
      body: "Analysis on platform expansion and high-demand destinations across Hyderabad, Bangalore, and leisure circuits.",
      link: "https://etedge-insights.com/in-focus/trending/fracspace-launches-in-app-features-for-interiors-and-real-estate-enthusiasts-in-hyderabad-and-bangalore/",
      image: imgETInsights
    },
    {
      source: "Bizz Buzz",
      title: "Fracspace enables fractional ownership of luxury properties",
      body: "Spotlight on democratizing access to high-yield vacation homes and premium hospitality assets.",
      link: "https://www.bizzbuzz.news/industry/fracspace-allows-fractional-ownership-of-properties-1212346",
      image: imgBizzBuzz
    },
    {
      source: "Entrepreneurs Today",
      title: "Revolutionizing real estate investment & empowering dreams",
      body: "Exclusive interview on how structured co-ownership is reshaping the modern real estate landscape.",
      link: "https://entrepreneurstoday.in/unnath-reddys-fracspace-revolutionizing-real-estate-investment-and-empowering-dreams/",
      image: imgEToday
    },
    {
      source: "Around Telugu",
      title: "Spotlight on innovative fractional real estate model",
      body: "Media coverage highlighting regional expansion and investor returns in premier tourist destinations.",
      link: "https://youtu.be/DMCjEC1BQQE?si=DjmgtonohyGQfboG",
      image: imgAroundTelugu
    }
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
      const scrollAmount = container.clientWidth > 768 ? 380 : 310;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
              Media & Press
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mt-2 mb-3">
              Recognised. Reported. Growing.
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] leading-relaxed">
              From redefining holiday-home ownership to taking destination-led real estate beyond India, Fracspace is building a new category of property ownership.
            </p>
          </div>

          {/* Side Scroller Arrow Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? "bg-white border-[#DDE4EF] text-[#0B2452] shadow-sm hover:bg-[#0B2452] hover:text-white hover:border-[#0B2452] hover:scale-105"
                  : "bg-white/50 border-[#E7EBF2] text-[#A0AEC0] cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? "bg-white border-[#DDE4EF] text-[#0B2452] shadow-sm hover:bg-[#0B2452] hover:text-white hover:border-[#0B2452] hover:scale-105"
                  : "bg-white/50 border-[#E7EBF2] text-[#A0AEC0] cursor-not-allowed opacity-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Side Scroller Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 px-1 sm:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pressItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[290px] sm:w-[330px] md:w-[360px] shrink-0 snap-start bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group no-underline text-inherit"
            >
              {/* Publication Logo Header */}
              <div className="aspect-[16/9] bg-[#EEF2F8] p-6 flex items-center justify-center border-b border-[#E7EBF2]">
                <Image
                  src={item.image}
                  alt={item.source}
                  className="max-h-12 w-auto max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col gap-2.5 flex-1">
                <span className="font-mono-plex text-[10px] tracking-widest text-[#16418C] uppercase font-semibold">
                  {item.source}
                </span>
                <h3 className="font-jakarta text-base font-bold text-[#14203A] group-hover:text-[#16418C] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#5C6B8A] mb-2 line-clamp-3">
                  {item.body}
                </p>
                <div className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto pt-3 flex items-center gap-1.5 group-hover:underline">
                  <span>Read coverage</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <div className="flex items-center justify-center gap-2 mt-4 md:hidden text-xs text-[#8F9CAE]">
          <span>← Swipe to explore more media coverage →</span>
        </div>

      </div>
    </section>
  );
}

export default InTheNews;



