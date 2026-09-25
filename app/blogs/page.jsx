"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogsData } from "@/data/blogsData";

function BlogsPage() {
  return null;
  /*
  const [selectedTopic, setSelectedTopic] = useState("All topics");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const topics = [
    "All topics",
    "Guides",
    "Co-ownership",
    "Market trends",
    "Tax & Legal",
    "Destinations"
  ];

  const featuredPost = blogsData[0];
  const otherPosts = blogsData.slice(1);

  const filteredPosts =
    selectedTopic === "All topics"
      ? otherPosts
      : otherPosts.filter((p) => p.tag === selectedTopic);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <main className="w-full font-manrope">
      
      {/* Hero Section */}
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
            Fracspace insights
          </span>
          <h1 className="font-jakarta text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-tight">
            Ideas for smarter property ownership
          </h1>
          <p className="text-base sm:text-lg text-[#B7C6E4] max-w-2xl mx-auto leading-relaxed">
            Guides, market analysis and frameworks for investors exploring fractional ownership and destination real estate in India.
          </p>

          {/* Topic Filter Tabs */}
          <div className="flex gap-2.5 justify-center flex-wrap pt-6">
            {topics.map((t) => {
              const active = selectedTopic === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "bg-white text-[#0B2452] shadow-md"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Lead Article */}
      {featuredPost && (
        <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-[1180px] mx-auto">
            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="block bg-[#F7F9FC] border border-[#E7EBF2] hover:border-[#16418C] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 transition duration-300 hover:shadow-xl group cursor-pointer"
            >
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[280px] bg-[#EEF2F8] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#0B2452] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md">
                  Featured Guide
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

                <span className="text-sm font-bold text-[#16418C] group-hover:text-[#0B2452] flex items-center gap-1 mt-auto">
                  Read complete guide →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7EBF2]">
            <h3 className="font-jakarta text-xl font-bold text-[#14203A]">
              {selectedTopic === "All topics" ? "All Articles" : selectedTopic}
            </h3>
            <span className="text-xs text-[#7B8AA8]">
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="border border-[#E7EBF2] hover:border-[#16418C] rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-[#EEF2F8] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                    {post.tag}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[11px] text-[#7B8AA8] mb-2 font-medium">
                    {post.date} · {post.readTime}
                  </div>

                  <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#14203A] mb-3 group-hover:text-[#16418C] transition leading-snug line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#5C6B8A] mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto pt-2 flex items-center gap-1">
                    Read article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Banner */}
      <section className="pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1180px] mx-auto bg-gradient-to-r from-[#0A1F42] via-[#0E2C68] to-[#14357A] rounded-3xl p-8 sm:p-12 lg:p-14 text-white text-center shadow-xl">
          <span className="font-mono-plex text-xs uppercase tracking-widest text-[#8FADE2] font-semibold">
            Stay informed
          </span>
          <h2 className="font-jakarta text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 mb-3">
            Get market insights directly to your inbox
          </h2>
          <p className="text-sm sm:text-base text-[#B7C6E4] max-w-xl mx-auto mb-8 leading-relaxed">
            Monthly analysis on destination real estate, regulatory updates and newly launched fractional assets. No spam, ever.
          </p>

          {newsletterSubscribed ? (
            <div className="inline-block bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm font-semibold text-[#8FB4FF]">
              ✓ You are subscribed to Fracspace Insights!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 focus:bg-white focus:text-[#14203A] border border-white/20 focus:border-white rounded-full px-5 py-3 text-sm text-white placeholder:text-[#A9BDE2] outline-none transition"
              />
              <button
                type="submit"
                className="bg-white hover:bg-[#DCE7FF] text-[#0B2452] font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition shadow-md cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  );
  */
}

export default BlogsPage;
