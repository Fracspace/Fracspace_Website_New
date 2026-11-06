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
  ExternalLink,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  List
} from "lucide-react";
import { useDownloadApp } from "@/context/DownloadAppContext";
import { blogTopics } from "@/data/blogsData";

export default function EachBlogClient({ post, relatedPosts }) {
  const { openDownloadModal } = useDownloadApp();
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
      <header className="bg-gradient-to-b from-[#071A38] via-[#0B2452] to-[#0E2C68] text-white pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 80px)"
          }}
        ></div>

        <div className="relative max-w-[1100px] mx-auto">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#A9BDE2] mb-6 flex-wrap">
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
              <time dateTime={post.date}>{post.date}</time>
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

          {/* Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
            <span className="text-xs text-[#8FB4FF] font-medium">
              Share this guide:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8FB4FF] font-semibold mr-1">Share:</span>
              <button
                onClick={shareOnWhatsApp}
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0A66C2] text-white flex items-center justify-center transition cursor-pointer"
              >
                <span className="text-xs font-bold">in</span>
              </button>
              <button
                onClick={shareOnTwitter}
                title="Share on X (Twitter)"
                aria-label="Share on X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
              >
                <span className="text-xs font-bold">𝕏</span>
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy link to clipboard"
                aria-label="Copy link to clipboard"
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
      </header>

      {/* Main Content Layout */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Featured Hero Image */}
        <figure className="relative w-full aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden border border-[#E7EBF2] shadow-xl mb-12 bg-[#EEF2F8]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <figcaption className="absolute bottom-4 right-4 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-md">
            Fracspace Insights
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Article Body (8 Columns) */}
          <article className="lg:col-span-8 space-y-8 text-[#334155] leading-relaxed">
            
            {/* Key Takeaways Callout Card */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <section aria-label="Key Takeaways" className="bg-gradient-to-br from-[#F1F5FB] to-[#E8F0FE] border border-[#C5D7F2] rounded-2xl p-6 sm:p-8 shadow-xs">
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
              </section>
            )}

            {/* Mobile Table of Contents (Shown before article body on mobile, hidden on desktop) */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <details
                className="block lg:hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 shadow-xs group"
                open
              >
                <summary className="flex items-center justify-between cursor-pointer font-jakarta text-sm font-bold text-[#0B2452] uppercase tracking-wider list-none select-none">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-[#16418C]" />
                    <span>Table of Contents</span>
                    <span className="text-[11px] font-normal normal-case text-[#64748B] font-manrope">
                      ({post.tableOfContents.length} sections)
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 text-[#16418C]" />
                </summary>
                <nav className="mt-4 pt-3 border-t border-[#E2E8F0] space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {post.tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block text-xs text-[#475569] hover:text-[#16418C] hover:font-semibold transition-colors py-1.5 leading-snug"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </details>
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

                if (block.type === "subheading") {
                  return (
                    <h3
                      key={idx}
                      id={block.id}
                      className="font-jakarta text-lg sm:text-xl font-bold text-[#0B2452] pt-4 pb-1 scroll-mt-24"
                    >
                      {block.text}
                    </h3>
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

                if (block.type === "image") {
                  const propertyLink =
                    block.propertyLink ||
                    (block.tag === "Kerala Asset" || (block.alt && block.alt.includes("Alleppey"))
                      ? "/properties?property=alleppey#property-alleppey"
                      : block.tag === "Karnataka Asset" || (block.alt && block.alt.includes("Manipal"))
                      ? "/properties?property=manipal#property-manipal"
                      : null);

                  return (
                    <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-[#F8FAFC]">
                      <div className="relative aspect-[16/9] w-full bg-[#EEF2F8] group">
                        <Image
                          src={block.src}
                          alt={block.alt || "Fracspace Blog Property Visual"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {block.tag && (
                          <span className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                            {block.tag}
                          </span>
                        )}
                        {propertyLink && (
                          <Link
                            href={propertyLink}
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B2452]/95 hover:bg-[#16418C] text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-xs border border-white/20 transition-all hover:scale-105 cursor-pointer z-10"
                          >
                            <span>Know More</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                      {block.caption && (
                        <figcaption className="p-3.5 bg-white text-xs text-[#5C6B8A] italic text-center border-t border-[#E2E8F0] font-sans">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.type === "table") {
                  return (
                    <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#0B2452] text-white">
                          <tr>
                            {block.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-4 sm:px-6 py-3.5 font-jakarta font-bold text-xs uppercase tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] bg-white">
                          {block.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`px-4 sm:px-6 py-3.5 ${cIdx === 0 ? "font-bold text-[#0B2452]" : "text-[#475569]"}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                if (block.type === "callout") {
                  return (
                    <div
                      key={idx}
                      className="my-6 p-6 rounded-2xl bg-gradient-to-br from-[#F0F5FF] to-[#E9F0FE] border-l-4 border-[#16418C] shadow-xs space-y-2.5"
                    >
                      {block.title && (
                        <h4 className="font-jakarta font-bold text-sm sm:text-base text-[#0B2452] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#16418C]" />
                          <span>{block.title}</span>
                        </h4>
                      )}
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {block.text}
                      </p>
                      {block.details && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                          {block.details.map((d, dIdx) => (
                            <div key={dIdx} className="bg-white p-3 rounded-xl border border-[#D5E2F7] shadow-2xs">
                              <div className="text-[10px] text-[#64748B] font-semibold uppercase">{d.label}</div>
                              <div className="text-xs sm:text-sm font-bold text-[#0B2452] mt-0.5">{d.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (block.type === "propertyCard") {
                  const propertyLink =
                    block.propertyLink ||
                    (block.name?.includes("Alleppey")
                      ? "/properties?property=alleppey#property-alleppey"
                      : block.name?.includes("Manipal")
                      ? "/properties?property=manipal#property-manipal"
                      : "/properties");

                  return (
                    <div
                      key={idx}
                      className="my-8 bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] border border-[#C9DCF8] rounded-3xl p-6 sm:p-7 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                    >
                      <div className="md:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xs bg-[#E2E8F0]">
                        <Image
                          src={block.image}
                          alt={block.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#0B2452] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                          {block.location}
                        </span>
                      </div>
                      <div className="md:col-span-7 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="font-mono-plex text-[10px] uppercase tracking-widest text-[#16418C] font-semibold">
                            Fracspace Property Spotlight
                          </span>
                          <h4 className="font-jakarta text-lg sm:text-xl font-bold text-[#0B2452] mt-0.5">
                            {block.name}
                          </h4>
                          <p className="text-xs text-[#5C6B8A] leading-relaxed mt-1">
                            {block.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 py-1">
                          <div className="bg-white px-3 py-2 rounded-xl border border-[#D8E4F7]">
                            <span className="text-[10px] text-[#7B8AA8] uppercase font-semibold">Starting From</span>
                            <div className="text-xs sm:text-sm font-bold text-[#0B2452]">{block.ticketSize}</div>
                          </div>
                          <div className="bg-white px-3 py-2 rounded-xl border border-[#D8E4F7]">
                            <span className="text-[10px] text-[#7B8AA8] uppercase font-semibold">Asset Type</span>
                            <div className="text-xs sm:text-sm font-bold text-[#16418C] truncate">{block.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <Link
                            href={propertyLink}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B2452] hover:bg-[#16418C] text-white text-xs font-bold rounded-full transition shadow-xs cursor-pointer"
                          >
                            <span>Know More</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={openDownloadModal}
                            className="px-4 py-2 bg-white hover:bg-[#EEF4FF] border border-[#16418C]/30 text-[#0B2452] text-xs font-semibold rounded-full transition cursor-pointer"
                          >
                            Download App
                          </button>
                        </div>
                      </div>
                    </div>
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
              <figure className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md my-8 bg-[#F8FAFC]">
                <Image
                  src={post.secondaryImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </figure>
            )}

            {/* Interactive FAQs Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section id="faqs" aria-label="Frequently Asked Questions" className="mt-12 pt-8 border-t border-[#E2E8F0] scroll-mt-24">
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 bg-[#0B2452] text-white rounded-xl shadow-xs">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                      Got Questions?
                    </span>
                    <h2 className="font-jakarta text-xl sm:text-2xl font-bold text-[#14203A]">
                      Frequently Asked Questions
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {post.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-xs transition"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-jakarta text-sm sm:text-base font-bold text-[#0B2452] hover:bg-[#F8FAFC] transition cursor-pointer gap-4"
                        >
                          <span>{faq.question}</span>
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 bg-[#0B2452] text-white" : "bg-[#EEF2F8] text-[#0B2452]"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] bg-[#FAFCFF]">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Post Footer & Back Link */}
            <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
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
            
            {/* Desktop Table of Contents Widget (Hidden on mobile) */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="hidden lg:block bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-6 shadow-xs max-h-[70vh] overflow-y-auto">
                <h3 className="font-jakarta text-sm font-bold text-[#0B2452] uppercase tracking-wider mb-4 pb-2 border-b border-[#E2E8F0]">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block text-xs text-[#475569] hover:text-[#16418C] hover:font-semibold transition-colors py-1 leading-snug"
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

          </aside>

        </div>

      </main>

      {/* Related Full Articles Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white border-t border-[#E2E8F0] py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                  Comprehensive Publications
                </span>
                <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mt-1">
                  More Research Guides & Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition self-start sm:self-auto"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-[16/9] bg-[#EEF2F8] overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0B2452] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {rel.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#0B2452] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {rel.readTime}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-[11px] text-[#7B8AA8] mb-2">
                      {rel.date}
                    </div>
                    <h3 className="font-jakarta text-lg font-bold text-[#14203A] group-hover:text-[#16418C] transition leading-snug line-clamp-2 mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#5C6B8A] line-clamp-2 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                    <span className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto flex items-center gap-1">
                      Read complete article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guide Chapters & Deep Dives Bottom Grid */}
      {blogTopics && blogTopics.length > 0 && (
        <section className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <span className="font-mono-plex text-xs uppercase tracking-widest text-[#16418C] font-semibold">
                  Guide Chapters & Deep Dives
                </span>
                <h2 className="font-jakarta text-2xl sm:text-3xl font-bold text-[#14203A] mt-1">
                  Explore Topics Across Guides
                </h2>
              </div>
              <Link
                href="/blogs#jump-to-sections"
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#16418C] hover:text-[#0B2452] transition self-start sm:self-auto"
              >
                <span>View all topic chapters</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogTopics.slice(0, 6).map((topic, idx) => {
                const targetUrl =
                  topic.blogSlug === post.slug
                    ? topic.anchor
                    : `/blogs/${topic.blogSlug || "what-is-fractional-ownership-in-real-estate"}${topic.anchor}`;
                return (
                  <Link
                    key={idx}
                    href={targetUrl}
                    className="group bg-white border border-[#E2E8F0] hover:border-[#16418C] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] bg-[#EEF2F8] overflow-hidden">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0B2452]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {topic.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#0B2452] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {topic.readTime}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-[10px] font-mono-plex uppercase tracking-wider text-[#16418C] mb-2 font-semibold">
                        {topic.category}
                      </div>
                      <h3 className="font-jakarta text-base font-bold text-[#14203A] group-hover:text-[#16418C] transition leading-snug line-clamp-2 mb-3">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-4">
                        {topic.excerpt}
                      </p>
                      <span className="text-xs font-bold text-[#16418C] group-hover:text-[#0B2452] mt-auto flex items-center gap-1">
                        Jump to section →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
