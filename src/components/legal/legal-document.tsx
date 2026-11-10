import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { company, counselNote } from "@/config/company";
import { applyCompanyTokens, type LegalDocument } from "@/content/legal";
import type { ReactNode } from "react";

function CompanyText({ text }: { text: string }) {
  const value = applyCompanyTokens(text);
  const pattern = new RegExp(
    `(${company.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}|${company.phoneDisplay.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "g",
  );
  const nodes: ReactNode[] = [];
  value.split(pattern).forEach((part, index) => {
    if (part === company.email) {
      nodes.push(
        <a key={`${part}-${index}`} href={`mailto:${company.email}`}>
          {part}
        </a>,
      );
      return;
    }
    if (part === company.phoneDisplay) {
      nodes.push(
        <a key={`${part}-${index}`} href={`tel:${company.phoneTel}`}>
          {part}
        </a>,
      );
      return;
    }
    if (part) nodes.push(part);
  });
  return <>{nodes}</>;
}

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageHero eyebrow={document.eyebrow} title={document.title} lede={document.description} />
      <article className="bg-white">
        <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <nav aria-label="On this page" className="md:col-span-4">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">On this page</p>
            <ol className="mt-4 grid gap-2">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm text-navy hover:text-navy-soft">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="legal md:col-span-8">
            <p className="text-sm text-muted-foreground">Last updated: {company.policiesUpdated}</p>
            {document.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`}>{section.heading}</h2>
                {section.blocks.map((block, index) =>
                  block.type === "p" ? (
                    <p key={`${section.id}-p-${index}`}>
                      <CompanyText text={block.text} />
                    </p>
                  ) : (
                    <ul key={`${section.id}-ul-${index}`}>
                      {block.items.map((item) => (
                        <li key={item}>
                          <CompanyText text={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
            <aside className="mt-12 border border-line bg-paper p-6 text-sm leading-6 text-muted-foreground">
              {counselNote}
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
