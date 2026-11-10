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
import { contactRequestSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const blocked = guardRequest(request, "contact");
  if (blocked) return blocked;

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 100_000) {
    return jsonError(413, "The submission is too large.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "The submission could not be read. Please try again.");
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = userFieldErrors(parsed.error.issues);
    if (Object.keys(fieldErrors).length === 0) {
      return jsonError(400, "Please refresh the page and submit the form again.");
    }
    return jsonError(400, "Please correct the highlighted fields.", { fieldErrors });
  }

  const spam = checkSpam(parsed.data.startedAt, parsed.data.oryLeaveBlank ?? "");
  if (spam.type === "silent") return jsonOk("Thank you. Your message has been received.");
  if (spam.type === "reject") return spam.response;

  const data = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email),
    phone: sanitizeText(parsed.data.phone),
    subject: sanitizeText(parsed.data.subject),
    message: sanitizeMultiline(parsed.data.message),
  };

  const duplicate = remember("contact", [data.email, data.subject, data.message]);
  if (duplicate) return duplicate;

  const email = enquiryEmail({
    heading: "Website contact enquiry",
    intro: "A visitor submitted the contact form.",
    fields: [
      { label: "Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Subject", value: data.subject },
      { label: "Message", value: data.message },
    ],
  });

  const sent = await deliver({
    subject: `Website enquiry: ${data.subject}`,
    replyTo: data.email,
    ...email,
  });

  if (!sent.ok) return deliveryFailure();

  return jsonOk(`Thank you. Your message has been sent to ${company.brandName}.`);
}
