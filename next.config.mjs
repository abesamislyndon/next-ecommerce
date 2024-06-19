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
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy to Backend
      },
      {
        source: "/api/customer/:path*",
        destination: "http://localhost:8000/api/customer/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
