/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  
    webpack: (config) => {
      // Add the fallbacks for core modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
        path: require.resolve('path-browserify'),
        util: require.resolve('util/'),
      };
      if (!isServer) {
        // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.node = {
            fs: 'empty',
        }
    }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  