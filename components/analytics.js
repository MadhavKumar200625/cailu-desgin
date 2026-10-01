"use client";

import Script from "next/script";
import { useEffect } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function Analytics() {
  useEffect(() => {
    function track(event) {
      const name = event.detail?.event;
      if (!name) return;
      if (typeof window.gtag === "function") window.gtag("event", name);
      if (typeof window.fbq === "function") window.fbq("trackCustom", name);
    }
    window.addEventListener("site-analytics", track);
    return () => window.removeEventListener("site-analytics", track);
  }, []);

  return <>
    {gaId && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${gaId}');`}</Script></>}
    {metaPixelId && <Script id="meta-pixel-init" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${metaPixelId}'); fbq('track', 'PageView');`}</Script>}
  </>;
}