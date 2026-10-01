export const siteConfig = {
  brandName: "CAILUO KELU",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  logoPath: "/cailuo-kelu-logo.svg",
  faviconPath: "/favicon.svg",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[ADD BUSINESS EMAIL]",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "[ADD PHONE]",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
    address: "[ADD BUSINESS ADDRESS]",
    hours: "[ADD BUSINESS HOURS]",
  },
  social: { instagram: "", linkedin: "" },
};

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Private label", href: "/private-label" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];