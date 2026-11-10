"use client";

import { Container } from "@/components/layout/container";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-paper">
      <Container className="py-32">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Something went wrong</p>
        <h1 className="mt-4 text-4xl text-navy">This page could not be displayed.</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
          The rest of the website is still available. You can try again, or return to the home page.
        </p>
        <div className="mt-8 flex gap-4">
          <button type="button" onClick={() => retry()} className="h-12 bg-navy px-6 text-sm text-white">
            Try again
          </button>
          <Link href="/" className="inline-flex h-12 items-center border border-line px-6 text-sm text-navy">
            Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
