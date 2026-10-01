import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Custom underwear manufacturing and private label project enquiries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", background: "#242220", color: "#f5f1eb", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#f1c3ae", fontFamily: "Arial, sans-serif", fontSize: 20, letterSpacing: "4px", textTransform: "uppercase" }}><span style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: "#e36d50", color: "#242220", fontSize: 14, fontWeight: 700 }}>C</span>{siteConfig.brandName}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><div style={{ color: "#f1c3ae", fontFamily: "Arial, sans-serif", fontSize: 17, letterSpacing: "4px", textTransform: "uppercase" }}>B2B product development & production</div><div style={{ maxWidth: 1000, fontSize: 70, lineHeight: 1.02 }}>Custom underwear manufacturing, shaped around your brand.</div></div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#f5f1ebb3", fontFamily: "Arial, sans-serif", fontSize: 15, letterSpacing: "2px", textTransform: "uppercase" }}><span>Private label · Product development · Enquiries</span><span>{new URL(siteConfig.domain).host}</span></div>
    </div>,
    size,
  );
}