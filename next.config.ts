import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com/**",
      },
    ],
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
  
  webpack: (config, { isServer }) => {
    // Fix for RainbowKit/Wagmi in Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        encoding: false,
      };
    }

    // Ignore optional dependencies that cause warnings
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Fix for MetaMask SDK
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };

    return config;
  },
};

export default nextConfig;
