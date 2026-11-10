import "server-only";

import { Resend } from "resend";
import { company } from "@/config/company";

type OutboundEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
};

export async function sendToCompany(
  message: OutboundEmail,
): Promise<{ ok: true } | { ok: false }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || company.email;

  if (!apiKey || !from) {
    console.error("Email is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return { ok: false };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
      attachments: message.attachments,
    });

    if (result.error) {
      console.error(`Resend rejected the message: ${result.error.name}`);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    const detail = error instanceof Error ? error.name : "unknown";
    console.error(`Resend request failed: ${detail}`);
    return { ok: false };
  }
}
