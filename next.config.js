/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [`${process.env.IMAGES_DOMAIN}` || 'localhost'],
  },
};

module.exports = nextConfig;
