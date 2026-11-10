import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { illustrativeCaption } from "@/config/company";
import type { Service } from "@/config/services";
import { services } from "@/config/services";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service category"
        title={service.title}
        lede={service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
      />
      <article className="bg-white">
        <Container className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <h2 className="text-3xl text-navy">Introduction</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{service.introduction}</p>

            <h2 className="mt-12 text-3xl text-navy">What the service involves</h2>
            <ul className="mt-4 grid gap-3">
              {service.involves.map((item) => (
                <li key={item} className="border-l border-line pl-4 text-sm leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl text-navy">How Oryvom approaches this category</h2>
            <ul className="mt-4 grid gap-3">
              {service.approach.map((item) => (
                <li key={item} className="text-sm leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl text-navy">Potential customer segments</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              {service.segments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl text-navy">Business applications</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              {service.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl text-navy">Partnership opportunities</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.partnerships}</p>
            <Link
              href="/partners"
              className="mt-6 inline-flex h-12 items-center bg-navy px-6 text-sm text-white hover:bg-navy-mid"
            >
              Discuss a partnership
            </Link>
          </div>
          <aside className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{illustrativeCaption}</p>
            <div className="mt-8 border border-line bg-paper p-6">
              <h2 className="text-xl text-navy">Enquire about availability</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This page describes a business focus. It is not a booking page. Write to us if you
                want to know whether a particular requirement can be discussed.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm text-navy">
                Contact the company <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="mt-8">
              <h2 className="text-sm tracking-[0.18em] text-muted-foreground uppercase">Other categories</h2>
              <ul className="mt-4 grid gap-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.path} className="text-sm text-navy hover:text-navy-soft">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </article>
    </>
  );
}
