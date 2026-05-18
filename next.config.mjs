/** @type {import('next').NextConfig} */
const nextConfig = {
  // When proxied from app.flow-forges.com/, all /_next/static/* assets
  // must be fetched from the hub's own domain to avoid conflicts with
  // lead-engine's assets on the same host.
  assetPrefix: 'https://hub-svix-workspace.vercel.app',
};

export default nextConfig;
