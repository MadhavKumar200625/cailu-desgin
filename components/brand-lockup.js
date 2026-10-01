import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function BrandLockup({ inverted = false }) {
  return <Link href="/" className="flex items-center" aria-label={`${siteConfig.brandName} home`}><Image src={siteConfig.logoPath} alt="" width={180} height={42} className={`h-[42px] w-[180px] object-contain ${inverted ? "brightness-0 invert" : ""}`} /></Link>;
}