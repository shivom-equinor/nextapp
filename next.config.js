const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },

  webpack(config, { isServer }) {
    // Add SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false, // Optional: Disable SVGO optimizations
          },
        },
      ],
    });

    // Adjust chunk size for splitting (client-side only)
    if (!isServer) {
      config.optimization.splitChunks.maxSize = 200000; // Set chunk size for splitting
    }

    return config;
  },
};

export default nextConfig;
