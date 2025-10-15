// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

// From Many, as One-specific routes
export const FMAO_ROUTES: EachRoute[] = [
  {
    title: "welcome",
    href: "/welcome",
    noLink: true,
    items: [
      { title: "introduction", href: "/introduction" },
    ],
  },
  {
    title: "fmao",
    href: "/fmao",
    noLink: true,
    items: [
      {
        title: "book-0",
        href: "/book-0",
        noLink: true,
        items: [
          { title: "shard-0", href: "/shard-0" },
          { title: "shard-1", href: "/shard-1" },
        ],
      },
      {
        title: "book-1",
        href: "/book-1",
        noLink: true,
        items: [
          { title: "shard-undefined", href: "/shard-undefined" },
        ],
      },
    ],
  },
  {
    title: "fmao-whitepaper",
    href: "/fmao-whitepaper",
    noLink: true,
    items: [
      {
        title: "fw-part-1",
        href: "/fw-part-1",
        noLink: true,
        items: [
          { title: "fmao-a-web-serial", href: "/fmao-a-web-serial" },
          { title: "objectives", href: "/objectives" },
          { title: "chapter-structure", href: "/chapter-structure" },
          { title: "story-format", href: "/story-format" },
          { title: "plexus", href: "/plexus" },
          { title: "roadmap", href: "/roadmap" },
        ],
      },
      {
        title: "fw-part-2",
        href: "/fw-part-2",
        noLink: true,
        items: [
          { title: "lore-summary", href: "/lore-summary" },
          { title: "character-profiles", href: "/character-profiles" },
          { title: "locations", href: "/locations" },
        ],
      },
      {
        title: "fw-part-3",
        href: "/fw-part-3",
        noLink: true,
        items: [
          { title: "fmao-web3-framework", href: "/fmao-web3-framework" },
        ],
      },
      {
        title: "fw-appendix",
        href: "/fw-appendix",
        noLink: true,
        items: [
          { title: "references-license-and-contact", href: "/references-license-and-contact" },
        ],
      },
    ],
  },
];

// Conciliatorics-specific routes
export const CONCILIATORICS_ROUTES: EachRoute[] = [
  {
    title: "welcome",
    href: "/welcome",
    noLink: true,
    items: [
      { title: "introduction", href: "/introduction" },
    ],
  },
  {
    title: "introduction-to-conciliatorics",
    href: "/introduction-to-conciliatorics",
    noLink: true,
    items: [
      { title: "systemics", href: "/systemics" },
      { title: "behavior-dynamics", href: "/behavior-dynamics" },
      { title: "systemic-intervention", href: "/systemic-intervention" },
      { title: "inventive-parcellation", href: "/inventive-parcellation" },
      { title: "inventive-edification", href: "/inventive-edification" },
      { title: "inventive-ossification", href: "/inventive-ossification" },
      { title: "inventive-conciliation", href: "/inventive-conciliation" },
    ],
  },
  {
    title: "edified-Interstitial-contemplation",
    href: "/edified-Interstitial-contemplation",
    noLink: true,
    items: [
      { title: "attributes-dynamics", href: "/attributes-dynamics" },
      { title: "attributes-regulation", href: "/attributes-regulation" },
      { title: "attribute-position", href: "/attribute-position" },
      { title: "attribute-operators", href: "/attribute-operators" },
      { title: "attribute-jurisdiction", href: "/attribute-jurisdiction" },
    ],
  },
  {
    title: "attributes-structure",
    href: "/attributes-structure",
    noLink: true,
    items: [
      { title: "attribute-accentuation", href: "/attribute-accentuation" },
      { title: "structure-quadrants", href: "/structure-quadrants" },
      { title: "interstitial-anatomy", href: "/interstitial-anatomy" },
      { title: "discernment", href: "/discernment" },
      { title: "observation", href: "/observation" },
      { title: "resolution", href: "/resolution" },
      { title: "operation", href: "/operation" },
    ],
  },
  {
    title: "attributes-status",
    href: "/attributes-status",
    noLink: true,
    items: [
      { title: "attribute-concatenation", href: "/attribute-concatenation" },
      { title: "status-dichotomies", href: "/status-dichotomies" },
      { title: "interstitial-physiology", href: "/interstitial-physiology" },
      { title: "dichotomies-compatibility", href: "/dichotomies-compatibility" },
      { title: "status-decay", href: "/status-decay" },
    ],
  },
  {
    title: "attributes-synthesis",
    href: "/attributes-synthesis",
    noLink: true,
    items: [
      { title: "anatomy-and-physiology-integration", href: "/anatomy-and-physiology-integration" },
      { title: "organic-and-instrumental-synthesis", href: "/organic-and-instrumental-synthesis" },
      { title: "mixed-synthesis", href: "/mixed-synthesis" },
      { title: "conciliation-pathway", href: "/conciliation-pathway" },
      { title: "applied-conciliatorics", href: "/applied-conciliatorics" },
    ],
  },  
  {
    title: "thank-you",
    href: "/thank-you",
    noLink: true,
    items: [
      { title: "epilogue", href: "/epilogue" },
      { title: "definitions-glossary", href: "/definitions-glossary" },
      { title: "symbols-glossary", href: "/symbols-glossary" },
    ],
  },
];

// Function to get routes for a specific section
export function getRoutesForSection(section: "fmao" | "conciliatorics" | "about"): EachRoute[] {
  switch (section) {
    case "fmao":
      return FMAO_ROUTES;
    case "conciliatorics":
      return CONCILIATORICS_ROUTES;
    default:
      return FMAO_ROUTES; // fallback
  }
}

type Page = { title: string; href: string };

export function getRecurrsiveAllLinks(node: EachRoute): Page[] {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

// Function to get all page routes for a specific section
export function getPageRoutesForSection(section: "fmao" | "conciliatorics"): Page[] {
  const sectionRoutes = getRoutesForSection(section);
  return sectionRoutes.map((it) => getRecurrsiveAllLinks(it)).flat();
}

// For components that need to work with all sections (like navbar)
export function getAllFirstRoutes(): { section: "fmao" | "conciliatorics", firstRoute: Page }[] {
  return [
    { section: "fmao", firstRoute: getPageRoutesForSection("fmao")[0] },
    { section: "conciliatorics", firstRoute: getPageRoutesForSection("conciliatorics")[0] },
  ];
}

// DEPRECATED: These are kept for backward compatibility but should be avoided
// Components should use getRoutesForSection() and getPageRoutesForSection() instead
export const ROUTES: EachRoute[] = FMAO_ROUTES;
export const page_routes = getPageRoutesForSection("fmao");