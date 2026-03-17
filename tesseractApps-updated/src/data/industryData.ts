import ndisIndustry from "../assets/NDIS Industry.webp";
import ictIndustry from "../assets/ICT Industry.webp";
import retail from "../assets/Retail & Hospitality.webp";
import multiSite from "../assets/Multi-site Businesses.webp";
import construction from "../assets/Construction-removebg-preview.webp";
import manufacturing from "../assets/Manufacturing-removebg-preview.webp";
import one from "../assets/01.webp";
import two from "../assets/02.webp";
import three from "../assets/03.webp";
import accountingImage from "../assets/Role Accounting.webp";
import participantsImage from "../assets/Role Participants.webp";
import support from "../assets/Disability Support.webp";
import aged from "../assets/aged_Care_Services-removebg-preview.webp";
import child from "../assets/Childcare_Services-removebg-preview.webp";
import allied from "../assets/Allied_Health_Practices-removebg-preview.webp";
import home from "../assets/Home___Community_Care-removebg-preview.webp";
import small from "../assets/Small Businesses.webp";
import enterprise from "../assets/Enterprise-removebg-preview.webp";
import Franchises from "../assets/Franchises-removebg-preview.webp";
import Startups from "../assets/Startups-removebg-preview.webp";
import compliance from "../assets/ompliance-removebg-preview.webp";
import emmpEng from "../assets/Employee Engagement.webp";
import timeEff from "../assets/Time_Efficiency-removebg-preview.webp";
import costOp from "../assets/Cost_Optimisation-removebg-preview.webp";

const dots = {
  dot1: { outer: "#E6EEFF", middle: "#B4CCFF", inner: "#2563EB" },
  dot2: { outer: "#FFE3E3", middle: "#FEB4B4", inner: "#FC4343" },
  dot3: { outer: "#DBF2E8", middle: "#9DD9C2", inner: "#08A965" },
  dot4: { outer: "#DBE8EF", middle: "#9DC2D1", inner: "#3B7793" },
  dot5: { outer: "#F7ECD9", middle: "#E8C9A5", inner: "#D77E1B" },
  dot6: { outer: "#EBE2FE", middle: "#C7ADFC", inner: "#932EFA" },
};

