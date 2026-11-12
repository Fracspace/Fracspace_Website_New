import React from "react";
import { notFound } from "next/navigation";
import { blogsData, getBlogBySlug, getRelatedBlogs } from "@/data/blogsData";
import EachBlogClient from "./EachBlogClient";

export async function generateStaticParams() {
  const params = [];
  blogsData.forEach((post) => {
    params.push({ slug: post.slug });
    if (post.aliases && Array.isArray(post.aliases)) {
      post.aliases.forEach((alias) => {
        params.push({ slug: alias });
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams?.slug);
  if (!post) {
    return {
      title: "Article Not Found | Fracspace Insights"
    };
  }

  const siteUrl = "https://fracspace.com";
  const canonicalUrl = `${siteUrl}/blogs/${post.slug}`;
  const ogImageFilename =
    post.slug === "real-estate-investment-under-10-lakh-smart-ways-to-invest-in-india"
      ? "real-estate-investment-under-10-lakh.webp"
      : post.slug === "fractional-ownership-vs-buying-a-property"
      ? "fractional-ownership-vs-buying.webp"
      : "fractional-ownership-guide.jpg";
  const ogImageUrl = post.ogImage || `${siteUrl}/blogs/${ogImageFilename}`;
  const titleText = post.metaTitle || `${post.title} | Fracspace`;
  const descriptionText = post.metaDescription || post.excerpt;

  return {
    title: titleText,
    description: descriptionText,
    keywords: [
      post.focusKeyword,
      ...(post.secondaryKeywords || []),
      post.tag,
      "Fractional Ownership India",
      "Real Estate Co-ownership",
      "Holiday Home Investment",
      "Fracspace Guide",
      "Real Estate Yields India"
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: canonicalUrl,
      siteName: "Fracspace",
      type: "article",
      publishedTime: post.date,
      authors: ["Fracspace"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: [ogImageUrl]
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams?.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogs(post.slug, 3);
  const siteUrl = "https://fracspace.com";

  // Article Structured Data
  const allKeywords = [
    post.focusKeyword,
    ...(post.secondaryKeywords || [])
  ].filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: allKeywords.join(", "),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${post.slug}`
    },
    author: {
      "@type": "Organization",
      name: "Fracspace",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Fracspace",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/logo.png`
      }
    },
    image:
      post.ogImage ||
      `${siteUrl}/blogs/${
        post.slug === "real-estate-investment-under-10-lakh-smart-ways-to-invest-in-india"
          ? "real-estate-investment-under-10-lakh.webp"
          : post.slug === "fractional-ownership-vs-buying-a-property"
          ? "fractional-ownership-vs-buying.webp"
          : "fractional-ownership-guide.jpg"
      }`
  };

  // Breadcrumb Structured Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteUrl}/blogs`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blogs/${post.slug}`
      }
    ]
  };

  // FAQ Schema if FAQs exist
  let faqSchema = null;
  if (post.faqs && post.faqs.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <EachBlogClient post={post} relatedPosts={related} />
    </>
  );
}
