/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add Handlebars loader
    config.module.rules.push({
      test: /\.handlebars$/,
      use: "handlebars-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
