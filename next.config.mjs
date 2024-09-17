import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production"; // Check if environment is production

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   removeConsole: isProd, // Remove console.log in production
  // },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/user/login",
      },
      {
        source: "/signup",
        destination: "/user/signup",
      },
      {
        source: "/reset",
        destination: "/user/reset",
      },
      {
        source: "/category/api/:path*",
        destination: isProd
          ? "https://exhibitmedia.sg/web/public/kimengseng/api/:path*" // Production URL
          : "http://localhost:8000/api/:path*", // Development URL
      },
      {
        source: "/api/customer/:path*",
        destination: isProd
          ? "https://exhibitmedia.sg/web/public/kimengseng/api/customer/:path*"
          : "http://localhost:8000/api/customer/:path*",
      },
      {
        source: "/userprofile/api/:path*",
        destination: isProd
          ? "https://exhibitmedia.sg/web/public/kimengseng/api/:path*"
          : "http://localhost:8000/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: isProd
          ? "https://exhibitmedia.sg/web/public/kimengseng/api/:path*"
          : "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  disable: !isProd, // Disable PWA in development
  register: true,
  skipWaiting: true,
})(nextConfig);
