import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductPage } from "@/components/product-page";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.description} Discuss your ${product.name.toLowerCase()} manufacturing enquiry.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.title, description: product.shortDescription, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] },
    twitter: { card: "summary_large_image", title: product.title, description: product.shortDescription, images: ["/opengraph-image"] },
  };
}

export default async function ProductRoute({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductPage product={product} />;
}