import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/ackee/:path*',
        destination: 'http://localhost:3002/:path*',
      },
    ]
  },
};

export default withNextIntl(nextConfig);
