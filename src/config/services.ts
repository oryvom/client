export type ServiceSlug =
  | "logistics"
  | "goods-transportation"
  | "courier"
  | "passenger-transportation"
  | "bus-transportation"
  | "travel"
  | "ticketing";

export type Service = {
  slug: ServiceSlug;
  path: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  introduction: string;
  involves: string[];
  approach: string[];
  segments: string[];
  applications: string[];
  partnerships: string;
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "logistics",
    path: "/services/logistics",
    title: "Logistics Aggregation",
    summary:
      "A business focus on coordinating logistics demand with capable service providers.",
    image: "/images/services/logistics.jpg",
    imageAlt: "A warehouse aisle lined with shelves of cartons and storage bins.",
    introduction:
      "Logistics aggregation is a service category of ORYVOM MOBILITY PRIVATE LIMITED. It concerns the commercial coordination of logistics requirements with businesses that can carry, store or arrange the movement of goods. The work is to give a company one structured conversation, rather than a scattered set of arrangements.",
    involves: [
      "Understanding a business requirement for the movement or handling of goods.",
      "Identifying the kind of logistics capability that requirement calls for.",
      "Coordinating information between the business and prospective service providers.",
      "Keeping responsibility, timing and exceptions visible to the parties involved.",
    ],
    approach: [
      "Oryvom treats logistics aggregation as a coordination category. Solutions in this area are under development.",
      "A published description on this website is not a statement that a particular lane, warehouse, rate or service level is currently available.",
      "Availability should be confirmed through a direct enquiry. This website does not offer shipment booking or live tracking.",
    ],
    segments: [
      "Manufacturers and distributors with recurring dispatch needs.",
      "Trading businesses that want a single point of discussion for logistics.",
      "Companies comparing how outsourced coordination might be structured.",
    ],
    applications: [
      "Early discussion of inbound or outbound goods movement.",
      "Coordination across more than one logistics provider.",
      "Commercial planning where the operating model is still being defined.",
    ],
    partnerships:
      "Logistics companies that wish to be considered for future collaboration can submit a partnership enquiry. An enquiry is a request for discussion. It does not appoint Oryvom, and it does not appoint the enquiring business, as a contractor.",
    metaTitle: "Logistics Aggregation",
    metaDescription:
      "Logistics aggregation at ORYVOM MOBILITY PRIVATE LIMITED: a coordination category for businesses and logistics providers. Availability is confirmed by enquiry.",
  },
  {
    slug: "goods-transportation",
    path: "/services/goods-transportation",
    title: "Goods Transportation",
    summary:
      "Commercial focus on the road movement of goods, developed with transport operators.",
    image: "/images/services/goods.jpg",
    imageAlt: "A goods vehicle driving on a wet mountain road at dusk.",
    introduction:
      "Goods transportation is the category concerned with moving freight from one place to another. Oryvom’s interest is in building a clear commercial model for that movement, working with transport operators rather than presenting an unverified fleet or timetable.",
    involves: [
      "Discussing the nature, volume and handling needs of goods a business needs moved.",
      "Considering the operating partners that would be appropriate for that movement.",
      "Setting expectations about what must be confirmed before any movement is offered.",
      "Keeping the difference between a business enquiry and a confirmed carriage clear.",
    ],
    approach: [
      "This category is a business focus. It is not a published schedule of routes, vehicles or prices.",
      "Oryvom does not represent a particular truck, corridor or capacity as currently available unless that has been confirmed in writing for a specific enquiry.",
      "Businesses and operators are invited to enquire. The website itself does not book freight.",
    ],
    segments: [
      "Businesses that ship goods within India.",
      "Transport operators open to a partnership discussion.",
      "Teams responsible for procurement of transportation.",
    ],
    applications: [
      "Discussion of full-load or part-load requirements.",
      "Planning conversations before an operating arrangement exists.",
      "Introduction of a transport operator to a prospective commercial relationship.",
    ],
    partnerships:
      "Transport operators can write to Oryvom about future collaboration. Please use the partnership form and describe the kind of movement you undertake. Do not send operational documents that you are not authorised to share.",
    metaTitle: "Goods Transportation",
    metaDescription:
      "Goods transportation as a business focus of ORYVOM MOBILITY PRIVATE LIMITED. Routes, capacity and prices are not published and must be confirmed by enquiry.",
  },
  {
    slug: "courier",
    path: "/services/courier",
    title: "Courier Aggregation",
    summary:
      "A category for coordinating courier demand with courier businesses.",
    image: "/images/services/courier.jpg",
    imageAlt: "A sealed cardboard parcel being handed from one person to another.",
    introduction:
      "Courier aggregation looks at smaller consignments and the businesses that collect and deliver them. Oryvom’s role in this category is commercial coordination: understanding a requirement and speaking with courier businesses that may be able to meet it.",
    involves: [
      "Hearing what a business needs collected, moved or delivered.",
      "Distinguishing documents, parcels and other small consignments.",
      "Discussing coverage and handling with courier businesses where a partnership is being explored.",
      "Making clear what has been requested and what, if anything, has been confirmed.",
    ],
    approach: [
      "Courier aggregation is under development as a service category.",
      "This website does not accept parcels, generate airway bills or track consignments.",
      "Any future offering will be described only when it can be offered against a confirmed arrangement. Until then, please enquire about availability.",
    ],
    segments: [
      "Businesses with regular document or parcel movement.",
      "Courier operators interested in a partnership conversation.",
      "Teams that want one point of contact for a courier discussion.",
    ],
    applications: [
      "Office and business document movement, subject to availability.",
      "Parcel programmes that need a commercial structure before they begin.",
      "Introductions between a courier business and a prospective customer.",
    ],
    partnerships:
      "Courier businesses may submit a partnership enquiry with their city and a short description of the work they do. Oryvom will treat that as an expression of interest, not as an application that has been accepted.",
    metaTitle: "Courier Aggregation",
    metaDescription:
      "Courier aggregation at Oryvom: a developing category for coordinating courier requirements. The website does not accept or track consignments.",
  },
  {
    slug: "passenger-transportation",
    path: "/services/passenger-transportation",
    title: "Passenger Transportation",
    summary:
      "A focus on organised movement of people, discussed case by case.",
    image: "/images/services/passenger.jpg",
    imageAlt:
      "A driver at the wheel of a car, with city lights visible through the windscreen.",
    introduction:
      "Passenger transportation covers the organised movement of people outside the specific bus category. It may include staff movement, point-to-point travel and other arrangements that a business wants to discuss with a single company. Oryvom is building this category carefully, and does not publish vehicles, drivers or fares.",
    involves: [
      "Understanding who needs to travel, and the purpose of the movement.",
      "Considering safety, timing and the kind of operator that would be appropriate.",
      "Separating a general enquiry from a confirmed journey.",
      "Working with operators rather than implying that Oryvom itself fields every vehicle.",
    ],
    approach: [
      "Passenger transportation is a service category and a business focus. Particular journeys are not offered from this website.",
      "There is no booking engine, fare calculator or live vehicle view.",
      "Organisations that want to discuss a requirement should write to us. We will say plainly if something is not available.",
    ],
    segments: [
      "Employers considering organised staff movement.",
      "Businesses that need a conversation about passenger transport, not an instant booking.",
      "Operators of passenger vehicles open to a future partnership.",
    ],
    applications: [
      "Discussion of recurring staff movement.",
      "Event or project travel, subject to a confirmed arrangement.",
      "Commercial design of a passenger service before it is offered.",
    ],
    partnerships:
      "Passenger vehicle operators can enquire about working with Oryvom. Include the city you operate in and the kind of movement you undertake. A form submission is not a permit, contract or onboarding.",
    metaTitle: "Passenger Transportation",
    metaDescription:
      "Passenger transportation at ORYVOM MOBILITY PRIVATE LIMITED. Journeys, vehicles and fares are not published. Enquiries are reviewed individually.",
  },
  {
    slug: "bus-transportation",
    path: "/services/bus-transportation",
    title: "Bus Transportation",
    summary:
      "A category for bus and coach movement, developed with bus operators.",
    image: "/images/services/bus.jpg",
    imageAlt: "Passengers seated inside a coach, seen from the aisle.",
    introduction:
      "Bus transportation is the category for movement of people by bus or coach. Oryvom’s approach is to work with bus operators and with organisations that need a serious commercial discussion, rather than to publish a timetable that does not exist.",
    involves: [
      "Understanding whether a requirement is for staff, contract, or other coach movement.",
      "Speaking with bus operators about how a future arrangement might work.",
      "Being explicit about seating, route and schedule only when those facts are actually known.",
      "Refusing to imply that a coach, route or departure is on offer when it is not.",
    ],
    approach: [
      "Bus transportation solutions are under development.",
      "This website does not sell tickets, publish departures or show seat maps.",
      "Corporate clients and bus operators are welcome to enquire. Availability is a matter for that conversation, not for a page on this site.",
    ],
    segments: [
      "Organisations considering contract or staff bus movement.",
      "Bus and coach operators.",
      "Travel businesses that work with coach capacity.",
    ],
    applications: [
      "Discussion of a staff or contract carriage requirement.",
      "A partnership conversation with a bus operator.",
      "Early planning of a coach movement that would need a separate agreement.",
    ],
    partnerships:
      "Bus operators can use the partnership form to introduce their business. Tell us the city and the kind of operation you run. Oryvom does not ask for, and this form should not be used to send, vehicle registration documents or permits.",
    metaTitle: "Bus Transportation",
    metaDescription:
      "Bus transportation as a developing service category of Oryvom. No departures, fares or seat inventory are published on this website.",
  },
  {
    slug: "travel",
    path: "/services/travel",
    title: "Travel Services",
    summary:
      "Business travel and related arrangements, discussed as a service category.",
    image: "/images/services/travel.jpg",
    imageAlt: "An aircraft wing above a layer of cloud at sunset.",
    introduction:
      "Travel services is Oryvom’s category for business travel and related arrangements. The aim is to help organisations discuss travel needs in one place. It is not an online travel agency, and this website does not search fares or issue tickets.",
    involves: [
      "Hearing the purpose, timing and constraints of a travel requirement.",
      "Considering which kind of provider — air, rail, road or accommodation — the requirement actually needs.",
      "Coordinating a conversation with relevant providers where a partnership exists or is being explored.",
      "Keeping itineraries, prices and confirmations out of the website until a real arrangement exists.",
    ],
    approach: [
      "Travel services are a business focus. They are not a live booking channel.",
      "Oryvom does not publish fares, hotel inventory or packaged tours.",
      "Forward-looking descriptions of this category are statements of intent. They are not a promise that a journey can be arranged on a given date.",
    ],
    segments: [
      "Companies that want a corporate conversation about travel.",
      "Travel service providers open to partnership.",
      "Teams comparing how travel support might be organised.",
    ],
    applications: [
      "Discussion of business travel requirements.",
      "Introduction of a travel provider to a prospective corporate client.",
      "Planning a travel process before any booking authority exists.",
    ],
    partnerships:
      "Travel service providers may enquire about collaboration. Describe your city and the services you are authorised to offer. Do not send customer data belonging to other people.",
    metaTitle: "Travel Services",
    metaDescription:
      "Travel services at ORYVOM MOBILITY PRIVATE LIMITED. The website does not search fares or issue tickets. Requirements are discussed by enquiry.",
  },
  {
    slug: "ticketing",
    path: "/services/ticketing",
    title: "Ticketing Services",
    summary:
      "A category for ticketing arrangements, without a booking engine on this website.",
    image: "/images/services/ticketing.jpg",
    imageAlt:
      "A traveller seated in an airport terminal with a suitcase and a phone.",
    introduction:
      "Ticketing services concerns the arrangement of tickets for travel. Oryvom includes the category because ticketing sits beside transportation and travel. The company does not sell tickets through this website, and no inventory is displayed.",
    involves: [
      "Understanding what kind of ticket a business or traveller needs to discuss.",
      "Being clear that a conversation is not a confirmed reservation.",
      "Working with providers that are permitted to issue the relevant ticket, where such a partnership is in place or under discussion.",
      "Keeping payment, cancellation and passenger data out of a general website form.",
    ],
    approach: [
      "Ticketing is described here as a service category under development.",
      "There is no shopping cart, payment page or ticket download.",
      "If you need a ticket for a specific journey, write to us and we will tell you whether we can assist. Please do not include passport or payment details in a website form.",
    ],
    segments: [
      "Businesses that want ticketing handled as part of a wider travel conversation.",
      "Ticketing and travel providers exploring a partnership.",
      "Travellers who need to ask, first, whether a service is available.",
    ],
    applications: [
      "A question about whether ticketing support can be offered for a business.",
      "Partnership discussion with a provider that issues tickets.",
      "Process design for ticketing before any transaction exists.",
    ],
    partnerships:
      "Providers that issue travel tickets may introduce themselves through the partnership form. State the city and the modes you work with. An enquiry does not create an agency or a commercial appointment.",
    metaTitle: "Ticketing Services",
    metaDescription:
      "Ticketing services at Oryvom are a developing category. This website does not sell tickets, take payment or show seat inventory.",
  },
];

const bySlug = new Map(services.map((service) => [service.slug, service]));

export function getService(slug: ServiceSlug): Service {
  const service = bySlug.get(slug);
  if (!service) {
    throw new Error(`Unknown service: ${slug}`);
  }
  return service;
}
