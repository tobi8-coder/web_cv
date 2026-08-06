/**
 * Single source of truth for every piece of CV content on the site.
 *
 * Everything rendered in the UI comes from this file, so updating the CV means
 * editing data here — never the components.
 */

/* ------------------------------------------------------------------ types -- */

export type Profile = {
  name: string;
  role: string;
  roleRotation: string[];
  tagline: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  summary: string;
  about: string[];
  avatar: string;
  cv: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "mail" | "phone" | "map";
  handle: string;
  /** Rendered in the contact grid and the footer. */
  primary?: boolean;
};

export type Stat = { label: string; value: number; suffix?: string; prefix?: string };

export type Skill = { name: string; level: number };

export type SkillGroup = {
  title: string;
  icon: "blocks" | "code" | "layout" | "server" | "database" | "wrench";
  blurb: string;
  skills: Skill[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  type: string;
  location?: string;
  highlights: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
  meta?: { label: string; value: string }[];
};

export type ProjectCategory = "Blockchain" | "Web3" | "Full-Stack";

export type Project = {
  title: string;
  role: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  stack: string[];
  featured?: boolean;
  badge?: string;
  /**
   * Optional links. Left empty because the source CV lists no public URLs —
   * add a repo/demo here and the card grows the matching button automatically.
   */
  links?: { repo?: string; demo?: string; caseStudy?: string };
};

export type Certification = { name: string; issuer: string; icon: "cloud" | "award" };

export type Achievement = { title: string; detail: string; year?: string };

export type Language = { name: string; level: string };

/**
 * Referees are listed by name and role only. Their email addresses and phone
 * numbers are deliberately absent from this file, not merely hidden in the UI:
 * this repository is public, so anything stored here is readable regardless of
 * whether a component renders it. Share their details privately, on request.
 */
export type Reference = { name: string; title: string };

/* --------------------------------------------------------------- profile -- */

export const profile: Profile = {
  name: "Pema Yeshi Tshering",
  role: "Blockchain Developer",
  roleRotation: [
    "Blockchain Developer",
    "Smart Contract Engineer",
    "Full-Stack Web Developer",
    "Web3 Builder",
  ],
  tagline:
    "I design and ship Ethereum smart contracts, decentralized applications and the polished web platforms that make them usable.",
  email: "pemayeshey87@gmail.com",
  phone: "+975 17956150",
  location: "Thimphu, Bhutan",
  availability: "Open to graduate & junior roles",
  summary:
    "Final-year Computer Science undergraduate specializing in blockchain development and full-stack web engineering. Skilled in designing and deploying Ethereum-based smart contracts and decentralized applications (dApps), and in building responsive web platforms with React, Node.js and modern tooling.",
  about: [
    "I am a final-year Computer Science undergraduate at Gyalpozhing College of Information and Technology, focused on blockchain technology, full-stack web development and distributed systems. Most of my time goes into writing Solidity, wiring contracts to real interfaces, and making the result feel effortless to use.",
    "Across academic and independent work I have delivered projects spanning digital voting, supply-chain traceability, NFTs, encrypted storage and bond tokenization — each one taking a contract from design through deployment and into a front end people can actually navigate.",
    "Outside of code, a year as an XRPL Campus Ambassador for Ripple taught me to explain decentralized technology to people meeting it for the first time, and a design internship sharpened the eye for layout, typography and colour that I now bring to every interface I build.",
  ],
  avatar: "/profile.jpg",
  cv: "/Pema_Yeshi_Tshering_CV.pdf",
};

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:pemayeshey87@gmail.com",
    icon: "mail",
    handle: "pemayeshey87@gmail.com",
    primary: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/pema-yeshi-tshering",
    icon: "linkedin",
    handle: "in/pema-yeshi-tshering",
    primary: true,
  },
  {
    label: "Phone",
    href: "tel:+97517956150",
    icon: "phone",
    handle: "+975 17956150",
    primary: true,
  },
  {
    label: "Location",
    href: "https://www.google.com/maps/place/Thimphu",
    icon: "map",
    handle: "Thimphu, Bhutan",
    primary: true,
  },
];

/**
 * Add a GitHub profile URL here and it appears in the nav, contact grid and
 * footer. Left blank because the source CV does not list one.
 */
export const githubUrl = "";

export const stats: Stat[] = [
  { label: "Blockchain projects delivered", value: 5 },
  { label: "Years building software", value: 4, suffix: "+" },
  { label: "Professional certifications", value: 2 },
  { label: "Languages spoken", value: 5 },
];

