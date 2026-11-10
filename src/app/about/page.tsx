import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Photo } from "@/components/media/photo";
import { company, mapsSearchUrl } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "ORYVOM MOBILITY PRIVATE LIMITED is an Indian company working across mobility, transportation, logistics and travel-related services, incorporated in Noida.",
  path: "/about",
});

const facts = [
  ["Legal name", company.legalName],
  ["CIN", company.cin],
  ["Incorporation date", company.incorporationDate],
  ["Country", company.country],
  ["Authorised capital", company.authorisedCapital],
  ["Paid-up capital", company.paidUpCapital],
  ["Directors", company.directors.join(" and ")],
  ["Email", company.email],
  ["Phone", company.phoneDisplay],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the company"
        title="Who we are"
        lede="An Indian mobility company, incorporated to work across transportation, logistics and travel-related services."
        image="/images/about/highway.jpg"
        imageAlt="A highway running through a rocky landscape toward distant mountains."
      />
      <article className="bg-white">
        <Container className="grid gap-16 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <h2 className="text-3xl text-navy">Company introduction</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {company.legalName} was incorporated on {company.incorporationDate}. The registered
              office is in Noida, Gautam Buddha Nagar, Uttar Pradesh. The company is organised
              around mobility, transportation, logistics and travel. It does not describe itself as
              a market leader, and it does not publish operating statistics.
            </p>
            <h2 className="mt-12 text-3xl text-navy">Our purpose</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The purpose is to make movement easier to organise. Businesses need goods and people
              to travel. Operators and service providers have the means to carry them. Oryvom exists
              to give that relationship a clear corporate home: one identity, a direct enquiry path,
              and a way of working that says what is available and what is still being developed.
            </p>
            <h2 className="mt-12 text-3xl text-navy">Our approach</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              We start with the requirement, then with the parties who would have to be involved.
              Technology is used where it makes coordination clearer. A page on this website is a
              description of a business focus. A confirmed movement, if one is agreed, will be a
              separate communication. There is no booking engine here.
            </p>
            <h2 className="mt-12 text-3xl text-navy">Business philosophy</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground">
              <li>Be identifiable. Publish the company particulars a counterparty needs.</li>
              <li>Be precise about availability. Do not dress a plan up as an operation.</li>
              <li>Work with operators and providers, rather than implying a fleet that is not stated.</li>
              <li>Treat an enquiry as the start of a conversation, not as a completed transaction.</li>
              <li>Prefer a model that can be repeated responsibly over a claim that cannot be evidenced.</li>
            </ul>
            <h2 className="mt-12 text-3xl text-navy">Corporate identity</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The company name is {company.legalName}. In ordinary writing it may be referred to as
              Oryvom. The corporate identity number is {company.cin}. Directors are{" "}
              {company.directors.join(" and ")}. Biographies are not published on this website.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/leadership" className="text-navy underline-offset-4 hover:underline">
                Leadership
              </Link>
              <span className="text-muted-foreground"> · </span>
              <Link href="/vision" className="text-navy underline-offset-4 hover:underline">
                Vision
              </Link>
              <span className="text-muted-foreground"> · </span>
              <Link href="/mission" className="text-navy underline-offset-4 hover:underline">
                Mission
              </Link>
            </p>
          </div>
          <div className="md:col-span-5">
            <Photo
              src="/images/company/warehouse.jpg"
              alt="Pallet racking filled with cartons in a warehouse aisle."
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </Container>
      </article>
      <section className="bg-paper">
        <Container className="py-16 md:py-20">
          <h2 className="text-3xl text-navy">Company information</h2>
          <dl className="mt-8 border-t border-line">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-line py-4 md:grid-cols-3">
                <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</dt>
                <dd className="text-sm text-navy md:col-span-2">{value}</dd>
              </div>
            ))}
            <div className="grid gap-1 border-b border-line py-4 md:grid-cols-3">
              <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Registered office
              </dt>
              <dd className="text-sm leading-6 text-navy md:col-span-2">
                {company.address.singleLine}{" "}
                <a className="underline-offset-4 hover:underline" href={mapsSearchUrl}>
                  Map search
                </a>
              </dd>
            </div>
          </dl>
        </Container>
      </section>
    </>
  );
}
