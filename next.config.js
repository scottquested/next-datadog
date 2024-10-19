const path = require("path");
const loaderUtils = require("loader-utils");

/** @type {import('next').NextConfig} */

const cssModuleLocalIdent = (context, _, exportName, options) => {
  const relativePath = path
    .relative(context.rootContext, context.resourcePath)
    .replace(/\\+/g, "/");
  const hash = loaderUtils.getHashDigest(
    Buffer.from(`filePath:${relativePath}#className:${exportName}`),
    "sha1",
    "base64",
    5
  );
  return loaderUtils
    .interpolateName(context, hash, options)
    .replace(/\.module_/, "_")
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/^(\d|--|-\d)/, "__$1");
};

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["dd-trace"],
    instrumentationHook: true,
  },

  output: "standalone",
  distDir: "./.next2",

  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes("css-loader") &&
          !moduleLoader.loader?.includes("postcss-loader") &&
          moduleLoader.options.modules
        ) {
          moduleLoader.options.modules.getLocalIdent = cssModuleLocalIdent;
        }
      });
    });
    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
