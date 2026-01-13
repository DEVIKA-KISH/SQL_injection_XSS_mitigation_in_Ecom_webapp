import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['m.media-amazon.com'], // Add the allowed image domain
  },
};

export default nextConfig;
