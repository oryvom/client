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
import { partnershipRequestSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const blocked = guardRequest(request, "partnership");
  if (blocked) return blocked;

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 100_000) return jsonError(413, "The submission is too large.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "The submission could not be read. Please try again.");
  }

  const parsed = partnershipRequestSchema.safeParse(body);
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

  const data = {
    name: sanitizeText(parsed.data.name),
    companyName: sanitizeText(parsed.data.companyName),
    email: sanitizeText(parsed.data.email),
    phone: sanitizeText(parsed.data.phone),
    category: parsed.data.category,
    city: sanitizeText(parsed.data.city),
    message: sanitizeMultiline(parsed.data.message),
  };

  const duplicate = remember("partnership", [data.email, data.companyName, data.category, data.message]);
  if (duplicate) return duplicate;

  const email = enquiryEmail({
    heading: "Partnership enquiry",
    intro: "A business submitted the partnership form.",
    fields: [
      { label: "Name", value: data.name },
      { label: "Company", value: data.companyName },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Category", value: data.category },
      { label: "City", value: data.city },
      { label: "Message", value: data.message },
    ],
  });

  const sent = await deliver({
    subject: `Partnership enquiry: ${data.companyName}`,
    replyTo: data.email,
    ...email,
  });

  if (!sent.ok) return deliveryFailure();
  return jsonOk(`Thank you. Your partnership enquiry has been sent to ${company.brandName}.`);
}
