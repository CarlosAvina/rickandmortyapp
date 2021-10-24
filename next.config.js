module.exports = {
  images: {
    domains: ['rickandmortyapi.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/characters/page/1',
        permanent: false,
      },
    ];
  },
};
