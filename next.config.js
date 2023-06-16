/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    RAPID_KEY: process.env.RAPID_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  images: {
    domains: ["i.scdn.co"],
    unoptimized: true,
  },
  async redirects() {
    return [
      // if the cookie `access_token` is present,
      // this redirect will NOT be applied
      {
        source: "/",
        missing: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;
