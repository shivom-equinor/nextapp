const nextConfig = {
  // Enable styled-components support for SSR and Hydration
  // compiler: {
  //   styledComponents: true,
  // },

  /* config options here */
  reactStrictMode: true,
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

  // Optionally disable linting during builds
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // Optionally disable TypeScript type checking during builds
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
