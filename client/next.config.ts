/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.180',
        port: '1337',        // your Strapi port
        pathname: '/uploads/**', // match all uploaded images
      },
    ],
  },
};

module.exports = nextConfig;
