// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  }
};

module.exports = nextConfig;
