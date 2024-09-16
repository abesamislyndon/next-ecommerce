import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
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
        destination: "https://exhibitmedia.sg/web/public/kimengseng/api/:path*", // Proxy to Backend
       // "http://localhost:8000/api/:path*",
        //destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
      {
        source: "/api/customer/:path*",
        destination:"https://exhibitmedia.sg/web/public/kimengseng/api/customer/:path*", // Proxy to Backend
       // "http://localhost:8000/api/customer/:path*",
      },
      {
        source: "/userprofile/api/:path*",
        destination: "https://exhibitmedia.sg/web/public/kimengseng/api/:path*", // Proxy to Backend
        //"http://localhost:8000/api/:path*",
      },
      // Make sure this rewrites rule comes after NextAuth's paths
      {
        source: "/api/:path*",
        destination: "https://exhibitmedia.sg/web/public/kimengseng/api/:path*", // Proxy to Backend
        //"http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in the development environment
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
})(nextConfig);
