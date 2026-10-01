"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { navigation } from "@/lib/site-config";
import { EnquiryLink } from "@/components/site";
import { BrandLockup } from "@/components/brand-lockup";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <BrandLockup />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          <Link href="/" className="nav-link">Home</Link>
          <div className="group relative">
            <button type="button" className="nav-link inline-flex items-center gap-2" aria-expanded={productsOpen} onClick={() => setProductsOpen(!productsOpen)} onMouseEnter={() => setProductsOpen(true)} onBlur={(event) => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setProductsOpen(false); }}>
              Products <span aria-hidden="true" className="text-[10px]">{productsOpen ? "-" : "+"}</span>
            </button>
            {productsOpen && <div onMouseLeave={() => setProductsOpen(false)} className="absolute left-0 top-full z-50 grid w-[480px] grid-cols-2 gap-x-8 gap-y-0 border border-ink/10 bg-cream p-6 shadow-xl">
              {products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`} className="border-b border-ink/10 py-3 text-sm text-ink/75 transition hover:text-olive-800">{product.name}<span aria-hidden="true" className="float-right">↗</span></Link>)}
            </div>}
          </div>
          {navigation.map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
        </nav>
        <div className="hidden lg:block"><EnquiryLink className="min-h-11 px-5" /></div>
        <button type="button" className="grid size-11 place-items-center border border-ink/15 text-xl text-ink lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-ink/10 bg-cream px-5 pb-8 pt-3 lg:hidden">
        <Link href="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Home</Link>
        <button type="button" className="mobile-nav-link flex w-full items-center justify-between" aria-expanded={productsOpen} onClick={() => setProductsOpen(!productsOpen)}>Products<span aria-hidden="true">{productsOpen ? "-" : "+"}</span></button>
        {productsOpen && <div className="grid grid-cols-2 gap-x-4 pb-3 pl-3">{products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`} onClick={() => setMenuOpen(false)} className="border-b border-ink/10 py-3 text-sm text-ink/70">{product.name}</Link>)}</div>}
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link">{item.label}</Link>)}
        <EnquiryLink className="mt-5 w-full" />
      </nav>}
    </header>
  );
}