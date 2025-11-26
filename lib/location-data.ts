// Location data extracted from FMAO lore

export type LocationCategory = 'lanka-districts' | 'svarga-zones' | 'plexus-entities';

export interface Location {
  id: string;
  name: string;
  subtitle?: string;
  category: LocationCategory;
  type?: string;
  vice?: string;
  description: string;
  imagePath: string;
}

export const locations: Location[] = [
  // LANKA PRIME DISTRICTS
  {
    id: 'ahamkara-plaza',
    name: 'Ahamkara Plaza',
    subtitle: 'Government District',
    category: 'lanka-districts',
    type: 'Government',
    vice: 'Ego',
    description: 'The city\'s government and judicial headquarters, a gleaming monument to self-importance. This district is defined by towering, minimalist architecture and a maze of interconnected skywalks. The bureaucracy here is a perfect reflection of its core vice; every law, decree, and official act is designed to solidify the power and prestige of the ruling elite. It is a place of rigid order where personal ego is masked as public service.',
    imagePath: '/images/locations/ahamkara-plaza.jpg',
  },
  {
    id: 'lobha-exchange',
    name: 'Lobha Exchange',
    subtitle: 'Central Business District',
    category: 'lanka-districts',
    type: 'Central Business District',
    vice: 'Greed',
    description: 'The financial heart of Lanka Prime, a cold, towering landscape of corporate headquarters and data servers. This is where the city\'s wealth is created, hoarded, and leveraged. This district operates on the principle that every transaction is a form of debt, and every human life is a potential asset. It is a place of pure, unadulterated greed, where profit is the only guiding principle.',
    imagePath: '/images/locations/lobha-exchange.jpg',
  },
  {
    id: 'mada-heights',
    name: 'Mada Heights',
    subtitle: 'Academia / Upper Class',
    category: 'lanka-districts',
    type: 'Academia / Upper Class Residential',
    vice: 'Arrogance',
    description: 'An exclusive, high-class residential district and the center of the city\'s academic world. Its inhabitants, a mix of bio-engineers, data scientists, and artists, are defined by their intellectual and social pride. The district is pristine and meticulously organized, but beneath the veneer of beauty lies a deep-seated rot. Its residents\' arrogance leads to stagnation and ethical decay, as they become so focused on their own superiority that they fail to see the corruption consuming them from within.',
    imagePath: '/images/locations/mada-heights.jpg',
  },
  {
    id: 'moha-citadel',
    name: 'Moha Citadel',
    subtitle: 'Cultural / Middle Class',
    category: 'lanka-districts',
    type: 'Cultural / Middle Class Residential',
    vice: 'Attachment',
    description: 'A sprawling, interconnected network of middle-class residential sectors. This district is designed to provide a sanitized, utopian living experience, complete with holographic gardens and simulated sunsets. Citizens are so emotionally attached to their curated communities and digital lives that they become completely disconnected from the reality of the city. It is a place of communal living where attachment becomes a form of mass delusion, perfectly managed by the system.',
    imagePath: '/images/locations/moha-citadel.jpg',
  },
  {
    id: 'matsarya-bazaar',
    name: 'Matsarya Bazaar',
    subtitle: 'Commercial / Lower Class',
    category: 'lanka-districts',
    type: 'Commercial / Lower Class Residential',
    vice: 'Envy',
    description: 'The commercial and lower-class residential sector, a sprawling, crowded labyrinth of back alleys and pop-up markets. Life here is a constant struggle for survival and betterment. The vice of envy permeates every aspect of this district, as its inhabitants constantly compare themselves to those in the wealthier parts of the city. This leads to a desperate race for advantage, often through back-alley deals or dangerous, black-market bio-enhancements in a desperate attempt to keep up.',
    imagePath: '/images/locations/matsarya-bazaar.jpg',
  },
  {
    id: 'buddhi-hub',
    name: 'Buddhi Hub',
    subtitle: 'Technology District',
    category: 'lanka-districts',
    type: 'Technology',
    vice: 'Intellect',
    description: 'A chaotic and vibrant technology district. This is the city\'s brain, a marketplace of ideas, data, and scientific experimentation. The mages and inventors who inhabit this space are driven by an insatiable curiosity, often leading to unpredictable and dangerous results. The district is a sensory overload of flickering holograms, whirring drones, and experimental code, where intellect is worshipped but often misused.',
    imagePath: '/images/locations/buddhi-hub.jpg',
  },
  {
    id: 'krodha-foundries',
    name: 'Krodha Foundries',
    subtitle: 'Industrial District',
    category: 'lanka-districts',
    type: 'Industrial',
    vice: 'Anger',
    description: 'A grim, smoke-choked industrial sector where the city\'s anger is nurtured. The Foundries are a constant symphony of clanging metal, steam vents, and the low roar of machinery. The factories here run 24/7, fueled by the discontent of a working class that sees no path forward. The environment is harsh and unforgiving, a physical manifestation of a society\'s rage, ready to erupt at any moment.',
    imagePath: '/images/locations/krodha-foundries.jpg',
  },
  {
    id: 'ghrina-colosseum',
    name: 'Ghrina Colosseum',
    subtitle: 'Sports District',
    category: 'lanka-districts',
    type: 'Sports',
    vice: 'Hate',
    description: 'A series of sprawling sports complexes and arenas where hatred is the main event. Here, competitive matches, from enhanced gladiatorial combat to digital matches, are used to channel and monetize the population\'s frustrations. The atmosphere is a volatile mix of righteous unity and fervent rage, with rival teams and fan bases fueling a constant, boiling-over conflict that is manipulated for entertainment and social control.',
    imagePath: '/images/locations/ghrina-colosseum.jpg',
  },
  {
    id: 'kama-strip',
    name: 'Kama Strip',
    subtitle: 'Nightlife District',
    category: 'lanka-districts',
    type: 'Nightlife',
    vice: 'Lust',
    description: 'A dazzling, neon-drenched urban sprawl that never sleeps. The Strip is the heart of the city\'s nightlife and entertainment. It is a place where every desire, from the sensual to the forbidden, is a commodity. The air is thick with the scent of synthetic perfumes and the thrum of bass from underground clubs. Here, lust and addiction are not just a sin but an industry, and the populace is encouraged to indulge in fleeting pleasures, no matter the cost.',
    imagePath: '/images/locations/kama-strip.jpg',
  },
  {
    id: 'bhaya-compound',
    name: 'Bhaya Compound',
    subtitle: 'Prison District',
    category: 'lanka-districts',
    type: 'Prison',
    vice: 'Fear',
    description: 'The city\'s sprawling prison system, a monument to psychological terror. The Compound is a fortress of surveillance and despair where fear is the primary tool of control. It\'s a place where the line between reality and illusion is constantly blurred, and where prisoners are subjected to psychological torment to break their will. This district is a chilling manifestation of corrupted power to instill absolute fear and control over his subjects.',
    imagePath: '/images/locations/bhaya-compound.jpg',
  },
  // SVARGA ZONES
  {
    id: 'sudharma',
    name: 'Sudharma',
    subtitle: 'The Seat of Governance',
    category: 'svarga-zones',
    description: 'The supreme command center of the celestial realm, where the guardians monitor and maintain cosmic order. A massive, multi-tiered structure of solidified light and nanite-infused marble, suspended in the upper atmosphere of Svarga. Home to the Akasha Halls (personal consciousness-connected spaces for each guardian) and the Sabha (grand assembly hall where guardians hold court and make critical decisions governing all existence).',
    imagePath: '/images/locations/sudharma.jpg',
  },
  {
    id: 'darshana-gardens',
    name: 'Darshana Gardens',
    subtitle: 'Oracles Residence',
    category: 'svarga-zones',
    description: 'A living data-grove where the oracles of time reside, their prophetic visions and historical insights intertwined with the digital flora and fauna. The "plants" are bioluminescent data servers, the "waterfalls" are streams of pure information, and the air hums with forgotten whispers and future possibilities. Contains the Lair of Days Past (Narada), Presence Sanctum (Durga), and Tomorrows\' Hive (Kalki).',
    imagePath: '/images/locations/darshana-gardens.jpg',
  },
  {
    id: 'tri-core',
    name: 'The Tri~Core',
    subtitle: 'Forces Abode',
    category: 'svarga-zones',
    description: 'The highest point in Svarga, a hyper-technological nexus of creation, preservation, and destruction. The fundamental operating system of the cosmos, accessible only by the three primary deities. Contains the Dawn~Core (Aruna\'s creative engine), Noon~Core (Madyana\'s library of existence), and Dusk~Core (Sandya\'s reactor of controlled dissolution). This is where the universe itself is designed, maintained, and transformed.',
    imagePath: '/images/locations/tri-core.jpg',
  },
  // PLEXUS ENTITIES
  {
    id: 'plexus-network',
    name: 'The Plexus',
    subtitle: 'Interdimensional Network',
    category: 'plexus-entities',
    description: 'A vast neural network connecting the mortal and divine realms, functioning as both communication medium and transportation infrastructure for cosmic governance. An endless web of luminous pathways that pulse with the flow of information, souls, and divine presence between realities. Serves as the passage for deceased souls, channel for spiritual communication, and highway for divine entities to move between domains at light speed.',
    imagePath: '/images/locations/plexus-network.jpg',
  },
  {
    id: 'plexus-archive',
    name: 'The Plexus Archive',
    subtitle: 'Universal Ledger',
    category: 'plexus-entities',
    description: 'The vast repository storing the total sum of all interdimensional dialogue. An auxiliary neural network within The Plexus itself, recording every interaction, signal, and data point passed between the mortal realm and the divine. Critically inaccessible to all entities—neither mortal petitioners, nor the Guardians, nor the highest divine authorities can directly access, modify, or audit its contents. A perfectly neutral, complete, and unalterable record of cosmic history.',
    imagePath: '/images/locations/plexus-archive.jpg',
  },
  {
    id: 'the-archivist',
    name: 'The Archivist',
    subtitle: 'Keeper of the Archive',
    category: 'plexus-entities',
    description: 'The sole entity tasked with the stewardship of the universal ledger. Little is known of this figure beyond their singular, ceaseless mandate to observe and curate the totality of existence stored within The Plexus Archive. Responsible for the collection and permanent indexing of all recorded moments, including the fragmentary micro-stories designated as "Shards." Through blockchain technology, some Shards occasionally "leak" from the Archive into our realm, exposing core narrative content and Meta-Narrative Logs.',
    imagePath: '/images/locations/the-archivist.jpg',
  },
];

export const categoryNames: Record<LocationCategory, string> = {
  'lanka-districts': 'Lanka Prime Districts',
  'svarga-zones': 'Svarga Zones',
  'plexus-entities': 'The Plexus',
};

export const categoryDescriptions: Record<LocationCategory, string> = {
  'lanka-districts': 'The ten urban districts of Lanka Prime, the mortal metropolis where divine policy impacts are felt most directly.',
  'svarga-zones': 'The celestial zones of Svarga, where guardians, oracles, and the Continuum maintain cosmic order.',
  'plexus-entities': 'The interdimensional network connecting mortal and divine realms, and its mysterious keeper.',
};