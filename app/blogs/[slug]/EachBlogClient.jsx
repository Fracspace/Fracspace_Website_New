"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Copy, 
  ChevronRight, 
  ArrowLeft, 
  Bookmark, 
  Sparkles, 
  TrendingUp, 
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { useDownloadApp } from "@/context/DownloadAppContext";

export default function EachBlogClient({ post, relatedPosts }) {
  const { openDownloadModal } = useDownloadApp();
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(post.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${post.title} - ${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  return (
    <div className="w-full bg-white font-manrope">
      
      {/* Top Breadcrumbs & Header Section */}
      <section className="bg-gradient-to-b from-[#071A38] via-[#0B2452] to-[#0E2C68] text-white pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 80px)"
          }}
        ></div>

        <div className="relative max-w-[1100px] mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#A9BDE2] mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link href="/blogs" className="hover:text-white transition">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#8FB4FF] font-semibold">{post.tag}</span>
          </nav>

          {/* Tag & Metadata Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#16418C] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 shadow-xs">
              {post.tag}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#A9BDE2]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-xs text-[#A9BDE2]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="font-jakarta text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mb-6">
            {post.title}
          </h1>

          {/* Excerpt Subtitle */}
          <p className="text-sm sm:text-lg text-[#B7C6E4] leading-relaxed max-w-3xl mb-8">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/15">
            {/* Author */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#16418C] border-2 border-white/20 flex items-center justify-center font-jakarta font-bold text-sm text-white shadow-md">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-jakarta text-sm font-bold text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-[#8FB4FF]">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8FB4FF] font-semibold mr-1">Share:</span>
              <button
                onClick={shareOnWhatsApp}
                title="Share on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                title="Share on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0A66C2] text-white flex items-center justify-center transition cursor-pointer"
              >
                <span className="text-xs font-bold">in</span>
              </button>
              <button
                onClick={shareOnTwitter}
                title="Share on X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <span className="text-xs font-bold">𝕏</span>
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy link to clipboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white hover:text-[#0B2452] text-xs text-white font-semibold transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Featured Hero Image */}
        <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden border border-[#E7EBF2] shadow-xl mb-12 bg-[#EEF2F8]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-md">
            Fracspace Insights
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Body (8 Columns) */}
          <article className="lg:col-span-8 space-y-8 text-[#334155] leading-relaxed">
            
            {/* Key Takeaways Callout Card */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-gradient-to-br from-[#F1F5FB] to-[#E8F0FE] border border-[#C5D7F2] rounded-2xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#0B2452] font-jakarta font-bold text-base sm:text-lg mb-4">
                  <div className="p-2 rounded-xl bg-[#0B2452] text-white">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <span>Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#16418C] mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dynamic Body Content Blocks */}
            <div className="space-y-6 pt-2 font-dm">
              {post.content.map((block, idx) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={idx}
                      id={block.id}
                      className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A] pt-6 pb-2 border-b border-[#E7EBF2] scroll-mt-24"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "paragraph") {
                  return (
                    <p key={idx} className="text-sm sm:text-base text-[#475569] leading-8 font-light">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={idx}
                      className="my-6 p-6 sm:p-7 rounded-2xl bg-[#0B2452] text-white border-l-4 border-[#6E9BFF] shadow-md"
                    >
                      <p className="font-jakarta text-base sm:text-lg font-semibold italic leading-relaxed text-white/95">
                        “{block.text}”
                      </p>
                      {block.author && (
                        <cite className="block font-mono-plex text-xs text-[#8FB4FF] not-italic mt-3 tracking-wide uppercase">
                          — {block.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                }

                if (block.type === "statsGrid") {
                  return (
                    <div key={idx} className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                      {block.stats.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl text-center shadow-xs"
                        >
                          <div className="font-jakarta text-xl sm:text-2xl font-extrabold text-[#0B2452]">
                            {st.value}
                          </div>
                          <div className="text-[11px] text-[#64748B] font-medium mt-1 leading-snug">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={idx} className="space-y-3.5 my-4">
                      {block.items.map((item, lIdx) => {
                        const isBold = item.startsWith("**");
                        let prefix = "";
                        let rest = item;
                        if (isBold) {
                          const parts = item.split("**");
                          if (parts.length >= 3) {
                            prefix = parts[1];
                            rest = parts.slice(2).join("**");
                          }
                        }
                        return (
                          <li key={lIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#334155] leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-[#E2E8F0] text-[#0B2452] flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                              ✓
                            </span>
                            <span>
                              {prefix && <strong className="text-[#0B2452] font-semibold">{prefix}: </strong>}
                              {rest.replace(/^:\s*/, "")}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                return null;
              })}
            </div>

            {/* Secondary Visual Break (Optional) */}
            {post.secondaryImage && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md my-8 bg-[#F8FAFC]">
                <Image
                  src={post.secondaryImage}
                  alt="Fracspace Co-ownership visual"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Author Biography Box */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 mt-12">
              <div className="w-16 h-16 rounded-full bg-[#0B2452] text-white flex items-center justify-center font-jakarta text-2xl font-bold shrink-0 shadow-md">
                {post.author.name.charAt(0)}
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-widest text-[#16418C] font-mono-plex">
                  About the Author
                </div>
                <h3 className="font-jakarta text-lg font-bold text-[#14203A]">
                  {post.author.name}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {post.author.role}
                </p>
                <p className="text-xs text-[#475569] leading-relaxed pt-1">
                  Specializing in fractional real estate structuring, high-yield vacation rental economics, and innovative property tech across India.
                </p>
              </div>
            </div>

            {/* Post Footer & Back Link */}
            <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B2452] hover:text-[#16418C] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all articles</span>
              </Link>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Link Copied!" : "Share this post"}</span>
              </button>
            </div>

          </article>

          {/* Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Table of Contents Widget */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 shadow-xs">
                <h3 className="font-jakarta text-sm font-bold text-[#0B2452] uppercase tracking-wider mb-4 pb-2 border-b border-[#E2E8F0]">
                  Table of Contents
                </h3>
                <nav className="space-y-2.5">
                  {post.tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block text-xs sm:text-[13px] text-[#475569] hover:text-[#16418C] hover:font-semibold transition-colors py-1 leading-snug"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Explore Properties CTA Card */}
            <div className="bg-gradient-to-br from-[#071A38] to-[#123068] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-white/10 text-[#8FB4FF] px-3 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Assets</span>
                </div>
                <h3 className="font-jakarta text-xl font-bold text-white leading-snug">
                  Start your co-ownership journey today
                </h3>
                <p className="text-xs text-[#A9BDE2] leading-relaxed">
                  Explore verified high-yield properties in Goa, Kerala, Karnataka and Varanasi from ₹10 Lakhs.
                </p>
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/properties"
                    className="w-full inline-block text-center bg-white hover:bg-[#DCE7FF] text-[#0B2452] font-bold py-3 rounded-full text-xs transition shadow-md"
                  >
                    Browse Properties →
                  </Link>
                  <button
                    onClick={openDownloadModal}
                    className="w-full text-center border border-white/25 hover:bg-white/10 text-white font-semibold py-2.5 rounded-full text-xs transition cursor-pointer"
                  >
                    Download App
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Newsletter Box */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs text-center">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#16418C] flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-jakarta text-base font-bold text-[#14203A] mb-1">
                Fracspace Weekly
              </h4>
              <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                Join 5,000+ investors receiving actionable insights on real estate & yields.
              </p>
              {subscribed ? (
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  ✓ Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#14203A] placeholder:text-[#94A3B8] outline-none focus:border-[#16418C]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0B2452] hover:bg-[#16418C] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}
            </div>

          </aside>

        </div>

      </main>

      {/* Related Insights Bottom Carousel/Grid */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                  Keep Reading
                </span>
                <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mt-1">
                  More Insights for You
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition self-start sm:self-auto"
              >
                <span>View all articles</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel, idx) => (
                <Link
                  key={idx}
                  href={`/blogs/${rel.slug}`}
                  className="group bg-white border border-[#E2E8F0] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] bg-[#EEF2F8] overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {rel.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-[11px] text-[#64748B] mb-2 font-medium">
                      {rel.date} · {rel.readTime}
                    </div>
                    <h3 className="font-jakarta text-base font-bold text-[#14203A] group-hover:text-[#16418C] transition leading-snug line-clamp-2 mb-3">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                    <span className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto flex items-center gap-1">
                      Read article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
