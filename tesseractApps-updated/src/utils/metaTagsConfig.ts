interface MetaTags {
  title: string;
  description: string;
}

const DEFAULT: MetaTags = {
  title: "TesseractApps – End-to-End Workforce Management Software",
  description:
    "TesseractApps streamlines compliance, team management, NDIS-related care and service delivery for providers, all on a secure, scalable platform.",
};

const META_MAP: Record<string, MetaTags> = {
  // Products
  "/product": {
    title: "Products – TesseractApps",
    description: "Explore TesseractApps' full suite of workforce management products.",
  },
  "/roster-management": {
    title: "Roster Management – TesseractApps",
    description: "Simplify shift scheduling and roster management with TesseractApps.",
  },
  "/clock-in-and-clock-out": {
    title: "Clock In & Clock Out – TesseractApps",
    description: "Accurate time tracking with digital clock-in and clock-out for your team.",
  },
  "/forms": {
    title: "Digital Forms – TesseractApps",
    description: "Create and manage digital forms for compliance and care delivery.",
  },
  "/timesheet": {
    title: "Timesheet Management – TesseractApps",
    description: "Automate timesheet collection, approval, and payroll integration.",
  },
  "/participant-management": {
    title: "Participant Management – TesseractApps",
    description: "Manage NDIS participants efficiently with TesseractApps.",
  },
  "/accounting": {
    title: "Accounting – TesseractApps",
    description: "Integrated accounting tools for care providers and NDIS businesses.",
  },
  "/admin-console": {
    title: "Admin Console – TesseractApps",
    description: "Centralised administration and control for your organisation.",
  },
  "/incident-management": {
    title: "Incident Management – TesseractApps",
    description: "Log, track, and resolve incidents with our compliance-ready system.",
  },
  "/t-learning-hub": {
    title: "T-Learning Hub – TesseractApps",
    description: "Deliver and track staff training with the TesseractApps Learning Hub.",
  },
  "/access-control-panel": {
    title: "Access Control Panel – TesseractApps",
    description: "Manage user permissions and access levels across your organisation.",
  },
  "/chat": {
    title: "Team Chat – TesseractApps",
    description: "Secure in-app messaging and communication for your workforce.",
  },
  "/hr-operations": {
    title: "HR Operations – TesseractApps",
    description: "Streamline HR workflows, onboarding, and employee management.",
  },
  "/role-based-dashboard": {
    title: "Role-Based Dashboard – TesseractApps",
    description: "Tailored dashboards that surface the right data for every role.",
  },
  "/t-sign": {
    title: "T-Sign – TesseractApps",
    description: "Digital document signing for fast, compliant agreements.",
  },
  "/salesforce-integration": {
    title: "Salesforce Integration – TesseractApps",
    description: "Connect TesseractApps with Salesforce for seamless CRM workflows.",
  },
  "/xero": {
    title: "Xero Integration – TesseractApps",
    description: "Sync payroll and accounting data with Xero automatically.",
  },
  "/wyzed": {
    title: "Wyzed Integration – TesseractApps",
    description: "Integrate with Wyzed for powerful workforce learning capabilities.",
  },
  "/my-profile": {
    title: "My Profile – TesseractApps",
    description: "Manage your personal profile and preferences in TesseractApps.",
  },
  // Industry / Solutions
  "/ndis-industry": {
    title: "NDIS Industry Solutions – TesseractApps",
    description: "Purpose-built tools for NDIS providers to manage care and compliance.",
  },
  "/ict-industry": {
    title: "ICT Industry Solutions – TesseractApps",
    description: "Workforce management for ICT businesses and technology teams.",
  },
  "/retail-hospitality": {
    title: "Retail & Hospitality – TesseractApps",
    description: "Scheduling and HR tools tailored for retail and hospitality businesses.",
  },
  "/multi-site-businesses": {
    title: "Multi-Site Businesses – TesseractApps",
    description: "Manage workforce operations across multiple locations with ease.",
  },
  "/construction": {
    title: "Construction Industry – TesseractApps",
    description: "Workforce compliance and scheduling for construction businesses.",
  },
  "/manufacturing": {
    title: "Manufacturing Industry – TesseractApps",
    description: "Streamline workforce management for manufacturing operations.",
  },
  "/disability-support-ndis": {
    title: "Disability Support & NDIS – TesseractApps",
    description: "All-in-one platform for disability support and NDIS service delivery.",
  },
  "/support-coordination": {
    title: "Support Coordination – TesseractApps",
    description: "Tools to help support coordinators manage participants and services.",
  },
  "/aged-care-services": {
    title: "Aged Care Services – TesseractApps",
    description: "Compliance and care management software for aged care providers.",
  },
  "/child-care-services": {
    title: "Child Care Services – TesseractApps",
    description: "Manage child care operations and compliance with TesseractApps.",
  },
  "/allied-health-services": {
    title: "Allied Health Services – TesseractApps",
    description: "Workforce and compliance tools for allied health professionals.",
  },
  "/home-community-care-services": {
    title: "Home & Community Care – TesseractApps",
    description: "Coordinate and manage home and community care services efficiently.",
  },
  "/small-businesses": {
    title: "Small Business Solutions – TesseractApps",
    description: "Affordable workforce management tools built for small businesses.",
  },
  "/enterprise": {
    title: "Enterprise Solutions – TesseractApps",
    description: "Scalable workforce management platform for enterprise organisations.",
  },
  "/franchise": {
    title: "Franchise Solutions – TesseractApps",
    description: "Manage multi-location franchise operations from one platform.",
  },
  "/startups": {
    title: "Startup Solutions – TesseractApps",
    description: "Get your workforce operations right from day one with TesseractApps.",
  },
  "/compliance": {
    title: "Compliance Management – TesseractApps",
    description: "Stay compliant with automated compliance tracking and reporting.",
  },
  "/employee-engagement": {
    title: "Employee Engagement – TesseractApps",
    description: "Boost team morale and engagement with TesseractApps tools.",
  },
  "/time-efficiency": {
    title: "Time Efficiency – TesseractApps",
    description: "Save time across your organisation with automated workflows.",
  },
  "/cost-optimisation": {
    title: "Cost Optimisation – TesseractApps",
    description: "Reduce operational costs with smarter workforce management.",
  },
  // Roles
  "/administrator": {
    title: "For Administrators – TesseractApps",
    description: "Powerful admin tools for managing teams and operations.",
  },
  "/roster-manager": {
    title: "For Roster Managers – TesseractApps",
    description: "Plan and manage rosters efficiently with TesseractApps.",
  },
  "/ndis-staff": {
    title: "For NDIS Staff – TesseractApps",
    description: "Tools designed to support NDIS support workers in their daily work.",
  },
  "/hr-manager": {
    title: "For HR Managers – TesseractApps",
    description: "HR management tools built for modern care and service businesses.",
  },
  "/accountant": {
    title: "For Accountants – TesseractApps",
    description: "Accounting and financial tools integrated into your workforce platform.",
  },
  "/participant": {
    title: "For Participants – TesseractApps",
    description: "Participant-facing tools for NDIS and care service delivery.",
  },
};

export function getMetaTags(path: string): MetaTags {
  return META_MAP[path] ?? DEFAULT;
}
