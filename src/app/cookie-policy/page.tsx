import { Container } from "@/components/layout/container";
import { CookiePreferences } from "@/components/cookie/cookie-preferences";
import { LegalDocumentView } from "@/components/legal/legal-document";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.cookies;

export const metadata = pageMetadata({
  title: document.title,
  description: document.description,
  path: document.path,
});

export default function CookiePolicyPage() {
  return (
    <>
      <LegalDocumentView document={document} />
      <section className="bg-white" aria-label="Preference controls">
        <Container className="pb-20">
          <CookiePreferences />
        </Container>
      </section>
    </>
  );
}
