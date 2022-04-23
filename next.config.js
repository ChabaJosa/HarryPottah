const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    keepWaiaitng: true,
    disable: process.env.NODE_ENV === 'development'
  },
};
module.exports = nextConfig;
