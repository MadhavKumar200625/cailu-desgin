import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const paths = ["/", "/about", "/products", "/manufacturing", "/private-label", "/custom-underwear", "/contact", "/faq"];
  const productPaths = products.map((product) => `/products/${product.slug}`);
  const now = new Date();
  return [...paths, ...productPaths].map((path) => ({ url: new URL(path, siteConfig.domain).toString(), lastModified: now, changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : path.startsWith("/products/") ? 0.75 : 0.7 }));
}