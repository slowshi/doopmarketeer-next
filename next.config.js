/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains:['wcnft.mypinata.cloud'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wcnft.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

module.exports = nextConfig
