/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    RAPID_KEY1: process.env.RAPID_KEY1,
    RAPID_KEY2: process.env.RAPID_KEY2,
    RAPID_KEY3: process.env.RAPID_KEY3,
    RAPID_KEY4: process.env.RAPID_KEY4,
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
