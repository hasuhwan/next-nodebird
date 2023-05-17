const { development } = require("../back/config/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // compress: true,
  // webpack(config, { webpack }) {
  //   const prod = process.env.NODE_ENV === "production";
  //   return {
  //     ...config,
  //     mode: prod ? "production" : "development",
  //     devtool: prod ? "hidden-source-map" : "eval",
  //     plugins,
  //   };
  // },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