export const byIndustryData = {
  "NDIS Industry": {
    hero: {
      image: ndisIndustry,
      title: "Complete Workforce & Compliance Solution for NDIS Providers",
      description:
        "TesseractApps provides a secure, integrated platform designed for NDIS organisations. From participant management to rostering, payroll, and compliance, we simplify your operations, allowing you to focus on quality care. ",
      page: "NDIS Industry",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      title: "Why NDIS Providers Choose TesseractApps?",
      points: [
        {
          dot: dots.dot1,
          title: "Compliance Made Simple",
          description: `NDIS providers face strict quality and safeguard standards. TesseractApps automates compliance tracking, certification alerts, incident reporting, and audit logs to keep your organisation audit-ready. `,
        },
        {
          dot: dots.dot2,
          title: "Participant-Centred Management",
          description: `Centralise participant profiles, care plans, and service agreements, linking support to staff schedules to ensure every participant receives the right service at the right time. `,
        },
        {
          dot: dots.dot3,
          title: "Efficient Workforce Management",
          description: `Smart rostering, timesheets, and payroll automation reduce administrative overhead. Staff can submit shifts, clock in/out, and request leave via mobile or desktop, while managers approve and track everything in real-time. `,
        },
        {
          dot: dots.dot4,
          title: "Financial Control & NDIS Claims",
          description: `Automate payroll, generate invoices, and reconcile payments with bank feeds to ensure accurate billing and compliant NDIS claims with minimal effort. `,
        },
        {
          dot: dots.dot5,
          title: "Secure Communication & Data Protection",
          description: `Use ChaT for instant, encrypted communication across your workforce, sharing updates, files, and care information while protecting participant privacy with role-based access. `,
        },
      ],
    },
    details2: {
      title: "Key Features for NDIS Providers ",
      points: [
        {
          dot: dots.dot1,
          title: "Roster Management",
          description: `Match staff skills with participant needs to ensure compliance-ready schedules. `,
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll",
          description: `Automate approvals, reduce errors, and ensure timely, accurate payments. `,
        },
        {
          dot: dots.dot3,
          title: "Participant Management",
          description: `Keep all participant data and care plans in one secure location. `,
        },
        {
          dot: dots.dot4,
          title: "Incident Management",
          description: `Report, track, and resolve incidents in real-time with full audit trails. `,
        },
        {
          dot: dots.dot5,
          title: "T-Sign (Digital Signatures)",
          description: `Capture participant and staff approvals instantly and securely using T-Sign. `,
        },
        {
          dot: dots.dot6,
          title: "Documents",
          description: `Store, control, and retrieve NDIS-related files efficiently. `,
        },
        {
          dot: dots.dot1,
          title: "HR & Training Hub",
          description: `Track inductions, qualifications, and ongoing training for all staff. `,
        },
        {
          dot: dots.dot2,
          title: "Compliance Tracker",
          description: `Receive automated alerts for expiring certifications and NDIS standards. `,
        },
        {
          dot: dots.dot3,
          title: "Role-Based Dashboard",
          description: `Monitor performance, compliance, and service delivery in real-time with the Role-Based Dashboard. `,
        },
      ],
    },
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How does TesseractApps help with NDIS audits?",
          answer:
            "All compliance activities, documents, and incident reports are stored with digital audit trails. Alerts notify managers before certifications or training expire, ensuring you’re always audit-ready.",
        },
        {
          question: "Can the system handle multiple sites and service types?",
          answer:
            "Yes, TesseractApps supports multi-site providers with centralised oversight and location-specific dashboards.",
        },
        {
          question: "Does it reduce paperwork?",
          answer:
            "Absolutely. Digital signatures, online timesheets, and document storage eliminate paper-based processes.",
        },
        {
          question: "Is it secure enough for sensitive participant data?",
          answer:
            "Yes, data is encrypted with role-based access controls and complete traceability to meet NDIS requirements.",
        },
      ],
    },
  },

  "ICT Industry": {
    hero: {
      image: ictIndustry,
      title: "Smarter Workforce & Compliance Platform",
      page: "ICT",
      description:
        "TesseractApps helps ICT companies simplify workforce scheduling, project tracking, payroll, and compliance on one secure, scalable platform.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },

    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Timesheet",
          description: `Track time and manage invoices in one place, submitting, approving, and reviewing shifts quickly to reduce errors and clearly see staff activity. `,
        },
        {
          dot: dots.dot2,
          title: "Admin Console",
          description: `Control operations from one platform, setting up shifts, managing sites, enforcing compliance, and updating records securely. `,
        },
        {
          dot: dots.dot3,
          title: "Access Control Panel",
          description: `Give the right access to the right people, adding multiple users, scaling permissions, and monitoring activity easily. `,
        },
        {
          dot: dots.dot4,
          title: "HR Operations",
          description: `Handle your workforce from hiring to recognition, keeping profiles updated, tracking leave and qualifications, and monitoring training progress. `,
        },
        {
          dot: dots.dot5,
          title: "T-Sign",
          description: `Approve documents digitally with full security, setting multiple approval levels to keep audit trails accurate and compliant. `,
        },
        {
          dot: dots.dot6,
          title: "Documents",
          description: `Store and organise all documents securely, controlling access, tracking edits, and retrieving files quickly. `,
        },
        {
          dot: dots.dot1,
          title: "Role-Based Dashboard",
          description: `Monitor operations in one place, tracking shifts, staff activity, HR metrics, and performance updates instantly. `,
        },
        {
          dot: dots.dot2,
          title: "Cha-T",
          description: `Communicate securely with your team, sending messages, sharing files, and receiving live project updates. `,
        },
        {
          dot: dots.dot3,
          title: "My Profile",
          description: `Manage personal and work information in one portal, tracking leave, viewing schedules, and updating preferences. `,
        },
        {
          dot: dots.dot4,
          title: "Accounting",
          description: `Automate payroll and link invoices to live bank feeds, generating financial reports and maintaining compliance with minimal effort. `,
        },
        {
          dot: dots.dot5,
          title: "T Learning Hub",
          description: `Deliver role-based training to every team member, accessing step-by-step tutorials, mobile-friendly courses, and personalised learning content anytime. `,
        },
      ],
    },

    section3: [
      {
        title: "Operational Efficiency",
        description:
          "Manage all ICT workflows from a single platform, connecting timesheets, rosters, HR, and finance for seamless operations. Staff submit shifts and leave via mobile or desktop tools, while managers track activity, approve tasks, and monitor performance in real time. Automated workflows reduce manual steps, minimise errors, and ensure operational transparency. ",
        images: [one],
      },
      {
        title: "Compliance and Security",
        description:
          "Keep ICT operations fully compliant with industry regulations and standards, protecting sensitive staff, project, and financial data with role-based access controls and secure digital approvals. Track audits and document histories accurately, ensuring that every record is fully traceable and accessible only to authorised users, ensuring compliance and operational accountability. ",
        images: [two],
      },
      {
        title: "Streamlined ICT Operations",
        description:
          "TesseractApps helps ICT managers efficiently manage staff, shifts, projects, and system settings from a single secure platform. Automated alerts notify you of compliance requirements, training expirations, or scheduling conflicts, while audit logs and secure data storage protect sensitive information, reduce errors, and improve ICT operational efficiency. ",
        images: [three],
      },
    ],

    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How does TesseractApps support HR operations",
          answer:
            "HR Operations tracks employee profiles, leave, qualifications, and training. You manage hiring, onboarding, and performance in one portal. Staff progress is visible in real time.",
        },
        {
          question: "How are Documents approved and stored securely",
          answer:
            "T-Sign approves Documents digitally with multiple approval levels. The Documents stores files safely, tracks edits, and provides fast retrieval. Every record is traceable.",
        },
        {
          question: "What insights does the Role-Based Dashboard provide",
          answer:
            "The dashboard shows shifts, staff activity, HR metrics, and performance updates. You monitor operations from one place and make decisions based on real-time data.",
        },
        {
          question: "How does TesseractApps maintain compliance and security",
          answer:
            "Role-based access controls data. Digital approvals and audit tracking maintain compliance. Every record is secure, traceable, and accessible only to authorized users.",
        },
        {
          question: "Can I test TesseractApps before using it",
          answer:
            "You can book a demo to see how TesseractApps manages workforce, finance, HR, and compliance. You observe workflow efficiency, secure approvals, and staff management in action.",
        },
      ],
    },
  },
  "Retail & Hospitality": {
    hero: {
      image: retail,
      title: "Smarter Workforce Management for Retail & Hospitality",
      page: "Retail & Hospitality",
      description:
        "TesseractApps helps retailers, restaurants, and hospitality providers manage staff schedules, payroll, compliance, and communication on one secure platform. Improve team efficiency, reduce manual work, and deliver seamless customer service.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Retail & Hospitality ",
      points: [
        {
          dot: dots.dot1,
          title: "Roster Management",
          description: `Create flexible staff schedules that adapt to peak hours, seasonal demand, or last-minute changes, and approve shifts instantly to maintain full coverage. `,
        },
        {
          dot: dots.dot2,
          title: "Clock In & Clock Out",
          description: `Track staff attendance in real time with mobile or desktop access, monitoring late arrivals, overtime, and break compliance. `,
        },
        {
          dot: dots.dot3,
          title: "Payroll & Accounting",
          description: `Automate payroll by linking timesheets to payments, generating invoices, and integrating with accounting systems for seamless financial management. `,
        },
        {
          dot: dots.dot4,
          title: "User & Role Management",
          description: `Assign permissions for managers, supervisors, and staff to ensure security and clarity in responsibilities across the organisation. `,
        },
        {
          dot: dots.dot5,
          title: "Training Hub",
          description: `Provide role-based training for new hires and ongoing staff development, tracking progress and ensuring team readiness during high-demand seasons. `,
        },
        {
          dot: dots.dot6,
          title: "Communication Tools (ChaT)",
          description: `Send updates instantly to teams, share policies, and broadcast announcements to keep staff aligned and reduce miscommunication. `,
        },
      ],
    },
    section4: {
      title: "Why Retail & Hospitality Providers Choose TesseractApps ",
      data: [
        {
          title: "Operational Challenges in Retail & Hospitality",
          description:
            "Managers often face last-minute shift changes, high staff turnover, and compliance challenges with workplace laws. Payroll errors, miscommunication, and scheduling conflicts directly impact service quality and staff morale. ",
          images: [accountingImage],
        },
        {
          title: "How TesseractApps Helps",
          description:
            "With TesseractApps, retail and hospitality organisations can automate rostering, payroll, and compliance tracking efficiently. Our centralised platform ensures real-time staff visibility, reduces administrative work, and provides managers with the tools they need to deliver efficient, customer-focused service. ",
          images: [accountingImage],
        },
      ],
    },
    faqSection: {
      title: "Q&A: Retail & Hospitality",
      faqData: [
        {
          question:
            "Can TesseractApps handle casual, part-time, and full-time staff scheduling?",
          answer:
            "Yes. Rostering is flexible and can accommodate multiple employment types, availability, and shift patterns.",
        },
        {
          question: "How does it improve payroll accuracy?",
          answer:
            "Timesheets automatically feed into payroll, ensuring staff are paid correctly for approved hours and reducing errors.",
        },
        {
          question:
            "Can managers communicate with staff directly through the system?",
          answer:
            "Absolutely. Our ChaT tool allows secure messaging, group updates, and file sharing for instant communication.",
        },
        {
          question: "Is the system mobile-friendly for staff on the go?",
          answer:
            "Yes. Staff can clock in, check shifts, and receive updates from their mobile devices.",
        },
        {
          question: "How does it support compliance?",
          answer:
            "Automated tracking ensures wage, hour, and workplace compliance while maintaining audit-ready records.",
        },
      ],
    },
  },
  "Multi-Site Businesses": {
    hero: {
      image: multiSite,
      title: "Unified Management Across All Your Locations",
      page: "Multi-Site Businesses",
      description:
        "TesseractApps empowers multi-site businesses to manage staff, compliance, payroll, and communication across locations from one secure, centralised platform. Gain full visibility and control, while reducing manual work.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Multi-Site Businesses ",
      points: [
        {
          dot: dots.dot1,
          title: "Centralised Dashboard",
          description: `Oversee all sites from one place, tracking performance, staffing levels, and compliance metrics across every location. `,
        },
        {
          dot: dots.dot2,
          title: "Roster Management",
          description: `Build location-specific rosters while maintaining oversight at the organisational level, avoiding scheduling conflicts and ensuring adequate coverage at all sites. `,
        },
        {
          dot: dots.dot3,
          title: "Clock In & Clock Out",
          description: `Enable staff to log hours at different branches accurately, monitor attendance, and ensure compliance with wage and hour requirements. `,
        },
        {
          dot: dots.dot4,
          title: "Payroll & Accounting",
          description: `Consolidate payroll across multiple locations, reconcile costs, allocate expenses per site, and generate accurate invoices and reports. `,
        },
        {
          dot: dots.dot5,
          title: "Access Control Panel",
          description: `Define permissions by location, department, or role to ensure managers control their site while maintaining corporate-level oversight. `,
        },
        {
          dot: dots.dot6,
          title: "Compliance Tracking",
          description: `Stay audit-ready across all branches, monitoring certifications, workplace safety, and HR compliance for each site. `,
        },
        {
          dot: dots.dot1,
          title: "Communication Tools (ChaT)",
          description: `Broadcast updates organisation-wide or communicate instantly with a single site to improve collaboration across dispersed teams. `,
        },
        {
          dot: dots.dot2,
          title: "Reporting & Analytics",
          description: `Generate reports by site, region, or across the entire organisation, comparing KPIs, monitoring performance, and identifying areas for improvement. `,
        },
      ],
    },
    section4: {
      title: "Why Multi-Site Businesses Choose TesseractApps",
      data: [
        {
          title: "Challenges of Running Multi-Site Businesses",
          description:
            "Managing multiple sites often involves dealing with inconsistent processes, siloed communication, payroll complexities, and compliance risks. Lack of visibility makes it difficult to make data-driven decisions or ensure efficiency across every branch. ",
          images: [accountingImage],
        },
        {
          title: "How TesseractApps Helps",
          description:
            "TesseractApps provides a centralised solution to standardise operations across all sites efficiently. With unified dashboards, automated payroll, role-based access, and secure communication, multi-site businesses gain complete control without compromising local flexibility. This ensures consistency, reduces administrative overhead, and improves both staff and customer experiences. ",
          images: [accountingImage],
        },
      ],
    },
    faqSection: {
      title: "Q&A: Multi-Site Businesses",
      faqData: [
        {
          question: "Can I manage multiple sites from one dashboard?",
          answer:
            "Yes. TesseractApps gives you a centralised view where you can monitor staffing, compliance, and performance across all sites.",
        },
        {
          question: "Can local managers still control their teams?",
          answer:
            "Absolutely. Permissions can be set so site managers handle local operations while head office maintains oversight.",
        },
        {
          question: "How does payroll work for staff working across sites?",
          answer:
            "Timesheets and rosters integrate directly with payroll. Staff hours are tracked by location, ensuring accurate pay and reporting.",
        },
        {
          question: "Can reports be separated by site?",
          answer:
            "Yes. You can generate site-specific reports or consolidated organisation-wide insights.",
        },
        {
          question: "Is communication easy across sites?",
          answer:
            "TesseractApps includes secure messaging tools so you can send updates to all sites or target specific locations as needed.",
        },
      ],
    },
  },
  Construction: {
    hero: {
      image: construction,
      title: "Smarter Workforce & Compliance Management for Construction",
      page: "Construction",
      description:
        "TesseractApps helps construction companies seamlessly manage crews, projects, compliance, and payroll across sites. Keep your workforce safe, schedules on track, and reporting effortless, all from one platform.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Construction",
      points: [
        {
          dot: dots.dot1,
          title: "Roster & Crew Management",
          description: `Assign workers to shifts and sites with ease, managing rosters for multiple projects, tracking attendance, and adjusting schedules in real-time.`,
        },
        {
          dot: dots.dot2,
          title: "Clock In & Clock Out",
          description: `Enable workers to log hours from the site via mobile, tracking attendance, overtime, and shift changes accurately for payroll and compliance.`,
        },
        {
          dot: dots.dot3,
          title: "Payroll & Accounting",
          description: `Automate payroll for permanent, part-time, and contract workers, reconcile site-specific costs, generate invoices, and integrate directly with accounting systems.`,
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracking",
          description: `Monitor licences, certifications, and safety training, receiving alerts before expiry dates to ensure workers remain site-compliant and audit-ready.`,
        },
        {
          dot: dots.dot5,
          title: "Incident Management",
          description: `Log and report safety incidents directly from the site, maintaining compliance with workplace health and safety regulations.`,
        },
        {
          dot: dots.dot6,
          title: "Forms & Custom Forms",
          description: `Create digital safety checklists, induction forms, or project-specific documentation, collecting data directly on mobile to eliminate paper processes.`,
        },
        {
          dot: dots.dot1,
          title: "Access Control Panel",
          description: `Define site-specific permissions, ensuring site managers control their teams while central administration maintains full oversight.`,
        },
        {
          dot: dots.dot2,
          title: "Documents & T-Sign (Digital Signatures)",
          description: `Store project documents, permits, and contracts securely, capturing digital approvals and signatures to speed up workflows.`,
        },
        {
          dot: dots.dot3,
          title: "Reporting & Analytics",
          description: `Gain visibility into labour costs, project progress, and compliance status across multiple sites.`,
        },
      ],
    },
    section4: {
      title: "Why Construction Businesses Choose TesseractApps",
      data: [
        {
          title: "Challenges in Construction",
          description:
            "Managing a dispersed workforce across multiple job sites makes payroll, compliance, and reporting more complex. Safety regulations, incident tracking, and training certifications add layers of administration that can slow projects down.",
          images: [accountingImage],
        },
        {
          title: "How TesseractApps Helps",
          description:
            "TesseractApps simplifies operations by centralising workforce management, compliance tracking, payroll, and communication tools. With mobile-first tools, workers and managers can access everything they need on-site, while administrators maintain full oversight across every project. This reduces administrative overhead, improves safety compliance, and keeps projects moving efficiently.",
          images: [accountingImage],
        },
      ],
    },
    faqSection: {
      title: "Q&A: Construction",
      faqData: [
        {
          question: "Can TesseractApps manage staff across multiple job sites?",
          answer:
            "Yes. You can assign workers to different projects, track attendance, and manage rosters per site from one dashboard.",
        },
        {
          question: "How does it help with compliance?",
          answer:
            "Licences, safety training, and certifications are tracked automatically. Alerts notify you before expiry dates, ensuring workers remain compliant.",
        },
        {
          question: "Can workers clock in from site?",
          answer:
            "Yes. The mobile app allows workers to clock in and out on-site, with GPS and time tracking for accuracy.",
        },
        {
          question: "How does it handle safety and incidents?",
          answer:
            "Safety checklists and incident reporting are built in. Incidents can be logged immediately, with full audit trails for compliance.",
        },
        {
          question: "Is payroll streamlined for different types of workers?",
          answer:
            "Absolutely. Whether permanent, casual, or contractors, payroll is automated and integrated with accounting systems, saving time and reducing errors.",
        },
      ],
    },
  },
  Manufacturing: {
    hero: {
      image: manufacturing,
      title: "Streamlined Workforce & Compliance Management for Manufacturing",
      page: "Manufacturing",
      description:
        "TesseractApps helps manufacturing businesses optimise workforce scheduling, maintain compliance, track production teams, and simplify payroll from one platform. Stay audit-ready, reduce downtime, and keep your operations efficient.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Manufacturing",
      points: [
        {
          dot: dots.dot1,
          title: "Roster & Shift Management",
          description: `Plan and manage rotating shifts, overtime, and multiple production lines, ensuring every shift is covered while reducing scheduling conflicts.`,
        },
        {
          dot: dots.dot2,
          title: "Clock In & Clock Out",
          description: `Enable staff to log hours via mobile or kiosk devices, tracking attendance, overtime, and shift swaps accurately to support payroll and compliance.`,
        },
        {
          dot: dots.dot3,
          title: "Payroll & Accounting",
          description: `Automate payroll for full-time, casual, and contract staff, integrating with accounting systems for seamless invoicing, cost reconciliation, and expense management.`,
        },
        {
          dot: dots.dot4,
          title: "Compliance & Training Tracker",
          description: `Track workplace health & safety certifications, equipment training, and compliance requirements, receiving automated alerts before renewals or expiry.`,
        },
        {
          dot: dots.dot5,
          title: "Incident Management",
          description: `Log workplace accidents, near-misses, and safety breaches in real time, maintaining complete audit trails to support compliance with WHS standards.`,
        },
        {
          dot: dots.dot6,
          title: "Forms & Custom Forms",
          description: `Create digital inspection checklists, quality assurance forms, or incident reports, collecting data electronically to eliminate paper records.`,
        },
        {
          dot: dots.dot1,
          title: "Documents & T-Sign (Digital Signatures)",
          description: `Securely store SOPs, safety manuals, and employee contracts, capturing approvals digitally with T-Sign to speed up compliance workflows.`,
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description: `Get real-time visibility into staff performance, production activity, and compliance status across your facility using the role-based dashboard.`,
        },
        {
          dot: dots.dot3,
          title: "Communication Tools (ChaT)",
          description: `Improve collaboration between supervisors, operators, and management, sharing updates instantly to ensure teams stay connected.`,
        },
      ],
    },
    section3: [
      {
        title: "Operational Efficiency",
        description:
          "TesseractApps centralises workforce management, rostering, and shift tracking on one platform. Real-time dashboards provide visibility into staff activity, attendance, and production schedules, helping your manufacturing operations run smoothly and efficiently.",
        images: [one],
      },
      {
        title: "Compliance and Resource Management",
        description:
          "TesseractApps ensures staff training, certifications, and safety documentation remain up to date. Automated alerts, digital approvals, and secure document storage reduce administrative tasks while maintaining regulatory compliance. Resources and workflows are optimised for enhanced productivity and safety.",
        images: [two],
      },
    ],

    faqSection: {
      title: "Q&A: Manufacturing",
      faqData: [
        {
          question: "Can TesseractApps handle rotating and complex shifts?",
          answer:
            "Yes. The roster system is built for manufacturing environments, allowing you to manage rotating shifts, split shifts, and overtime seamlessly.",
        },
        {
          question: "How does it help with WHS compliance?",
          answer:
            "TesseractApps tracks training, licences, and certifications automatically. Incident reports and audit logs ensure your business remains compliant with safety regulations.",
        },
        {
          question:
            "Can I track worker performance and attendance in real time?",
          answer:
            "Absolutely. Dashboards give supervisors instant insights into attendance, overtime, and compliance, making it easier to manage teams efficiently.",
        },
        {
          question: "How does it reduce paperwork?",
          answer:
            "With digital forms, T-Sign for approvals, and a secure Documents, paperwork is replaced with streamlined digital workflows.",
        },
        {
          question: "Does it support multiple sites or production lines?",
          answer:
            "Yes. You can manage multiple facilities, production units, or lines from one central dashboard, with permissions tailored to each site or team.",
        },
      ],
    },
  },
};

