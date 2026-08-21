import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
  }
};

export default nextConfig;
