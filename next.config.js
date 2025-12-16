/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.botpress.cloud https://files.bpcontent.cloud https://vitals.vercel-insights.com https:;
      style-src 'self' 'unsafe-inline' https://cdn.botpress.cloud https://files.bpcontent.cloud https: data:;
      img-src 'self' data: https: https://vitals.vercel-insights.com;
      font-src 'self' https: data:;
      connect-src 'self' https: https://vitals.vercel-insights.com https://messaging.botpress.cloud wss://messaging.botpress.cloud;
      media-src 'self' data: https:;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s{2,}/g, " "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.botpress.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.bpcontent.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      // ✅ Dodaj MIME type za manifest.webmanifest
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },

      // ✅ Security headers (kao i do sada)
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
