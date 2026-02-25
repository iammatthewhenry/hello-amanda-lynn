/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'recipes.helloamandalyn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;