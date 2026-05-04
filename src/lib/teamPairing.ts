export type Student = {
  name: string;
  number: string;
};

export type Group = {
  id: string;
  members: Student[];
};

export type GroupMode = "2" | "3" | "4" | "mixed";

export type TeamPairingContent = {
  eyebrow: string;
  title: string;
  lead: string;
  lookupTitle: string;
  lookupLead: string;
  searchPlaceholder: string;
  emptyState: string;
  notFoundMessage: string;
  modalTitle: string;
  modalLead: string;
  helperTitle: string;
  helperText: string;
};

export type TeamPairingData = {
  adminUsername: string;
  groupMode: GroupMode;
  rawList: string;
  groups: Group[];
  content: TeamPairingContent;
};

export const TEAM_PAIRING_STORAGE_KEY = "policy-hub-team-pairing";
export const TEAM_PAIRING_ADMIN_USERNAME = "oluokundavid4";

export const defaultTeamPairingContent: TeamPairingContent = {
  eyebrow: "Team Pairing",
  title: "Team Pairing System",
  lead: "Enter your phone number to see the teammates assigned to you for the policy challenge.",
  lookupTitle: "Check your team",
  lookupLead: "Use the same phone number submitted to the Policy Hub. If your team has been created, it will appear in a popup card.",
  searchPlaceholder: "Enter your phone number",
  emptyState: "Enter your phone number and check your team.",
  notFoundMessage: "No team was found for that number yet. If teams have not been released, check again later.",
  modalTitle: "Your assigned team",
  modalLead: "Tap outside the card to close it. Tap a teammate number to open WhatsApp and introduce yourself.",
  helperTitle: "How this works",
  helperText: "Once the Policy Hub team pairing has been published, enter your number here to see who you have been paired with.",
};

export const defaultTeamPairingData: TeamPairingData = {
  adminUsername: TEAM_PAIRING_ADMIN_USERNAME,
  groupMode: "2",
  rawList: "",
  groups: [],
  content: defaultTeamPairingContent,
};

export const normalizeNumber = (value: string) => value.trim().replace(/\s+/g, "");

export const normalizeWhatsappNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("234")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `234${digits.slice(1)}`;
  }

  return digits;
};

export const getWhatsappLink = (studentName: string, teammate: Student) => {
  const number = normalizeWhatsappNumber(teammate.number);
  const text = encodeURIComponent(
    `Hello ${teammate.name}, I am ${studentName} from Adeleke University Policy Hub. We have been paired together for the FPDI Policy Challenge 2026. Nice to meet you.`,
  );

  return `https://wa.me/${number}?text=${text}`;
};

const shuffleList = <T,>(items: T[]) => {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
};

const buildFixedSizes = (count: number, preferred: 2 | 3 | 4) => {
  if (count < 2) {
    return [];
  }

  if (preferred === 2) {
    if (count === 3) {
      return [3];
    }

    const pairCount = Math.floor(count / 2);
    const sizes = Array.from({ length: pairCount }, () => 2);

    if (count % 2 === 1 && sizes.length > 0) {
      sizes[sizes.length - 1] = 3;
    }

    return sizes;
  }

  if (preferred === 3) {
    const groupsOfThree = Math.floor(count / 3);
    const remainder = count % 3;

    if (groupsOfThree === 0) {
      if (count === 2) {
        return [2];
      }

      if (count === 4) {
        return [2, 2];
      }
    }

    const sizes = Array.from({ length: groupsOfThree }, () => 3);

    if (remainder === 1 && sizes.length > 0) {
      sizes.pop();
      sizes.push(2, 2);
    }

    if (remainder === 2) {
      sizes.push(2);
    }

    return sizes;
  }

  const groupsOfFour = Math.floor(count / 4);
  const remainder = count % 4;

  if (groupsOfFour === 0) {
    if (count === 2) {
      return [2];
    }

    if (count === 3) {
      return [3];
    }
  }

  const sizes = Array.from({ length: groupsOfFour }, () => 4);

  if (remainder === 1 && sizes.length > 0) {
    sizes.pop();
    sizes.push(2, 3);
  }

  if (remainder === 2) {
    sizes.push(2);
  }

  if (remainder === 3) {
    sizes.push(3);
  }

  return sizes;
};

const buildMixedSizes = (count: number) => {
  const sizes: number[] = [];
  let remaining = count;

  while (remaining > 0) {
    if (remaining <= 4) {
      if (remaining === 1 && sizes.length > 0) {
        sizes[sizes.length - 1] += 1;
        remaining = 0;
        continue;
      }

      sizes.push(remaining);
      break;
    }

    const options = [2, 3, 4].filter((size) => {
      const nextRemaining = remaining - size;
      return nextRemaining === 0 || nextRemaining >= 2;
    });
    const chosen = options[Math.floor(Math.random() * options.length)];
    sizes.push(chosen);
    remaining -= chosen;
  }

  return sizes;
};

export const createGroups = (students: Student[], mode: GroupMode) => {
  const cleanStudents = shuffleList(students);

  const sizes =
    mode === "mixed"
      ? buildMixedSizes(cleanStudents.length)
      : buildFixedSizes(cleanStudents.length, Number(mode) as 2 | 3 | 4);

  let start = 0;

  return sizes.map((size, index) => {
    const members = cleanStudents.slice(start, start + size);
    start += size;

    return {
      id: `Team ${index + 1}`,
      members,
    };
  });
};

export const parseStudents = (raw: string) => {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const students: Student[] = [];
  const seenNumbers = new Set<string>();

  for (const line of lines) {
    const parts = line.split(/[,\t;|]/).map((part) => part.trim()).filter(Boolean);

    if (parts.length < 2) {
      continue;
    }

    const [name, number] = parts;
    const normalized = normalizeNumber(number);
    const isHeader =
      name.toLowerCase() === "name" ||
      number.toLowerCase() === "number" ||
      number.toLowerCase() === "phone";

    if (isHeader || !name || !normalized || seenNumbers.has(normalized)) {
      continue;
    }

    seenNumbers.add(normalized);
    students.push({
      name,
      number: normalized,
    });
  }

  return students;
};

export const readTeamPairingData = () => {
  if (typeof window === "undefined") {
    return defaultTeamPairingData;
  }

  const saved = window.localStorage.getItem(TEAM_PAIRING_STORAGE_KEY);

  if (!saved) {
    return defaultTeamPairingData;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<TeamPairingData>;

    return {
      ...defaultTeamPairingData,
      ...parsed,
      content: {
        ...defaultTeamPairingContent,
        ...parsed.content,
      },
      groups: parsed.groups ?? [],
      rawList: parsed.rawList ?? "",
      groupMode: parsed.groupMode ?? "2",
      adminUsername: parsed.adminUsername ?? TEAM_PAIRING_ADMIN_USERNAME,
    };
  } catch {
    return defaultTeamPairingData;
  }
};

export const saveTeamPairingData = (data: TeamPairingData) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TEAM_PAIRING_STORAGE_KEY, JSON.stringify(data));
};
