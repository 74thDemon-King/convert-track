export interface TranscriptLine {
  id: string;
  speaker: string;
  timestamp: string;
  text: string;
  isActionable?: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string | null;
  deadline: string | null;
  sourceSentence: string;
  sourceTimestamp: string;
  confidence: "high" | "medium" | "low";
  status: "confirmed" | "needs-review" | "missing-info";
  reasoning: string;
  missingFields: string[];
}

export interface ExecutionStep {
  id: string;
  title: string;
  owner: string | null;
  dependsOn: string | null;
  status: "confirmed" | "needs-review" | "missing-info";
}

export const transcript: TranscriptLine[] = [
  { id: "t1", speaker: "Sarah Chen", timestamp: "00:01:12", text: "Let's kick off the Q2 planning. I want us to finalize the product roadmap by end of this week." },
  { id: "t2", speaker: "Marcus Webb", timestamp: "00:02:04", text: "We still haven't locked down the API migration timeline. Engineering needs at least three weeks for that.", isActionable: true },
  { id: "t3", speaker: "Sarah Chen", timestamp: "00:02:38", text: "Okay. Marcus, can you draft the migration plan and share it by Thursday?", isActionable: true },
  { id: "t4", speaker: "Marcus Webb", timestamp: "00:03:01", text: "Sure, I'll loop in DevOps as well." },
  { id: "t5", speaker: "Priya Patel", timestamp: "00:03:45", text: "On the design side, we need the new component library audit completed before we start the redesign sprint." },
  { id: "t6", speaker: "Sarah Chen", timestamp: "00:04:12", text: "Priya, take ownership of the audit. Let's target next Monday for the report.", isActionable: true },
  { id: "t7", speaker: "Priya Patel", timestamp: "00:04:30", text: "Got it. I'll need access to the Figma analytics — can someone grant that?" },
  { id: "t8", speaker: "James Liu", timestamp: "00:05:15", text: "I'll handle the Figma access. Should be done today.", isActionable: true },
  { id: "t9", speaker: "Sarah Chen", timestamp: "00:06:02", text: "We also need to decide on the vendor for the notification service. James, can you prepare a comparison?" },
  { id: "t10", speaker: "James Liu", timestamp: "00:06:28", text: "I can have the vendor comparison ready by Friday.", isActionable: true },
  { id: "t11", speaker: "Marcus Webb", timestamp: "00:07:10", text: "One more thing — we should schedule a security review before any migration work begins." },
  { id: "t12", speaker: "Sarah Chen", timestamp: "00:07:35", text: "Agreed. Let's figure out who owns that after this meeting.", isActionable: true },
];

export const actionItems: ActionItem[] = [
  {
    id: "a1",
    title: "Draft API migration plan",
    owner: "Marcus Webb",
    deadline: "Thursday, Jan 16",
    sourceSentence: "Marcus, can you draft the migration plan and share it by Thursday?",
    sourceTimestamp: "00:02:38",
    confidence: "high",
    status: "confirmed",
    reasoning: "Direct assignment with explicit owner and deadline mentioned in conversation.",
    missingFields: [],
  },
  {
    id: "a2",
    title: "Complete component library audit",
    owner: "Priya Patel",
    deadline: "Monday, Jan 20",
    sourceSentence: "Priya, take ownership of the audit. Let's target next Monday for the report.",
    sourceTimestamp: "00:04:12",
    confidence: "high",
    status: "confirmed",
    reasoning: "Clear ownership assignment with a specific deadline.",
    missingFields: [],
  },
  {
    id: "a3",
    title: "Grant Figma analytics access",
    owner: "James Liu",
    deadline: "Today",
    sourceSentence: "I'll handle the Figma access. Should be done today.",
    sourceTimestamp: "00:05:15",
    confidence: "high",
    status: "confirmed",
    reasoning: "Self-assigned task with same-day deadline.",
    missingFields: [],
  },
  {
    id: "a4",
    title: "Prepare notification vendor comparison",
    owner: "James Liu",
    deadline: "Friday, Jan 17",
    sourceSentence: "I can have the vendor comparison ready by Friday.",
    sourceTimestamp: "00:06:28",
    confidence: "high",
    status: "needs-review",
    reasoning: "Self-assigned with deadline. Review recommended: scope of comparison not specified.",
    missingFields: [],
  },
  {
    id: "a5",
    title: "Schedule security review for migration",
    owner: null,
    deadline: null,
    sourceSentence: "Let's figure out who owns that after this meeting.",
    sourceTimestamp: "00:07:35",
    confidence: "low",
    status: "missing-info",
    reasoning: "Action identified but owner and timeline deferred. Requires manual assignment.",
    missingFields: ["Owner", "Deadline"],
  },
];

export const executionSteps: ExecutionStep[] = [
  { id: "e1", title: "Grant Figma analytics access", owner: "James Liu", dependsOn: null, status: "confirmed" },
  { id: "e2", title: "Complete component library audit", owner: "Priya Patel", dependsOn: "e1", status: "confirmed" },
  { id: "e3", title: "Schedule security review", owner: null, dependsOn: null, status: "missing-info" },
  { id: "e4", title: "Draft API migration plan", owner: "Marcus Webb", dependsOn: "e3", status: "confirmed" },
  { id: "e5", title: "Prepare vendor comparison", owner: "James Liu", dependsOn: null, status: "needs-review" },
];
