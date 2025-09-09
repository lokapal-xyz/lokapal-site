// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

// Devotion-specific routes
export const DEVOTION_ROUTES: EachRoute[] = [
  {
    title: "welcome",
    href: "/welcome",
    noLink: true,
    items: [
      { title: "introduction", href: "/introduction" },
      { title: "prologue", href: "/prologue" },
    ],
  },
{
    title: "devotion-whitepaper",
    href: "/devotion-whitepaper",
    noLink: true,
    items: [
      {
        title: "dw-part-1",
        href: "/dw-part-1",
        noLink: true,
        items: [
          { title: "devotion-a-web3-series", href: "/devotion-a-web3-series" },
          { title: "objectives", href: "/objectives" },
          { title: "narrative-structure", href: "/narrative-structure" },
          { title: "series-format", href: "/series-format" },
          { title: "roadmap", href: "/roadmap" },
        ],
      },
      {
        title: "dw-part-2",
        href: "/dw-part-2",
        noLink: true,
        items: [
          { title: "lore-summary", href: "/lore-summary" },
          { title: "character-profiles", href: "/character-profiles" },
          { title: "locations", href: "/locations" },
        ],
      },
      {
        title: "dw-part-3",
        href: "/dw-part-3",
        noLink: true,
        items: [
          { title: "devotion-web3-framework", href: "/devotion-web3-framework" },
        ],
      },
      {
        title: "dw-appendix",
        href: "/dw-appendix",
        noLink: true,
        items: [
          { title: "references-license-and-contact", href: "/references-license-and-contact" },
        ],
      },
    ],
  },
];

