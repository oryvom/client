import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { company } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Leadership",
  description:
    "The directors of ORYVOM MOBILITY PRIVATE LIMITED are Manjeet Chandra and Daisy.",
  path: "/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Directors of the company."
        lede="The board is stated here by name. Biographies, photographs and further designations are not published."
      />
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            {company.legalName} is directed by the people named below. This page does not add job
            titles beyond Director, and it does not set out qualifications or professional histories.
          </p>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {company.directors.map((name) => (
              <li key={name} className="border border-line bg-paper p-8">
                <h2 className="text-3xl text-navy">{name}</h2>
                <p className="mt-3 text-xs tracking-[0.22em] text-muted-foreground uppercase">Director</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            Company particulars, including the CIN and registered office, are set out on the{" "}
            <Link href="/about" className="text-navy underline-offset-4 hover:underline">
              about page
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
