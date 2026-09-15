type StageStatus = "draft" | "active";

export interface Stage {
  id: string;
  name: string;
  focus: string;
  tagline: string;
  staffRange: string;
  description: string;
  accent: string;
  status: StageStatus;
}
export const stages: Stage[] = [
  {
    id: "start",
    name: "Start",
    tagline: "Build your compliance foundation",
    focus: "STRUCTURE",
    staffRange: "1–15 staff",
    description:
      "Compliant rostering, participant records, incident reporting, and NDIS claiming from day one. Everything a new provider needs to operate with confidence.",
    accent: "#10B981",
    status: "active",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Stabilise payroll and operations",
    focus: "CONTROL",
    staffRange: "15–60 staff",
    description:
      "Automate SCHADS interpretation, connect timesheets to invoicing, and gain real-time oversight across your workforce.",
    accent: "#10B981",
    status: "draft",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Enforce governance across every site",
    focus: "GOVERNANCE",
    staffRange: "60–120 staff",
    description:
      "Approval workflows and multi-site consistency. The platform enforces the rules you set, everywhere.",
    accent: "#10B981",
    status: "draft",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Consolidate finance, payroll & reporting",
    focus: "CONSOLIDATION",
    staffRange: "120+ staff",
    description:
      "Unify multi-site operations and surface the data your leadership needs to act.",
    accent: "#10B981",
    status: "draft",
  },
];
