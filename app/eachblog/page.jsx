"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { blogsData, getBlogBySlug, getRelatedBlogs } from "@/data/blogsData";
import EachBlogClient from "../blogs/[slug]/EachBlogClient";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

function EachBlogContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || searchParams.get("id");

  const post = slug ? (getBlogBySlug(slug) || blogsData.find(b => b.id === slug)) : blogsData[0];

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-manrope">
        <h2 className="font-jakarta text-2xl font-bold text-[#14203A] mb-2">
          Article Not Found
        </h2>
        <p className="text-sm text-[#64748B] mb-6">
          The requested article could not be found.
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B2452] text-white rounded-full text-xs font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>
      </div>
    );
  }

  const related = getRelatedBlogs(post.slug, 3);

  return <EachBlogClient post={post} relatedPosts={related} />;
}

export default function EachBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#0B2452] animate-spin" />
        </div>
      }
    >
      <EachBlogContent />
    </Suspense>
  );
}
