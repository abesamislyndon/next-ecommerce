/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
      {
        source: "/api/customer/:path*",
        destination: "http://localhost:8000/api/customer/:path*", // Proxy to Backend
      },
      {
        source: "/userprofile/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
      // Make sure this rewrites rule comes after NextAuth's paths
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
