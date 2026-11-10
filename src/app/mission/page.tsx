import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Our mission",
  description:
    "The mission of ORYVOM MOBILITY PRIVATE LIMITED: accessibility, efficient transportation, coordination between businesses, and models that can scale responsibly.",
  path: "/mission",
});

const commitments = [
  {
    title: "Improve accessibility",
    text: "Treat mobility as something a business or a traveller should be able to discuss without already knowing the whole market. Accessibility here is about reach and clarity. It is not a claim that every place is already served.",
  },
  {
    title: "Build efficient transportation solutions",
    text: "Look for arrangements that waste less time in handover and uncertainty. Efficiency is a design aim for the way work is organised. It is not a published saving or a benchmark against another company.",
  },
  {
    title: "Connect businesses and service providers",
    text: "The useful unit of this industry is often a relationship: a shipper and an operator, a company and a courier, a client and a bus operator. The mission is to make those relationships easier to start and easier to understand.",
  },
  {
    title: "Use technology to improve coordination",
    text: "Use software where it makes status, responsibility and exceptions clearer. Technology supports the people doing the work. It is not a substitute for an operator, and it is not presented as a live control tower on this website.",
  },
  {
    title: "Develop sustainable and scalable models",
    text: "Prefer commercial models that can continue, and that can grow only as fast as the partnerships and the operating discipline allow. “Sustainable” here means durable as a business and attentive to responsible use of resources. The Company does not publish environmental measurements.",
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Mission"
        title="A practical commitment, not a slogan."
        lede="Five commitments guide how Oryvom intends to build. None of them is a measured result."
      />
      <article className="bg-white">
        <Container className="py-16 md:py-24">
          <ol className="grid gap-10">
            {commitments.map((item, index) => (
              <li key={item.title} className="grid gap-4 border-t border-line pt-8 md:grid-cols-12">
                <p className="text-xs tracking-[0.2em] text-muted-foreground md:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="md:col-span-10">
                  <h2 className="text-2xl text-navy">{item.title}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-sm">
            <Link href="/vision" className="text-navy underline-offset-4 hover:underline">
              Read the vision
            </Link>
            <span className="text-muted-foreground"> · </span>
            <Link href="/partners" className="text-navy underline-offset-4 hover:underline">
              Partnerships
            </Link>
          </p>
        </Container>
      </article>
    </>
  );
}
