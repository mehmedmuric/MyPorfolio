/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  i18n: {
    locales: ['en', 'sr', 'de', 'it', 'fr'],
    defaultLocale: 'en',
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
