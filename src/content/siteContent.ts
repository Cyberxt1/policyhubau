export const siteName = "Policy Hub Ambassadors";

export const landingCopy = {
  eyebrow: "Student Policy Network",
  headline: "Policy Hub Ambassadors",
  lead: "",
  primaryCta: "Become an Ambassador",
  secondaryCta: "About Us",
};

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#apply", label: "Apply" },
  { href: "/hubs", label: "Universities" },
];

export const schoolHubs = [
  {
    school: "Adeleke University",
    location: "Ede, Osun",
    description: "A student-led chapter for policy learning, campus activities, research conversations, and FPDI challenge preparation.",
    href: "/hub",
    status: "Active",
    lead: "David Oluokun",
    members: "60+",
  },
  {
    school: "Covenant University",
    location: "Ota, Ogun",
    description: "A growing campus chapter connecting students interested in governance, leadership, and public problem-solving.",
    href: "",
    status: "Active",
    lead: "Lead Ambassador",
    members: "45+",
  },
  {
    school: "Babcock University",
    location: "Ilishan-Remo, Ogun",
    description: "Recruiting student leaders to launch conversations, workshops, and policy literacy projects on campus.",
    href: "",
    status: "Recruiting",
    lead: "Open",
    members: "Recruiting",
  },
  {
    school: "University of Ibadan",
    location: "Ibadan, Oyo",
    description: "A coming chapter for students who want to engage public policy through research, dialogue, and civic action.",
    href: "",
    status: "Coming Soon",
    lead: "Pending",
    members: "Opening soon",
  },
  {
    school: "University of Lagos",
    location: "Akoka, Lagos",
    description: "A coming chapter for policy-minded students across governance, advocacy, and social innovation.",
    href: "",
    status: "Coming Soon",
    lead: "Pending",
    members: "Opening soon",
  },
];

export const campusDirectory = [
  "Adeleke University",
  "Babcock University",
  "Covenant University",
  "Bowen University",
  "Redeemer's University",
  "Osun State University",
  "University of Ibadan",
  "University of Lagos",
  "Obafemi Awolowo University",
  "University of Ilorin",
  "Pan-Atlantic University",
  "Lead City University",
  "Afe Babalola University",
  "Ajayi Crowther University",
  "Lagos State University",
  "Your university",
];

export const contactDetails = {
  email: "contact@policychallenge.com",
  whatsappUrl: "https://chat.whatsapp.com/DS62nGqYGkg8RFxprDsweV?mode=wwt",
  applicationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeWHEDNCaGd9Mkzjzcw5FVV261Qy8WX_nnq7I-qEJ1Awx4Oeg/viewform",
};

export const landingBuilderDefaults = {
  site: landingCopy,
  trust: {
    eyebrow: "Trusted by students from",
    items: [
      "Adeleke University",
      "Covenant University",
      "Babcock University",
      "University of Ibadan",
      "University of Lagos",
      "Obafemi Awolowo University",
      "and more",
    ],
  },
  about: {
    eyebrow: "What is Policy Hub?",
    title: "A movement, not just a community.",
    body: "Policy Hub helps students understand governance, discuss public issues, and lead useful policy work on campus.",
    highlight: "The goal: raise young Africans who can solve public problems.",
  },
  gains: [
    {
      title: "Lead",
      text: "Run policy conversations and campus activities.",
      icon: "lead",
    },
    {
      title: "Connect",
      text: "Meet ambitious students across universities.",
      icon: "connect",
    },
    {
      title: "Learn",
      text: "Join workshops, bootcamps, and leadership sessions.",
      icon: "learn",
    },
    {
      title: "Build",
      text: "Create a portfolio of research, advocacy, and impact.",
      icon: "build",
    },
  ],
  process: {
    eyebrow: "How it works",
    title: "One Network. Student Leaders.",
    steps: ["Apply", "Get selected", "Onboard", "Launch activities", "Build impact"],
  },
  impact: [
    { value: "15+", label: "Universities" },
    { value: "250+", label: "Students reached" },
    { value: "20+", label: "Ambassadors" },
  ],
  chapters: schoolHubs,
  finalCta: {
    title: "Become a Policy Hub Ambassador.",
    body: "Join students shaping conversations, building communities, and preparing for leadership.",
    primaryLabel: "Apply Now",
    secondaryLabel: "Find Your Campus",
  },
  sections: [
    { id: "hero", label: "Hero", enabled: true },
    { id: "trust", label: "Trust Bar", enabled: true },
    { id: "about", label: "About", enabled: true },
    { id: "benefits", label: "Benefits", enabled: true },
    { id: "process", label: "Process", enabled: true },
    { id: "universities", label: "Universities", enabled: true },
    { id: "finalCta", label: "Final CTA", enabled: true },
  ],
  customSections: [],
};
