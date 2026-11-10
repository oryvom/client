import { company } from "@/config/company";

const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.website,
  email: company.email,
  telephone: company.phoneTel,
  foundingDate: company.incorporationDateISO,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "CIN",
    value: company.cin,
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
