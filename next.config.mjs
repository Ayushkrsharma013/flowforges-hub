/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/prospecting-os/:path*',
          destination: `${process.env.LEAD_ENGINE_URL || 'https://lead-engine-svix-workspace.vercel.app'}/prospecting-os/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
