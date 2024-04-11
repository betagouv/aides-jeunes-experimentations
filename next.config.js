/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    commitSHA: process.env.GITHUB_SHA || "local",
  }
}

module.exports = nextConfig
