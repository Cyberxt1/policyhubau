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

export type TeamSet = {
  id: string;
  name: string;
  groupMode: GroupMode;
  rawList: string;
  groups: Group[];
  createdAt: string;
  updatedAt: string;
};

export type TeamPairingData = {
  adminUsername: string;
  activeSetId: string | null;
  teamSets: TeamSet[];
  content: TeamPairingContent;
};

type LegacyTeamPairingData = {
  adminUsername?: string;
  groupMode?: GroupMode;
  rawList?: string;
  groups?: Group[];
  content?: Partial<TeamPairingContent>;
};

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { mapValue: { fields?: Record<string, FirestoreValue> } }
  | { arrayValue: { values?: FirestoreValue[] } };

const firebaseConfig = {
  apiKey: "AIzaSyDhAkCf7gQH6QJX3_Qf2z3kE7uToK8IAIw",
  authDomain: "auphub-ng.firebaseapp.com",
  projectId: "auphub-ng",
  storageBucket: "auphub-ng.firebasestorage.app",
  messagingSenderId: "820736296996",
  appId: "1:820736296996:web:db30576eec9247a529b0b1",
};

const FIRESTORE_DOCUMENT_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/appData/teamPairing?key=${firebaseConfig.apiKey}`;

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

const nowIso = () => new Date().toISOString();

export const createEmptyTeamSet = (name?: string): TeamSet => {
  const timestamp = nowIso();

  return {
    id: `team-set-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name?.trim() || `Team Set ${new Date().toLocaleDateString()}`,
    groupMode: "2",
    rawList: "",
    groups: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const defaultTeamPairingData: TeamPairingData = {
  adminUsername: TEAM_PAIRING_ADMIN_USERNAME,
  activeSetId: null,
  teamSets: [createEmptyTeamSet("Current Teams")],
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

export const membersToTextarea = (members: Student[]) =>
  members.map((member) => `${member.name}, ${member.number}`).join("\n");

export const getSelectedTeamSet = (data: TeamPairingData, setId?: string | null) => {
  const targetId = setId ?? data.activeSetId ?? data.teamSets[0]?.id;
  return data.teamSets.find((teamSet) => teamSet.id === targetId) ?? data.teamSets[0] ?? null;
};

export const getPublishedTeamSet = (data: TeamPairingData) => {
  if (!data.activeSetId) {
    return null;
  }

  return data.teamSets.find((teamSet) => teamSet.id === data.activeSetId) ?? null;
};

export const getActiveGroups = (data: TeamPairingData) => getPublishedTeamSet(data)?.groups ?? [];

export const findGroupByNumber = (groups: Group[], lookupNumber: string) => {
  const normalized = normalizeNumber(lookupNumber);

  if (!normalized) {
    return null;
  }

  return groups.find((group) =>
    group.members.some((member) => normalizeNumber(member.number) === normalized),
  ) ?? null;
};

export const findStudentInGroup = (group: Group | null, lookupNumber: string) => {
  if (!group) {
    return null;
  }

  const normalized = normalizeNumber(lookupNumber);

  return group.members.find(
    (member) => normalizeNumber(member.number) === normalized,
  ) ?? null;
};

const normalizeTeamSet = (teamSet: Partial<TeamSet>, fallbackIndex: number): TeamSet => ({
  id: teamSet.id ?? `team-set-${fallbackIndex + 1}`,
  name: teamSet.name ?? `Team Set ${fallbackIndex + 1}`,
  groupMode: teamSet.groupMode ?? "2",
  rawList: teamSet.rawList ?? "",
  groups: (teamSet.groups ?? []).map((group, groupIndex) => ({
    id: group?.id ?? `Team ${groupIndex + 1}`,
    members: (group?.members ?? [])
      .filter((member) => member?.name && member?.number)
      .map((member) => ({
        name: member.name,
        number: normalizeNumber(member.number),
      })),
  })),
  createdAt: teamSet.createdAt ?? nowIso(),
  updatedAt: teamSet.updatedAt ?? nowIso(),
});

const normalizeData = (input?: Partial<TeamPairingData> & LegacyTeamPairingData): TeamPairingData => {
  const legacySet =
    !input?.teamSets?.length && (input?.groups?.length || input?.rawList)
      ? normalizeTeamSet(
          {
            id: "legacy-current-teams",
            name: "Current Teams",
            groupMode: input.groupMode ?? "2",
            rawList: input.rawList ?? "",
            groups: input.groups ?? [],
          },
          0,
        )
      : null;

  const fallbackSet =
    input?.teamSets?.length || legacySet || defaultTeamPairingData.teamSets.length
      ? undefined
      : createEmptyTeamSet("Current Teams");

  const teamSets =
    input?.teamSets?.map((teamSet, index) => normalizeTeamSet(teamSet, index)) ??
    (legacySet ? [legacySet] : undefined) ??
    (fallbackSet ? [fallbackSet] : defaultTeamPairingData.teamSets);

  const activeSetId =
    input?.activeSetId && teamSets.some((teamSet) => teamSet.id === input.activeSetId)
      ? input.activeSetId
      : teamSets[0]?.id ?? null;

  return {
    adminUsername: input?.adminUsername ?? TEAM_PAIRING_ADMIN_USERNAME,
    activeSetId,
    teamSets,
    content: {
      ...defaultTeamPairingContent,
      ...input?.content,
    },
  };
};

export const readLocalTeamPairingData = () => {
  if (typeof window === "undefined") {
    return normalizeData(defaultTeamPairingData);
  }

  const saved = window.localStorage.getItem(TEAM_PAIRING_STORAGE_KEY);

  if (!saved) {
    return normalizeData(defaultTeamPairingData);
  }

  try {
    return normalizeData(JSON.parse(saved) as Partial<TeamPairingData>);
  } catch {
    return normalizeData(defaultTeamPairingData);
  }
};

export const saveLocalTeamPairingData = (data: TeamPairingData) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TEAM_PAIRING_STORAGE_KEY, JSON.stringify(normalizeData(data)));
};

