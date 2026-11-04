"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { approvedBlog, blogTopics } from "@/data/blogsData";
import { ArrowRight, BookOpen } from "lucide-react";
import BottomBanner from "@/components/sections/homepage/BottomBanner";

function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All topics");

  const categories = [
    "All topics",
    "Basics",
    "How It Works",
    "Yields & Returns",
    "Comparisons",
    "Destinations",
    "Legal & Safety"
  ];

  const featuredPost = approvedBlog;

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
            Everything you need to know about fractional real estate, luxury vacation home co-ownership, yields, and legal safety in India.
          </p>

          {/* Topic Filter Tabs */}
          <div className="flex gap-2.5 justify-center flex-wrap pt-6">
            {categories.map((c) => {
              const active = selectedCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "bg-white text-[#0B2452] shadow-md"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Article */}
      {featuredPost && (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7EBF2]">
          <div className="max-w-[1180px] mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 rounded-lg bg-[#0B2452] text-white">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#16418C] font-mono-plex">
                Featured Complete Guide
              </span>
            </div>

            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="block bg-[#F7F9FC] border border-[#E7EBF2] hover:border-[#16418C] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 transition duration-300 hover:shadow-xl group cursor-pointer"
            >
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-[#EEF2F8] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#0B2452] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                  Featured Master Guide
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs text-[#7B8AA8] mb-3">
                  <span className="font-mono-plex uppercase tracking-widest text-[#16418C] font-semibold">
                    {featuredPost.tag}
                  </span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mb-4 group-hover:text-[#16418C] transition leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-[#5C6B8A] leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto">
                  <span>Read full guide from beginning</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Guide Chapters & Topics Grid - Cards redirect to specific section in the blog */}
      <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7EBF2] gap-2">
            <div>
              <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                Chapters & Deep Dives
              </span>
              <h3 className="font-jakarta text-2xl font-bold text-[#14203A] mt-1">
                {selectedCategory === "All topics" ? "All Guide Chapters & Topics" : `${selectedCategory} Chapters`}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Click any topic card to jump directly to that specific section in the complete guide.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#7B8AA8] bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0]">
              {filteredTopics.length} {filteredTopics.length === 1 ? "topic" : "topics"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/blogs/${featuredPost.slug}${topic.anchor}`}
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
                  <div className="text-[11px] font-mono-plex uppercase tracking-wider text-[#16418C] mb-2 font-semibold">
                    {topic.category}
                  </div>

                  <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mb-3 group-hover:text-[#16418C] transition leading-snug line-clamp-2">
                    {topic.title}
                  </h4>

                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#5C6B8A] mb-4 line-clamp-2">
                    {topic.excerpt}
                  </p>

                  <div className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto pt-2 flex items-center justify-between border-t border-[#F1F5F9]">
                    <span>Jump to section</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <BottomBanner />

    </main>
  );
}

export default BlogsPage;
