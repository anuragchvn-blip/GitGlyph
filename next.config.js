/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disables ESLint during production builds.
  // Not recommended for production but useful for temporary fixes or specific environments.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Customizes the Webpack configuration.
  webpack: (config, { isServer }) => {
    // Only applies these changes to the client-side bundle.
    if (!isServer) {
      config.resolve.fallback = {
        // Sets fallback to 'false' for Node.js core modules.
        // This prevents Webpack from trying to include them in the client-side bundle,
        // which would cause errors since they are not available in the browser.
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Always return the modified config object.
    return config;
  },
};

module.exports = nextConfig;