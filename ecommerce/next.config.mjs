/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL || "https://localhost:3000",
  },
  images: {
    domains: ["localhost:3000", "localhost"],
    unoptimized: true,
  }
};

export default nextConfig;
