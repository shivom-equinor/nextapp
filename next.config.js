const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  // 5 hour default stale time for app routes
  experimental: {
    staleTimes: {
      dynamic: 18000,
      static: 18000,
    },
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

    return config;
  },
};

export default nextConfig;
