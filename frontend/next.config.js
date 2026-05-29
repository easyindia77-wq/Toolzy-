/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.toolzy.online/api/:path*",
      },
    ];
  },

  env: {
    SITE_URL: "https://toolzy.online",
    API_URL: "https://api.toolzy.online",
  },
};

module.exports = nextConfig;
