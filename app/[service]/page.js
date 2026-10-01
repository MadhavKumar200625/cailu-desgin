import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { serviceMetadata, servicePages } from "@/lib/service-content";

export function generateStaticParams() {
  return Object.keys(servicePages).map((service) => ({ service }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const meta = serviceMetadata[service];
  if (!meta) return {};
  return { ...meta, alternates: { canonical: `/${service}` }, openGraph: { title: meta.title, description: meta.description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] }, twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/opengraph-image"] } };
}

export default async function ServiceRoute({ params }) {
  const { service } = await params;
  const page = servicePages[service];
  if (!page) notFound();
  return <ServicePage page={page} />;
}