export const byCareData = {
  "Disability Support (NDIS)": {
    hero: {
      image: participantsImage,
      title: "Simplifying Workforce & Compliance for NDIS Providers",
      page: "Disability Support (NDIS)",
      description:
        "TesseractApps is designed for NDIS disability support organisations, simplifying operations and ensuring compliance. From participant management and rostering to compliance tracking and payroll, our platform helps you deliver quality care while remaining fully NDIS-compliant.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.  ",
      },
    },
    details: {
      title: "Key Features for NDIS Providers",
      points: [
        {
          dot: dots.dot1,
          title: "Participant Management",
          description:
            "Manage participant profiles, care plans, funding, and service agreements in one secure system, linking support directly to staff schedules for seamless delivery.",
        },
        {
          dot: dots.dot2,
          title: "Roster & Workforce Scheduling",
          description:
            "Assign shifts based on participant needs, staff availability, and compliance requirements, reducing rostering conflicts and ensuring coverage across multiple locations.",
        },
        {
          dot: dots.dot3,
          title: "Timesheets & Payroll",
          description:
            "Automate timesheet approvals and payroll processing, integrating with accounting systems to manage invoicing, reimbursements, and NDIS claims accurately.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracker",
          description:
            "Track staff certifications, NDIS standards, and audit requirements, with automated alerts keeping your workforce compliant and audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Incident Management",
          description:
            "Report, track, and resolve incidents in real-time, maintaining full compliance with NDIS Quality and Safeguards requirements.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture participant approvals and staff signatures securely, reducing paperwork and maintaining digital audit trails for NDIS compliance.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store service agreements, compliance documents, and care notes securely, ensuring instant access to approved staff with role-based permissions.",
        },
        {
          dot: dots.dot2,
          title: "HR & Training Hub",
          description:
            "Onboard new staff quickly with digital induction packs, tracking ongoing training, CPD hours, and NDIS-mandated learning requirements.",
        },
        {
          dot: dots.dot3,
          title: "Role-Based Dashboard",
          description:
            "Get real-time insights into participant support, staff performance, compliance risks, and funding utilisation using the role-based dashboard.",
        },
        {
          dot: dots.dot4,
          title: "ChaT (Secure Communication)",
          description:
            "Enable teams to communicate securely while protecting sensitive participant information, sharing care updates instantly between staff.",
        },
      ],
    },
    section3: [
      {
        title: "Efficient Participant and Staff Management",
        description:
          "TesseractApps centralises participant records, staff rostering, and support session tracking on one platform. Real-time dashboards provide visibility into service delivery, attendance, and care schedules, helping your organisation coordinate NDIS support efficiently.",
        images: [one],
      },
      {
        title: "Compliance and Care Quality",
        description:
          "TesseractApps ensures staff qualifications, mandatory training, and documentation are kept up to date. Automated alerts, digital approvals, and secure document storage maintain compliance, reducing administrative work. Staff can focus on delivering high-quality care while you maintain full oversight and accountability.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A: NDIS Disability Support",
      faqData: [
        {
          question: "How does TesseractApps support NDIS compliance?",
          answer:
            "The system tracks staff certifications, service agreements, and incident reports automatically. Audit logs and alerts ensure you are always NDIS audit-ready.",
        },
        {
          question: "Can it handle complex rosters for multiple participants?",
          answer:
            "Yes. Rostering tools match staff skills and availability with participant needs, ensuring smooth scheduling and reducing last-minute conflicts.",
        },
        {
          question: "How does it improve participant care?",
          answer:
            "By linking care plans, rosters, and reporting, staff have all participant information at their fingertips, reducing errors and improving service delivery.",
        },
        {
          question: "Does it integrate with NDIS financial processes?",
          answer:
            "Yes. TesseractApps connects timesheets, payroll, and invoicing with accounting systems, ensuring accurate NDIS claims and financial compliance.",
        },
        {
          question: "Is participant data secure?",
          answer:
            "Absolutely. Data is encrypted, role-based access controls are applied, and audit logs provide complete traceability to meet NDIS data security requirements.",
        },
      ],
    },
  },
  "Support Coordination": {
    hero: {
      image: support,
      title: "Support Coordination Solutions",
      page: "Support Coordination",
      description:
        "Manage participant goals, track progress, connect with providers, and ensure compliance.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.  ",
      },
    },
    details: {
      title: "Key Features for Support Coordinators",
      points: [
        {
          dot: dots.dot1,
          title: "Participant Profiles & Care Plans",
          description:
            "Keep all participant information, NDIS goals, and service agreements in one place, easily updating plans and linking services to participant outcomes.",
        },
        {
          dot: dots.dot2,
          title: "Provider & Service Management",
          description:
            "Track service providers, compare costs, and coordinate multiple supports to ensure participants receive the right mix of services within their budgets.",
        },
        {
          dot: dots.dot3,
          title: "Budget & Funding Oversight",
          description:
            "Monitor participant NDIS budgets in real-time, generating financial reports, preventing overspending, and ensuring funds are used effectively.",
        },
        {
          dot: dots.dot4,
          title: "Compliance & Documentation",
          description:
            "Maintain records of meetings, agreements, and progress notes, staying aligned with NDIS Quality and Safeguards requirements through audit-ready logs.",
        },
        {
          dot: dots.dot5,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate securely with participants, families, and service providers, sharing updates and documents instantly while protecting sensitive information.",
        },
        {
          dot: dots.dot6,
          title: "Progress & Outcomes Tracking",
          description:
            "Measure participant progress against their goals, generating reports that demonstrate outcomes and support ongoing NDIS plan reviews.",
        },
        {
          dot: dots.dot1,
          title: "Incident & Risk Management",
          description:
            "Log and track incidents, manage risks, and ensure participant safety and compliance with NDIS requirements.",
        },
        {
          dot: dots.dot2,
          title: "Digital Signatures (T-Sign)",
          description:
            "Capture participant and provider approvals digitally, reducing paperwork and creating secure audit trails for all agreements.",
        },
      ],
    },
    section3: [
      {
        title: "Efficient Participant and Service Management",
        description:
          "TesseractApps centralises participant records, support plans, and staff scheduling on one platform. Real-time dashboards provide visibility into sessions, service delivery, and team assignments, helping coordinators efficiently manage care.",
        images: [one],
      },
      {
        title: "Compliance and Oversight",
        description:
          "TesseractApps automatically tracks staff qualifications, mandatory training, and documentation. Automated alerts, digital approvals, and secure document storage maintain compliance and reduce administrative work. Coordinators can focus on participant outcomes while maintaining operational oversight.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A: Support Coordination",
      faqData: [
        {
          question:
            "How does TesseractApps help me manage multiple participants?",
          answer:
            "The platform provides a central dashboard where you can track participant profiles, goals, budgets, and provider details all in one view.",
        },
        {
          question: "Can I track NDIS budgets easily?",
          answer:
            "Yes. Real-time budget tracking and reporting tools ensure participants’ funds are used effectively and within guidelines.",
        },
        {
          question: "Does it simplify compliance requirements?",
          answer:
            "Absolutely. All notes, agreements, and communications are logged securely, creating an audit-ready system aligned with NDIS standards.",
        },
        {
          question: "How does it improve participant outcomes?",
          answer:
            "Coordinators can track progress against goals, share updates with families, and generate outcome reports for NDIS plan reviews quickly and accurately.",
        },
        {
          question: "Is communication secure?",
          answer:
            "Yes. ChaT provides encrypted messaging and secure file sharing, ensuring sensitive participant data remains protected.",
        },
      ],
    },
  },
  "Aged Care Services": {
    hero: {
      image: aged,
      title: "Efficient Workforce and Care Management for Aged Care Providers",
      page: "Aged Care Services",
      description:
        "TesseractApps helps aged care organisations manage staff, schedules, participant care, compliance, and payroll from one secure platform. Deliver consistent, high-quality care while reducing administrative work.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Aged Care Providers",
      points: [
        {
          dot: dots.dot1,
          title: "Participant Management",
          description:
            "Maintain detailed resident profiles, care plans, and service agreements, linking staff schedules to individual care needs for personalised support.",
        },
        {
          dot: dots.dot2,
          title: "Roster & Shift Management",
          description:
            "Assign caregivers to shifts, track attendance, and adjust schedules quickly to meet changing care requirements, ensuring coverage and reducing conflicts.",
        },
        {
          dot: dots.dot3,
          title: "Timesheets & Payroll",
          description:
            "Streamline timesheet approvals, payroll processing, and expense tracking, linking hours worked directly to invoicing and accounting systems.",
        },
        {
          dot: dots.dot4,
          title: "Compliance & Training Tracker",
          description:
            "Monitor staff qualifications, certifications, and mandatory training, receiving automated alerts for renewals and maintaining audit-ready records.",
        },
        {
          dot: dots.dot5,
          title: "Incident Management",
          description:
            "Log incidents, accidents, or care issues in real-time, tracking follow-ups and maintaining compliance with aged care regulations.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture approvals for care plans, consents, and agreements digitally, reducing paperwork while maintaining secure audit trails.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store policies, care notes, and agreements securely, assigning access based on roles and ensuring easy retrieval.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Gain insights into staff performance, participant care, compliance, and operational efficiency in real time.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Facilitate collaboration between care teams, management, and families, protecting sensitive information.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Provide role-specific training and learning content for staff, tracking progress and ensuring compliance with industry standards.",
        },
      ],
    },
    section3: [
      {
        title: "Efficient Care and Staff Management",
        description:
          "TesseractApps centralises resident records, staff rostering, and care session tracking on one platform. Real-time dashboards provide visibility into schedules, attendance, and service delivery, helping your organisation efficiently coordinate aged care.",
        images: [one],
      },
      {
        title: "Compliance and Quality Assurance",
        description:
          "TesseractApps automatically tracks staff certifications, mandatory training, and documentation. Automated alerts, digital approvals, and secure document storage maintain compliance and reduce administrative work. Staff can focus on providing quality care while you maintain full oversight and accountability.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question:
            "Can I manage staff schedules efficiently across multiple sites or units?",
          answer:
            "Yes. Rostering tools allow you to assign shifts, track attendance, and manage coverage for multiple facilities from one platform.",
        },
        {
          question: "How does TesseractApps support compliance?",
          answer:
            "Staff certifications, mandatory training, and audit logs are tracked automatically. Automated alerts notify managers of upcoming renewals.",
        },
        {
          question: "Can I monitor participant care in real time?",
          answer:
            "Yes. Dashboards provide visibility into care plans, session tracking, and service delivery for every resident.",
        },
        {
          question: "Does it simplify payroll and invoicing?",
          answer:
            "Absolutely. Timesheets link directly to payroll, and invoicing integrates with accounting systems to reduce errors and save time.",
        },
        {
          question: "Is communication secure between staff and management?",
          answer:
            "Yes. ChaT ensures all messages and shared files are encrypted and role-based access controls protect sensitive information.",
        },
      ],
    },
  },
  "Childcare Services": {
    hero: {
      image: child,
      title: "Simplified Operations and Compliance for Childcare Centres",
      page: "Childcare Services",
      description:
        "TesseractApps helps childcare centres manage staff, schedules, enrolments, compliance, and billing from one secure platform. Focus on delivering quality care while reducing administrative workload.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Childcare Centres",
      points: [
        {
          dot: dots.dot1,
          title: "Child & Participant Management",
          description:
            "Maintain profiles for every child, tracking attendance, developmental progress, and special needs, and link care plans to staff schedules for consistent support.",
        },
        {
          dot: dots.dot2,
          title: "Roster & Shift Management",
          description:
            "Schedule staff across multiple rooms and age groups, monitoring attendance and adjusting shifts to maintain safe staff-to-child ratios.",
        },
        {
          dot: dots.dot3,
          title: "Timesheets & Payroll",
          description:
            "Automate staff timesheets and payroll processing, tracking hours, overtime, and leave while integrating with accounting systems.",
        },
        {
          dot: dots.dot4,
          title: "Compliance & Training Tracker",
          description:
            "Monitor staff certifications, mandatory training, and safety compliance, with automated alerts keeping your team audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Incident Management",
          description:
            "Record incidents, health concerns, or accidents immediately, tracking follow-ups to maintain safety standards and regulatory compliance.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture enrolment forms, permissions, and approvals digitally, reducing paperwork and maintaining secure audit trails.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store policies, care plans, and parent communications securely, controlling access based on staff roles.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Track staff performance, room occupancy, compliance, and operational metrics in real-time.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate securely with staff, families, and management, sharing updates, files, and announcements instantly.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Deliver role-specific training to educators and staff, tracking progress and ensuring compliance with childcare regulations.",
        },
      ],
    },
    section3: [
      {
        title: "Efficient Child and Staff Management",
        description:
          "TesseractApps centralises enrolment records, staff rostering, and activity scheduling on one platform. Real-time dashboards provide visibility into attendance, class schedules, and staff allocation, helping your childcare centre operate smoothly and efficiently.",
        images: [one],
      },
      {
        title: "Compliance and Safety Oversight",
        description:
          "TesseractApps automatically tracks staff qualifications, mandatory training, and regulatory documentation. Automated alerts, digital approvals, and secure document storage maintain compliance, reducing administrative work. Staff can focus on childcare and engagement, while you maintain safety and operational oversight.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage staff schedules and ratios efficiently?",
          answer:
            "Yes. Rostering tools ensure proper staff-to-child ratios and allow easy adjustments for absences or changing enrolments.",
        },
        {
          question: "How does it help with compliance?",
          answer:
            "Staff training, certifications, and incident logs are tracked automatically. Automated alerts ensure your centre is always audit-ready.",
        },
        {
          question: "Can I monitor children's progress and care plans?",
          answer:
            "Yes. Child profiles track attendance, development milestones, and special needs, linked directly to staff schedules.",
        },
        {
          question: "Does it simplify payroll and billing?",
          answer:
            "Absolutely. Timesheets link to payroll and invoicing integrates with accounting systems for accurate and efficient processing.",
        },
        {
          question: "Is communication secure with staff and families?",
          answer:
            "Yes. ChaT provides encrypted messaging and role-based access to protect sensitive information while keeping everyone informed.",
        },
      ],
    },
  },
  "Allied Health Services": {
    hero: {
      image: allied,
      title: "Streamline Operations for Allied Health Providers",
      page: "Allied Health Services",
      description:
        "TesseractApps helps allied health organisations manage clients, appointments, staff, compliance, and billing on one secure platform. Improve service delivery while reducing administrative work.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Allied Health Providers",
      points: [
        {
          dot: dots.dot1,
          title: "Client & Patient Management",
          description:
            "Maintain detailed client records, therapy plans, and session notes, linking appointments and care plans to assigned practitioners for consistent care.",
        },
        {
          dot: dots.dot2,
          title: "Appointment Scheduling & Roster Management",
          description:
            "Schedule staff across multiple locations or services, tracking session attendance and ensuring staff availability aligns with client needs.",
        },
        {
          dot: dots.dot3,
          title: "Timesheets & Payroll",
          description:
            "Automate timesheet approvals, payroll processing, and billing, linking client sessions to invoicing and funding streams.",
        },
        {
          dot: dots.dot4,
          title: "Compliance & Training Tracker",
          description:
            "Monitor staff registrations, certifications, and mandatory training, receiving automated alerts for renewals to remain audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Incident & Risk Management",
          description:
            "Log incidents, follow up on issues, and maintain records in compliance with regulatory requirements.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Securely capture client and staff approvals digitally, reducing paperwork and maintaining audit trails for compliance.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store care plans, therapy notes, and client agreements securely, controlling access based on roles and ensuring easy retrieval.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Track staff performance, client progress, session attendance, and operational metrics in real-time.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate securely with staff, clients, and other providers, sharing updates, documents, and therapy instructions instantly.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Provide role-specific training to practitioners and support staff, tracking completion and compliance with professional development requirements.",
        },
      ],
    },
    section3: [
      {
        title: "Streamlined Patient and Staff Management",
        description:
          "TesseractApps centralises client records, appointment scheduling, and staff rostering on one platform. Real-time dashboards provide visibility into sessions, attendance, and service delivery, helping your organisation manage care efficiently.",
        images: [one],
      },
      {
        title: "Compliance and Professional Development",
        description:
          "TesseractApps automatically tracks staff certifications, mandatory training, and documentation. Automated alerts, digital approvals, and secure document storage ensure compliance and reduce administrative work. Staff can focus on client care and professional growth, while you maintain full oversight.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage multiple clients and appointments easily?",
          answer:
            "Yes. All client records, therapy plans, and session schedules are managed in one dashboard.",
        },
        {
          question: "How does TesseractApps support compliance?",
          answer:
            "Staff registrations, certifications, and mandatory training are tracked automatically. Audit-ready logs ensure regulatory compliance.",
        },
        {
          question: "Can I integrate session data with payroll and billing?",
          answer:
            "Absolutely. Timesheets link directly to payroll and invoicing, ensuring accurate payments and funding claims.",
        },
        {
          question: "Is client communication secure?",
          answer:
            "Yes. ChaT provides encrypted messaging and role-based access to protect sensitive client information.",
        },
        {
          question: "Can I monitor practitioner performance?",
          answer:
            "Yes. Dashboards and reports provide real-time insights into staff productivity, client sessions, and service delivery outcomes.",
        },
      ],
    },
  },
  "Home & Community Care Services": {
    hero: {
      image: home,
      title: "Streamlined Operations for Home & Community Care Providers",
      page: "Home & Community Care Services",
      description:
        "TesseractApps helps HACC organisations manage clients, staff, schedules, compliance, and billing from one secure platform. Focus on delivering high-quality care while reducing administrative burdens.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Home & Community Care Providers",
      points: [
        {
          dot: dots.dot1,
          title: "Client Management",
          description:
            "Maintain detailed client profiles, care plans, and service agreements, tracking visit history, support needs, and goals for personalised care.",
        },
        {
          dot: dots.dot2,
          title: "Roster & Workforce Scheduling",
          description:
            "Assign staff to visits efficiently, monitoring attendance and adjusting schedules to meet changing client needs, ensuring adequate coverage and reducing conflicts.",
        },
        {
          dot: dots.dot3,
          title: "Timesheets & Payroll",
          description:
            "Automate timesheet approvals and payroll processing, linking hours worked directly to invoicing and funding for accurate financial management.",
        },
        {
          dot: dots.dot4,
          title: "Compliance & Training Tracker",
          description:
            "Monitor staff certifications, mandatory training, and safety compliance, receiving automated alerts for renewals to remain audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Incident & Risk Management",
          description:
            "Record incidents or health concerns in real-time, tracking follow-ups to maintain compliance with regulatory standards and ensure client safety.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture client approvals, consents, and staff acknowledgements digitally, maintaining secure audit trails and reducing paperwork.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store policies, care notes, and agreements securely, assigning role-based access and ensuring quick retrieval of documents when needed.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Get real-time insights into staff performance, client care, compliance, and operational efficiency across all services.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Facilitate secure communication between staff, management, and clients, sharing updates, files, and care instructions instantly.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Provide role-specific training to staff, tracking progress and ensuring compliance with industry standards and funding requirements.",
        },
      ],
    },
    section3: [
      {
        title: "Efficient Care Coordination",
        description:
          "TesseractApps centralises participant management, staff rostering, and visit tracking on one platform. Real-time dashboards provide visibility into care schedules, attendance, and service delivery, helping your organisation efficiently coordinate care.",
        images: [one],
      },
      {
        title: "Compliance and Staff Support",
        description:
          "TesseractApps ensures staff certifications, training, and documentation are kept up to date. Automated alerts, digital approvals, and secure document storage maintain compliance and reduce administrative work. Staff can focus on delivering quality care while you maintain full oversight and accountability.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage visits and staff schedules efficiently?",
          answer:
            "Yes. Rostering tools allow you to assign visits, track attendance, and manage coverage across multiple clients and locations.",
        },
        {
          question: "How does TesseractApps help with compliance?",
          answer:
            "Staff training, certifications, incident reports, and audit logs are tracked automatically. Alerts ensure you remain audit-ready at all times.",
        },
        {
          question: "Can I monitor client care and outcomes in real time?",
          answer:
            "Yes. Dashboards provide visibility into care plans, visits, and service delivery for every client.",
        },
        {
          question: "Does it simplify payroll and invoicing?",
          answer:
            "Absolutely. Timesheets link directly to payroll and funding, ensuring accurate payments and compliance with funding requirements.",
        },
        {
          question: "Is communication secure for staff and clients?",
          answer:
            "Yes. ChaT provides encrypted messaging with role-based access to protect sensitive client information while keeping teams aligned.",
        },
      ],
    },
  },
};

