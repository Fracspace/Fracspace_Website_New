import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "duixj37yn5405.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "d1nj26fz89n9xw.cloudfront.net"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/meetourteam",
        destination: "/about",
        permanent: true
      },
      {
        source: '/howitworks',
        destination: '/',
        permanent: true, // 301 redirect
      },
    ];
  }
};

export default nextConfig;


