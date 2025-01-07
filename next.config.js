const nextConfig = {
  // reactStrictMode: true,
  // output: "standalone",
  compiler: {
    styledComponents: true,
  },

  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
          },
        },
      ],
    });

    // if (!isServer) {
    //   config.optimization.splitChunks.maxSize = 200000; // 200KB
    // }

    return config;
  },
};

export default nextConfig;
