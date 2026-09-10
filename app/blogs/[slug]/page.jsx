import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogsData, getBlogBySlug, getRelatedBlogs } from "@/data/blogsData";
import EachBlogClient from "./EachBlogClient";

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams?.slug);
  if (!post) {
    return {
      title: "Blog Not Found | Fracspace"
    };
  }

  return {
    title: `${post.title} | Fracspace Insights`,
    description: post.excerpt
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams?.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogs(post.slug, 3);

  return <EachBlogClient post={post} relatedPosts={related} />;
}
