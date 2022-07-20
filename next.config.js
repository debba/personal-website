/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/qrdata',
        destination: '/projects/greenpass-covid19-qrcode-decoder',
        permanent: true
      }
    ]
  },
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  trailingSlash: true
}

module.exports = nextConfig
