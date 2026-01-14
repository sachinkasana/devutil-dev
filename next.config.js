/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
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
