import { siteConfig } from "@/lib/site-config";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: new URL("/sitemap.xml", siteConfig.domain).toString(),
  };
}