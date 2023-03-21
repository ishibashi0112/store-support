/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uwfiyicuhbelabjpupvf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/menu-image/**",
      },
    ],
  },
};

module.exports = nextConfig;
