import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@/components/analytics";

export const metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: { default: `${siteConfig.brandName} | Custom Underwear Manufacturing`, template: `%s | ${siteConfig.brandName}` },
  description: "Discuss custom underwear and private-label manufacturing requirements with a B2B production team.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Custom Underwear Manufacturing`,
    description: "A B2B partner for custom underwear and private-label project enquiries.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Custom underwear manufacturing and private-label project enquiries" }],
  },
  twitter: { card: "summary_large_image", title: `${siteConfig.brandName} | Custom Underwear Manufacturing`, description: "Custom underwear and private-label project enquiries." },
  icons: { icon: siteConfig.faviconPath },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteConfig.domain}/#organization`, name: siteConfig.brandName, url: siteConfig.domain },
      { "@type": "WebSite", "@id": `${siteConfig.domain}/#website`, name: siteConfig.brandName, url: siteConfig.domain, publisher: { "@id": `${siteConfig.domain}/#organization` } },
    ],
  };
  return <html lang="en"><body className="min-h-screen bg-cream font-sans text-ink antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><Analytics /><a href="#main-content" className="skip-link">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}