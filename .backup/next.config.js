/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable instrumentation for Edge Runtime compatibility
  experimental: {
    instrumentationHook: false,
  },
}

module.exports = nextConfig
