import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { company } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Our vision",
  description:
    "The long-term vision of ORYVOM MOBILITY PRIVATE LIMITED: connected, accessible and efficient mobility and transportation across India.",
  path: "/vision",
});

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision"
        title="Connected movement, across a large country."
        lede="A long-term view of mobility that is easier to reach, easier to coordinate, and honest about what is still being built."
        image="/images/hero/interchange.jpg"
        imageAlt="Aerial view of a multi-level urban highway interchange with moving traffic."
      />
      <article className="bg-white">
        <Container className="max-w-3xl py-16 md:py-24">
          <p className="text-base leading-8 text-muted-foreground">
            {company.legalName} holds a long-term vision of connected, accessible and efficient
            mobility and transportation across India. The country moves goods and people through
            many hands: operators, logistics businesses, courier networks, bus services and travel
            providers. The vision is that a business, or a person arranging travel, can find a
            coherent way through that system.
          </p>
          <h2 className="mt-12 text-3xl text-navy">What “connected” means here</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Connected does not mean a single vehicle doing every job. It means the parties who
            already move goods and people can be brought into a clearer commercial relationship:
            one conversation about the requirement, a visible allocation of responsibility, and
            information that helps the parties see what was asked and what was confirmed.
          </p>
          <h2 className="mt-12 text-3xl text-navy">Accessibility and efficiency</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Accessibility, in this vision, means that useful mobility is not limited to the
            organisations that already know whom to call. Efficiency means less wasted coordination:
            fewer unclear handovers, and technology used where it reduces that friction. These are
            aims. They are not published performance results, and the Company does not claim a
            measured environmental outcome.
          </p>
          <h2 className="mt-12 text-3xl text-navy">A vision, not a timetable</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            This page is a statement of direction. It is not a promise that every category is
            operating at national scale, and it is not a forecast. The work of reaching the vision
            depends on partnerships, permissions and the discipline of offering a service only when
            it can actually be offered.
          </p>
          <p className="mt-8 text-sm">
            <Link href="/mission" className="text-navy underline-offset-4 hover:underline">
              Read the mission
            </Link>
          </p>
        </Container>
      </article>
    </>
  );
}
