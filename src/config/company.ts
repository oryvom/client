export const company = {
  legalName: "ORYVOM MOBILITY PRIVATE LIMITED",
  brandName: "Oryvom",
  cin: "U49231UW2026PTC258998",
  incorporationDate: "23 September 2026",
  incorporationDateISO: "2026-09-23",
  email: "work@oryvom.com",
  phoneDisplay: "+91 8252945156",
  phoneTel: "+918252945156",
  website: "https://oryvom.com",
  authorisedCapital: "₹1,00,000",
  paidUpCapital: "₹10,000",
  directors: ["Manjeet Chandra", "Daisy"] as const,
  country: "India",
  policiesUpdated: "11 November 2026",
  policiesUpdatedISO: "2026-11-11",
  address: {
    street:
      "Unit 603 & 604, 6th Floor, Tower B, Bhutani Alphathum, NEPS Post Office",
    locality: "Noida",
    district: "Gautam Buddha Nagar",
    region: "Uttar Pradesh",
    postalCode: "201305",
    country: "India",
    countryCode: "IN",
    lines: [
      "Unit 603 & 604, 6th Floor, Tower B",
      "Bhutani Alphathum, NEPS Post Office",
      "Noida, Gautam Buddha Nagar",
      "Uttar Pradesh 201305",
      "India",
    ],
    singleLine:
      "Unit 603 & 604, 6th Floor, Tower B, Bhutani Alphathum, NEPS Post Office, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201305, India.",
  },
} as const;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.singleLine)}`;

export const illustrativeCaption =
  "Illustrative photograph. It does not show an Oryvom vehicle, facility, route or operation.";

export const counselNote =
  "These pages are drafted for this website and should be reviewed by qualified Indian legal counsel before being relied upon as final legal documents.";
