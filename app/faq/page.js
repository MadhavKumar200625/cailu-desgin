import { Breadcrumbs, CTASection, FAQList, SectionHeading } from "@/components/site";

export const metadata = {
  title: "FAQ | Custom & Private Label Underwear Manufacturing",
  description: "Answers about underwear product development, customization, private label, samples, order quantities, production and enquiries.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | Custom & Private Label Underwear Manufacturing", description: "Review common questions about underwear manufacturing enquiries.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const groups = [
  { title: "General", questions: [
    { question: "What type of underwear can you manufacture?", answer: "The product categories currently represented on this site are boxers, briefs, boxer briefs, trunks, sports underwear, seamless underwear, thermal underwear and custom underwear. Project feasibility is confirmed for each enquiry." },
    { question: "Do you manufacture for startups?", answer: "Startups are welcome to share a product brief. The team can review your requirements and provide current project-specific information." },
    { question: "Can you help develop a product from an idea?", answer: "Share a sketch, reference or written concept. The team can review it and discuss possible product-development next steps." },
  ] },
  { title: "Products & customization", questions: [
    { question: "Can I customize fabric and color?", answer: "Include fabric and color preferences in your brief. Availability and suitability are reviewed for the requested product." },
    { question: "Can you manufacture custom waistbands?", answer: "Share the waistband style, branding and reference. Construction and availability are confirmed for the specific product." },
    { question: "Can you manufacture according to a tech pack?", answer: "A tech pack can be included with your enquiry. It helps explain construction, measurements, materials and finishing requirements." },
  ] },
  { title: "Private label & packaging", questions: [
    { question: "Do you offer private-label underwear manufacturing?", answer: "Private-label requirements can be included in the product enquiry. The exact branding and finishing options are confirmed for each project." },
    { question: "Can I add my own labels and branding?", answer: "Share your label text, artwork and placement requirements. Details are reviewed in relation to the selected style." },
    { question: "Can you manufacture custom packaging?", answer: "Include the packaging format, artwork and packing requirements in your brief. Feasibility is confirmed for your project." },
  ] },
  { title: "Sampling & production", questions: [
    { question: "Do you provide samples?", answer: "Ask about sample development when you enquire. Availability, process and timing are confirmed for the product and project." },
    { question: "What is the minimum order quantity?", answer: "MOQ is not provided on this website. Share your estimated quantity to receive current information for your project." },
    { question: "How long does manufacturing take?", answer: "Production timing depends on product specifications, materials, sampling and schedule. Request a current estimate with your enquiry." },
    { question: "How does the production process work?", answer: "The conversation generally covers requirements, product development, material selection, sample review, approval, production planning, branding and packing. The exact sequence depends on your project." },
  ] },
  { title: "Enquiries & shipping", questions: [
    { question: "What information do you need for an enquiry?", answer: "Share your product, company or brand, estimated quantity, target fit, material direction, branding requirements and any relevant reference or tech pack." },
    { question: "Which countries do you ship to?", answer: "Shipping destinations have not been confirmed on this website. Include your destination in the enquiry to ask about current arrangements." },
    { question: "How can I discuss my project?", answer: "Use the enquiry form to send your product brief. Product pages can preselect the category in the form." },
  ] },
];

export default function FAQPage() {
  const faqEntities = groups.flatMap((group) => group.questions).map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } }));
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEntities };
  return <><section className="bg-cream px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:px-12"><div className="mx-auto max-w-[1360px]"><Breadcrumbs items={[{ label: "FAQ" }]} /><SectionHeading as="h1" eyebrow="Frequently asked questions" title="Useful details before you enquire." description="Answers reflect what is currently known. Company-specific information is identified as something to confirm." /></div></section><div className="bg-white">{groups.map((group) => <section key={group.title} className="border-t border-ink/10 px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-[0.6fr_1.4fr]"><h2 className="font-display text-3xl text-ink">{group.title}</h2><FAQList items={group.questions} /></div></section>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} /><CTASection title="Still have a question about your brief?" description="Send your product details and the team can help establish what information is needed next." /></>;
}