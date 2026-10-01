"use client";

import Link from "next/link";

function emit(event) {
  window.dispatchEvent(new CustomEvent("site-analytics", { detail: { event } }));
}

export function EnquiryLink({ children = "Send Enquiry", product, className = "", variant = "default" }) {
  const href = product ? `/contact?product=${encodeURIComponent(product)}` : "/contact";
  const colors = variant === "accent" ? "bg-lime-300 text-ink hover:bg-white" : "bg-olive-800 text-white hover:bg-olive-950";
  return <Link href={href} onClick={() => emit("enquiry_cta_click")} className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 text-xs font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500 ${colors} ${className}`}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function TrackedContactLink({ href, event, children, className = "" }) {
  return <a href={href} onClick={() => emit(event)} className={className}>{children}</a>;
}