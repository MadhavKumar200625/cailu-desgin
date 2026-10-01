import Link from "next/link";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { EnquiryLink, LinkList } from "@/components/site";
import { TrackedContactLink } from "@/components/tracked-links";
import { BrandLockup } from "@/components/brand-lockup";

export function Footer() {
  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Private label", href: "/private-label" },
    { label: "Custom underwear", href: "/custom-underwear" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  const productLinks = products.map((product) => ({ label: product.name, href: `/products/${product.slug}` }));

  return <footer className="bg-ink px-5 pb-6 pt-16 text-cream sm:px-8 sm:pt-20 lg:px-12">
    <div className="mx-auto grid max-w-[1360px] gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.1fr]">
      <div className="max-w-xs"><BrandLockup inverted /><p className="mt-6 text-sm leading-7 text-cream/60">A B2B starting point for custom underwear and private-label manufacturing conversations. Project details are confirmed with your team.</p><EnquiryLink variant="accent" className="mt-6 min-h-11 px-5" /></div>
      <LinkList title="Product categories" links={productLinks} />
      <LinkList title="Company" links={companyLinks} />
      <div><h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">Contact</h3><ul className="space-y-4 text-sm text-cream/75"><li><span className="block text-xs text-cream/40">Email</span>{siteConfig.contact.email.startsWith("[") ? <Link className="break-all hover:text-lime-200" href="/contact">{siteConfig.contact.email}</Link> : <TrackedContactLink className="break-all hover:text-lime-200" href={`mailto:${siteConfig.contact.email}`} event="email_click">{siteConfig.contact.email}</TrackedContactLink>}</li><li><span className="block text-xs text-cream/40">Phone</span>{siteConfig.contact.phone.startsWith("[") ? <Link className="hover:text-lime-200" href="/contact">{siteConfig.contact.phone}</Link> : <TrackedContactLink className="hover:text-lime-200" href={`tel:${siteConfig.contact.phone}`} event="phone_click">{siteConfig.contact.phone}</TrackedContactLink>}</li><li><span className="block text-xs text-cream/40">Address</span>{siteConfig.contact.address}</li></ul></div>
    </div>
    <div className="mx-auto flex max-w-[1360px] flex-col gap-4 border-t border-white/15 py-5 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p><nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/privacy-policy" className="hover:text-cream">Privacy policy</Link><Link href="/terms-and-conditions" className="hover:text-cream">Terms</Link><Link href="/cookie-policy" className="hover:text-cream">Cookie policy</Link></nav></div>
  </footer>;
}