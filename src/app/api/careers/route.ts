import { createHash } from "node:crypto";
import { company } from "@/config/company";
import {
  checkSpam,
  deliver,
  deliveryFailure,
  guardRequest,
  jsonError,
  jsonOk,
  remember,
  userFieldErrors,
} from "@/lib/api/enquiry";
import { enquiryEmail } from "@/lib/email/templates";
import { sanitizeMultiline, sanitizeText } from "@/lib/security/sanitize";
import { deleteResume, readVerifiedPdf, resumeMaxBytes, storeResume } from "@/lib/storage/resume";
import { careerRequestSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const blocked = guardRequest(request, "careers");
  if (blocked) return blocked;

  const maxBytes = resumeMaxBytes();
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes + 200_000) {
    return jsonError(413, `The resume must be ${Math.floor(maxBytes / 1_000_000)} MB or smaller.`);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError(400, "The application could not be read. Please try again.");
  }

  const resume = form.get("resume");
  const parsed = careerRequestSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    position: form.get("position"),
    message: form.get("message"),
    oryLeaveBlank: form.get("oryLeaveBlank") ?? "",
    startedAt: form.get("startedAt"),
  });

  if (!parsed.success) {
    const fieldErrors = userFieldErrors(parsed.error.issues);
    if (Object.keys(fieldErrors).length === 0) {
      return jsonError(400, "Please refresh the page and submit the form again.");
    }
    return jsonError(400, "Please correct the highlighted fields.", { fieldErrors });
  }

  const spam = checkSpam(parsed.data.startedAt, parsed.data.oryLeaveBlank ?? "");
  if (spam.type === "silent") return jsonOk("Thank you. Your enquiry has been received.");
  if (spam.type === "reject") return spam.response;

  if (!(resume instanceof File)) {
    return jsonError(400, "Attach a PDF resume.", { fieldErrors: { resume: "Attach a PDF resume." } });
  }

  const file = await readVerifiedPdf(resume, maxBytes);
  if (!file.ok) {
    return jsonError(400, file.error, { fieldErrors: { resume: file.error } });
  }

  const data = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email),
    phone: sanitizeText(parsed.data.phone),
    position: sanitizeText(parsed.data.position),
    message: sanitizeMultiline(parsed.data.message),
  };

  const fileHash = createHash("sha256").update(file.bytes).digest("hex");
  const duplicate = remember("careers", [data.email, data.position, fileHash]);
  if (duplicate) return duplicate;

  let storedId: string | null = null;
  try {
    storedId = await storeResume(file.bytes, file.filename);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Resume storage failed");
    return deliveryFailure();
  }

  const email = enquiryEmail({
    heading: "Career enquiry",
    intro: "A candidate submitted an expression of interest. The resume is attached and stored privately.",
    fields: [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Position of interest", value: data.position },
      { label: "Message", value: data.message },
      { label: "Resume file", value: file.filename },
      { label: "Private reference", value: storedId },
    ],
  });

  const sent = await deliver({
    subject: `Career enquiry: ${data.name}`,
    replyTo: data.email,
    html: email.html,
    text: email.text,
    attachments: [
      { filename: file.filename, content: file.bytes, contentType: "application/pdf" },
    ],
  });

  if (!sent.ok) {
    await deleteResume(storedId).catch(() => undefined);
    return deliveryFailure();
  }

  return jsonOk(`Thank you. Your enquiry has been sent to ${company.brandName}.`);
}
