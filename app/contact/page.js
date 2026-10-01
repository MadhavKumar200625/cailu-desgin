import { EnquiryForm } from "@/components/enquiry-form";
import { Breadcrumbs, SectionHeading } from "@/components/site";
import { siteConfig } from "@/lib/site-config";
import { TrackedContactLink } from "@/components/tracked-links";

export const metadata = {
  title: "Contact | Underwear Manufacturing Enquiries",
  description: "Contact the team about custom underwear, private-label production, samples and B2B manufacturing requirements.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Underwear Manufacturing Enquiries", description: "Send your underwear product or manufacturing brief.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const initialProduct = params?.product || "";
  return <>
    <section className="bg-cream px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:px-12"><div className="mx-auto max-w-[1360px]"><Breadcrumbs items={[{ label: "Contact" }]} /><SectionHeading as="h1" eyebrow="Contact the manufacturing team" title="Let's talk about your product brief." description="Tell us what you are developing, where you are in the process and what information you need next. Product-specific details are confirmed directly." /></div></section>
    <section id="inquiry" className="scroll-mt-24 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.65fr_1.35fr]"><aside className="space-y-8"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-olive-700">Email</p>{siteConfig.contact.email.startsWith("[") ? <p className="mt-2 break-all text-sm text-ink">{siteConfig.contact.email}</p> : <TrackedContactLink className="mt-2 block break-all text-sm text-ink underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`} event="email_click">{siteConfig.contact.email}</TrackedContactLink>}</div><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-olive-700">Phone</p>{siteConfig.contact.phone.startsWith("[") ? <p className="mt-2 text-sm text-ink">{siteConfig.contact.phone}</p> : <TrackedContactLink className="mt-2 block text-sm text-ink" href={`tel:${siteConfig.contact.phone}`} event="phone_click">{siteConfig.contact.phone}</TrackedContactLink>}</div><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-olive-700">Address</p><p className="mt-2 text-sm leading-6 text-ink/65">{siteConfig.contact.address}</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-olive-700">Business hours</p><p className="mt-2 text-sm leading-6 text-ink/65">{siteConfig.contact.hours}</p></div>{siteConfig.contact.whatsapp && <TrackedContactLink href={siteConfig.contact.whatsapp} event="whatsapp_click" className="inline-flex min-h-11 items-center border border-ink/20 px-4 text-xs font-semibold uppercase tracking-[0.1em]">WhatsApp ↗</TrackedContactLink>}<p className="max-w-xs border-t border-ink/15 pt-5 text-xs leading-6 text-ink/50">Share only project details needed to respond. Do not upload sensitive personal data.</p></aside><div className="min-w-0 border-t border-ink/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><h2 className="mb-7 font-display text-3xl text-ink">Send an enquiry</h2><EnquiryForm initialProduct={initialProduct} /></div></div></section>
  </>;
}