import remarkGfm from "remark-gfm"
import createMDX from "@next/mdx"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

/** @type {import('next').NextConfig} */
const IS_SANDBOX = process.env.BUILD_ENV == "sandbox"
const nextConfig = {
  output: "export",
  distDir: "out",
  basePath: IS_SANDBOX ? "/sfc-aqua.github.io-sandbox" : "",
  // experimental: {
  //   mdxRs: true,
  // },
}

// const withMDX = require('@next/mdx')();
const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

// module.exports = withMDX(nextConfig);

export default withMDX(nextConfig)