export const byBusinessType = {
  "Small Businesses": {
    hero: {
      image: small,
      title: "Simplify Operations for Small Businesses",
      page: "Small Businesses",
      description:
        "TesseractApps helps small businesses manage staff, schedules, payroll, compliance, and communication from one secure platform. Reduce administrative workload, allowing you to focus on growing your business.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Small Businesses",
      points: [
        {
          dot: dots.dot1,
          title: "Roster & Staff Scheduling",
          description:
            "Plan and manage shifts efficiently, track attendance, approve leave, and ensure coverage without conflicts.",
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll",
          description:
            "Automate timesheet approvals and payroll processing, linking hours to invoicing and accounting systems for accurate payments.",
        },
        {
          dot: dots.dot3,
          title: "HR & Staff Management",
          description:
            "Maintain staff profiles, track certifications, and manage training requirements, assigning roles and permissions with ease.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracker",
          description:
            "Monitor workplace compliance, staff certifications, and audit requirements, receiving automated alerts to stay audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Clock In & Clock Out",
          description:
            "Allow staff to log hours via mobile or desktop, tracking attendance and overtime in real-time.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture approvals and agreements digitally, maintaining secure audit trails and reducing paperwork.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store policies, contracts, and business documents securely, assigning role-based access and ensuring quick retrieval of files.",
        },
        {
          dot: dots.dot2,
          title: "Secure Communication (ChaT)",
          description:
            "Send messages, share files, and communicate securely with your team in real-time.",
        },
        {
          dot: dots.dot3,
          title: "Role-Based Dashboard",
          description:
            "Monitor staff activity, payroll, compliance, and operational metrics from one dashboard.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Provide role-based training for your team, tracking progress and ensuring all staff meet regulatory and operational requirements.",
        },
      ],
    },
    section3: [
      {
        title: "Challenges for Small Businesses",
        description:
          "Small businesses often face limited resources, fragmented systems, and time-consuming administrative tasks that hinder growth. Managing staff, payroll, and compliance manually can slow growth and increase operational risks.",
        images: [one],
      },
      {
        title: "How TesseractApps Helps",
        description:
          "TesseractApps centralises workforce management, payroll, compliance, and communication into one platform. Automation and dashboards reduce administrative effort, improve oversight, and allow business owners to focus on growth and customer satisfaction.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage staff schedules easily?",
          answer:
            "Yes. TesseractApps allows you to assign shifts, approve leave, and track attendance efficiently from one dashboard.",
        },
        {
          question: "How does it help with payroll?",
          answer:
            "Timesheets link directly to payroll, simplifying processing and ensuring accurate payments for all staff.",
        },
        {
          question: "Can I track compliance and staff certifications?",
          answer:
            "Absolutely. Compliance tracking and automated alerts ensure your team remains up-to-date with required certifications.",
        },
        {
          question: "Is sensitive business information secure?",
          answer:
            "Yes. Role-based access controls, secure document storage, and audit trails protect all sensitive data.",
        },
        {
          question: "Can I communicate efficiently with my team?",
          answer:
            "Yes. ChaT provides secure messaging and file sharing, keeping your team connected and informed.",
        },
      ],
    },
  },
  Enterprises: {
    hero: {
      image: enterprise,
      title: "Enterprise Workforce Management Solutions",
      page: "Enterprises",
      description:
        "TesseractApps helps enterprise organisations manage large teams, multiple departments, compliance, and finance from one secure platform. Streamline operations, reduce administrative complexity, and maintain oversight across the organisation efficiently.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Enterprises",
      points: [
        {
          dot: dots.dot1,
          title: "Multi-Department Roster & Scheduling",
          description:
            "Coordinate shifts and schedules across departments and locations, ensuring coverage, reducing conflicts, and optimising workforce allocation.",
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll",
          description:
            "Automate payroll for large teams, linking hours and projects to accounting systems for accurate reporting and compliance.",
        },
        {
          dot: dots.dot3,
          title: "HR & Staff Management",
          description:
            "Maintain employee records, track certifications, and manage roles and permissions at scale efficiently. Streamline onboarding and ongoing HR processes, improving workflow efficiency.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracker",
          description:
            "Monitor certifications, mandatory training, and regulatory requirements across the organisation with ease. Receive automated alerts for renewals and audits, ensuring timely compliance.",
        },
        {
          dot: dots.dot5,
          title: "Clock In & Clock Out",
          description:
            "Track attendance for staff across multiple locations and departments via mobile or desktop, ensuring real-time accuracy. Monitor overtime and shift swaps in real-time, maintaining proper staffing levels.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture approvals, contracts, and internal documents digitally, reducing paperwork. Maintain secure audit trails for compliance and accountability, ensuring transparency.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Centralise company policies, contracts, reports, and documents for easy access. Assign role-based access for secure and fast retrieval across teams.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Gain real-time insights into workforce performance, operations, compliance, and financial metrics across the enterprise using the role-based dashboard.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate securely across teams, departments, and sites, sharing updates, documents, and announcements instantly.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Deliver role-based training across the enterprise, ensuring every employee receives the right training. Track employee progress and maintain compliance with regulatory and professional standards effectively.",
        },
      ],
    },
    section3: [
      {
        title: "Challenges for Enterprises",
        description:
          "Large organisations face complex workforce management, multi-department coordination, strict compliance requirements, and high administrative overhead that can hinder efficiency. Disconnected systems make oversight and operational consistency more challenging.",
        images: [one],
      },
      {
        title: "How TesseractApps Helps",
        description:
          "TesseractApps centralises HR, payroll, compliance, communication, and operations into one secure platform, streamlining processes. Automation, real-time dashboards, and secure document storage reduce manual work, provide comprehensive oversight, and enable leaders to focus on strategic growth and organisational efficiency.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage large teams across multiple departments?",
          answer:
            "Yes. Rostering tools, role-based permissions, and dashboards allow seamless management of staff across the organisation.",
        },
        {
          question: "How does it support compliance at enterprise scale?",
          answer:
            "Compliance tracking, automated alerts, and audit-ready logs ensure all employees meet regulatory and internal standards.",
        },
        {
          question:
            "Can I integrate payroll and accounting for multiple departments?",
          answer:
            "Absolutely. Timesheets and payroll integrate with accounting systems to streamline payments and reporting.",
        },
        {
          question: "Is sensitive enterprise data secure?",
          answer:
            "Yes. Role-based access, secure document storage, and audit logs protect all company and employee information.",
        },
        {
          question: "How does TesseractApps improve operational visibility?",
          answer:
            "Role-based dashboards provide real-time insights into staff performance, compliance, financial metrics, and operational workflows across the enterprise.",
        },
      ],
    },
  },
  Franchises: {
    hero: {
      image: Franchises,
      title: "Management for Franchise Networks",
      page: "Franchises",
      description:
        "TesseractApps helps franchise owners and managers oversee multiple locations, staff, schedules, compliance, and finances on a single platform. Ensure consistency, efficiency, and growth throughout your network.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Franchises",
      points: [
        {
          dot: dots.dot1,
          title: "Multi-Site Roster & Scheduling",
          description:
            "Manage staff schedules across multiple locations efficiently. Ensure proper coverage, reduce conflicts, and maintain operational efficiency at each site.",
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll",
          description:
            "Automate payroll processing for all franchise locations seamlessly. Link hours to accounting systems for accurate reporting and effective cost tracking.",
        },
        {
          dot: dots.dot3,
          title: "HR & Staff Management",
          description:
            "Maintain employee profiles across your entire network. Track training, certifications, and roles, and assign permissions to control access across all locations.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracker",
          description:
            "Monitor compliance requirements, certifications, and audits across every location. Receive automated alerts to ensure franchise-wide regulatory compliance.",
        },
        {
          dot: dots.dot5,
          title: "Clock In & Clock Out",
          description:
            "Allow staff to log hours via mobile or desktop at any site, ensuring accuracy. Track attendance, overtime, and shift swaps in real-time for efficient management.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Digitally capture approvals, contracts, and internal documents securely. Maintain secure, centralised audit trails for all locations.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store policies, SOPs, agreements, and franchise documents securely and centrally. Assign role-based access and ensure quick retrieval of files when needed.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Monitor operational metrics, staff performance, payroll, and compliance across all franchise locations from a unified view.",
        },
        {
          dot: dots.dot3,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate instantly across the franchise network, ensuring seamless communication. Share updates, files, and announcements securely with teams across each location.",
        },
      ],
    },
    section3: [
      {
        title: "Operations and Consistency",
        description:
          "TesseractApps allows you to manage staff, schedules, payroll, and compliance across multiple locations from one platform. Real-time dashboards provide visibility into operations, ensuring consistency and efficiency throughout your franchise network.",
        images: [one],
      },
      {
        title: "Automation and Risk Reduction",
        description:
          "TesseractApps reduces administrative work and standardises workflows, improving efficiency. Automated alerts, digital approvals, and secure document storage ensure compliance and protect sensitive information. Staff can focus on delivering quality service while you maintain complete oversight of the entire network.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I manage staff schedules across multiple locations?",
          answer:
            "Yes. TesseractApps allows you to assign shifts, track attendance, and monitor coverage across all franchise sites.",
        },
        {
          question: "How does it help with compliance?",
          answer:
            "Automated compliance tracking, alerts, and audit logs ensure all staff and locations meet required standards.",
        },
        {
          question: "Can I get insights into performance across the network?",
          answer:
            "Absolutely. Dashboards provide real-time visibility into operations, staff productivity, payroll, and compliance at every location.",
        },
        {
          question: "Does it simplify payroll for multiple sites?",
          answer:
            "Yes. Timesheets integrate with payroll and accounting systems, making it easy to manage payments for staff across all franchises.",
        },
        {
          question: "Is communication secure across the franchise network?",
          answer:
            "Yes. ChaT provides encrypted messaging and secure file sharing to keep teams connected while protecting sensitive information.",
        },
      ],
    },
  },
  Startups: {
    hero: {
      image: Startups,
      title: "Workforce Solutions for Startups",
      page: "Startups",
      description:
        "TesseractApps helps startups manage staff, schedules, payroll, compliance, and communication from one central platform. Reduce administrative overhead, allowing you to focus on growth and innovation.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Startups",
      points: [
        {
          dot: dots.dot1,
          title: "Roster & Staff Scheduling",
          description:
            "Create and adjust shifts quickly, tracking attendance and managing leave efficiently, even with small or rapidly growing teams.",
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll",
          description:
            "Automate payroll processing, linking hours worked directly to invoices and accounting systems for seamless financial management. Ensure timely and accurate payments for all staff members.",
        },
        {
          dot: dots.dot3,
          title: "HR & Staff Management",
          description:
            "Maintain team profiles, track training and certifications, and assign roles and permissions as your startup grows. Keep your startup compliant while it grows efficiently.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracker",
          description:
            " Monitor certifications, mandatory training, and audit requirements across your team. Receive automated alerts to ensure compliance without added effort.",
        },
        {
          dot: dots.dot5,
          title: "Clock In & Clock Out",
          description:
            "Allow employees to log hours via mobile or desktop, ensuring accurate tracking. Track time, overtime, and shift changes in real-time for efficient monitoring.",
        },
        {
          dot: dots.dot6,
          title: "T-Sign (Digital Signatures)",
          description:
            "Securely capture agreements, approvals, and contracts digitally, reducing paperwork. Reduce paperwork while maintaining audit-ready records for compliance.",
        },
        {
          dot: dots.dot1,
          title: "Documents",
          description:
            "Store company policies, contracts, and key documents securely for easy access. Assign role-based access and ensure quick retrieval of files when needed.",
        },
        {
          dot: dots.dot2,
          title: "Secure Communication (ChaT)",
          description:
            "Communicate securely with your team, sharing files and collaborating in real-time.",
        },
        {
          dot: dots.dot3,
          title: "Role-Based Dashboard",
          description:
            "Monitor staff activity, compliance, payroll, and operational metrics from a single central dashboard.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Provide role-specific training to staff, ensuring they have the necessary skills. Track progress and ensure team members meet industry standards or regulatory requirements.",
        },
      ],
    },
    section3: [
      {
        title: "Streamlined Operations",
        description:
          "TesseractApps centralises workforce management, payroll, rostering, and compliance from one platform. Automation reduces manual tasks, helping your startup operate efficiently, even with limited resources. Real-time dashboards provide visibility into staff performance, schedules, and operational workflows.",
        images: [one],
      },
      {
        title: "Scalability and Growth Support",
        description:
          "TesseractApps provides tools to manage growth seamlessly. Track budgets, monitor compliance, and onboard new staff members quickly. Workflow automation and integrated training ensure that your team remains productive and compliant as your startup grows.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can TesseractApps grow with my startup?",
          answer:
            "Yes. The platform scales with your team, allowing you to manage more staff, multiple roles, and expanded operations seamlessly.",
        },
        {
          question: "How does it simplify payroll and timesheets?",
          answer:
            "Timesheets integrate directly with payroll and accounting systems, reducing errors and saving time.",
        },
        {
          question: "Can I track compliance and certifications easily?",
          answer:
            "Absolutely. Automated alerts and compliance dashboards ensure staff meet training and regulatory requirements.",
        },
        {
          question: "Is sensitive company data secure?",
          answer:
            "Yes. Role-based access, secure storage, and audit logs protect all company and staff information.",
        },
        {
          question: "How does it improve team communication?",
          answer:
            "ChaT provides encrypted messaging and secure file sharing, keeping your team connected and informed in real time.",
        },
      ],
    },
  },
};

