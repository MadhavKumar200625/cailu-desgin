import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Cookie Policy", description: "Draft cookie policy placeholder. Replace after confirming actual cookies and analytics usage.", alternates: { canonical: "/cookie-policy" }, robots: { index: false, follow: true } };

export default function CookiePolicyPage() {
  return <LegalPage title="Cookie policy" description="Document cookies and tracking only after the integrations and consent requirements are confirmed." notice="[ADD COOKIE POLICY AFTER CONFIRMING TRACKING AND CONSENT REQUIREMENTS]" />;
}