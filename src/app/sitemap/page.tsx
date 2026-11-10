import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { indexedPages, type SitemapGroup } from "@/config/navigation";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Sitemap",
  description: "A list of the public pages on the ORYVOM MOBILITY PRIVATE LIMITED website.",
  path: "/sitemap",
});

const groups: SitemapGroup[] = ["Company", "Services", "Enquiries", "Legal"];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every public page."
        lede="The same list is published for search engines at /sitemap.xml."
      />
      <section className="bg-white">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
          {groups.map((group) => (
            <div key={group}>
              <h2 className="text-sm tracking-[0.18em] text-muted-foreground uppercase">{group}</h2>
              <ul className="mt-4 grid gap-3">
                {indexedPages
                  .filter((page) => page.group === group)
                  .map((page) => (
                    <li key={page.path}>
                      <Link href={page.path} className="text-navy hover:text-navy-soft">
                        {page.title}
                      </Link>
                      <p className="text-sm leading-6 text-muted-foreground">{page.description}</p>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
