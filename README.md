# Underwear Manufacturing Website

Production-oriented B2B lead-generation website for custom underwear and private-label manufacturing enquiries. There is no cart, checkout or consumer pricing.

## Technology

- Next.js 16 App Router and React 19
- JavaScript
- Tailwind CSS 4
- Nodemailer for server-side SMTP enquiry delivery

## Install and run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Create a production build with `npm run build` and serve it with `npm run start`. Run ESLint with `npm run lint`.

## Brand and contact configuration

Edit `lib/site-config.js` to change `brandName`, fallback domain, logo path, favicon path, address, business hours and social links. Set the actual canonical domain and public contact values in `.env.local`. Replace the `YN` monogram in `components/header.js` and `components/footer.js` with the approved brand mark when available. The brand name currently remains `YOUR BRAND NAME` by design.

Public configuration variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin, sitemap and structured-data URLs |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public business email |
| `NEXT_PUBLIC_CONTACT_PHONE` | Public phone number |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp URL, including the `https://wa.me/` form |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional Meta Pixel ID |

Only use public variables for values intended to be visible to visitors.

## Email delivery

The enquiry form posts to `app/api/enquiry/route.js`. SMTP credentials are read only on the server and must never use the `NEXT_PUBLIC_` prefix. Configure `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` and `SMTP_FROM` in the deployment environment. `SMTP_FROM` should be an address permitted by the configured mail provider. The customer email is used as Reply-To; the subject includes product and company when supplied. Emails include the submitted fields and server timestamp.

The API validates required fields and consent, bounds text and upload sizes, accepts only PDF/DOC/DOCX/JPG/PNG/WebP attachments, replaces uploaded filenames and rejects the hidden honeypot. The included rate limiter is in-memory and is a baseline for a single process; configure an edge/WAF limit or shared persistent rate store for multi-instance/serverless production. Without SMTP environment configuration, the API intentionally returns a generic service-unavailable response and does not claim the enquiry was delivered.

## Products and content

Edit `lib/products.js` to add, remove or revise product categories, descriptions, images, customization discussion areas and FAQs. The product index, navigation, footer, product routes, enquiry selector and sitemap read this catalog. Product detail routes are generated at `/products/[slug]`.

Edit `lib/service-content.js` for About, Manufacturing, Private Label and Custom Underwear page sections. FAQ content is in `app/faq/page.js`. Unknown MOQ, delivery timelines, capabilities, certifications, factory details and destinations are not stated as facts.

## Images and logo

Locally hosted, openly licensed illustrative garment-sector and historical underwear images are in `public/images/`; their licenses and attribution are documented in `public/images/ATTRIBUTION.md`. They are not photographs of this business, its factory or its current products. The site labels them accordingly. Replace them with approved, accurate company and underwear imagery before launch. Product image paths and alt text live with each item in `lib/products.js`; service images and alt text live in `lib/service-content.js`; homepage image references are in `app/page.js`. Prefer optimized AVIF/WebP files in `public/images/`, descriptive filenames, accurate alt text and explicit intrinsic dimensions/aspect ratios. Do not publish placeholder visuals as actual factory, product or client evidence.

## SEO configuration

Each route exports unique title and description metadata, canonical URL and social metadata. Product SEO titles/descriptions derive from product records; service metadata is in `lib/service-content.js`. The root metadata template and Organization/WebSite JSON-LD are in `app/layout.js`. BreadcrumbList data is generated alongside visible breadcrumbs. Product pages emit Product schema without invented offers or prices. FAQPage schema exists only alongside the visible FAQ content.

The sitemap and robots rules use Next metadata routes at `app/sitemap.js` and `app/robots.js`; after setting `NEXT_PUBLIC_SITE_URL`, verify the generated URLs at `/sitemap.xml` and `/robots.txt`. Submit the sitemap to Google Search Console after deployment. Analytics integration points only load when their public IDs are set; document consent requirements for the jurisdictions and integrations in use before enabling them.

### SEO audit checklist

- [ ] Set the production `NEXT_PUBLIC_SITE_URL`; confirm HTTPS and canonical URLs.
- [ ] Check every page for a distinct title, description, one H1 and logical H2 order.
- [ ] Check Open Graph/Twitter metadata and replace temporary photography with approved assets.
- [ ] Check all alt text describes the actual image; add width/height or stable aspect ratios.
- [ ] Check visible breadcrumbs match BreadcrumbList structured data.
- [ ] Validate Organization, WebSite, Product and FAQPage data; remove any unsupported facts.
- [ ] Confirm no Product schema contains Offer, price, rating or stock claims.
- [ ] Verify internal product/service/contact links, `/robots.txt` and `/sitemap.xml`.
- [ ] Crawl all routes for broken links, duplicate metadata, accidental noindex and placeholder brand/contact data.
- [ ] Run Lighthouse/accessibility checks at mobile and desktop viewport sizes.

## Analytics and events

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_META_PIXEL_ID` to enable their scripts. Custom event names emitted by the site are `enquiry_cta_click`, `enquiry_form_submit`, `product_enquiry_submit`, `phone_click`, `whatsapp_click` and `email_click`. Phone/email/WhatsApp links become actionable only after the relevant business values are configured.

## Deployment

Deploy as a Node.js Next.js application on a provider that supports App Router route handlers and server environment variables (for example, Vercel or a Node hosting service). Set all required public URL/contact variables and private SMTP variables in the provider dashboard, run `npm run build`, and deploy the resulting application. Configure a shared rate limit or edge protection for production traffic. Verify SMTP delivery, reply-to, attachment handling, legal pages and analytics consent in the deployed environment before launch.

## Before launch

- Replace the brand name, monogram/logo, domain, contact, address, business hours and social links.
- Confirm each listed product/capability and remove categories the business cannot support.
- Confirm actual customization options, sample availability, MOQ, lead times and shipping details.
- Replace all temporary photos with approved and accurate imagery.
- Configure and test the SMTP account and sender address.
- Replace legal placeholders with business- and jurisdiction-specific legal text reviewed by qualified counsel.
- Configure analytics only after consent and privacy requirements are met.