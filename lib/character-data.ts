// Character data extracted from FMAO lore

export type CharacterCategory = 'old-guardians' | 'new-guardians' | 'continuum' | 'oracles' | 'defiants';

export interface Character {
  id: string;
  name: string;
  title: string;
  direction?: string;
  domain: string;
  archetype: string;
  backstory?: string;
  signatureIssues: string;
  category: CharacterCategory;
  imagePath: string;
  spoiler?: boolean;
}

export const characters: Character[] = [
  // OLD GUARDIANS
  {
    id: 'indra',
    name: 'Indra',
    title: 'East Guardian',
    direction: 'East',
    domain: 'King of Gods, Thunder, Lightning, War, Storms',
    archetype: 'Ambition, sovereignty. Wants to lead all others, seeks consolidation',
    backstory: 'Rose through the ranks of his nation\'s Armed Forces through a combination of tactical brilliance and natural leadership, earning respect from soldiers and superiors alike. Came within one promotion of becoming Army Chief of Staff before his ascension, leaving him with both the experience of high command and the frustration of never quite reaching the ultimate position of military authority.',
    signatureIssues: 'Military/Security affairs, leadership disputes, storm/weather-related decisions',
    category: 'old-guardians',
    imagePath: '/images/characters/indra.jpg',
  },
  {
    id: 'yama',
    name: 'Yama',
    title: 'South Guardian',
    direction: 'South',
    domain: 'Death, Justice, Cosmic Law, Afterlife',
    archetype: 'Judgment, finality. Wants clarity, closure, balance',
    backstory: 'Devoted his career to understanding justice from every angle - began as a passionate defense attorney, transitioned to prosecutor to see the other side of truth, and finally accepted appointment as a judge to balance both perspectives. Known for fair but uncompromising rulings that considered both the letter and spirit of the law.',
    signatureIssues: 'Justice system, rule enforcement, punishment mechanisms, dispute resolution',
    category: 'old-guardians',
    imagePath: '/images/characters/yama.jpg',
  },
  {
    id: 'varuna',
    name: 'Varuna',
    title: 'West Guardian',
    direction: 'West',
    domain: 'Water, Ocean, Cosmic Order, Oaths, Contracts',
    archetype: 'Law, boundaries. Wants structures to hold things together',
    backstory: 'Started as an international relations scholar before being recruited into diplomatic service, where her academic understanding of global systems proved invaluable. Rose to ambassador and chief negotiator, specializing in complex multilateral agreements and binding international treaties during the Water Wars.',
    signatureIssues: 'Contract management, oath-keeping, liquidity/treasury flow, cosmic order',
    category: 'old-guardians',
    imagePath: '/images/characters/varuna.jpg',
  },
  {
    id: 'kubera',
    name: 'Kubera',
    title: 'North Guardian',
    direction: 'North',
    domain: 'Wealth, Treasures, Abundance, Material Resources',
    archetype: 'Growth, prosperity. Wants expansion, wealth, thriving systems',
    backstory: 'Built his empire from a small family enterprise, learning every aspect of commerce from inventory management to international trade. His success came not from ruthless ambition but from understanding how to create genuine value and sustainable prosperity for all stakeholders in his business ecosystem.',
    signatureIssues: 'Treasury management, financial decisions, resource allocation, prosperity',
    category: 'old-guardians',
    imagePath: '/images/characters/kubera.jpg',
  },
  // NEW GUARDIANS
  {
    id: 'agni',
    name: 'Agni',
    title: 'Southeast Guardian',
    direction: 'Southeast',
    domain: 'Fire, Energy, Transformation, Sacrifice, Messenger of Gods',
    archetype: 'Passionate, transformative, purifying, intermediary',
    backstory: 'Began on the factory floor of a metallurgical plant, where he witnessed firsthand how raw materials transformed under heat and pressure. His engineering expertise and natural ability to communicate between management and workers led to his election as union representative, making him a bridge between different levels of the industrial hierarchy.',
    signatureIssues: 'Energy management, communication protocols, transformation/upgrade proposals',
    category: 'new-guardians',
    imagePath: '/images/characters/agni.jpg',
    spoiler: true,
  },
  {
    id: 'nirrti',
    name: 'Nirrti',
    title: 'Southwest Guardian',
    direction: 'Southwest',
    domain: 'Destruction, Chaos, Misfortune, Demons, Dissolution',
    archetype: 'Destructive but necessary, chaotic, unpredictable, sometimes feared',
    backstory: 'Born with a severe autoimmune condition that threatened her life multiple times, she channeled her intimate understanding of how the body\'s defenses can turn destructive into a medical career. Specialized in immunology and emergency medicine, becoming an expert in controlled destruction - knowing when breaking down diseased tissue saves the whole organism.',
    signatureIssues: 'Emergency powers, destructive proposals, chaos management, demon defense',
    category: 'new-guardians',
    imagePath: '/images/characters/nirrti.jpg',
    spoiler: true,
  },
  {
    id: 'vayu',
    name: 'Vayu',
    title: 'Northwest Guardian',
    direction: 'Northwest',
    domain: 'Wind, Air, Movement, Breath, Life Force',
    archetype: 'Swift, mobile, life-giving, everywhere at once',
    backstory: 'A mathematical prodigy who disappointed his academic mentors by choosing applied climatology over pure mathematics. His groundbreaking research on global wind patterns and atmospheric circulation made him one of the world\'s leading experts on how information and energy move through complex planetary systems.',
    signatureIssues: 'Information flow, quick decisions, mobility/migration, life force of governance',
    category: 'new-guardians',
    imagePath: '/images/characters/vayu.jpg',
    spoiler: true,
  },
  {
    id: 'ishana',
    name: 'Ishana',
    title: 'Northeast Guardian',
    direction: 'Northeast',
    domain: 'Supreme Power, Transformation, Renewal, Cosmic Destruction/Creation',
    archetype: 'Transcendent, powerful, transformative, sometimes detached',
    backstory: 'Inherited both his family\'s farm and a calling to serve his rural community as a priest, refusing multiple offers for advancement within the religious hierarchy to remain connected to the land. His dual role gave him unique insight into both the cycles of earthly growth and the spiritual transformations that guide human development.',
    signatureIssues: 'Ultimate authority, transformation proposals, renewal cycles, cosmic decisions',
    category: 'new-guardians',
    imagePath: '/images/characters/ishana.jpg',
    spoiler: true,
  },
  // Continuum
  {
    id: 'aruna',
    name: 'Aruna',
    title: 'Regent of Dawn',
    domain: 'Creation, Knowledge, Wisdom, Arts, Craftsmanship, Innovation',
    archetype: 'Creative force, wants to bring new things into existence, seeks to manifest potential into reality',
    signatureIssues: 'New project initiation, innovation strategies, knowledge systems, creative endeavors, foundational planning',
    category: 'continuum',
    imagePath: '/images/characters/aruna.jpg',
  },
  {
    id: 'madyana',
    name: 'Madyana',
    title: 'Regent of Noon',
    domain: 'Preservation, Protection, Maintenance, Cosmic Order, Incarnation, Dharma',
    archetype: 'Sustainer and protector, wants to maintain balance and harmony, seeks to preserve what is good and necessary',
    signatureIssues: 'System maintenance, conflict resolution, balance preservation, protective measures, dharmic governance',
    category: 'continuum',
    imagePath: '/images/characters/madyana.jpg',
  },
  {
    id: 'sandya',
    name: 'Sandya',
    title: 'Regent of Dusk',
    domain: 'Destruction, Transformation, Dance, Meditation, Asceticism, Time',
    archetype: 'Dissolution and renewal, wants to destroy what no longer serves, seeks ultimate truth through destruction and recreation',
    signatureIssues: 'Organizational restructuring, ending outdated systems, spiritual transformation, crisis management, radical change',
    category: 'continuum',
    imagePath: '/images/characters/sandya.jpg',
  },
  // ORACLES
  {
    id: 'narada',
    name: 'Narada',
    title: 'Hindsight Oracle',
    domain: 'Divine Messenger, Music, History, Communication, Cosmic Information, Sage Wisdom',
    archetype: 'Divine communicator and instigator, wants to facilitate necessary conflicts and revelations, seeks to test loyalty and reveal truth',
    signatureIssues: 'Information dissemination, communication strategies, diplomatic missions, testing systems, revealing hidden truths',
    category: 'oracles',
    imagePath: '/images/characters/narada.jpg',
  },
  {
    id: 'durga',
    name: 'Durga',
    title: 'Insight Oracle',
    domain: 'Divine Feminine Power, Protection, Warrior Energy, Motherhood, Fierce Compassion',
    archetype: 'Protective fierce mother, wants to defend the innocent and righteous, seeks to destroy evil and protect dharma',
    signatureIssues: 'Defense strategies, protection of vulnerable populations, combating corruption, maternal/nurturing policies, righteous warfare',
    category: 'oracles',
    imagePath: '/images/characters/durga.jpg',
  },
  {
    id: 'kalki',
    name: 'Kalki',
    title: 'Foresight Oracle',
    domain: 'Future Avatar, End Times, Purification, Righteousness, Final Judgment, New Age',
    archetype: 'Apocalyptic purifier, wants to cleanse corruption and usher in a new golden age, seeks ultimate justice',
    signatureIssues: 'System overhauls, corruption purging, end-of-cycle decisions, revolutionary changes, righteous reformation',
    category: 'oracles',
    imagePath: '/images/characters/kalki.jpg',
  },
  // DEFIANTS
  {
    id: 'ravana',
    name: 'Ravana',
    title: 'The Corruptor King',
    domain: 'Corruption, Hubris, Unchecked Power, Systemic Decay, Academic Arrogance, Digital Tyranny',
    archetype: 'A brilliant but prideful scholar-king who embodies the decay of systems from within. Ravana doesn\'t need to overthrow the guardians; he simply proves that their governance is corruptible by preying on its weaknesses.',
    signatureIssues: 'Exploiting system vulnerabilities, co-opting public discourse, academic and ethical debates, and large-scale corruption plots',
    category: 'defiants',
    imagePath: '/images/characters/ravana.jpg',
    spoiler: true,
  },
  {
    id: 'shakuni',
    name: 'Shakuni',
    title: 'The Deceiver Ghost',
    domain: 'Manipulation, Subversion, Distrust, Psychological Warfare, Data Intrigue, Misinformation',
    archetype: 'A master strategist and digital ghost who undermines authority from the shadows. Shakuni\'s power lies in his ability to expose hypocrisy and turn allies against each other. He is the ultimate digital saboteur, patient and precise.',
    signatureIssues: 'Spreading misinformation, inciting conflict between factions, exploiting emotional contradictions, and subtle political maneuvering',
    category: 'defiants',
    imagePath: '/images/characters/shakuni.jpg',
    spoiler: true,
  },
  {
    id: 'tataka',
    name: 'Tataka',
    title: 'The Vengeful Spirit',
    domain: 'Vengeance, Retribution, Unrelenting Pursuit, Unforgiving Justice, Predation, Uncontrolled Emotion',
    archetype: 'An independent force of pure vengeance. Tataka is not interested in political schemes or systemic control. Her singular focus is on avenging a past wrong, and she will mercilessly target anyone who stands in her way. She is the embodiment of a threat that cannot be reasoned with or placated, a raw force of retribution.',
    signatureIssues: 'Unrelenting personal vendettas, attacking specific targets, causing chaos to seek out her prey, and acts of unforgiving justice',
    category: 'defiants',
    imagePath: '/images/characters/tataka.jpg',
    spoiler: true,
  },
];

export const categoryNames: Record<CharacterCategory, string> = {
  'old-guardians': 'The Old Guardians',
  'new-guardians': 'The New Guardians',
  'continuum': 'The Continuum',
  'oracles': 'Oracles',
  'defiants': 'The Defiants',
};

export const categoryDescriptions: Record<CharacterCategory, string> = {
  'old-guardians': 'The four original cosmic protectors who maintain balance across the cardinal directions.',
  'new-guardians': 'The recently appointed guardians representing the intermediate directions.',
  'continuum': 'The supreme trinity of cosmic authority overseeing the entire guardian system.',
  'oracles': 'Three eternal advisors who provide temporal wisdom to guide decision-making.',
  'defiants': 'Powerful independent forces who challenge the established order.',
};