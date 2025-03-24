/** @type {import('next').NextConfig} */
const isProduction = 'production' === process.env.NODE_ENV

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: isProduction ? "/aides-jeunes-experimentations" : undefined,
  basePath: isProduction ? "/aides-jeunes-experimentations" : "",
  env: {
    commitSHA: process.env.GITHUB_SHA || "local",
  }
}

module.exports = nextConfig
