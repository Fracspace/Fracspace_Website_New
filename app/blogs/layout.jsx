export const metadata = {
  title: "Real Estate & Co-Ownership Blogs | Fracspace Insights",
  description:
    "Explore the latest insights, investor guides, market trends, and legal frameworks for fractional property ownership, luxury vacation homes, and high-yield real estate in India.",
  keywords: [
    "Fractional Ownership India",
    "Real Estate Investment Blogs",
    "Co-ownership Vacation Homes",
    "Holiday Home Investment Goa Kerala",
    "Fracspace Insights",
    "Real Estate Yields India"
  ],
  alternates: {
    canonical: "https://fracspace.com/blogs"
  },
  openGraph: {
    title: "Real Estate & Co-Ownership Blogs | Fracspace Insights",
    description:
      "Explore expert guides, market trends, and legal frameworks for fractional real estate ownership in India.",
    url: "https://fracspace.com/blogs",
    siteName: "Fracspace",
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate & Co-Ownership Blogs | Fracspace Insights",
    description:
      "Explore expert guides, market trends, and legal frameworks for fractional real estate ownership in India."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function BlogsLayout({ children }) {
  return children;
}
