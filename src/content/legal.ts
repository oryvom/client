import { company } from "@/config/company";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  sections: LegalSection[];
};

function withCompany(text: string) {
  return text
    .replaceAll("{{name}}", company.legalName)
    .replaceAll("{{brand}}", company.brandName)
    .replaceAll("{{email}}", company.email)
    .replaceAll("{{phone}}", company.phoneDisplay)
    .replaceAll("{{address}}", company.address.singleLine)
    .replaceAll("{{cin}}", company.cin)
    .replaceAll("{{website}}", company.website)
    .replaceAll("{{incorporated}}", company.incorporationDate);
}

export function applyCompanyTokens(text: string) {
  return withCompany(text);
}

export const legalDocuments = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    path: "/privacy-policy",
    description:
      "How ORYVOM MOBILITY PRIVATE LIMITED handles personal data collected through this website.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            type: "p",
            text: "This policy explains how {{name}} (“the Company”, “we”) handles personal data collected through {{website}}. It is written with regard to the Digital Personal Data Protection Act, 2023 and the rules made under it, so far as they apply to this website. It is not a certificate of compliance, and the Company does not claim to have been classified, or not classified, as a Significant Data Fiduciary.",
          },
          {
            type: "p",
            text: "The Company is the data fiduciary for personal data collected through the forms on this website. Our registered office is {{address}}. You can write to {{email}} or call {{phone}}.",
          },
        ],
      },
      {
        id: "scope",
        heading: "What this policy covers",
        blocks: [
          {
            type: "p",
            text: "This policy covers personal data you give us through the contact form, the partnership form and the careers form, and limited technical information created when the website is hosted and served. It does not describe a customer account, a booking record or a shipment file, because this website does not provide those functions.",
          },
        ],
      },
      {
        id: "collected",
        heading: "Information we collect",
        blocks: [
          {
            type: "p",
            text: "We collect only what you choose to submit, together with the technical details needed to receive that submission securely.",
          },
          {
            type: "ul",
            items: [
              "Identity and contact details: name, email address, phone number, company name and city, where the form asks for them.",
              "The content of your message, including a subject, partnership category or position of interest.",
              "A resume, when you send one with a career enquiry. We accept PDF files only.",
              "The time of submission and a network address, used to limit abuse of the forms.",
              "A cookie or browser preference only if you save a cookie choice, or if you later allow optional analytics.",
            ],
          },
          {
            type: "p",
            text: "Please do not send passport numbers, payment card numbers, government identity numbers or information about another person unless we have asked for it in a separate, specific process. The website forms are not a safe place for those details.",
          },
        ],
      },
      {
        id: "contact",
        heading: "Contact form data",
        blocks: [
          {
            type: "p",
            text: "If you use the contact form, we use your name, email, phone, subject and message to read the enquiry and reply. The message is emailed to {{email}}. We do not add you to a marketing list because you wrote to us.",
          },
        ],
      },
      {
        id: "partnership",
        heading: "Partnership enquiries",
        blocks: [
          {
            type: "p",
            text: "A partnership enquiry is used to understand whether a conversation about logistics, transport, courier, travel, bus operations, a corporate requirement or technology is worth pursuing. We use the company name, city and category for that purpose. Sending the form does not create a contract.",
          },
        ],
      },
      {
        id: "careers",
        heading: "Career applications and resumes",
        blocks: [
          {
            type: "p",
            text: "If you submit a career enquiry, we use your details and resume to consider whether there may be a suitable conversation. The website does not publish vacancies. A submission is an expression of interest, not an application against a listed role.",
          },
          {
            type: "p",
            text: "Resumes are accepted as PDF files, checked for type and size, and stored outside the public website directory. They are not served as web pages and they are not executed. A copy is also attached to the email sent to the Company so the enquiry can be read. If the email cannot be delivered, the submission is treated as unsuccessful and the stored file is removed where that is possible.",
          },
        ],
      },
      {
        id: "use",
        heading: "How we use personal data",
        blocks: [
          {
            type: "ul",
            items: [
              "To receive, understand and reply to an enquiry.",
              "To consider a partnership or a career expression of interest.",
              "To keep a record of the correspondence for as long as that purpose, or the law, requires.",
              "To protect the forms from spam and repeated automated submission.",
              "To maintain the security and basic operation of the website.",
            ],
          },
          {
            type: "p",
            text: "We do not sell personal data. We do not use enquiry data to build advertising audiences.",
          },
        ],
      },
      {
        id: "grounds",
        heading: "Why we are allowed to use it",
        blocks: [
          {
            type: "p",
            text: "You provide enquiry data voluntarily for a stated purpose: to be contacted about that enquiry. Where the Digital Personal Data Protection Act, 2023 requires consent, use of the form is that request, and you may withdraw it by writing to {{email}}. Withdrawal does not affect processing that was already lawful. Where the Act permits a legitimate use, including use of data you have given for a specified purpose, we rely on that provision only to the extent it applies.",
          },
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        blocks: [
          {
            type: "p",
            text: "The website is built to work without non-essential cookies. A cookie preference, if you set one, is stored in your browser’s local storage rather than as a tracking cookie. Essential technical cookies may be set by the hosting platform so the site can be served securely. We do not set advertising cookies.",
          },
          {
            type: "p",
            text: "If optional analytics is later switched on, the related script will load only after you accept analytics or save a preference that allows it. Until then, no analytics script is loaded. See the cookie policy for the choices available.",
          },
        ],
      },
      {
        id: "analytics",
        heading: "Website analytics",
        blocks: [
          {
            type: "p",
            text: "The published website does not include a third-party analytics tag by default. If the Company enables one, it will be identified in the cookie policy, it will be optional, and it will not run before a recorded choice where consent is required. Server or host logs may still record technical events such as a request for a page. Those logs are used to operate and protect the site, not to profile visitors for advertising.",
          },
        ],
      },
      {
        id: "sharing",
        heading: "Service providers",
        blocks: [
          {
            type: "p",
            text: "We use a small number of providers to operate the website. An email delivery provider (Resend, when configured) transmits the enquiry to {{email}}. A hosting provider serves the website. They process data so that we can perform the purpose you asked for. They are not authorised to use it for their own marketing. We do not control the independent privacy practices of a maps service if you choose to open our address there.",
          },
        ],
      },
      {
        id: "transfer",
        heading: "Where data may be processed",
        blocks: [
          {
            type: "p",
            text: "The Company is in India. Email infrastructure and hosting may process a message on servers outside India. Any such transfer will follow the restrictions, if any, notified by the Central Government under the Digital Personal Data Protection Act, 2023. We do not claim that every processor stores data only in India.",
          },
        ],
      },
      {
        id: "retention",
        heading: "How long we keep data",
        blocks: [
          {
            type: "ul",
            items: [
              "Contact and partnership enquiries: up to 24 months after our last correspondence about that enquiry, unless a longer period is needed for a legal claim, a statutory record, or an ongoing business relationship.",
              "Career enquiries and resumes: up to 12 months from submission, unless you join the Company, ask us to delete the enquiry sooner, or a longer period is required by law.",
              "A cookie preference stays in your browser until you clear it or change it.",
            ],
          },
          {
            type: "p",
            text: "When the purpose is finished, and no law requires us to keep the data, we delete it or remove the means of identifying you.",
          },
        ],
      },
      {
        id: "security",
        heading: "Security",
        blocks: [
          {
            type: "p",
            text: "We limit use of enquiry data to people who need it to respond, store resumes outside the public web directory, and rely on the hosting platform for encrypted transport where it provides HTTPS. No method of sending data over the internet is completely secure. This policy does not claim a certification such as ISO 27001.",
          },
        ],
      },
      {
        id: "children",
        heading: "Children",
        blocks: [
          {
            type: "p",
            text: "This website is not directed at children. Under the Digital Personal Data Protection Act, 2023 a child is a person under 18. We do not knowingly collect personal data of a child. If you believe we have done so, write to {{email}} and we will delete it.",
          },
        ],
      },
      {
        id: "rights",
        heading: "Your rights and requests",
        blocks: [
          {
            type: "p",
            text: "Subject to the Act and its rules, you may ask for access to personal data we hold about you, for correction or updating, and for erasure when the purpose is over or consent is withdrawn and retention is not required by law. You may also nominate another person to exercise rights in the event of your death or incapacity, in the manner the law provides. To make a request, email {{email}} with enough detail for us to find the enquiry. We may need to confirm that the request comes from you.",
          },
          {
            type: "p",
            text: "You may also have the right to approach the Data Protection Board of India in accordance with the Act. We ask that you write to us first so we can try to resolve the matter.",
          },
        ],
      },
      {
        id: "grievance",
        heading: "Grievance contact",
        blocks: [
          {
            type: "p",
            text: "Grievances about personal data can be sent to {{email}}, or by post to {{address}}. Please use the subject “Privacy grievance”. We will acknowledge the grievance and aim to address it within the time the applicable law requires. The Company has not appointed an external grievance officer beyond this contact, and does not name an outside law firm in this policy.",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        blocks: [
          {
            type: "p",
            text: "We will post changes on this page and change the “Last updated” date. A change applies from the date shown. If a change would use personal data for a new purpose that needs consent, we will ask for that consent before doing so.",
          },
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms and conditions",
    path: "/terms-and-conditions",
    description:
      "Terms for using the ORYVOM MOBILITY PRIVATE LIMITED website. These are not a contract for a transport or travel service.",
    sections: [
      {
        id: "agreement",
        heading: "Using this website",
        blocks: [
          {
            type: "p",
            text: "These terms govern access to {{website}}, operated by {{name}}, CIN {{cin}}, with its registered office at {{address}}. By using the website you agree to these terms. If you do not agree, please do not use the site.",
          },
        ],
      },
      {
        id: "separate",
        heading: "These terms are not a service contract",
        blocks: [
          {
            type: "p",
            text: "The website describes business areas and invites enquiries. It does not sell a journey, a shipment, a ticket or a logistics service. Any future service would be governed by a separate written arrangement with the customer. Nothing on this website is that arrangement. A form submission is an enquiry, not an acceptance of an offer and not a booking.",
          },
        ],
      },
      {
        id: "conduct",
        heading: "Acceptable use",
        blocks: [
          {
            type: "ul",
            items: [
              "Do not attempt to disrupt, probe or overload the website or its forms.",
              "Do not submit information you are not entitled to share, including another person’s resume or identity documents.",
              "Do not use the forms to send malicious files. Resumes must be PDF documents.",
              "Do not copy the site in order to misrepresent yourself as the Company.",
            ],
          },
        ],
      },
      {
        id: "ip",
        heading: "Intellectual property",
        blocks: [
          {
            type: "p",
            text: "The text, design and arrangement of this website are owned by the Company or used with permission. You may read and share links to pages for ordinary business reference. You may not copy substantial parts for a competing site, or remove notices, without written permission. Photographs are illustrative stock images and are not photographs of the Company’s operations. Trademarks of other businesses that appear incidentally in a photograph are the property of their owners and are not used to suggest a relationship.",
          },
        ],
      },
      {
        id: "accuracy",
        heading: "Information on the website",
        blocks: [
          {
            type: "p",
            text: "We take care to state the Company’s name, CIN, incorporation date, registered office, capital figures and directors accurately. Other pages describe intent and categories of work. They may be updated. We do not warrant that every sentence will remain complete or suitable for a decision you take without speaking to us.",
          },
        ],
      },
      {
        id: "availability",
        heading: "No guarantee of service availability",
        blocks: [
          {
            type: "p",
            text: "Mention of logistics, goods transportation, courier, passenger transportation, bus transportation, travel or ticketing is a statement of business focus. It is not a representation that a route, vehicle, partner, price or ticket is currently available. Availability has to be confirmed in a separate communication.",
          },
        ],
      },
      {
        id: "enquiries",
        heading: "Business enquiries",
        blocks: [
          {
            type: "p",
            text: "We will try to read enquiries sent to {{email}} or through the forms. We do not promise a particular response time, and we may decline an enquiry. A reply, unless it expressly says otherwise, is not a quotation and not a contract.",
          },
        ],
      },
      {
        id: "links",
        heading: "Third-party links",
        blocks: [
          {
            type: "p",
            text: "A link to a map search, or any other external site, is provided for convenience. We do not control that site and we are not responsible for its content or privacy practices. A link is not an endorsement.",
          },
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        blocks: [
          {
            type: "p",
            text: "To the extent permitted by Indian law, the Company is not liable for loss arising from use of this website, reliance on general information in it, or inability to use it. This includes loss of profit, business interruption and loss of data, whether or not we were advised it was possible. Nothing in these terms excludes liability that applicable law does not allow us to exclude, including liability for fraud.",
          },
        ],
      },
      {
        id: "indemnity",
        heading: "Indemnity",
        blocks: [
          {
            type: "p",
            text: "You agree to indemnify the Company against claims, losses and reasonable expenses arising from your misuse of the website, your submission of information you were not entitled to send, or your breach of these terms, except to the extent the claim is caused by our own fault.",
          },
        ],
      },
      {
        id: "law",
        heading: "Governing law and jurisdiction",
        blocks: [
          {
            type: "p",
            text: "These terms are governed by the laws of India. Subject to applicable law, the courts at Gautam Buddha Nagar, Uttar Pradesh, India, have jurisdiction. This does not take away a right that a statute gives a person to bring a claim in another forum.",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        blocks: [
          {
            type: "p",
            text: "We may change these terms by posting a new version on this page with a new “Last updated” date. The version on the page at the time you use the website is the version that applies to that use. Questions can be sent to {{email}} or {{phone}}.",
          },
        ],
      },
    ],
  },
  disclaimer: {
    eyebrow: "Legal",
    title: "Disclaimer",
    path: "/disclaimer",
    description:
      "How to read the information on this website, including statements about services that are still being developed.",
    sections: [
      {
        id: "general",
        heading: "General information",
        blocks: [
          {
            type: "p",
            text: "The pages of {{website}} are published by {{name}} for general corporate information. They introduce the Company, its business categories, and ways to make an enquiry. They are not legal, financial or operational advice, and they are not an offer to the public.",
          },
        ],
      },
      {
        id: "availability",
        heading: "Service availability",
        blocks: [
          {
            type: "p",
            text: "The Company works across mobility, transportation, logistics and travel-related areas. A description of a category, including logistics aggregation, goods transportation, courier aggregation, passenger transportation, bus transportation, travel services and ticketing services, does not mean that every activity in that category is currently operational. Where a solution is under development, the relevant page says so. Please enquire before relying on availability.",
          },
        ],
      },
      {
        id: "forward",
        heading: "Forward-looking statements",
        blocks: [
          {
            type: "p",
            text: "Vision, mission and approach pages describe intention. Words such as “building”, “developing” and “focus” are forward-looking. They are not a forecast, a promise of capacity, or a statement of results. Actual work will depend on partnerships, permissions and commercial decisions that are not settled by this website.",
          },
        ],
      },
      {
        id: "third",
        heading: "Third parties",
        blocks: [
          {
            type: "p",
            text: "The Company may in future work with logistics companies, operators and other providers. Naming a type of partner is not a statement that a named business has been appointed. Photographs of roads, vehicles, warehouses and travel are illustrative. They are not pictures of the Company’s fleet, staff, office or customers.",
          },
        ],
      },
      {
        id: "links",
        heading: "External links",
        blocks: [
          {
            type: "p",
            text: "Links that leave this website, including a map search for the registered office, are outside our control. We are not responsible for their content, availability or privacy practices.",
          },
        ],
      },
      {
        id: "outcomes",
        heading: "No guarantee of a particular outcome",
        blocks: [
          {
            type: "p",
            text: "An enquiry does not guarantee a reply of a particular kind, a partnership, employment, a shipment, a seat or a ticket. The Company does not publish performance statistics, and nothing on the website should be read as one.",
          },
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        blocks: [
          {
            type: "p",
            text: "To the extent Indian law allows, the Company is not liable for loss that results from using this website as if it were a booking system, a live operations view, or a confirmed service. The limitation in the terms and conditions also applies. Nothing here excludes liability that the law does not allow to be excluded.",
          },
          {
            type: "p",
            text: "Questions about this disclaimer can be sent to {{email}} or by post to {{address}}.",
          },
        ],
      },
    ],
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookie policy",
    path: "/cookie-policy",
    description:
      "How this website uses cookies and similar storage, and how to set a preference.",
    sections: [
      {
        id: "about",
        heading: "About this policy",
        blocks: [
          {
            type: "p",
            text: "This policy explains the cookies and similar technologies used on {{website}}, operated by {{name}}. A cookie is a small text file a site can store on your device. Similar technologies include local storage in the browser.",
          },
        ],
      },
      {
        id: "essential",
        heading: "Essential cookies",
        blocks: [
          {
            type: "p",
            text: "The site is designed to be read and to submit an enquiry without non-essential cookies. The hosting platform may use strictly necessary technical cookies to deliver pages securely and to protect the service. Those cookies are not used for advertising. The forms also use a hidden field and a timestamp as spam checks. Those are part of the submission. They are not tracking cookies.",
          },
        ],
      },
      {
        id: "analytics",
        heading: "Analytics cookies",
        blocks: [
          {
            type: "p",
            text: "Analytics cookies are not set in the default configuration of this website, and no analytics script is loaded. If the Company later enables an analytics provider, the script URL is supplied by configuration and the script runs only after you choose “Accept all” or save a preference that allows analytics. Rejecting non-essential cookies leaves analytics off.",
          },
        ],
      },
      {
        id: "functional",
        heading: "Functional storage",
        blocks: [
          {
            type: "p",
            text: "If you save a cookie preference, the choice is kept in local storage under the key oryvom-cookie-preferences, on your device. It records whether analytics is allowed. It does not contain your name or your enquiry. You can remove it by clearing site data for this website in your browser.",
          },
        ],
      },
      {
        id: "third",
        heading: "Third-party cookies",
        blocks: [
          {
            type: "p",
            text: "We do not embed advertising, social media pixels or a map. If you open the registered office in an external map, that site may set its own cookies under its own policy. An email provider used to deliver a form to us does not set a cookie in your browser through this website.",
          },
        ],
      },
      {
        id: "manage",
        heading: "How to choose",
        blocks: [
          {
            type: "p",
            text: "Because non-essential cookies are not in use by default, a consent banner is not shown unless optional analytics has been configured. You can still set a preference below: accept all, reject non-essential, or customize and save. You can also block cookies in your browser. Blocking strictly necessary host cookies may affect whether the site loads reliably. It will not stop you emailing {{email}}.",
          },
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        blocks: [
          {
            type: "p",
            text: "If we introduce a non-essential cookie, we will update this page and, where consent is required, we will ask before it is set. The date at the top of the page will change. Questions can be sent to {{email}}.",
          },
        ],
      },
    ],
  },
  accessibility: {
    eyebrow: "Legal",
    title: "Accessibility statement",
    path: "/accessibility",
    description:
      "What ORYVOM MOBILITY PRIVATE LIMITED does to make this website usable, and how to report a barrier.",
    sections: [
      {
        id: "aim",
        heading: "Our aim",
        blocks: [
          {
            type: "p",
            text: "{{name}} wants this website to be usable by the widest reasonable range of people, including people who use keyboards, screen readers, magnification or voice input. We aim to follow the principles of WCAG 2.2 Level AA as a working standard. This statement is not a certification, and we have not commissioned a formal conformance audit.",
          },
        ],
      },
      {
        id: "measures",
        heading: "Measures in place",
        blocks: [
          {
            type: "ul",
            items: [
              "Pages use headings in order, landmarks and a skip link.",
              "Navigation can be used with a keyboard, including the services menu.",
              "Form fields have visible labels, and errors are described in text.",
              "Focus is visible. Colour contrast for text is set for the navy and light surfaces used on the site.",
              "Photographs have text alternatives, and motion is reduced when the browser asks for that.",
              "The main content does not depend on a map image or on a script that must run before the page can be read.",
            ],
          },
        ],
      },
      {
        id: "limits",
        heading: "Known limitations",
        blocks: [
          {
            type: "p",
            text: "Some photographs are illustrative and detailed. Their text alternatives describe the scene rather than every object in it. Opening the registered office in an external map leaves this website, and we do not control the accessibility of that map. A PDF resume you upload is your document. We do not rewrite it.",
          },
        ],
      },
      {
        id: "report",
        heading: "Report a barrier",
        blocks: [
          {
            type: "p",
            text: "If you cannot use a page, email {{email}} with the subject “Accessibility”. Please include the page address, what you were trying to do, and the browser or assistive technology you used. You may also call {{phone}} or write to {{address}}. We will consider a reasonable change and reply.",
          },
          {
            type: "p",
            text: "This statement was last reviewed with the rest of the legal pages. It will be updated when the website changes in a way that affects access.",
          },
        ],
      },
    ],
  },
} satisfies Record<string, LegalDocument>;