export const byBusinessProblem = {
  Compliance: {
    hero: {
      image: compliance,
      title: "Manage Compliance and Reduce Risk",
      page: "Compliance & Risk Management",
      description:
        "TesseractApps helps organisations maintain regulatory compliance, track certifications, and manage operational risks seamlessly. Protect your organisation while ensuring audit readiness.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Compliance & Risk",
      points: [
        {
          dot: dots.dot1,
          title: "Compliance Tracker",
          description:
            "Monitor staff certifications, mandatory training, and regulatory requirements effectively. Receive automated alerts for upcoming renewals or expirations, ensuring timely action.",
        },
        {
          dot: dots.dot2,
          title: "Incident & Risk Management",
          description:
            "Record incidents, assess risks, and track follow-ups for complete accountability. Maintain detailed histories for accountability, reporting, and audit purposes.",
        },
        {
          dot: dots.dot3,
          title: "Audit Logs & Reporting",
          description:
            "Generate audit-ready reports on compliance, training, and incidents for regulatory transparency. Ensure transparency for regulators and management by keeping accurate and up-to-date records.",
        },
        {
          dot: dots.dot4,
          title: "T-Sign (Digital Signatures)",
          description:
            "Capture approvals, consents, and agreements digitally, reducing paperwork and maintaining secure audit trails. Maintain secure and traceable audit trails for every approval, consent, and agreement.",
        },
        {
          dot: dots.dot5,
          title: "Documents",
          description:
            "Store policies, procedures, and compliance documents securely in one central location. Assign role-based access and track document revisions for secure, easy retrieval.",
        },
        {
          dot: dots.dot6,
          title: "Role-Based Dashboard",
          description:
            "Monitor compliance and risk metrics in real-time using a role-based dashboard. Identify gaps, trends, and potential issues quickly to address risks efficiently.",
        },
        {
          dot: dots.dot1,
          title: "Workflow Automation",
          description:
            "Automate recurring compliance tasks, notifications, and approvals to reduce manual work. Reduce manual work and ensure consistency in compliance processes across the organisation.",
        },
        {
          dot: dots.dot2,
          title: "Training Hub",
          description:
            "Deliver mandatory and role-specific compliance training to all staff. Track training completion and maintain detailed records for audits and compliance verification.",
        },
      ],
    },
    section3: [
      {
        title: "Oversight and Risk Visibility",
        description:
          "TesseractApps centralises compliance tracking, incident reporting, and risk management on one platform. Track staff certifications, mandatory training, and regulatory requirements automatically with ease. Dashboards provide real-time visibility into compliance and risk status, enabling better decision-making. Reporting tools offer insights to make informed operational decisions and improve risk management.",
        images: [one],
      },
      {
        title: "Security and Operational Efficiency",
        description:
          "TesseractApps reduces administrative work while keeping audit records accurate and complete. Use T-Sign for secure digital approvals and maintain a full audit trail. Assign role-based access to protect sensitive data and ensure only authorised personnel can access it. Centralised document storage and automated workflows ensure that compliance tasks are completed on time. Training tools help staff consistently meet regulatory standards and professional development requirements.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How does TesseractApps help track compliance?",
          answer:
            "Compliance Tracker monitors certifications, mandatory training, and regulatory requirements with automated alerts to stay up to date.",
        },
        {
          question: "Can I manage incidents and risks effectively?",
          answer:
            "Yes. Incidents and risk assessments are logged, tracked, and reported digitally, providing accountability and visibility.",
        },
        {
          question: "Does it provide audit-ready reporting?",
          answer:
            "Absolutely. Generate reports instantly, showing training, compliance, and incident histories for management or regulators.",
        },
        {
          question: "Can approvals and agreements be handled digitally?",
          answer:
            "Yes. T-Sign allows secure, traceable digital signatures for approvals and consents.",
        },
        {
          question: "How does TesseractApps reduce manual work?",
          answer:
            "Workflow automation handles recurring tasks, notifications, and approvals, reducing administrative overhead and ensuring consistency.",
        },
      ],
    },
  },
  "Employee Engagement": {
    hero: {
      image: emmpEng,
      title: "Enhance Employee Engagement Across Your Organisation",
      page: "Employee Engagement",
      description:
        "TesseractApps helps organisations improve communication, recognition, training, and collaboration, boosting staff satisfaction and productivity.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Employee Engagement",
      points: [
        {
          dot: dots.dot1,
          title: "Communication Tools (ChaT)",
          description:
            "Send messages, share updates, and collaborate securely across teams to keep employees connected. Keep employees informed and engaged in real-time.",
        },
        {
          dot: dots.dot2,
          title: "Role-Based Dashboard",
          description:
            "Monitor staff activity, engagement metrics, and performance in real-time for better oversight. Identify areas needing support and development to foster employee growth.",
        },
        {
          dot: dots.dot3,
          title: "Recognition & Feedback",
          description:
            "Capture achievements, provide feedback, and celebrate staff milestones to maintain a motivated workforce.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Deliver role-specific training and professional development opportunities, ensuring continuous learning. Track progress and encourage ongoing learning and development for all staff.",
        },
        {
          dot: dots.dot5,
          title: "T-Sign (Digital Signatures)",
          description:
            "Facilitate digital approvals, acknowledgements, and internal agreements for better efficiency. Reduce administrative friction while promoting accountability across teams.",
        },
        {
          dot: dots.dot6,
          title: "Surveys & Polls",
          description:
            "Gather employee feedback quickly and efficiently for better workplace insights. Use insights to enhance workplace culture and refine internal processes.",
        },
        {
          dot: dots.dot1,
          title: "Workflow Automation",
          description:
            "Automate routine administrative tasks, approvals, and notifications to improve efficiency. Allow employees to focus on meaningful work and engagement initiatives by reducing administrative burdens.",
        },
        {
          dot: dots.dot2,
          title: "Documents",
          description:
            "Provide easy access to policies, guidelines, and resources to support staff performance.",
        },
      ],
    },
    section3: [
      {
        title: "Communication and Collaboration",
        description:
          "TesseractApps provides secure messaging and file-sharing tools, keeping teams connected and informed. Staff receive updates, announcements, and feedback instantly, enhancing engagement and collaboration across your organisation.",
        images: [one],
      },
      {
        title: "Recognition and Development",
        description:
          "TesseractApps boosts staff motivation through role-based training, progress tracking, and recognition of achievements. Automated workflows reduce administrative tasks, enabling employees to focus on meaningful work and career growth opportunities.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How does TesseractApps improve communication?",
          answer:
            "ChaT allows secure, instant messaging and file sharing across teams, keeping everyone aligned and informed.",
        },
        {
          question: "Can I track employee performance and engagement?",
          answer:
            "Yes. Role-based dashboards provide real-time visibility into activity, achievements, and engagement metrics.",
        },
        {
          question: "How does it help with recognition and feedback?",
          answer:
            "Capture achievements, give feedback, and celebrate milestones digitally to maintain motivation and a positive culture.",
        },
        {
          question:
            "Can I provide training and development opportunities easily?",
          answer:
            "Absolutely. The Training Hub delivers role-specific courses and tracks completion to encourage continuous learning.",
        },
        {
          question: "Does it reduce administrative burden on employees?",
          answer:
            "Yes. Workflow automation streamlines approvals, notifications, and repetitive tasks, allowing employees to focus on meaningful work.",
        },
      ],
    },
  },
  "Time Efficiency": {
    hero: {
      image: timeEff,
      title: "Save Time Across Your Organisation",
      page: "Time Efficiency",
      description:
        "TesseractApps helps organisations streamline workflows, automate routine tasks, and manage staff and resources seamlessly. Spend less time on administrative tasks and more time on strategic work.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Time Efficiency",
      points: [
        {
          dot: dots.dot1,
          title: "Roster & Shift Automation",
          description:
            "Plan and adjust staff schedules efficiently, saving time on manual processes. Reduce manual roster creation and avoid scheduling conflicts, ensuring smooth operations.",
        },
        {
          dot: dots.dot2,
          title: "Timesheets & Payroll Automation",
          description:
            "Automate timesheet approvals, payroll calculations, and reconciliations, reducing errors and time spent. Reduce errors and cut down manual processing time, improving efficiency.",
        },
        {
          dot: dots.dot3,
          title: "Workflow Automation",
          description:
            "Streamline repetitive administrative tasks, such as approvals, notifications, and reporting, saving hours every week.",
        },
        {
          dot: dots.dot4,
          title: "Role-Based Dashboard",
          description:
            "Access real-time insights into staff activity, attendance, and operational metrics for better decision-making. Make informed decisions faster with instant access to data.",
        },
        {
          dot: dots.dot5,
          title: "Secure Document Management (Documents & T-Sign)",
          description:
            "Store, approve, and retrieve documents digitally, reducing time spent on paperwork and approvals.",
        },
        {
          dot: dots.dot6,
          title: "Communication Tools (ChaT)",
          description:
            "Send messages, share files, and collaborate instantly with teams, reducing delays and keeping everyone aligned.",
        },
        {
          dot: dots.dot1,
          title: "Training Hub",
          description:
            "Deliver onboarding and role-specific training efficiently, ensuring staff are up to speed quickly. Track progress automatically, eliminating the need for manual follow-ups.",
        },
      ],
    },
    section3: [
      {
        title: "Workflow and Task Automation",
        description:
          "TesseractApps centralises rostering, timesheets, approvals, and administrative tasks on one platform, improving workflow efficiency. Automated workflows reduce repetitive work, speed up approvals, and help staff complete tasks more efficiently. Real-time dashboards provide clear visibility into operations and staff activity for informed decision-making.",
        images: [one],
      },
      {
        title: "Productivity and Operational Oversight",
        description:
          "TesseractApps helps your organisation save time while maintaining accuracy and ensuring compliance. Mobile and desktop tools allow staff to submit shifts, leave, and reports quickly and efficiently. Managers can track performance, attendance, and workflows in real-time, ensuring decisions are informed and operations run smoothly.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How does TesseractApps save time on scheduling?",
          answer:
            "Automated rostering allows you to assign shifts, track attendance, and manage leave with minimal manual input.",
        },
        {
          question: "Can timesheets and payroll be automated?",
          answer:
            "Yes. Timesheets integrate directly with payroll systems, reducing errors and manual processing.",
        },
        {
          question: "How does it improve communication efficiency?",
          answer:
            "ChaT enables instant, secure messaging and file sharing across teams, minimising delays and ensuring everyone stays informed.",
        },
        {
          question: "Can I access key operational insights quickly?",
          answer:
            "Yes. Role-based dashboards provide real-time metrics for staff performance, attendance, and workflow efficiency.",
        },
        {
          question: "Does it reduce paperwork and approvals?",
          answer:
            "Absolutely. Digital document storage, approvals via T-Sign, and automated workflows streamline processes and save time.",
        },
      ],
    },
  },
  "Cost Optimisation": {
    hero: {
      image: costOp,
      title: "Reduce Operational Costs and Maximise Efficiency",
      page: "Cost Optimisation",
      description:
        "TesseractApps helps organisations optimise staffing, payroll, and resource management, reducing overheads while maintaining compliance and service quality.",
      cta: {
        buttons: [{ title: "Register your interest", navigate: "bookADemo" }],
        conclusion: "",
      },
    },
    details: {
      title: "Key Features for Cost Optimisation",
      points: [
        {
          dot: dots.dot1,
          title: "Roster Optimisation",
          description:
            "Assign staff efficiently based on skills, availability, and demand, ensuring optimal staffing levels. Reduce overtime, avoid under- or over-staffing, and minimise labour costs effectively.",
        },
        {
          dot: dots.dot2,
          title: "Payroll & Budget Tracking",
          description:
            "Monitor payroll expenses in real-time for better financial control. Track budgets against actuals and reconcile costs, ensuring accurate financial control.",
        },
        {
          dot: dots.dot3,
          title: "Resource Allocation",
          description:
            "Manage assets, equipment, and supplies efficiently, reducing waste and maximising resource value. Reduce waste and ensure resources are used where they provide the most value.",
        },
        {
          dot: dots.dot4,
          title: "Reporting & Insights",
          description:
            "Generate detailed reports on staffing, budget utilisation, and operational efficiency for informed decision-making. Make data-driven decisions that effectively reduce costs.",
        },
        {
          dot: dots.dot5,
          title: "Automated Alerts & Notifications",
          description:
            "Receive alerts for budget overruns, overtime spikes, or underutilised resources to take proactive steps. Take proactive steps to control expenses and avoid budget discrepancies.",
        },
        {
          dot: dots.dot6,
          title: "Compliance & Audit Tracking",
          description:
            "Ensure cost-saving measures do not compromise regulatory or quality standards. Track all changes for audit readiness and compliance verification.",
        },
        {
          dot: dots.dot1,
          title: "Role-Based Dashboard",
          description:
            "Monitor costs, payroll, staffing, and resource utilisation from one unified view. Identify areas for improvement instantly, allowing for swift corrective actions.",
        },
      ],
    },
    section3: [
      {
        title: "Spend Control and Visibility",
        description:
          "TesseractApps centralises workforce, payroll, and resource management on one platform for ease of access. Automated alerts and real-time dashboards help monitor costs, track budgets, and identify overspending instantly. Gain clear visibility into operational expenses and staffing efficiency to make informed decisions.",
        images: [one],
      },
      {
        title: "Efficiency and Compliance",
        description:
          "TesseractApps reduces unnecessary expenditure while ensuring compliance with regulatory standards. Automation streamlines payroll, resource allocation, and reporting, reducing manual tasks. Workflow tools help optimise staffing, control costs, and make data-driven financial decisions across your organisation.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can TesseractApps help reduce payroll costs?",
          answer:
            "Roster optimisation and timesheet integration help minimise overtime and ensure staffing levels match actual demand.",
        },
        {
          question: "Can I track budget and resource usage in real time?",
          answer:
            "Yes. Dashboards and reports provide live insights into payroll, budgets, and resource allocation.",
        },
        {
          question: "Does it maintain compliance while cutting costs?",
          answer:
            "Absolutely. Compliance tracking ensures all cost-saving actions follow regulatory standards and audit requirements.",
        },
        {
          question: "How does it improve decision-making?",
          answer:
            "Data-driven dashboards and automated alerts help you identify inefficiencies and take action quickly.",
        },
        {
          question:
            "Can it scale for large organisations or multi-site operations?",
          answer:
            "Yes. TesseractApps manages costs across multiple departments, teams, and locations with centralised visibility.",
        },
      ],
    },
  },
};

