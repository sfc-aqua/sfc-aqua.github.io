/** @type {import('next').NextConfig} */
const IS_SANDBOX = process.env.BUILD_ENV == 'sandbox';
const nextConfig = {
    output: 'export',
    distDir: 'out',
    basePath: IS_SANDBOX ? '/sfc-aqua.github.io-sandbox' : "",
    // experimental: {
    //   mdxRs: true,
    // },
  };

  const withMDX = require('@next/mdx')();
  module.exports = withMDX(nextConfig);
