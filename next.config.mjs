/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },

  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`,
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;