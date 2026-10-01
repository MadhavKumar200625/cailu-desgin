"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

const initialValues = { name: "", company: "", email: "", phone: "", country: "", product: "", quantity: "", customization: "", fabric: "", branding: "", message: "", consent: false, website: "" };
const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
const maxFileSize = 5 * 1024 * 1024;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.product) errors.product = "Select a product.";
  if (!values.message.trim()) errors.message = "Message is required.";
  if (!values.consent) errors.consent = "Please confirm consent before submitting.";
  return errors;
}

function Field({ label, name, required = false, error, children }) {
  return <div className="min-w-0"><label htmlFor={name} className="mb-2 block text-xs font-medium text-ink">{label}{required && <span aria-hidden="true" className="ml-1 text-red-700">*</span>}</label>{children}{error && <p id={`${name}-error`} className="mt-1 text-xs text-red-800">{error}</p>}</div>;
}

export function EnquiryForm({ initialProduct = "" }) {
  const preselected = products.find((product) => product.name.toLowerCase() === initialProduct.toLowerCase())?.name || "";
  const [values, setValues] = useState({ ...initialValues, product: preselected });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleFile(event) {
    const selected = event.target.files?.[0] || null;
    if (selected && (!allowedTypes.includes(selected.type) || selected.size > maxFileSize)) {
      setFile(null);
      event.target.value = "";
      setErrors((current) => ({ ...current, file: "Use a PDF, DOC, DOCX, JPG, PNG or WebP file up to 5 MB." }));
      return;
    }
    setFile(selected);
    setErrors((current) => ({ ...current, file: undefined }));
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    if (file && (!allowedTypes.includes(file.type) || file.size > maxFileSize)) nextErrors.file = "Use an allowed file up to 5 MB.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setState("error");
      setFeedback("Please review the highlighted fields.");
      return;
    }
    setState("loading");
    setFeedback("");
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append("file", file);
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      setState("success");
      setFeedback("Thank you. Your enquiry has been received. Our team will contact you shortly.");
      window.dispatchEvent(new CustomEvent("site-analytics", { detail: { event: values.product ? "product_enquiry_submit" : "enquiry_form_submit" } }));
      setValues(initialValues);
      setFile(null);
      event.currentTarget.reset();
    } catch {
      setState("error");
      setFeedback("Something went wrong. Please try again or contact us directly.");
    }
  }

  const inputClass = "min-h-12 w-full min-w-0 border border-ink/20 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-olive-800 focus:ring-2 focus:ring-olive-800/15";

  return <form onSubmit={submit} noValidate className="space-y-6" aria-describedby="form-feedback">
    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><label htmlFor="website">Leave this field empty</label><input autoComplete="off" tabIndex={-1} id="website" name="website" value={values.website} onChange={update} /></div>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" name="name" required error={errors.name}><input autoComplete="name" className={inputClass} id="name" name="name" value={values.name} onChange={update} maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /></Field>
      <Field label="Company / brand name" name="company"><input autoComplete="organization" className={inputClass} id="company" name="company" value={values.company} onChange={update} maxLength={160} /></Field>
      <Field label="Email" name="email" required error={errors.email}><input autoComplete="email" type="email" className={inputClass} id="email" name="email" value={values.email} onChange={update} maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /></Field>
      <Field label="Phone / WhatsApp" name="phone"><input autoComplete="tel" type="tel" className={inputClass} id="phone" name="phone" value={values.phone} onChange={update} maxLength={40} /></Field>
      <Field label="Country" name="country"><input autoComplete="country-name" className={inputClass} id="country" name="country" value={values.country} onChange={update} maxLength={80} /></Field>
      <Field label="Interested product" name="product" required error={errors.product}><select className={inputClass} id="product" name="product" value={values.product} onChange={update} aria-invalid={Boolean(errors.product)} aria-describedby={errors.product ? "product-error" : undefined}><option value="">Select a product</option>{products.map((product) => <option key={product.slug} value={product.name}>{product.name}</option>)}</select></Field>
      <Field label="Estimated order quantity" name="quantity"><input inputMode="numeric" className={inputClass} id="quantity" name="quantity" value={values.quantity} onChange={update} maxLength={80} placeholder="Share an estimate if known" /></Field>
      <Field label="Fabric preference" name="fabric"><input className={inputClass} id="fabric" name="fabric" value={values.fabric} onChange={update} maxLength={240} /></Field>
      <Field label="Customization requirements" name="customization"><textarea className={`${inputClass} min-h-28 resize-y py-3`} id="customization" name="customization" value={values.customization} onChange={update} maxLength={2000} /></Field>
      <Field label="Branding / label requirements" name="branding"><textarea className={`${inputClass} min-h-28 resize-y py-3`} id="branding" name="branding" value={values.branding} onChange={update} maxLength={2000} /></Field>
    </div>
    <Field label="Message" name="message" required error={errors.message}><textarea className={`${inputClass} min-h-36 resize-y py-3`} id="message" name="message" value={values.message} onChange={update} maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} /></Field>
    <Field label="Reference / tech pack (optional, max 5 MB)" name="file" error={errors.file}><input className="block w-full text-sm text-ink/70 file:mr-4 file:min-h-11 file:border-0 file:bg-olive-800 file:px-4 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-white hover:file:bg-olive-950" id="file" name="file" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFile} aria-describedby={errors.file ? "file-error" : undefined} /></Field>
    <div><label className="flex items-start gap-3 text-xs leading-5 text-ink/65"><input type="checkbox" name="consent" checked={values.consent} onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))} className="mt-1 size-4 accent-olive-800" />I agree that my details may be used to respond to this enquiry. See the <Link className="underline" href="/privacy-policy">privacy policy</Link>.</label>{errors.consent && <p className="mt-1 text-xs text-red-800">{errors.consent}</p>}</div>
    <div aria-live="polite" id="form-feedback" role={state === "error" ? "alert" : "status"} className={`min-h-5 text-sm ${state === "success" ? "text-olive-800" : state === "error" ? "text-red-800" : "text-ink/65"}`}>{state === "loading" ? "Sending your enquiry..." : feedback}</div>
    <button type="submit" disabled={state === "loading"} className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-olive-800 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-olive-950 disabled:cursor-wait disabled:opacity-60 sm:w-auto">{state === "loading" ? "Sending..." : "Send enquiry"}<span aria-hidden="true">↗</span></button>
    <p className="text-xs text-ink/45">Required fields are marked *. Please do not upload sensitive personal information.</p>
  </form>;
}