import { z } from "zod";

const personName = z
  .string()
  .trim()
  .min(2, "Enter your name.")
  .max(80, "Name must be 80 characters or fewer.");

const emailAddress = z
  .string()
  .trim()
  .min(1, "Enter an email address.")
  .max(120, "Email must be 120 characters or fewer.")
  .email("Enter a valid email address.");

const phoneNumber = z
  .string()
  .trim()
  .min(8, "Enter a phone number.")
  .max(20, "Phone number must be 20 characters or fewer.")
  .regex(/^\+?[0-9][0-9\s()-]{6,18}$/, "Enter a valid phone number.");

const message = (minimum: number) =>
  z
    .string()
    .trim()
    .min(minimum, `Please write at least ${minimum} characters.`)
    .max(4000, "Message must be 4,000 characters or fewer.");

export const partnershipCategories = [
  "Logistics company",
  "Transport operator",
  "Courier business",
  "Travel service provider",
  "Bus operator",
  "Corporate client",
  "Technology partner",
  "Other",
] as const;

const honeypot = z.string().max(200).optional();

export const contactFieldsSchema = z.object({
  name: personName,
  email: emailAddress,
  phone: phoneNumber,
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject.")
    .max(140, "Subject must be 140 characters or fewer."),
  message: message(20),
  oryLeaveBlank: honeypot,
});

export const partnershipFieldsSchema = z.object({
  name: personName,
  companyName: z
    .string()
    .trim()
    .min(2, "Enter your company name.")
    .max(120, "Company name must be 120 characters or fewer."),
  email: emailAddress,
  phone: phoneNumber,
  category: z.enum(partnershipCategories, "Select a partnership category."),
  city: z.string().trim().min(2, "Enter a city.").max(80, "City must be 80 characters or fewer."),
  message: message(20),
  oryLeaveBlank: honeypot,
});

export const careerFieldsSchema = z.object({
  name: personName,
  email: emailAddress,
  phone: phoneNumber,
  position: z
    .string()
    .trim()
    .min(2, "Tell us the kind of work you want to be considered for.")
    .max(120, "Position of interest must be 120 characters or fewer."),
  message: message(20),
  oryLeaveBlank: honeypot,
});

export const contactRequestSchema = contactFieldsSchema.extend({
  startedAt: z.number().finite(),
});

export const partnershipRequestSchema = partnershipFieldsSchema.extend({
  startedAt: z.number().finite(),
});

export const careerRequestSchema = careerFieldsSchema.extend({
  startedAt: z.coerce.number().finite(),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type PartnershipFields = z.infer<typeof partnershipFieldsSchema>;
export type CareerFields = z.infer<typeof careerFieldsSchema>;

export function issuesOf(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  return error.issues;
}
