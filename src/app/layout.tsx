import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { AnalyticsGate, CookieBanner } from "@/components/cookie/cookie-preferences";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { company } from "@/config/company";
import { logoSources } from "@/lib/logo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "ORYVOM MOBILITY PRIVATE LIMITED | Mobility and Transportation",
    template: "%s | ORYVOM",
  },
  description:
    "ORYVOM MOBILITY PRIVATE LIMITED is an Indian mobility, transportation, logistics and travel company based in Noida.",
  applicationName: company.legalName,
  authors: [{ name: company.legalName, url: company.website }],
  creator: company.legalName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.legalName,
    url: company.website,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-navy">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <OrganizationJsonLd />
        <Header logos={logoSources} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer logos={logoSources} />
        <CookieBanner />
        <AnalyticsGate />
      </body>
    </html>
  );
}
