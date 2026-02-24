/** @type {import('next').NextConfig} */
const isCloudflare = process.env.CF_PAGES === "1";

const nextConfig = {
  ...(isCloudflare ? { output: "standalone" } : {}),
};

export default nextConfig;