/* ---------------------------------------------------------------- skills -- */

export const skillGroups: SkillGroup[] = [
  {
    title: "Blockchain & Web3",
    icon: "blocks",
    blurb: "Contracts, dApps and tokenized assets on Ethereum.",
    skills: [
      { name: "Solidity", level: 88 },
      { name: "Smart contract development", level: 86 },
      { name: "dApp architecture", level: 82 },
      { name: "Tokenization", level: 80 },
      { name: "Wallet & Web3 integration", level: 78 },
      { name: "IPFS / decentralized storage", level: 72 },
    ],
  },
  {
    title: "Programming",
    icon: "code",
    blurb: "Languages I reach for day to day.",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 84 },
      { name: "SQL", level: 80 },
      { name: "Python", level: 76 },
      { name: "Java", level: 70 },
    ],
  },
  {
    title: "Web & Frontend",
    icon: "layout",
    blurb: "Interfaces that stay fast and accessible everywhere.",
    skills: [
      { name: "HTML & CSS", level: 92 },
      { name: "React", level: 87 },
      { name: "Responsive web design", level: 88 },
      { name: "REST API consumption", level: 84 },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    blurb: "Services, APIs and the full-stack glue between them.",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 82 },
      { name: "API design", level: 80 },
      { name: "Full-stack development", level: 83 },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    blurb: "Relational and document stores.",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    title: "Tools & Practices",
    icon: "wrench",
    blurb: "How the work actually gets shipped.",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Debugging", level: 85 },
      { name: "Command line", level: 82 },
      { name: "Testing", level: 74 },
    ],
  },
];

/** Chips for the scrolling technology marquee. */
export const techMarquee: string[] = [
  "Solidity",
  "Ethereum",
  "Smart Contracts",
  "dApps",
  "Tokenization",
  "IPFS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "REST APIs",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Testing",
  "XRPL",
];

/** Non-technical strengths — shown as plain chips, no progress bars. */
export const strengths: string[] = [
  "Analytical thinking",
  "Problem solving",
  "Workshop facilitation",
  "Technical communication",
  "Visual design sense",
  "Continuous learning",
];

/* ------------------------------------------------------------ experience -- */

export const experiences: Experience[] = [
  {
    role: "XRPL Campus Ambassador",
    company: "Ripple",
    period: "2022 — 2023",
    type: "Ambassador Programme",
    highlights: [
      "Promoted blockchain literacy and the XRP Ledger (XRPL) ecosystem across the university student community.",
      "Planned and led workshops, seminars and information sessions introducing blockchain fundamentals and XRPL development.",
      "Drove student engagement in decentralized technology through hands-on learning activities and guided discussions.",
      "Coordinated events with peers to expand campus outreach and encourage participation in blockchain innovation.",
    ],
    stack: ["XRPL", "Blockchain education", "Event leadership", "Public speaking"],
  },
  {
    role: "Design Intern",
    company: "Graphic Lab",
    period: "Jun 2024 — Aug 2024",
    type: "Internship",
    highlights: [
      "Produced visual content for digital and print media alongside the design team.",
      "Applied core design principles — layout, typography, colour theory and composition — to client-ready deliverables.",
      "Supported marketing materials, social media graphics and promotional content from concept to final output.",
      "Gained hands-on experience with industry-standard design tools and end-to-end creative workflows.",
    ],
    stack: ["Layout", "Typography", "Colour theory", "Brand collateral"],
  },
];

/* ------------------------------------------------------------- education -- */

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Gyalpozhing College of Information and Technology",
    period: "2021 — 2026 (Expected)",
    detail:
      "Completed academic projects centered on web application development and blockchain-based solutions.",
    meta: [
      {
        label: "Relevant coursework",
        value:
          "Data Structures & Algorithms, Database Systems, Software Engineering, Web Development, Computer Networks",
      },
      {
        label: "Focus areas",
        value: "Blockchain Technology, Full-Stack Web Development, Distributed Systems",
      },
    ],
  },
  {
    degree: "Higher Secondary Education (Class XII), Science Stream",
    institution: "Punakha Central School",
    period: "2019 — 2020",
  },
];

/* -------------------------------------------------------------- projects -- */

