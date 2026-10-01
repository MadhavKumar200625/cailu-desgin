import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Terms and Conditions", description: "Draft terms and conditions placeholder. Replace with terms reviewed for the actual business and services.", alternates: { canonical: "/terms-and-conditions" }, robots: { index: false, follow: true } };

export default function TermsPage() {
  return <LegalPage title="Terms and conditions" description="Terms for website use and business enquiries must be confirmed by the company." notice="[ADD TERMS AND CONDITIONS REVIEWED FOR YOUR BUSINESS]" />;
}