import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beehiiv-images-production.s3.amazonaws.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
