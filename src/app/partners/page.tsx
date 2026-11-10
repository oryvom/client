import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { PartnershipForm } from "@/components/forms/partnership-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partnerships",
  description:
    "Partnership enquiries for logistics companies, transport operators, courier businesses, travel providers, bus operators, corporate clients and technology partners.",
  path: "/partners",
});

const audiences = [
  ["Logistics companies", "Businesses that arrange or perform logistics and want a commercial conversation."],
  ["Transport operators", "Operators moving goods who want to be considered for future work."],
  ["Courier businesses", "Courier operators introducing the kind of collection and delivery they undertake."],
  ["Travel service providers", "Providers discussing how business travel might be supported."],
  ["Bus operators", "Coach and bus operators open to a structured introduction."],
  ["Corporate clients", "Organisations with a mobility, logistics or travel requirement to discuss."],
  ["Technology partners", "Teams whose software could improve coordination, introduced without a product claim."],
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="A conversation, before a contract."
        lede="Tell us who you are and the kind of work you do. An enquiry is not an appointment and not a booking."
      />
      <section className="bg-white">
        <Container className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-3xl text-navy">Who this page is for</h2>
            <ul className="mt-6 grid gap-5">
              {audiences.map(([title, text]) => (
                <li key={title}>
                  <h3 className="text-lg text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div id="enquiry" className="md:col-span-7">
            <h2 className="text-3xl text-navy">Partnership enquiry</h2>
            <p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">
              Fields marked with an asterisk are required. We will use the details only to consider
              and reply to this enquiry.
            </p>
            <PartnershipForm />
          </div>
        </Container>
      </section>
    </>
  );
}
