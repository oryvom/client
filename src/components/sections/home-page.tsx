import { Container } from "@/components/layout/container";
import { Photo } from "@/components/media/photo";
import { company } from "@/config/company";
import { services } from "@/config/services";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const areas = services;

const approach = [
  {
    number: "01",
    title: "Begin with the movement",
    text: "Understand what needs to travel, who is responsible, and what a reliable outcome looks like for the business.",
  },
  {
    number: "02",
    title: "Work through partnerships",
    text: "Operators and service providers remain essential. Oryvom coordinates. It does not pretend that one company performs every journey.",
  },
  {
    number: "03",
    title: "Use technology for clarity",
    text: "Information should make responsibility, timing and exceptions easier to see. Technology is introduced where it improves coordination.",
  },
  {
    number: "04",
    title: "Say what is available",
    text: "A category on this website is a business focus. A route, vehicle or ticket is offered only when it has been confirmed.",
  },
];

const reasons = [
  {
    title: "One corporate identity",
    text: "Mobility, transportation, logistics and travel sit under a single Indian company, with particulars that a counterparty can read.",
  },
  {
    title: "A partnership posture",
    text: "The model is built around operators, providers and clients. This website is not a closed booking storefront.",
  },
  {
    title: "Published identity",
    text: "The CIN, registered office and directors are stated. Counterparties should not have to guess who they are addressing.",
  },
  {
    title: "An enquiry, not a claim",
    text: "Availability is a question we will answer. The site does not invent capacity, routes or performance figures.",
  },
];