export const projects: Project[] = [
  {
    title: "Bond Tokenization Platform",
    role: "Smart Contract Developer",
    year: "2025",
    category: "Blockchain",
    featured: true,
    badge: "Final Year Project",
    summary:
      "A blockchain platform that tokenizes traditional bonds into digital assets, unlocking fractional ownership and far better liquidity for instruments that normally trade in large, illiquid blocks.",
    highlights: [
      "Engineered a platform that converts traditional bonds into on-chain digital assets, enabling fractional ownership and improved liquidity.",
      "Developed smart contracts to automate bond issuance, interest distribution and maturity settlement.",
      "Prioritized security, scalability and regulatory awareness while bridging traditional finance with decentralized technology.",
    ],
    stack: ["Solidity", "Smart Contracts", "Ethereum", "React", "Node.js", "Tokenization"],
  },
  {
    title: "NFT Marketplace Prototype",
    role: "Frontend & Blockchain Integrator",
    year: "2024",
    category: "Web3",
    featured: true,
    summary:
      "An end-to-end marketplace where users mint, list and purchase digital assets, with decentralized media storage and on-chain ownership transfer behind a secure transaction flow.",
    highlights: [
      "Developed a marketplace enabling users to mint, list and purchase digital assets with a secure transaction flow.",
      "Integrated IPFS for decentralized storage and connected smart contracts for on-chain ownership transfer.",
    ],
    stack: ["Solidity", "IPFS", "React", "Web3 Integration", "NFT"],
  },
  {
    title: "Decentralized Voting System",
    role: "Blockchain Developer",
    year: "2022",
    category: "Blockchain",
    summary:
      "A transparent voting system where every ballot is immutable and double voting is structurally impossible, backed by wallet-based identity verification.",
    highlights: [
      "Built a secure, transparent voting system on Ethereum-based smart contracts, ensuring immutability and preventing double voting.",
      "Developed a voter-facing interface and integrated wallet authentication for identity verification.",
    ],
    stack: ["Solidity", "Ethereum", "Smart Contracts", "Wallet Auth", "JavaScript"],
  },
  {
    title: "Supply Chain Traceability DApp",
    role: "Smart Contract Developer",
    year: "2023",
    category: "Blockchain",
    summary:
      "A traceability layer that follows a product through every supply-chain stage, leaving a tamper-proof log that all stakeholders can independently verify.",
    highlights: [
      "Created a blockchain application to track products across supply-chain stages with tamper-proof transaction logs.",
      "Implemented smart contracts that enforced data transparency and strengthened trust between stakeholders.",
    ],
    stack: ["Solidity", "Smart Contracts", "dApp", "Ethereum"],
  },
  {
    title: "Secure File Storage System",
    role: "Backend Developer",
    year: "2024",
    category: "Full-Stack",
    summary:
      "An encrypted storage service built on decentralized principles, where hashing and encryption protect integrity and privacy from upload through retrieval.",
    highlights: [
      "Built an encrypted file-storage system using decentralized principles to safeguard data integrity and privacy.",
      "Applied hashing and encryption techniques and designed APIs for secure file upload and retrieval.",
    ],
    stack: ["Node.js", "Express", "Cryptography", "REST API", "Hashing"],
  },
];

export const projectCategories: readonly ("All" | ProjectCategory)[] = [
  "All",
  "Blockchain",
  "Web3",
  "Full-Stack",
] as const;

/* -------------------------------------------------------- certifications -- */

export const certifications: Certification[] = [
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services", icon: "cloud" },
  { name: "FIFA Grassroots Coaching", issuer: "FIFA", icon: "award" },
];

export const achievements: Achievement[] = [
  {
    title: "Leadership Certificate — SUPW Captain",
    detail: "Punakha Central School",
    year: "2020",
  },
  {
    title: "2nd Place, Project Showcase",
    detail: "Gyalpozhing College of Information and Technology (First Year)",
  },
  {
    title: "Inter-House Football Championship, Senior Category",
    detail: "1st Position",
    year: "2019",
  },
  { title: "Regional Dzongkhag Football Tournament", detail: "2nd Position", year: "2016" },
  { title: "College Department Football Tournament", detail: "2nd Position" },
];

export const languages: Language[] = [
  { name: "Dzongkha", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Conversational" },
  { name: "Sharchop", level: "Fluent" },
  { name: "Nepali", level: "Conversational" },
];

export const references: Reference[] = [
  { name: "Mr. Dhendup Tshering", title: "Project Lead, Yangkor" },
  { name: "Mr. Kencho Tshering", title: "Mentor" },
];

/* ------------------------------------------------------------ navigation -- */

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItemId = (typeof navItems)[number]["id"];
