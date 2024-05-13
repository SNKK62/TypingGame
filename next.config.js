/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/top',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
