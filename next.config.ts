import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://country-flags.vercel.sh/s/*.svg")],
  },
};

export default nextConfig;
