import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "deacon-pupil-lend.ngrok-free.dev"],
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org", pathname: "/b/isbn/**" },
      { protocol: "https", hostname: "image-cdn-ak.spotifycdn.com", pathname: "/image/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
