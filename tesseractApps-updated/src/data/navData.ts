export const footerProductsData = {
    0: [
        "Rostering & Scheduling",
        "Timesheets & Payroll Alignment",
        "Workforce Management",
        "NDIS Claiming & Invoicing",
        "Accounting & Financial Reporting",
    ],
    1: [
        "Participant Management",
        "Incidents",
        "Compliance & Audit Readiness",
        "Dashboards & Reporting",
        "T-Sign",
    ],
    2: [
        "Clock In/Out",
        "ChaT",
        "T Learning Hub",
        "Xero Integration",
        "Salesforce Native Architecture",
    ],
};

// NavLink type, href takes precedence over title-based route lookup
export type NavLink = {
    title: string;
    subTitle?: string;
    href?: string;
};

export type NavGroup = {
    heading: string;
    links: NavLink[];
};

export type SolutionsCategory = Record<string, NavLink[]>;

export const navBarDummyData: {
    Capabilities: NavGroup[];
    Solutions: SolutionsCategory;
    Resources: NavLink[];
    About: NavLink[];
} = {
    // ── Capabilities mega-menu ─────────────────────────────────────────────
    // Groups match the brand document Part 2.2 exactly.
    // href is used for direct navigation, bypasses the title-to-route lookup.
    Capabilities: [
        {
            heading: "Workforce",
            links: [
                {
                    title: "Rostering & Scheduling",
                    subTitle: "Auto Scheduling",
                    href: "/capabilities/rostering-scheduling",
                },
                {
                    title: "Timesheets & Payroll Alignment",
                    subTitle: "Time Tracking",
                    href: "/capabilities/timesheets-payroll",
                },
                {
                    title: "Workforce Management",
                    subTitle: "Workforce Suite",
                    href: "/capabilities/workforce-management",
                },
                {
                    title: "Clock In/Out",
                    subTitle: "Attendance",
                    href: "/coming-soon",
                },
                {
                    title: "Staff Self-Service Portal",
                    subTitle: "My Profile",
                    href: "/coming-soon",
                },
                {
                    title: "T Learning Hub",
                    subTitle: "Learning Hub",
                    href: "/coming-soon",
                },
            ],
        },
        {
            heading: "Participant & Care",
            links: [
                {
                    title: "Participant Management",
                    subTitle: "Participant Care",
                    href: "/capabilities/participant-management",
                },
                {
                    title: "Incidents",
                    subTitle: "Incident Reporting",
                    href: "/capabilities/incidents",
                },
                {
                    title: "Compliance & Audit Readiness",
                    subTitle: "Compliance",
                    href: "/capabilities/compliance-audit",
                },
                {
                    title: "ChaT",
                    subTitle: "Secure Messaging",
                    href: "/coming-soon",
                },
                {
                    title: "T-Sign",
                    subTitle: "Digital Signatures",
                    href: "/coming-soon",
                },
                {
                    title: "Voice Notes",
                    subTitle: "Notes",
                    href: "/coming-soon",
                },
            ],
        },
        {
            heading: "Finance",
            links: [
                {
                    title: "NDIS Claiming & Invoicing",
                    subTitle: "Claims",
                    href: "/capabilities/ndis-claiming",
                },
                {
                    title: "Accounting & Financial Reporting",
                    subTitle: "Finance",
                    href: "/capabilities/accounting-reporting",
                },
                {
                    title: "Quote Generator",
                    subTitle: "Quotes",
                    href: "/coming-soon",
                },
                {
                    title: "Xero Integration",
                    subTitle: "Integration",
                    href: "/coming-soon",
                },
            ],
        },
        {
            heading: "Operational Intelligence",
            links: [
                {
                    title: "Dashboards & Reporting",
                    subTitle: "Dashboards",
                    href: "/capabilities/dashboards-reporting",
                },
                {
                    title: "T Workflow Automation",
                    subTitle: "Automation",
                    href: "/coming-soon",
                },
                {
                    title: "Salesforce Native Architecture",
                    subTitle: "Integration",
                    href: "/coming-soon",
                },
            ],
        },
    ],

    // ── Solutions mega-menu ────────────────────────────────────────────────
    // Brand document Part 2.3, hidden items omitted entirely.
    // Keys changed from old structure (BY INDUSTRY / BY CARE / BY BUSINESS TYPE / BY BUSINESS PROBLEM)
    // to the new: BY CARE TYPE / BY ROLE / BY STAGE
    Solutions: {
        "BY CARE TYPE": [
            { title: "Disability Support", subTitle: "NDIS Providers", href: "/solutions/disability-support-ndis" },
            { title: "Support Coordination", subTitle: "Coordination", href: "/solutions/support-coordination" },
            { title: "SIL", subTitle: "Supported Independent Living", href: "/solutions/sil" },
            { title: "Allied Health", subTitle: "Allied Health Practices", href: "/solutions/allied-health-services" },
        ],
        "BY ROLE": [
            { title: "Operations Manager", subTitle: "Role", href: "/solutions/operations-manager" },
            { title: "Compliance Lead", subTitle: "Role", href: "/solutions/compliance-lead" },
            { title: "Finance Manager", subTitle: "Role", href: "/solutions/finance-manager" },
            { title: "Support Worker", subTitle: "Role", href: "/solutions/support-worker" },
        ],
        "BY STAGE": [
            { title: "Start", subTitle: "1–15 staff", href: "/solutions/start" },
            { title: "Growth", subTitle: "15–60 staff", href: "/solutions/growth" },
            { title: "Scale", subTitle: "60–120 staff", href: "/solutions/scale" },
            { title: "Enterprise", subTitle: "120+ staff", href: "/solutions/enterprise" },
        ],
    },

    // ── Resources ─────────────────────────────────────────────────────────
    Resources: [
        { title: "Blog", subTitle: "Insights & Updates", href: "/blogs" },
        { title: "Whitepapers", subTitle: "Research", href: "/whitepapers" },
        // { title: "Help Centre", subTitle: "Support", href: "/help-centre" },
    ],

    // ── About ──────────────────────────────────────────────────────────────
    About: [
        { title: "About Us", subTitle: " ", href: "/about" },
        { title: "Careers", subTitle: " ", href: "/careers" },
        { title: "Contact Us", subTitle: " ", href: "/contact-us" },
    ],
};
