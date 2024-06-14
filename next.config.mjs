/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ucarecdn.com",
      "res.cloudinary.com",
      "imgur.com",
      "i.imgur.com",
      "cutt.ly",
      "activity-graph.herokuapp.com",
      "i.scdn.co", // images from spotify
      "images.unsplash.com",
      "cdn.sanity.io", // sanity images
      "raw.githubusercontent.com",
      "logo.clearbit.com",
      "picsum.photos",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Souradip22/my-blogs-photos/main/images/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
