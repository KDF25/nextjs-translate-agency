// next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'translation-site.s3.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;