import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { company, mapsSearchUrl } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact us",
  description:
    "Contact ORYVOM MOBILITY PRIVATE LIMITED at the Noida registered office, work@oryvom.com, or +91 8252945156.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the company."
        lede="The registered office, email and phone are below. The form sends a message to the same address."
      />
      <section className="bg-white">
        <Container className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-sm tracking-[0.18em] text-muted-foreground uppercase">Company</h2>
            <p className="mt-3 text-lg text-navy">{company.legalName}</p>
            <h2 className="mt-8 text-sm tracking-[0.18em] text-muted-foreground uppercase">
              Registered office
            </h2>
            <address className="mt-3 text-sm leading-7 text-navy not-italic">
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3">
              <a className="text-sm text-navy underline-offset-4 hover:underline" href={mapsSearchUrl}>
                Search this address on a map
              </a>
            </p>
            <h2 className="mt-8 text-sm tracking-[0.18em] text-muted-foreground uppercase">Email</h2>
            <p className="mt-3">
              <a className="text-lg text-navy" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </p>
            <h2 className="mt-8 text-sm tracking-[0.18em] text-muted-foreground uppercase">Phone</h2>
            <p className="mt-3">
              <a className="text-lg text-navy" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
            </p>
            <p className="mt-8 text-xs leading-5 text-muted-foreground">
              CIN {company.cin}. The map link searches the address as written. It does not use a
              separate set of coordinates.
            </p>
          </div>
          <div id="enquiry" className="md:col-span-7">
            <h2 className="text-3xl text-navy">Contact form</h2>
            <p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">
              If the form cannot deliver the message, you will see an error and you can email{" "}
              {company.email} directly.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
