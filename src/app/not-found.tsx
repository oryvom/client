import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested is not on the ORYVOM MOBILITY PRIVATE LIMITED website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-navy text-white">
      <Container className="py-32 md:py-40">
        <p className="text-xs tracking-[0.22em] text-ice uppercase">404</p>
        <h1 className="mt-4 text-4xl md:text-6xl">This page is not on the site.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-ice">
          The address may be out of date. The sitemap lists every public page.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="inline-flex h-12 items-center bg-white px-6 text-sm text-navy">
            Home
          </Link>
          <Link href="/sitemap" className="inline-flex h-12 items-center border border-ice/40 px-6 text-sm text-white">
            Sitemap
          </Link>
        </div>
      </Container>
    </section>
  );
}
