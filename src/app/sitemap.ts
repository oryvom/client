import type { MetadataRoute } from "next";
import { company } from "@/config/company";
import { indexedPages } from "@/config/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedPages.map((page) => ({
    url: page.path === "/" ? company.website : `${company.website}${page.path}`,
    lastModified: company.policiesUpdatedISO,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.group === "Legal" ? 0.3 : 0.7,
  }));
}
