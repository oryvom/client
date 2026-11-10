import { company } from "@/config/company";
import { escapeHtml } from "@/lib/security/sanitize";

function row(label: string, value: string) {
  const safe = escapeHtml(value).replace(/\n/g, "<br />");
  return `<tr>
    <td style="padding:10px 12px;border-bottom:1px solid #dce5ef;color:#3e556a;font-size:13px;vertical-align:top;width:160px;">${escapeHtml(label)}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #dce5ef;color:#071426;font-size:14px;line-height:1.5;">${safe}</td>
  </tr>`;
}

export function enquiryEmail({
  heading,
  intro,
  fields,
}: {
  heading: string;
  intro: string;
  fields: { label: string; value: string }[];
}) {
  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f5f8fc;font-family:Inter,Arial,sans-serif;color:#071426;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <p style="margin:0 0 8px;letter-spacing:0.18em;font-size:12px;color:#183b5b;">ORYVOM MOBILITY</p>
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;">${escapeHtml(heading)}</h1>
      <p style="margin:0 0 20px;color:#3e556a;font-size:14px;line-height:1.6;">${escapeHtml(intro)}</p>
      <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #dce5ef;">
        ${fields.map((field) => row(field.label, field.value)).join("")}
      </table>
      <p style="margin:20px 0 0;color:#3e556a;font-size:12px;line-height:1.5;">
        Sent from the website enquiry system for ${escapeHtml(company.legalName)}.
        Reply to this message to respond to the sender.
      </p>
    </div>
  </body>
</html>`;

  const text = [
    heading,
    intro,
    "",
    ...fields.map((field) => `${field.label}: ${field.value}`),
    "",
    `Website: ${company.website}`,
  ].join("\n");

  return { html, text };
}
