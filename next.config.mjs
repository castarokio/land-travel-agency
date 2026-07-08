import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: "/land",
        assetPrefix: "/land/",
        images: {
          unoptimized: true
        }
      }
    : {
        async redirects() {
          return [
            {
              source: "/tourisme",
              destination: "/services/tourism",
              permanent: true
            },
            {
              source: "/study-abroad",
              destination: "/services/study-abroad",
              permanent: true
            },
            {
              source: "/tourism",
              destination: "/services/tourism",
              permanent: true
            },
            {
              source: "/tourism/local",
              destination: "/services/tourism/local",
              permanent: true
            },
            {
              source: "/tourism/international",
              destination: "/services/tourism/international",
              permanent: true
            },
            {
              source: "/tourism/destination/:id",
              destination: "/services/tourism/destinations/:id",
              permanent: true
            },
            {
              source: "/omra",
              destination: "/services/omra",
              permanent: true
            }
          ];
        }
      })
};

export default nextConfig;
