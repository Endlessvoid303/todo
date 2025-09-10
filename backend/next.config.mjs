import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin/',
        permanent: false,
      },
    ]
  },
  assetPrefix: process.env.NODE_ENV === 'development' ? undefined : '/admin',
  images: {
    path: process.env.NODE_ENV === 'development' ? undefined : '/admin/_next/image',
  },
}