export function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/interchange.jpg"
            alt="Aerial view of a multi-level urban highway interchange with moving traffic."
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
        </div>
        <Container className="relative pb-16 pt-32 md:pb-20">
          <p className="text-[0.72rem] font-medium tracking-[0.32em] text-ice uppercase">
            {company.legalName}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] font-semibold text-white md:text-7xl">
            Moving Businesses. Connecting Possibilities.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ice">
            Building connected mobility and transportation solutions for a more accessible and efficient India.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-medium text-navy hover:bg-ice"
            >
              Explore Our Services
            </Link>
            <Link
              href="/partners"
              className="inline-flex h-12 items-center justify-center border border-ice/40 px-6 text-sm font-medium text-white hover:bg-white/10"
            >
              Partner With Us
            </Link>
          </div>
          <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-5 text-xs tracking-[0.14em] text-ice/80 uppercase sm:flex-row sm:justify-between">
            <p>Noida, Uttar Pradesh</p>
            <p>Incorporated {company.incorporationDate}</p>
            <p>Photograph is illustrative</p>
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="reveal grid gap-10 md:grid-cols-12">
            <p className="text-[0.72rem] font-medium tracking-[0.28em] text-navy-soft uppercase md:col-span-4">
              The company
            </p>
            <div className="md:col-span-8">
              <h2 className="text-3xl leading-tight font-semibold text-navy md:text-5xl">
                A corporate platform for mobility, transportation and logistics.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {company.legalName} is an Indian company incorporated to work across mobility,
                transportation, logistics and travel-related services. These related areas sit under
                one corporate identity, with attention to coordination, accessibility and practical partnerships.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                The company is building the relationships and operating foundations required to connect
                businesses with transportation and logistics capability. Organisations that want to
                understand the current focus, or to discuss a prospective engagement, are invited to enquire.
              </p>
            </div>
          </div>
          <dl className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["CIN", company.cin],
              ["Incorporated", company.incorporationDate],
              ["Registered office", "Noida, Uttar Pradesh"],
              ["Country", company.country],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-line py-6 sm:border-r sm:px-5 sm:first:pl-0">
                <dt className="text-[0.68rem] tracking-[0.22em] text-muted-foreground uppercase">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[0.72rem] font-medium tracking-[0.28em] text-navy-soft uppercase">
                Business areas
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold text-navy md:text-5xl">
                Seven categories. One company.
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-navy hover:text-navy-soft">
              All services <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
          <ol className="mt-12 border-t border-line">
            {areas.map((service, index) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={service.path}
                  className="grid gap-3 py-6 transition-colors hover:bg-paper md:grid-cols-12 md:items-center md:px-2"
                >
                  <span className="text-xs tracking-[0.2em] text-muted-foreground md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl text-navy md:col-span-4">{service.title}</span>
                  <span className="text-sm leading-6 text-muted-foreground md:col-span-6">
                    {service.summary}
                  </span>
                  <ArrowRight className="hidden size-4 text-navy md:col-span-1 md:ml-auto md:block" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Photo
            src="/images/company/warehouse.jpg"
            alt="Pallet racking filled with cartons in a warehouse aisle."
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="reveal">
            <p className="text-[0.72rem] font-medium tracking-[0.28em] text-navy-soft uppercase">
              Our services
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-navy md:text-5xl">
              Read a category as a focus, not as a live inventory.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Each service page explains what the category involves, who it may concern, and how a
              partnership or enquiry can begin. It does not publish routes, prices, departures or
              tracking. Where a solution is still being developed, the page says so.
            </p>
            <ul className="mt-8 grid gap-4">
              {services.slice(0, 3).map((service) => (
                <li key={service.slug}>
                  <Link href={service.path} className="group block border-t border-line pt-4">
                    <span className="text-lg text-navy group-hover:text-navy-soft">{service.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                      {service.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-navy text-white">
        <Container className="py-20 md:py-28">
          <p className="text-[0.72rem] font-medium tracking-[0.28em] text-ice uppercase">
            Our approach to mobility
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-5xl">
            Coordination before claims.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {approach.map((item) => (
              <li key={item.number}>
                <p className="text-xs tracking-[0.22em] text-mist">{item.number}</p>
                <h3 className="mt-3 text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ice/90">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 md:py-28">
          <p className="text-[0.72rem] font-medium tracking-[0.28em] text-navy-soft uppercase">
            Why Oryvom
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-navy md:text-5xl">
            A company that can be identified, and then spoken with.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {reasons.map((reason) => (
              <article key={reason.title} className="border-l border-navy-soft pl-5">
                <h3 className="text-xl text-navy">{reason.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{reason.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <div className="grid md:grid-cols-2">
          <div className="bg-navy px-6 py-16 text-white md:px-16 md:py-24">
            <p className="text-[0.72rem] tracking-[0.28em] text-ice uppercase">Vision</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Connected, accessible and efficient movement across India.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ice">
              A long view of mobility that joins businesses, operators and the people who need to move.
            </p>
            <Link href="/vision" className="mt-8 inline-flex items-center gap-2 text-sm text-white">
              Read the vision <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="bg-navy-mid px-6 py-16 text-white md:px-16 md:py-24">
            <p className="text-[0.72rem] tracking-[0.28em] text-ice uppercase">Mission</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Build solutions that can be coordinated, and that can last.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ice">
              Accessibility, efficiency, partnership and technology, without invented performance claims.
            </p>
            <Link href="/mission" className="mt-8 inline-flex items-center gap-2 text-sm text-white">
              Read the mission <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <Container className="grid gap-8 py-20 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl font-semibold text-navy md:text-4xl">Partner with Oryvom.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Logistics companies, transport operators, courier businesses, travel providers, bus
              operators, corporate clients and technology partners can introduce themselves.
            </p>
            <Link
              href="/partners"
              className="mt-8 inline-flex h-12 items-center bg-navy px-6 text-sm text-white hover:bg-navy-mid"
            >
              Partnership enquiry
            </Link>
          </div>
          <div className="border border-line bg-white p-8">
            <h2 className="text-2xl text-navy">Speak with the company</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{company.address.singleLine}</p>
            <p className="mt-4 text-sm">
              <a className="text-navy underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a className="text-navy underline-offset-4 hover:underline" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
            </p>
            <Link href="/contact" className="mt-6 inline-flex text-sm text-navy">
              Contact form
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
