import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Tree-shake barrel imports so a handful of icons never pulls the whole library.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/Pema_Yeshi_Tshering_CV.pdf",
        headers: [
          // The CV is immutable per deploy — let the browser and CDN keep it.
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
          /*
           * Keep the PDF out of search results. It stays downloadable by anyone
           * with the link (that is the point of a CV button), but search engines
           * index text inside PDFs, and this one carries the referees' contact
           * details that the site itself deliberately does not publish.
           */
          { key: "X-Robots-Tag", value: "noindex, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
