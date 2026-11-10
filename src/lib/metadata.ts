import type { Metadata } from "next";
import { company } from "@/config/company";

const shareImage = {
  url: "/images/hero/interchange.jpg",
  width: 1600,
  height: 1199,
  alt: "Aerial view of a multi-level urban highway interchange with moving traffic.",
};

export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
}): Metadata {
  const canonical = path === "/" ? "/" : path;
  const url = path === "/" ? company.website : `${company.website}${path}`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      siteName: company.legalName,
      locale: "en_IN",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
