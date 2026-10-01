import { Breadcrumbs, CTASection, ProductGrid, SectionHeading } from "@/components/site";

export const metadata = {
  title: "Underwear Products for Custom & Private Label Manufacturing",
  description: "Explore underwear product categories for custom development and private-label manufacturing enquiries.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Underwear Products for Custom & Private Label Manufacturing", description: "Explore underwear categories and discuss your product brief.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function ProductsPage() {
  return <><section className="bg-cream px-5 pb-14 pt-8 sm:px-8 sm:pb-20 lg:px-12"><div className="mx-auto max-w-[1360px]"><Breadcrumbs items={[{ label: "Products" }]} /><SectionHeading as="h1" eyebrow="Product categories" title="Underwear to make your own." description="Explore the product directions currently represented on this site. Technical feasibility and production details are confirmed for each project." /><div className="mt-12"><ProductGrid /></div></div></section><CTASection title="Have a different style in mind?" description="Use custom underwear to start a conversation about a product not shown here." /></>;
}