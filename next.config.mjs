// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/user/login",
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
