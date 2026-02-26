/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/text-compare',
        destination: '/diff-checker',
        permanent: true
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'devutil.dev'
          }
        ],
        destination: 'https://www.devutil.dev/:path*',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
