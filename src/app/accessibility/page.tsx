import { LegalDocumentView } from "@/components/legal/legal-document";
import { legalDocuments } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.accessibility;

export const metadata = pageMetadata({
  title: document.title,
  description: document.description,
  path: document.path,
});

export default function Page() {
  return <LegalDocumentView document={document} />;
}
