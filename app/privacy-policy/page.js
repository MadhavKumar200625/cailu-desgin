import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Privacy Policy", description: "Draft privacy policy placeholder. Replace with a policy reflecting actual business data practices.", alternates: { canonical: "/privacy-policy" }, robots: { index: false, follow: true } };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy policy" description="How information is handled must be documented by the business before publication." notice="[ADD A PRIVACY POLICY REVIEWED FOR YOUR BUSINESS]" />;
}