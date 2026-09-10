"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import heroImg from "../../../assets/herobg.webp";
import hilltopImg from "../../../assets/hilltopImg.webp";
import coOwnImg from "../../../assets/coOwnImg.webp";

function HomeBlogSection() {
  const posts = [
    {
      slug: "benefits-of-co-ownership-in-property",
      tag: "Co-own",
      title: "Benefits of co-ownership in property",
      meta: "March 18, 2026 · 7 min read",
      image: hilltopImg
    },
    {
      slug: "how-to-calculate-rental-yield-on-holiday-homes",
      tag: "Returns",
      title: "How to calculate rental yield",
      meta: "March 10, 2026 · 6 min read",
      image: coOwnImg
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1180px] mx-auto">
        <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mb-3">
          Ideas for smarter ownership
        </h2>
        <p className="text-sm sm:text-base text-[#5C6B8A] mb-10">
          Explore insights on fractional ownership, holiday homes, real estate and destination investing.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Featured Article */}
          <Link
            href="/blogs/what-is-fractional-real-estate-investment"
            className="lg:col-span-7 bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-[16/9] bg-[#EEF2F8] overflow-hidden">
              <Image
                src={heroImg}
                alt="Fractional Real Estate Guide"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0B2452] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                Featured Guide
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <span className="font-mono-plex text-[10px] tracking-widest text-[#16418C] uppercase font-semibold">
                Guides
              </span>
              <h3 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A] mt-2 mb-3 group-hover:text-[#16418C] transition">
                What is fractional real estate investment?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6B8A] leading-relaxed mb-4">
                Expert insights on fractional ownership, investment strategies and where the Indian market is heading next.
              </p>
              <span className="text-xs sm:text-sm font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto">
                8 min read →
              </span>
            </div>
          </Link>

          {/* Right Side Articles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {posts.map((po, idx) => (
              <Link
                key={idx}
                href={`/blogs/${po.slug}`}
                className="bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr] flex-1 shadow-xs hover:shadow-lg transition duration-300 group cursor-pointer"
              >
                <div className="relative h-full min-h-[120px] bg-[#EEF2F8] overflow-hidden">
                  <Image
                    src={po.image}
                    alt={po.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <span className="font-mono-plex text-[10px] tracking-widest text-[#16418C] uppercase font-semibold">
                    {po.tag}
                  </span>
                  <h3 className="font-jakarta text-sm sm:text-base font-bold text-[#14203A] my-1.5 group-hover:text-[#16418C] transition leading-snug">
                    {po.title}
                  </h3>
                  <div className="text-[11px] text-[#7B8AA8]">
                    {po.meta}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* View All Blogs CTA */}
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block border border-[#C3CEE2] hover:border-[#0B2452] text-[#0B2452] hover:bg-[#0B2452] hover:text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition shadow-xs"
          >
            Explore all blogs →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HomeBlogSection;
