// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

// module.exports = nextConfig;

module.exports = {
  experimental: {
    appDir: true,
  },
};

