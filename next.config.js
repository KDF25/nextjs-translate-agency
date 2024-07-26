// next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "static.wixstatic.com",
      "venconbucket.s3.eu-north-1.amazonaws.com",
      "venconbucket.s3.amazonaws.com",
      // 
      "miro.medium.com",
      "venconbucket.s3.amazonaws.com",
      "iswift2bucket.s3.amazonaws.com",
      "translation-site.s3.amazonaws.com"
      
    ],
  },
};

module.exports = nextConfig;
