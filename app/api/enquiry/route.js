import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_BODY_SIZE = 6 * 1024 * 1024;
const rateStore = globalThis.__enquiryRateStore || new Map();
globalThis.__enquiryRateStore = rateStore;

const allowedFiles = new Map([
  ["application/pdf", ".pdf"],
  ["application/msword", ".doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"],
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

function clean(value, maxLength) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength);
}

function requestIp(request) {
  return (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0, 64);
}

function limited(ip) {
  const now = Date.now();
  const record = rateStore.get(ip);
  if (!record || now - record.startedAt > WINDOW_MS) {
    rateStore.set(ip, { startedAt: now, count: 1 });
    if (rateStore.size > 10000) {
      for (const [key, value] of rateStore) if (now - value.startedAt > WINDOW_MS) rateStore.delete(key);
      if (rateStore.size > 10000) return true;
    }
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS;
}

export async function POST(request) {
  const ip = requestIp(request);
  if (limited(ip)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_SIZE) return Response.json({ error: "Submission is too large." }, { status: 413 });

  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (clean(form.get("website"), 200)) return Response.json({ ok: true });

  const data = {
    name: clean(form.get("name"), 120),
    company: clean(form.get("company"), 160),
    email: clean(form.get("email"), 254),
    phone: clean(form.get("phone"), 40),
    country: clean(form.get("country"), 80),
    product: clean(form.get("product"), 100),
    quantity: clean(form.get("quantity"), 80),
    customization: clean(form.get("customization"), 2000),
    fabric: clean(form.get("fabric"), 240),
    branding: clean(form.get("branding"), 2000),
    message: clean(form.get("message"), 5000),
    consent: clean(form.get("consent"), 10),
  };

  if (!data.name || !data.message || !data.product || data.consent !== "true" || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return Response.json({ error: "Please provide a valid name, email, product and message." }, { status: 400 });
  }

  let attachment;
  const file = form.get("file");
  if (file && typeof file === "object" && file.size > 0) {
    const extension = allowedFiles.get(file.type);
    if (!extension || file.size > MAX_FILE_SIZE) return Response.json({ error: "Unsupported file type or file exceeds 5 MB." }, { status: 400 });
    const bytes = Buffer.from(await file.arrayBuffer());
    attachment = { filename: `reference${extension}`, content: bytes, contentType: file.type };
  }

  const { CONTACT_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  if (!CONTACT_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    return Response.json({ error: "Enquiry delivery is not configured yet." }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
    const subjectCompany = data.company ? ` — ${data.company}` : "";
    const text = [
      `New underwear manufacturing enquiry: ${data.product}${subjectCompany}`,
      "",
      `Name: ${data.name}`,
      `Company: ${data.company || "Not provided"}`,
      `Email: ${data.email}`,
      `Phone / WhatsApp: ${data.phone || "Not provided"}`,
      `Country: ${data.country || "Not provided"}`,
      `Product: ${data.product}`,
      `Estimated quantity: ${data.quantity || "Not provided"}`,
      `Fabric preference: ${data.fabric || "Not provided"}`,
      `Customization: ${data.customization || "Not provided"}`,
      `Branding / labels: ${data.branding || "Not provided"}`,
      "",
      "Message:",
      data.message,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_EMAIL,
      replyTo: data.email,
      subject: `New Underwear Manufacturing Enquiry — ${data.product}${subjectCompany}`,
      text,
      attachments: attachment ? [attachment] : [],
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email delivery failed", error);
    return Response.json({ error: "Unable to deliver the enquiry." }, { status: 502 });
  }
}