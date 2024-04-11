/** @type {import('next').NextConfig} */
const isProduction = 'production' === process.env.NODE_ENV

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  assetPrefix: isProduction ? "/aides-jeunes-experimentations" : "",
  basePath: isProduction ? "/aides-jeunes-experimentations" : "",
  env: {
    commitSHA: process.env.GITHUB_SHA || "local",
  }
}

module.exports = nextConfig
