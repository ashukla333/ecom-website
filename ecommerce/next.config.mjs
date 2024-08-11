/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL || "https://localhost:3000",
  },
  images: {
    domains: ["localhost:3000","localhost"],
    unoptimized:true
  },
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 200,
    };
    return config;
  },
};

export default nextConfig;
