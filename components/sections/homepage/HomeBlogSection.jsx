"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { approvedBlog, blogTopics } from "@/data/blogsData";

function HomeBlogSection() {
  const featured = approvedBlog;
  // Select key topic highlights from the approved guide
  const highlightTopics = [
    blogTopics.find((t) => t.id === "alleppey-cottages") || blogTopics[8],
    blogTopics.find((t) => t.id === "manipal-river-club") || blogTopics[9],
    blogTopics.find((t) => t.id === "investment-example") || blogTopics[2]
  ].filter(Boolean);

  if (!featured) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1180px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
              Fracspace Insights
            </span>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A] mt-1">
              Ideas for smarter property ownership
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] mt-2 max-w-2xl">
              Explore key chapters and topics from our comprehensive guide to fractional real estate in India.
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition shrink-0"
          >
            <span>Explore all topics</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Featured Guide Card */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="lg:col-span-7 bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-[16/9] bg-[#EEF2F8] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#0B2452] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md">
                Featured Guide
              </span>
            </div>
            <div className="p-6 sm:p-8 flex flex-col flex-1">
              <span className="font-mono-plex text-[10px] tracking-widest text-[#16418C] uppercase font-semibold">
                {featured.tag}
              </span>
              <h3 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A] mt-2 mb-3 group-hover:text-[#16418C] transition leading-snug">
                {featured.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6B8A] leading-relaxed mb-4 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="text-[11px] text-[#7B8AA8] mb-4">
                {featured.date} · {featured.readTime}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto flex items-center gap-1">
                Read complete guide →
              </span>
            </div>
          </Link>

          {/* Right Side Topic Cards - Redirects to section in same blog */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B2452] font-jakarta">
                Explore Chapters & Topics
              </span>
              <span className="text-[11px] text-[#7B8AA8]">
                Jump straight to topic
              </span>
            </div>

            {highlightTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/blogs/${featured.slug}${topic.anchor}`}
                className="bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden grid grid-cols-[115px_1fr] sm:grid-cols-[135px_1fr] flex-1 shadow-xs hover:shadow-lg transition duration-300 group cursor-pointer"
              >
                <div className="relative h-full min-h-[110px] bg-[#EEF2F8] overflow-hidden">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                    {topic.tag}
                  </span>
                </div>
                <div className="p-4 sm:p-5 flex flex-col justify-center">
                  <h4 className="font-jakarta text-xs sm:text-sm font-bold text-[#14203A] group-hover:text-[#16418C] transition leading-snug line-clamp-2">
                    {topic.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] line-clamp-1 mt-1 leading-relaxed">
                    {topic.excerpt}
                  </p>
                  <div className="text-[10px] font-bold text-[#16418C] group-hover:text-[#0B2452] mt-2 flex items-center gap-1">
                    <span>Jump to section</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* View All Chapters & Guide CTA */}
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block border border-[#C3CEE2] hover:border-[#0B2452] text-[#0B2452] hover:bg-[#0B2452] hover:text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition shadow-xs"
          >
            Explore all topics & chapters →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HomeBlogSection;
