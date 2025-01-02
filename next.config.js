const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    styledComponents: true,
  },

  webpack(config) {
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

    return config;
  },
};

export default nextConfig;
