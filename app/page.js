import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { CTASection, EnquiryLink, OutlineLink, ProductGrid, SectionHeading } from "@/components/site";

export const metadata = {
  title: "Custom Underwear Manufacturer for Private Label Brands",
  description: "Explore custom underwear and private-label manufacturing for brands. Share your product brief, fabric direction and branding requirements.",
  alternates: { canonical: "/" },
  openGraph: { title: "Custom Underwear Manufacturer for Private Label Brands", description: "Build an underwear collection around your product brief and brand.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const process = ["Requirements", "Product development", "Material direction", "Sample review", "Approval", "Production planning", "Branding & packing", "Dispatch discussion"];
const buyerTypes = ["Underwear brands", "Private-label teams", "Fashion startups", "Retailers", "Wholesalers", "Sports brands", "Ecommerce labels"];
const homeFaqs = [
  { question: "What types of underwear can I enquire about?", answer: "Use the Products menu to explore the listed categories. The team will confirm which product types and specifications can be supported for your project." },
  { question: "Do you offer private-label underwear manufacturing?", answer: "Private-label production is part of the enquiry scope. Share the product, branding and packaging requirements so the team can confirm suitable options." },
  { question: "Can I customize fabric, color and waistband details?", answer: "Include your preferences in the enquiry. Material availability and construction feasibility are reviewed against the specific product brief." },
  { question: "Do you provide samples?", answer: "Sample development can be discussed during project review. Availability, process and timing depend on the product and requirements." },
  { question: "What is the minimum order quantity?", answer: "MOQ has not been supplied. Please include your estimated quantity in the enquiry so the business can provide current project-specific information." },
];

export default function Home() {
  return <>
    <section className="relative isolate min-h-[650px] overflow-hidden bg-olive-950 text-cream sm:min-h-[710px] lg:min-h-[760px]">
      <Image src="/images/garment-production-floor.jpg" alt="Illustrative garment production floor from a Wikimedia Commons image, not the represented company's facility" className="absolute inset-0 -z-20 object-cover object-center opacity-50" fill priority sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-olive-950 via-olive-950/75 to-olive-950/10" />
      <div className="mx-auto flex min-h-[650px] max-w-[1440px] items-center px-5 py-20 sm:min-h-[710px] sm:px-8 lg:min-h-[760px] lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200"><span className="h-px w-10 bg-lime-200" />B2B underwear development & production</p>
          <h1 className="font-display text-5xl leading-[0.98] tracking-[-0.045em] text-cream sm:text-7xl lg:text-[88px]">Custom underwear manufacturing, <span className="text-lime-200">shaped around your brand.</span></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-cream/75 sm:text-lg sm:leading-8">From a first product brief to branded finishing, bring your underwear collection requirements to one focused manufacturing conversation.</p>
          <div className="mt-9 flex flex-wrap gap-3"><EnquiryLink variant="accent" /><OutlineLink href="/products" variant="light">Explore products</OutlineLink></div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.12em] text-cream/65">Illustrative manufacturing image · attribution in image credits</p>
        </div>
      </div>
      <div className="absolute bottom-7 right-5 hidden text-right text-[10px] uppercase leading-5 tracking-[0.14em] text-cream/60 sm:block lg:right-12">Product development<br />to private label</div>
    </section>

    <section aria-label="Manufacturing focus" className="border-b border-ink/10 bg-cream px-5 py-7 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1360px] grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-8">{["Custom development", "Private label", "Sampling discussion", "B2B production briefs"].map((item, i) => <div key={item} className="flex items-center gap-3"><span className="font-display text-lg text-olive-700">0{i + 1}</span><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/65">{item}</span></div>)}</div></section>

    <section className="grid lg:grid-cols-2">
      <div className="flex min-h-[450px] flex-col justify-center px-5 py-16 sm:px-10 lg:px-[max(3rem,calc((100vw-1360px)/2))] lg:py-24"><SectionHeading eyebrow="A manufacturing conversation" title="Made to start with your brief." description="We work with brands and businesses exploring custom underwear and branded production. Bring your requirements, references or tech pack; together, the next steps can be defined around your project." /><div className="mt-8 flex flex-wrap gap-3"><OutlineLink href="/about">About our approach</OutlineLink><Link href="/manufacturing" className="inline-flex min-h-12 items-center px-3 text-xs font-semibold uppercase tracking-[0.1em] text-olive-800 underline underline-offset-4">How manufacturing works</Link></div></div>
      <div className="relative min-h-[380px] bg-stone-200 lg:min-h-[600px]"><Image src="/images/garment-sewing-workstation.jpg" alt="Illustrative garment sewing workstation from Wikimedia Commons, not the represented company's facility" loading="lazy" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute bottom-5 left-5 bg-cream/95 px-3 py-2 text-[9px] uppercase tracking-[0.13em] text-ink/75">Illustrative production image · see image credits</div></div>
    </section>

    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto max-w-[1360px]"><div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="The product range" title="Underwear, from the first sketch." description="Explore product directions, then share the fit, fabric and finish your brand has in mind." /><Link href="/products" className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-olive-800 underline underline-offset-4">All product categories ↗</Link></div><ProductGrid items={products.slice(0, 4)} /></div></section>

    <section className="bg-olive-950 px-5 py-20 text-cream sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto max-w-[1360px]"><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]"><SectionHeading eyebrow="From idea to handoff" title="A clear route from brief to finished product." description="The production path depends on the style and specification. These are the typical conversations to have as your project takes shape." light /><div className="grid grid-cols-1 border-t border-cream/20 sm:grid-cols-2">{process.map((step, index) => <div key={step} className="flex min-h-[86px] items-center gap-5 border-b border-cream/20 py-4 sm:even:pl-6 sm:odd:border-r sm:odd:border-cream/20"><span className="font-display text-2xl text-lime-200">{String(index + 1).padStart(2, "0")}</span><span className="text-sm text-cream/85">{step}</span></div>)}</div></div></div></section>

    <section className="grid bg-lime-300 lg:grid-cols-[1.1fr_0.9fr]"><div className="px-5 py-20 sm:px-10 sm:py-24 lg:px-[max(3rem,calc((100vw-1360px)/2))]"><SectionHeading eyebrow="Private label" title="Your name belongs on every detail." description="Discuss custom labels, care information, branded waistbands and packaging as part of your product brief. Share artwork or examples, and the team can confirm which details are workable for the selected style." /><Link href="/private-label" className="mt-8 inline-flex min-h-12 items-center border-b border-ink/40 text-xs font-semibold uppercase tracking-[0.12em]">Explore private label options <span className="ml-4">↗</span></Link></div><div className="relative min-h-[380px] bg-olive-800"><Image src="/images/garment-sewing-floor.jpg" alt="Illustrative garment sewing floor from Wikimedia Commons, not the represented company's facility" loading="lazy" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-80" /><div className="absolute inset-0 bg-olive-950/15" /></div></section>

    <section className="bg-cream px-5 py-20 sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Built around your specification" title="Small details. Your call." description="Customization should follow your product brief, not a preset. Share what matters to your brand and confirm the options for your style." /><div className="mt-8 grid grid-cols-2 gap-3">{["Fabric direction", "Fit and size range", "Color palette", "Waistband", "Stitching", "Labels", "Branding", "Packaging"].map((item, i) => <div key={item} className="flex items-center gap-3 border-t border-ink/15 py-4"><span className="text-[10px] text-olive-700">0{i + 1}</span><span className="text-sm text-ink/75">{item}</span></div>)}</div></div><div className="relative min-h-[450px] bg-stone-200"><Image src="/images/vintage-underpants-reference.jpg" alt="Vintage boxer-style underpants from Auckland War Memorial Museum, shown only as a historical construction reference" loading="lazy" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute bottom-5 left-5 max-w-xs bg-cream p-5"><p className="font-display text-2xl text-ink">Make the brief specific.</p><p className="mt-2 text-xs leading-5 text-ink/70">Historical garment reference. A current product image should be supplied by the company.</p></div></div></div></section>

    <section className="border-y border-ink/10 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto max-w-[1360px]"><div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="Who we work with" title="For teams building a brand." description="A B2B enquiry can start at different stages, from an early concept to a ready-to-review technical pack." /><div className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3">{buyerTypes.map((buyer, i) => <div key={buyer} className="flex min-h-28 flex-col justify-between bg-white p-4 sm:p-5"><span className="text-[10px] text-olive-700">0{i + 1}</span><p className="text-sm font-medium text-ink">{buyer}</p></div>)}</div></div></div></section>

    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12"><div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><SectionHeading eyebrow="Common questions" title="Before you send a brief." description="Straight answers where details are known; project-specific details are confirmed directly." /><Link href="/faq" className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.12em] text-olive-800 underline underline-offset-4">Visit all FAQs ↗</Link></div><div><div className="divide-y divide-ink/15 border-y border-ink/15">{homeFaqs.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium"><span>{item.question}</span><span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/20 text-lg transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-ink/65">{item.answer}</p></details>)}</div></div></div></section>

    <CTASection title="Bring your underwear brief to life." description={`Start the conversation with ${siteConfig.brandName}. Share the product, audience and key requirements you have in mind.`} />
  </>;
}