const toFirestoreValue = (value: unknown): FirestoreValue => {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }

  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((entry) => toFirestoreValue(entry)),
      },
    };
  }

  if (typeof value === "object") {
    const fields = Object.entries(value as Record<string, unknown>).reduce<Record<string, FirestoreValue>>(
      (result, [key, entry]) => {
        result[key] = toFirestoreValue(entry);
        return result;
      },
      {},
    );

    return {
      mapValue: {
        fields,
      },
    };
  }

  if (typeof value === "boolean") {
    return { booleanValue: value };
  }

  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }

  return { stringValue: String(value) };
};

const fromFirestoreValue = (value?: FirestoreValue): unknown => {
  if (!value) {
    return null;
  }

  if ("stringValue" in value) {
    return value.stringValue;
  }

  if ("integerValue" in value) {
    return Number(value.integerValue);
  }

  if ("doubleValue" in value) {
    return value.doubleValue;
  }

  if ("booleanValue" in value) {
    return value.booleanValue;
  }

  if ("nullValue" in value) {
    return null;
  }

  if ("arrayValue" in value) {
    return (value.arrayValue.values ?? []).map((entry) => fromFirestoreValue(entry));
  }

  if ("mapValue" in value) {
    return Object.entries(value.mapValue.fields ?? {}).reduce<Record<string, unknown>>(
      (result, [key, entry]) => {
        result[key] = fromFirestoreValue(entry);
        return result;
      },
      {},
    );
  }

  return null;
};

const fetchFirestoreDocument = async () => {
  const response = await fetch(FIRESTORE_DOCUMENT_URL, {
    method: "GET",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Unable to load team pairing data (${response.status}).`);
  }

  return response.json() as Promise<{ fields?: Record<string, FirestoreValue> }>;
};

export const fetchTeamPairingDataFromFirestore = async () => {
  const remoteDocument = await fetchFirestoreDocument();

  if (!remoteDocument?.fields?.payload) {
    return normalizeData(defaultTeamPairingData);
  }

  return normalizeData(
    fromFirestoreValue(remoteDocument.fields.payload) as Partial<TeamPairingData>,
  );
};

const writeFirestoreDocument = async (data: TeamPairingData) => {
  const response = await fetch(FIRESTORE_DOCUMENT_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        payload: toFirestoreValue(normalizeData(data)),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to save team pairing data (${response.status}).`);
  }
};

export const loadTeamPairingData = async () => {
  const localData = readLocalTeamPairingData();

  try {
    const remoteData = await fetchTeamPairingDataFromFirestore();
    saveLocalTeamPairingData(remoteData);
    return remoteData;
  } catch {
    return localData;
  }
};

export const saveTeamPairingData = async (data: TeamPairingData) => {
  const normalized = normalizeData(data);

  saveLocalTeamPairingData(normalized);
  await writeFirestoreDocument(normalized);
};
