// next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "static.wixstatic.com",
      // 
      "miro.medium.com",
      "iswift2bucket.s3.amazonaws.com",
      "translation-site.s3.amazonaws.com",
      
    ],
  },
};

module.exports = nextConfig;
