import "server-only";

import { createHash } from "node:crypto";
import { company } from "@/config/company";
import { sendToCompany } from "@/lib/email/send";
import {
  clientIp,
  isDuplicate,
  rateLimit,
  submissionTiming,
} from "@/lib/security/request";
import { NextResponse } from "next/server";

export type FieldIssue = { path: PropertyKey[]; message: string };

export function jsonError(
  status: number,
  error: string,
  extra?: { fieldErrors?: Record<string, string>; headers?: HeadersInit },
) {
  return NextResponse.json(
    {
      ok: false as const,
      error,
      contactEmail: company.email,
      fieldErrors: extra?.fieldErrors,
    },
    { status, headers: extra?.headers },
  );
}

export function jsonOk(message: string) {
  return NextResponse.json({ ok: true as const, message });
}

export function userFieldErrors(issues: FieldIssue[]) {
  const fields: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    if (key === "oryLeaveBlank" || key === "startedAt") continue;
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export function guardRequest(request: Request, bucket: string) {
  const limit = rateLimit(`${bucket}:${clientIp(request)}`);
  if (!limit.ok) {
    return jsonError(
      429,
      `Too many submissions from this network. Please wait and try again, or email ${company.email}.`,
      { headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }
  return null;
}

export function deliveryFailure() {
  return jsonError(
    503,
    `The submission could not be completed, so nothing was delivered to our team. Please email ${company.email} instead.`,
  );
}

type SpamDecision =
  | { type: "silent" }
  | { type: "reject"; response: NextResponse }
  | { type: "continue" };

export function checkSpam(startedAt: number, honeypot: string): SpamDecision {
  if (honeypot.trim().length > 0) return { type: "silent" };
  const timing = submissionTiming(startedAt);
  if (timing === "fast") {
    return {
      type: "reject",
      response: jsonError(400, "Please wait a moment and submit the form again."),
    };
  }
  if (timing === "invalid") {
    return {
      type: "reject",
      response: jsonError(400, "Please refresh the page and submit the form again."),
    };
  }
  return { type: "continue" };
}

export function remember(scope: string, parts: string[]) {
  const digest = createHash("sha256").update(parts.join("|").toLowerCase()).digest("hex");
  if (isDuplicate(`${scope}:${digest}`)) {
    return jsonError(
      409,
      `This submission was already received recently. If you need to add anything, please email ${company.email}.`,
    );
  }
  return null;
}

export async function deliver(input: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  attachments?: { filename: string; content: Buffer; contentType: string }[];
}) {
  return sendToCompany(input);
}
