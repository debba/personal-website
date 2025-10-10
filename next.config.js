/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/qrdata',
        destination: '/projects/greenpass-covid19-qrcode-decoder',
        permanent: true
      },
        {
            source: '/projects/wp-two-factor-authentication-with-telegram',
            destination: '/projects/authpress',
            permanent: true
        }
    ]
  },
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  trailingSlash: true
}

module.exports = nextConfig
