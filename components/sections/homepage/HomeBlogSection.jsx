"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogsData, blogTopics } from "@/data/blogsData";
import { ArrowRight, BookOpen, Compass } from "lucide-react";

function HomeBlogSection() {
  const blogs = blogsData.slice(0, 3);

  // Key topic highlights for direct jumping
  const highlightTopics = [
    blogTopics.find((t) => t.id === "under10-comparison-table") || blogTopics[0],
    blogTopics.find((t) => t.id === "vs-detailed-table") || blogTopics[5],
    blogTopics.find((t) => t.id === "under10-reits-way") || blogTopics[1],
    blogTopics.find((t) => t.id === "vs-alleppey-resort") || blogTopics[7]
  ].filter(Boolean);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F9FC] font-manrope">
      <div className="max-w-[1180px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#16418C] font-semibold font-mono-plex mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Fracspace Insights</span>
            </div>
            <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14203A]">
              Ideas for smarter property ownership
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B8A] mt-2 max-w-2xl">
              Read comprehensive research guides, low-budget investment routes, and comparisons on luxury fractional real estate in India.
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition shrink-0"
          >
            <span>Explore all articles & topics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1. Featured Complete Blog Articles (Side-by-Side Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="bg-white border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/9] bg-[#EEF2F8] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#0B2452] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {blog.tag}
                  </span>
                  {idx === 0 && (
                    <span className="bg-emerald-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md">
                      New Article
                    </span>
                  )}
                </div>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#0B2452] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {blog.readTime}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] text-[#7B8AA8] mb-2 font-mono-plex">
                  <span className="uppercase tracking-wider text-[#16418C] font-semibold">
                    Complete Guide
                  </span>
                  <span>·</span>
                  <span>{blog.date}</span>
                </div>

                <h3 className="font-jakarta text-lg sm:text-xl font-bold text-[#14203A] mb-2.5 group-hover:text-[#16418C] transition leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C6B8A] leading-relaxed mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs sm:text-sm font-bold text-[#16418C] group-hover:text-[#0B2452]">
                  <span>Read full guide</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 2. Jump Straight to Key Topics (Quick Chapters Section) */}
        <div className="bg-white border border-[#E7EBF2] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#0B2452] text-white">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A]">
                  Jump Straight to Popular Topics
                </h3>
                <p className="text-xs text-[#64748B]">
                  Click to open the exact section inside our published guides
                </p>
              </div>
            </div>
            <Link
              href="/blogs#jump-to-sections"
              className="text-xs font-bold text-[#16418C] hover:text-[#0B2452] transition self-start sm:self-auto"
            >
              View all chapters →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlightTopics.map((topic) => {
              const targetUrl = `/blogs/${topic.blogSlug || "what-is-fractional-ownership-in-real-estate"}${topic.anchor}`;
              return (
                <Link
                  key={topic.id}
                  href={targetUrl}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#16418C] rounded-xl p-4 flex flex-col group transition hover:shadow-md cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-[#EEF2F8]">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 bg-[#0B2452]/90 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {topic.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono-plex uppercase text-[#16418C] font-semibold mb-1">
                    {topic.category}
                  </span>

                  <h4 className="font-jakarta text-xs sm:text-[13px] font-bold text-[#14203A] group-hover:text-[#16418C] transition leading-snug line-clamp-2 mb-2">
                    {topic.title}
                  </h4>

                  <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed mb-3">
                    {topic.excerpt}
                  </p>

                  <div className="mt-auto pt-2 border-t border-[#EEF2F6] text-[11px] font-bold text-[#16418C] group-hover:text-[#0B2452] flex items-center justify-between">
                    <span>Jump to section</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block border border-[#C3CEE2] hover:border-[#0B2452] text-[#0B2452] hover:bg-[#0B2452] hover:text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold transition shadow-xs"
          >
            Explore all articles & chapters →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default HomeBlogSection;
