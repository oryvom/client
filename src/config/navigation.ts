import { services } from "@/config/services";

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; summary: string }[];
};

export const mainNavigation: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: services.map((service) => ({
      href: service.path,
      label: service.title,
      summary: service.summary,
    })),
  },
  { href: "/vision", label: "Vision" },
  { href: "/partners", label: "Partnerships" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export type SitemapGroup = "Company" | "Services" | "Enquiries" | "Legal";

export type IndexedPage = {
  path: string;
  title: string;
  description: string;
  group: SitemapGroup;
};

export const indexedPages: IndexedPage[] = [
  {
    path: "/",
    title: "Home",
    description: "Corporate introduction to ORYVOM MOBILITY PRIVATE LIMITED.",
    group: "Company",
  },
  {
    path: "/about",
    title: "About us",
    description: "Who the company is, how it approaches its work, and its published particulars.",
    group: "Company",
  },
  {
    path: "/vision",
    title: "Our vision",
    description: "The company’s long-term view of mobility and transportation in India.",
    group: "Company",
  },
  {
    path: "/mission",
    title: "Our mission",
    description: "The commitments that guide how Oryvom intends to build its business.",
    group: "Company",
  },
  {
    path: "/leadership",
    title: "Leadership",
    description: "The directors of the company.",
    group: "Company",
  },
  {
    path: "/services",
    title: "Our services",
    description: "The seven business categories the company is organised around.",
    group: "Services",
  },
  ...services.map((service) => ({
    path: service.path,
    title: service.title,
    description: service.summary,
    group: "Services" as const,
  })),
  {
    path: "/partners",
    title: "Partnerships",
    description: "A partnership enquiry for operators, providers and corporate clients.",
    group: "Enquiries",
  },
  {
    path: "/careers",
    title: "Careers",
    description: "An expression of interest for people who want to be considered by the company.",
    group: "Enquiries",
  },
  {
    path: "/contact",
    title: "Contact us",
    description: "Registered office, email, phone and a general enquiry form.",
    group: "Enquiries",
  },
  {
    path: "/privacy-policy",
    title: "Privacy policy",
    description: "How the website handles personal data.",
    group: "Legal",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms and conditions",
    description: "Terms for use of this website.",
    group: "Legal",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer",
    description: "Limits on how the information on this website should be read.",
    group: "Legal",
  },
  {
    path: "/cookie-policy",
    title: "Cookie policy",
    description: "How cookies and similar technologies are used.",
    group: "Legal",
  },
  {
    path: "/accessibility",
    title: "Accessibility statement",
    description: "Accessibility commitments and how to report a barrier.",
    group: "Legal",
  },
  {
    path: "/sitemap",
    title: "Sitemap",
    description: "A list of public pages on this website.",
    group: "Legal",
  },
];

export const footerCompanyLinks = [
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/mission", label: "Mission" },
  { href: "/leadership", label: "Leadership" },
  { href: "/partners", label: "Partnerships" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms and conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/sitemap", label: "Sitemap" },
];
