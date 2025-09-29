/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
  key: "Content-Security-Policy",
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.botpress.cloud https://files.bpcontent.cloud https://vitals.vercel-insights.com https:;
    style-src 'self' 'unsafe-inline' https://cdn.botpress.cloud https://files.bpcontent.cloud https:;
    img-src 'self' data: https: https://vitals.vercel-insights.com;
    font-src 'self' https: data:;
    connect-src 'self' https: https://vitals.vercel-insights.com;
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
    domains: ["images.unsplash.com", "github.com", "cdn.botpress.cloud", "files.bpcontent.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // primenjuje se na sve rute
        headers: securityHeaders,
        
      },
    ];
  },
};

module.exports = nextConfig;
