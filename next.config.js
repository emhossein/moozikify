/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    RAPID_KEY: process.env.RAPID_KEY,
  },
};

module.exports = nextConfig;