// HowToDAO-specific routes
export const HOWTODAO_ROUTES: EachRoute[] = [
  {
    title: "welcome",
    href: "/welcome",
    noLink: true,
    items: [
      { title: "introduction", href: "/introduction" },
      {
        title: "dao-essentials",
        href: "/dao-essentials",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "intro-to-dao-design", href: "/intro-to-dao-design" },
          { title: "intro-to-dao-administration", href: "/intro-to-dao-administration" },
          { title: "intro-to-dao-governance", href: "/intro-to-dao-governance" },
          { title: "intro-to-dao-economy", href: "/intro-to-dao-economy" },
          { title: "intro-to-dao-community", href: "/intro-to-dao-community" },
          { title: "intro-to-dao-security", href: "/intro-to-dao-security" },
          { title: "intro-to-dao-interactions", href: "/intro-to-dao-interactions" },
          { title: "intro-to-dao-perspectives", href: "/intro-to-dao-perspectives" },
        ],
      },
    ],
  },
  {
    title: "dao-design",
    href: "/dao-design",
    noLink: true,
    items: [
      {
        title: "defining-dao-objectives",
        href: "/defining-dao-objectives",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "right-choice", href: "/right-choice" },
          { title: "role-of-daos", href: "/role-of-daos" },
          { title: "trade-offs", href: "/trade-offs" },
        ],
      },
      {
        title: "governance-architectures",
        href: "/governance-architectures",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "modular-vs-monolithic", href: "/modular-vs-monolithic" },
          { title: "role-of-core-contracts", href: "/role-of-core-contracts" },
          { title: "external-plug-ins", href: "/external-plug-ins" },
          { title: "simplicity-vs-complexity", href: "/simplicity-vs-complexity" },
        ],
      },
      {
        title: "dao-models",
        href: "/dao-models",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "industry-standards", href: "/industry-standards" },
          { title: "utility-libraries", href: "/utility-libraries" },
          { title: "custom-built-dao", href: "/custom-built-dao" },
          { title: "no-code-and-low-code", href: "/no-code-and-low-code" },
        ],
      },
      {
        title: "subdaos",
        href: "/subdaos",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "subdaos-usage", href: "/subdaos-usage" },
          { title: "coordination-mechanisms", href: "/coordination-mechanisms" },
          { title: "use-cases", href: "/use-cases" },
        ],
      },
    ],
  },
  {
    title: "dao-administration",
    href: "/dao-administration",
    noLink: true,
    items: [
      {
        title: "access-control-and-admin-roles",
        href: "/access-control-and-admin-roles",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "administrative-permissions", href: "/administrative-permissions" },
          { title: "multisig-governance", href: "/multisig-governance" },
          { title: "hierarchical-vs-flat", href: "/hierarchical-vs-flat" },
        ],
      },
      {
        title: "account-and-key-management",
        href: "/account-and-key-management",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "use-of-eoas", href: "/use-of-eoas" },
          { title: "security-practices", href: "/security-practices" },
          { title: "mitigating-risks", href: "/mitigating-risks" },
        ],
      },
      {
        title: "centralization-risks-and-transparency",
        href: "/centralization-risks-and-transparency",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "centralization-risks", href: "/centralization-risks" },
          { title: "transparency", href: "/transparency" },
          { title: "progressive-decentralization", href: "/progressive-decentralization" },
        ],
      },
      {
        title: "legal-and-compliance-considerations",
        href: "/legal-and-compliance-considerations",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "legal-landscape", href: "/legal-landscape" },
          { title: "regulatory-compliance", href: "/regulatory-compliance" },
          { title: "legal-expectations", href: "/legal-expectations" },
        ],
      },
    ],
  },
  {
    title: "dao-governance",
    href: "/dao-governance",
    noLink: true,
    items: [
      {
        title: "voting-system",
        href: "/voting-system",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "voting-mechanisms", href: "/voting-mechanisms" },
          { title: "on-chain-vs-off-chain", href: "/on-chain-vs-off-chain" },
          { title: "participation-incentives", href: "/participation-incentives" },
        ],
      },
      {
        title: "proposal-lifecycle-and-execution",
        href: "/proposal-lifecycle-and-execution",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "proposals", href: "/proposals" },
          { title: "quorums", href: "/quorums" },
          { title: "governance-decisions", href: "/governance-decisions" },
        ],
      },
      {
        title: "delegation-and-representation",
        href: "/delegation-and-representation",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "delegated-voting", href: "/delegated-voting" },
          { title: "representative-governance", href: "/representative-governance" },
          { title: "risks-and-benefits", href: "/risks-and-benefits" },
        ],
      },
      {
        title: "veto-powers-and-emergency-measures",
        href: "/veto-powers-and-emergency-measures",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "emergency-response", href: "/emergency-response" },
          { title: "veto-powers", href: "/veto-powers" },
          { title: "exit-options", href: "/exit-options" },
        ],
      },
    ],
  },
  {
    title: "dao-economy",
    href: "/dao-economy",
    noLink: true,
    items: [
      {
        title: "dao-treasury",
        href: "/dao-treasury",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "treasury-management", href: "/treasury-management" },
          { title: "multi-signature", href: "/multi-signature" },
          { title: "diversification-strategies", href: "/diversification-strategies" },
        ],
      },
      {
        title: "tokenomics-and-utility",
        href: "/tokenomics-and-utility",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "token-design", href: "/token-design" },
          { title: "token-utility", href: "/token-utility" },
          { title: "token-distribution", href: "/token-distribution" },
        ],
      },
      {
        title: "revenue-streams-and-value-distribution",
        href: "/revenue-streams-and-value-distribution",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "sustainable-funding", href: "/sustainable-funding" },
          { title: "real-world-assets", href: "/real-world-assets" },
          { title: "compensation-models", href: "/compensation-models" },
        ],
      },
    ],
  },
  {
    title: "dao-community",
    href: "/dao-community",
    noLink: true,
    items: [
      {
        title: "member-engagement-and-incentives",
        href: "/member-engagement-and-incentives",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "communication-channels", href: "/communication-channels" },
          { title: "community-activation", href: "/community-activation" },
          { title: "member-retention", href: "/member-retention" },
          { title: "culture-and-values", href: "/culture-and-values" },
        ],
      },
      {
        title: "reputation-and-trust",
        href: "/reputation-and-trust",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "social-reputation", href: "/social-reputation" },
          { title: "on-chain-reputation", href: "/on-chain-reputation" },
          { title: "trust-building", href: "/trust-building" },
        ],
      },
      {
        title: "governance-disputes",
        href: "/governance-disputes",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "open-forum", href: "/open-forum" },
          { title: "covert-coordination", href: "/covert-coordination" },
          { title: "governance-deadlocks", href: "/governance-deadlocks" },
          { title: "conflict-resolution", href: "/conflict-resolution" },
        ],
      },
    ],
  },
  {
    title: "dao-security",
    href: "/dao-security",
    noLink: true,
    items: [
      {
        title: "security-best-practices",
        href: "/security-best-practices",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "secure-development", href: "/secure-development" },
          { title: "best-practices", href: "/best-practices" },
          { title: "applied-security", href: "/applied-security" },
          { title: "insider-threats", href: "/insider-threats" },
          { title: "real-life", href: "/real-life" },
        ],
      },
      {
        title: "proactive-security",
        href: "/proactive-security",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "vulnerabilities", href: "/offchaivulnerabilitiesn" },
          { title: "governance-risks", href: "/governance-risks" },
          { title: "monitoring", href: "/monitoring" },
          { title: "off-chain-security", href: "/off-chain-security" },
        ],
      },
      {
        title: "reactive-security",
        href: "/reactive-security",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "response-plans", href: "/response-plans" },
          { title: "live-exploits", href: "/live-exploits" },
          { title: "recovery-mechanisms", href: "/recovery-mechanisms" },
          { title: "post-mortem", href: "/post-mortem" },
        ],
      },
    ],
  },
  {
    title: "dao-interactions",
    href: "/dao-interactions",
    noLink: true,
    items: [
      {
        title: "on-chain-interactions",
        href: "/on-chain-interactions",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "non-dao-contracts", href: "/non-dao-contracts" },
          { title: "governance-automation", href: "/governance-automation" },
          { title: "multi-dao", href: "/multi-dao" },
        ],
      },
      {
        title: "off-chain-interactions",
        href: "/off-chain-interactions",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "public-relations", href: "/public-relations" },
          { title: "off-chain-signaling", href: "/off-chain-signaling" },
          { title: "daos-and-traditional", href: "/daos-and-traditional" },
        ],
      },
      {
        title: "upgrades-and-interoperability",
        href: "/upgrades-and-interoperability",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "upgrades", href: "/upgrades" },
          { title: "decentralized-control", href: "/decentralized-control" },
          { title: "cross-chain", href: "/cross-chain" },
        ],
      },
    ],
  },
  {
    title: "dao-perspectives",
    href: "/dao-perspectives",
    noLink: true,
    items: [
      {
        title: "history-and-evolution",
        href: "/history-and-evolution",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "origins", href: "/origins" },
          { title: "evolution", href: "/evolution" },
          { title: "lessons", href: "/lessons" },
        ],
      },
      {
        title: "research-and-analytics",
        href: "/research-and-analytics",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "research", href: "/research" },
          { title: "books", href: "/books" },
          { title: "dao-analysis", href: "/dao-analysis" },
          { title: "indicators", href: "/indicators" },
        ],
      },
      {
        title: "emerging-trends-and-future-directions",
        href: "/emerging-trends-and-future-directions",
        noLink: true,
        items: [
          { title: "introduction", href: "/introduction" },
          { title: "implementations", href: "/implementations" },
          { title: "frameworks", href: "/frameworks" },
          { title: "integration", href: "/integration" },
        ],
      },
    ],
  },
  {
    title: "thank-you",
    href: "/thank-you",
    noLink: true,
    items: [
      { title: "epilogue", href: "/epilogue" },
      { title: "glossary", href: "/glossary" },
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
export function getRoutesForSection(section: "devotion" | "howtodao" | "conciliatorics" | "about"): EachRoute[] {
  switch (section) {
    case "devotion":
      return DEVOTION_ROUTES;
    case "howtodao":
      return HOWTODAO_ROUTES;
    case "conciliatorics":
      return CONCILIATORICS_ROUTES;
    default:
      return DEVOTION_ROUTES; // fallback
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
export function getPageRoutesForSection(section: "devotion" | "howtodao" | "conciliatorics"): Page[] {
  const sectionRoutes = getRoutesForSection(section);
  return sectionRoutes.map((it) => getRecurrsiveAllLinks(it)).flat();
}

// For components that need to work with all sections (like navbar)
export function getAllFirstRoutes(): { section: "devotion" | "howtodao" | "conciliatorics", firstRoute: Page }[] {
  return [
    { section: "devotion", firstRoute: getPageRoutesForSection("devotion")[0] },
    { section: "howtodao", firstRoute: getPageRoutesForSection("howtodao")[0] },
    { section: "conciliatorics", firstRoute: getPageRoutesForSection("conciliatorics")[0] },
  ];
}

// DEPRECATED: These are kept for backward compatibility but should be avoided
// Components should use getRoutesForSection() and getPageRoutesForSection() instead
export const ROUTES: EachRoute[] = DEVOTION_ROUTES;
export const page_routes = getPageRoutesForSection("devotion");