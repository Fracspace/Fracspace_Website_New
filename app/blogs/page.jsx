"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogsData, blogTopics } from "@/data/blogsData";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import BottomBanner from "@/components/sections/homepage/BottomBanner";

function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All topics");

  const categories = [
    "All topics",
    "Basics",
    "Comparisons",
    "How It Works",
    "Yields & Returns",
    "Destinations",
    "Legal & Safety"
  ];

  const filteredTopics =
    selectedCategory === "All topics"
      ? blogTopics
      : blogTopics.filter((t) => t.category === selectedCategory);

  return (
    <main className="w-full font-manrope">

      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-r from-[#071A38] via-[#0B2452] to-[#16418C] text-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 84px)"
          }}
        ></div>

        <div className="relative max-w-[1180px] mx-auto text-center space-y-4">
          <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
            Fracspace Insights & Comprehensive Guides
          </span>
          <h1 className="font-jakarta text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-tight">
            Ideas for smarter property ownership
          </h1>
          <p className="text-base sm:text-lg text-[#B7C6E4] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about fractional real estate, luxury vacation home co-ownership, yields, comparisons, and legal safety in India.
          </p>

          {/* Quick Section Switcher / Jump Anchors */}
          <div className="flex gap-3 justify-center flex-wrap pt-6">
            <a
              href="#all-blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#0B2452] hover:bg-[#E8F0FE] shadow-md transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#16418C]" />
              <span>Full Blog Articles ({blogsData.length})</span>
            </a>
            <a
              href="#jump-to-sections"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#8FADE2]" />
              <span>Jump to Chapters & Topics ({blogTopics.length})</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: FULL BLOG ARTICLES (Complete In-Depth Guides)
          Differentiated from quick section jumps below
      ========================================================================== */}
      <section id="all-blogs" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7EBF2] scroll-mt-12">
        <div className="max-w-[1180px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7EBF2] gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#16418C] font-mono-plex mb-1">
                <BookOpen className="w-4 h-4 text-[#16418C]" />
                <span>Full Publications</span>
              </div>
              <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14203A]">
                All Blog Articles & Guides
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6B8A] mt-1.5 max-w-2xl">
                Read our complete, long-form articles comparing property ownership structures, yields, legal due diligence, and curated vacation destinations.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0B2452] bg-[#EEF2F8] px-3.5 py-1.5 rounded-full border border-[#D5E2F7] self-start sm:self-auto">
              {blogsData.length} Complete {blogsData.length === 1 ? "Article" : "Articles"}
            </span>
          </div>

          {/* Grid of Complete Blog Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogsData.map((blog, idx) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group bg-[#F7F9FC] border border-[#E7EBF2] hover:border-[#16418C] rounded-3xl overflow-hidden flex flex-col shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-[#EEF2F8] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority={idx === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#0B2452] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                      {blog.tag}
                    </span>
                    {idx === 0 && (
                      <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                        Latest Post
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#0B2452] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {blog.readTime}
                  </span>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#7B8AA8] mb-3">
                    <span className="font-mono-plex uppercase tracking-wider text-[#16418C] font-semibold">
                      Complete Article
                    </span>
                    <span>·</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A] mb-3 group-hover:text-[#16418C] transition leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C6B8A] leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto pt-4 border-t border-[#E7EBF2]">
                    <span>Read full article from beginning</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: JUMP TO SECTIONS & TOPIC CHAPTERS
          Clearly distinct: Cards jump to an anchor inside a specific blog guide
      ========================================================================== */}
      <section id="jump-to-sections" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] scroll-mt-12">
        <div className="max-w-[1180px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7EBF2] gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#16418C] font-mono-plex mb-1">
                <Compass className="w-4 h-4 text-[#16418C]" />
                <span>Direct Navigation</span>
              </div>
              <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14203A]">
                Jump Directly to Chapters & Deep Dives
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-2xl">
                Short on time or looking for a specific topic? Click any chapter below to jump straight to that section inside our published guides.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#7B8AA8] bg-white px-3.5 py-1.5 rounded-full border border-[#E2E8F0] self-start sm:self-auto shadow-2xs">
              {filteredTopics.length} {filteredTopics.length === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>

          {/* Topic Category Filter Tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((c) => {
              const active = selectedCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${active
                      ? "bg-[#0B2452] text-white shadow-xs"
                      : "bg-white text-[#5C6B8A] border border-[#E2E8F0] hover:border-[#0B2452] hover:text-[#0B2452]"
                    }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Grid of Chapter Jump Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => {
              const targetUrl = `/blogs/${topic.blogSlug || "what-is-fractional-ownership-in-real-estate"}${topic.anchor}`;

              return (
                <Link
                  key={topic.id}
                  href={targetUrl}
                  className="border border-[#E2E8F0] hover:border-[#16418C] rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] bg-[#EEF2F8] overflow-hidden">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                      {topic.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#0B2452] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {topic.readTime}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono-plex uppercase tracking-wider text-[#16418C] font-semibold">
                        {topic.category}
                      </span>
                      {topic.blogTitle && (
                        <span className="text-[10px] text-[#7B8AA8] truncate max-w-[140px]">
                          {topic.blogTitle}
                        </span>
                      )}
                    </div>

                    <h3 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mb-3 group-hover:text-[#16418C] transition leading-snug line-clamp-2">
                      {topic.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#5C6B8A] mb-4 line-clamp-2">
                      {topic.excerpt}
                    </p>

                    <div className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto pt-3 flex items-center justify-between border-t border-[#F1F5F9]">
                      <span className="inline-flex items-center gap-1">
                        <span>Jump to section</span>
                        <span className="font-mono text-[10px] opacity-70">({topic.anchor})</span>
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* App Download Banner */}
      <BottomBanner />

    </main>
  );
}

export default BlogsPage;
