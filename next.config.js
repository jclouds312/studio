
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mercadopago.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.mercadopago.com.ar',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'mercadopago.com.ar',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.mercadopago.com.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Añadido para exportar a estático para Capacitor
  output: 'export',
};

module.exports = withPWA(nextConfig);
