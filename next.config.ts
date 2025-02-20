import type { NextConfig } from 'next';
import { Configuration, RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config: Configuration): Configuration {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        !!rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
    );

    if (!fileLoaderRule || !config.module?.rules) {
      throw new Error('Could not find existing SVG file loader rule.');
    }

    // Ensure resourceQuery is correctly handled as an object with a `not` property
    const existingResourceQueryNot =
      typeof fileLoaderRule.resourceQuery === 'object' &&
      'not' in fileLoaderRule.resourceQuery &&
      Array.isArray(fileLoaderRule.resourceQuery.not)
        ? fileLoaderRule.resourceQuery.not
        : [];

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...existingResourceQueryNot, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
