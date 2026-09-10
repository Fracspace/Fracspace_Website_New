"use client";

import React from "react";
import Image from "next/image";
import img01 from "../../../assets/newsImages/forbes1.png";
import img1 from "../../../assets/newsImages/dc-logo-2.png";
import img2 from "../../../assets/newsImages/the-enterprise-world.png";

function InTheNews() {
  const pressItems = [
    {
      source: "Forbes India · DGEMS 2024",
      title: "Fracspace recognised among the fastest 200 companies",
      body: "Recognised for growth, transparency and category creation in India's holiday-home ownership market.",
      link: "https://images.news18.com/ms/prod/forbesindia/Fracspace_01a7eb15b7.pdf",
      image: img01
    },
    {
      source: "Deccan Chronicle",
      title: "Fracspace revolutionises real estate ownership with mobile app",
      body: "Coverage on how a mobile-first product brings fractional property investment to a wider retail audience.",
      link: "https://www.deccanchronicle.com/general/fracspace-revolutionizes-real-estate-ownership-with-mobile-app-897133",
      image: img1
    },
    {
      source: "The Interview World",
      title: "The most influential business leaders to watch in 2024",
      body: "A leadership feature on building trust, governance and investor confidence in a young asset class.",
      link: "https://theenterpriseworld.com/unnath-reddy-a-visionary-leader-reforming/",
      image: img2
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1100px] mx-auto text-center">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-3.5">
          Recognised. Reported. Growing.
        </h2>
        <p className="text-sm sm:text-base text-[#5C6B8A] max-w-2xl mx-auto mb-12 leading-relaxed">
          From redefining holiday-home ownership to taking destination-led real estate beyond India, Fracspace is building a new category of property ownership.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pressItems.map((item, idx) => (
            <article
              key={idx}
              className="bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg group"
            >
              <div className="aspect-[16/9] bg-[#EEF2F8] p-6 flex items-center justify-center border-b border-[#E7EBF2]">
                <Image
                  src={item.image}
                  alt={item.source}
                  className="max-h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col gap-2.5 flex-1">
                <span className="font-mono-plex text-[10px] tracking-widest text-[#16418C] uppercase font-semibold">
                  {item.source}
                </span>
                <h3 className="font-jakarta text-base font-bold text-[#14203A] leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#5C6B8A] mb-2">
                  {item.body}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#16418C] hover:text-[#0B2452] mt-auto pt-2 flex items-center gap-1"
                >
                  Read coverage →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InTheNews;
