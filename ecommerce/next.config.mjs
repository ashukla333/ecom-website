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
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable HMR optimization in development mode
      config.optimization = {
        minimize: false,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          cacheGroups: {
            default: false,
          },
        },
      };

      // Enable faster builds with webpack polling
      config.watchOptions = {
        poll: 300, // Check for changes every 300 milliseconds
        aggregateTimeout: 100, // Delay rebuild after the first change for 100 milliseconds
      };
    }

    return config;
  },
};

export default nextConfig;
