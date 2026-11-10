import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { services } from "@/config/services";
import { pageMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Our services",
  description:
    "Seven business categories of ORYVOM MOBILITY PRIVATE LIMITED: logistics, goods, courier, passenger and bus transportation, travel and ticketing.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Business categories, stated plainly."
        lede="Each category is a focus of the company. Availability of a particular movement is confirmed by enquiry, not by this page."
      />
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            Oryvom is organised around seven related areas. The descriptions explain the work the
            category involves and the kind of partnership that may be relevant. They are not
            timetables, rate cards or tracking tools.             Where a solution is under development, the
            service page says so. Photographs on these pages are illustrative. They are not
            pictures of Oryvom vehicles, facilities or operations.
          </p>
          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.slug} className="border border-line bg-paper">
                <div className="relative aspect-[16/9] bg-navy">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl text-navy">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.summary}</p>
                  <Link
                    href={service.path}
                    className="mt-5 inline-flex items-center gap-2 text-sm text-navy"
                  >
                    Read this category <ArrowRight className="size-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
