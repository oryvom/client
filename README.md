# ORYVOM MOBILITY PRIVATE LIMITED

Corporate website for ORYVOM MOBILITY PRIVATE LIMITED. It presents the company, its business categories, and enquiry routes for contact, partnerships and careers. It is not a booking, payment or tracking product.

## Requirements

- Node.js 20 or newer
- npm

## Installation

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` before expecting enquiry emails to send. The site builds and runs without those values. A form then returns an error and shows `work@oryvom.com` as the alternative. It does not show a success message when mail cannot be delivered.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npm run build
npm start
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from Resend. Required to send mail. |
| `RESEND_FROM_EMAIL` | Verified sender, for example `ORYVOM Mobility <notifications@oryvom.com>`. Required to send mail. |
| `CONTACT_TO_EMAIL` | Inbox for notifications. Defaults to `work@oryvom.com`. |
| `RESUME_STORAGE_DIR` | Private directory for PDF resumes. Must not be inside `public/`. |
| `RESUME_MAX_BYTES` | Maximum resume size. The code default is 4,000,000 bytes. |
| `RATE_LIMIT_WINDOW_MS` | Rate-limit window. Default 10 minutes. |
| `RATE_LIMIT_MAX` | Submissions allowed per window, per form, per IP. Default 5. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional. When set, the cookie banner is shown. |
| `NEXT_PUBLIC_ANALYTICS_SRC` | Optional script URL. Loaded only after analytics is accepted. |

Never commit `.env.local`. `.env.example` contains placeholders only.

### Resend

1. Create an API key in Resend.
2. Verify the domain you will send from.
3. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`.
4. Set `CONTACT_TO_EMAIL` if notifications should go somewhere other than `work@oryvom.com`.

Messages use the visitor’s address as reply-to. They are not sent with the visitor’s address as the from address.

### Resume storage

Career uploads are PDF only. The server checks the extension, the MIME type and the `%PDF-` file header, then writes the file outside `public/` with a random name and mode `0600`. A metadata sidecar stores the original filename, not a public URL. There is no route that serves these files.

The resume is also attached to the notification email. If email delivery fails, the stored file is deleted and the visitor sees an error.

`storage/` is gitignored. On a single Node server, set `RESUME_STORAGE_DIR` to a persistent private path. On Vercel and similar serverless hosts the local disk is ephemeral and not shared across instances. For production on those hosts, either:

- mount a persistent private volume and point `RESUME_STORAGE_DIR` at it, or
- accept that the email attachment is the copy of record and that a local file may disappear after the request.

Do not point `RESUME_STORAGE_DIR` at `public/` or any directory the web server serves. The application refuses a path inside `public/`.

The in-memory rate limit and duplicate check reset when the process restarts and are not shared across multiple server instances.

## Deployment

The app is a Next.js App Router project and can be deployed to Vercel or any Node.js host that runs `npm run build` and `npm start`.

- Set the environment variables in the host’s secret store.
- Use HTTPS.
- Confirm `RESEND_FROM_EMAIL` uses a domain verified in Resend.
- Keep resume storage off the public web root.
- The canonical domain is `https://oryvom.com`, set as `company.website` in `src/config/company.ts`.

## Changing company information

Edit `src/config/company.ts`. The name, CIN, dates, address, email, phone, capital figures and directors are read from that file, including the legal pages. Do not change the CIN unless the official record has changed. After editing, rebuild.

## Replacing the logo

Put an SVG, PNG, WebP or JPG in `public/logo/`. The site picks it up on the next build.

- A file whose name contains `white`, `light` or `inverse` is preferred on dark backgrounds.
- A file whose name contains `dark`, `navy` or `color` is preferred on light backgrounds.
- If only one file is present, it is used in both places.
- The logo is shown at a fixed height with automatic width, so it is not stretched.
- If the folder is empty, the header and footer use a text wordmark. That wordmark is not a separate logo image.

## Updating service descriptions

Edit `src/config/services.ts`. The home page, services menu, service pages, footer and sitemap all read that file. Keep the wording accurate: these are business categories, and availability is by enquiry.

## Updating legal pages

Edit `src/content/legal.ts`. The privacy policy, terms, disclaimer, cookie policy and accessibility statement are rendered from that file. The “Last updated” date is `policiesUpdated` in `src/config/company.ts`.

These texts should be reviewed by qualified Indian legal counsel before they are relied on as final legal documents. The site states that on every legal page.

## Photographs

Images in `public/images/` are stock photographs used as illustration. They are not pictures of the Company’s vehicles, premises or operations. Captions on the site say so. They are used under the Unsplash Licence. Replace a file in place if you change a photograph, and update its alt text where it is referenced.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Motion, Lucide, React Hook Form, Zod and Resend.
