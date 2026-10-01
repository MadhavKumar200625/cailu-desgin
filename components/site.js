import Link from "next/link";
import Image from "next/image";
import { products, productHref } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { EnquiryLink } from "@/components/tracked-links";

export { EnquiryLink } from "@/components/tracked-links";

export function Eyebrow({ children, light = false }) {
  return <p className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] ${light ? "text-lime-200" : "text-olive-700"}`}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, description, light = false, centered = false, as: Heading = "h2" }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Heading className={`font-display text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl ${light ? "text-cream" : "text-ink"}`}>{title}</Heading>
      {description && <p className={`mt-5 max-w-xl text-base leading-7 ${centered ? "mx-auto" : ""} ${light ? "text-cream/70" : "text-ink/65"}`}>{description}</p>}
    </div>
  );
}

export function Breadcrumbs({ items }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, siteConfig.domain).toString() } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink/55">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link className="hover:text-olive-800" href="/">Home</Link></li>
        {items.map((item, index) => <li key={item.href || item.label} className="flex items-center gap-2"><span aria-hidden="true">/</span>{item.href && index < items.length - 1 ? <Link className="hover:text-olive-800" href={item.href}>{item.label}</Link> : <span aria-current="page" className="text-ink">{item.label}</span>}</li>)}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </nav>
  );
}

export function OutlineLink({ href, children, className = "", variant = "default" }) {
  const colors = variant === "light" ? "border-cream/45 text-cream hover:border-cream hover:bg-cream hover:text-ink" : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white";
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-700 ${colors} ${className}`}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function ProductCard({ product, index = 0 }) {
  return (
    <article className="group min-w-0">
      <Link href={productHref(product.slug)} className="relative block aspect-[4/5] overflow-hidden bg-stone-200" aria-label={`View ${product.name} manufacturing`}>
        <Image src={product.image} alt={product.imageAlt} fill loading={index === 0 ? "eager" : "lazy"} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        <span className="absolute left-4 top-4 bg-cream px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-ink/70">Illustrative image</span>
        <span aria-hidden="true" className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-cream text-ink transition group-hover:bg-lime-300">↗</span>
      </Link>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div><h3 className="font-display text-2xl tracking-[-0.02em] text-ink"><Link href={productHref(product.slug)}>{product.name}</Link></h3><p className="mt-1 max-w-xs text-sm leading-6 text-ink/60">{product.shortDescription}</p></div>
        <Link href={productHref(product.slug)} className="mt-1 shrink-0 text-[10px] font-semibold uppercase tracking-[0.13em] text-olive-800 underline decoration-olive-800/30 underline-offset-4 hover:decoration-olive-800">Explore</Link>
      </div>
    </article>
  );
}

export function ProductGrid({ items = products, className = "" }) {
  return <div className={`grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>{items.map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>;
}

export function FAQList({ items }) {
  return <div className="divide-y divide-ink/15 border-y border-ink/15">{items.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-ink marker:hidden focus-visible:outline-2 focus-visible:outline-olive-700"><span>{item.question}</span><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 text-lg leading-none transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 pr-10 text-sm leading-7 text-ink/65">{item.answer}</p></details>)}</div>;
}

export function CTASection({ title = "Have a product brief in mind?", description = "Share your concept, target customer and requirements. We will review the details with you.", dark = true }) {
  return <section className={`relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 ${dark ? "bg-olive-950 text-cream" : "bg-lime-300 text-ink"}`}><div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border border-current/10 sm:right-12 sm:top-[-8rem] sm:h-[28rem] sm:w-[28rem]" /><div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div className="max-w-2xl"><Eyebrow light={dark}>The next step</Eyebrow><h2 className={`font-display text-4xl leading-[1.05] tracking-[-0.035em] sm:text-6xl ${dark ? "text-cream" : "text-ink"}`}>{title}</h2><p className={`mt-5 max-w-xl text-base leading-7 ${dark ? "text-cream/70" : "text-ink/70"}`}>{description}</p></div><EnquiryLink variant="accent" /></div></section>;
}

export function LinkList({ title, links }) {
  return <div><h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">{title}</h3><ul className="space-y-3">{links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-cream/75 transition hover:text-lime-200">{link.label}</Link></li>)}</ul></div>;
}