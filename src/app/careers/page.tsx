import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { CareerForm } from "@/components/forms/career-form";
import { company } from "@/config/company";
import { pageMetadata } from "@/lib/metadata";
import { resumeMaxBytes } from "@/lib/storage/resume";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Expressions of interest for ORYVOM MOBILITY PRIVATE LIMITED. No vacancies are listed. Send a PDF resume and a short note.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Interested in working with Oryvom?"
        lede="Interested in exploring opportunities with Oryvom? Submit your details and our team can review your enquiry."
      />
      <section className="bg-white">
        <Container className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-3xl text-navy">Working at Oryvom</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {company.legalName} is an early company with a defined corporate identity and a wide
              subject: mobility, transportation, logistics and travel. The work, as the company
              grows, will be practical. It will involve speaking clearly with businesses and
              operators, and keeping a distinction between a plan and a service that is actually offered.
            </p>
            <h2 className="mt-10 text-3xl text-navy">How we expect people to work</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted-foreground">
              <li>Say what is known, and say what is not.</li>
              <li>Treat operators, clients and colleagues as people who need a precise answer.</li>
              <li>Use technology to reduce confusion, not to hide it.</li>
              <li>Keep personal data, including resumes, out of public places.</li>
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              There are no vacancies listed on this page. Please do not treat the form as an
              application to a role we have advertised. If you would like the company to know of
              your interest, send a note and a PDF resume.
            </p>
          </div>
          <div id="enquiry" className="md:col-span-7">
            <h2 className="text-3xl text-navy">Career enquiry</h2>
            <p className="mt-3 mb-8 text-sm leading-6 text-muted-foreground">
              Resumes are stored privately and are emailed to {company.email}. They are not published.
            </p>
            <CareerForm maxBytes={resumeMaxBytes()} />
          </div>
        </Container>
      </section>
    </>
  );
}
