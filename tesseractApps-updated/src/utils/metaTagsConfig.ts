// SEO Meta Tags Configuration for all pages
// Based on the comprehensive SEO document

export interface MetaTagConfig {
  title: string;
  description: string;
}

export const metaTagsConfig: Record<string, MetaTagConfig> = {
  // Main Category/SubPages
  "/product": {
    title: "Product Overview | NDIS Software Features | TesseractApps",
    description:
      "Explore TesseractApps complete product suite for NDIS providers. Rostering, timesheets, HR operations, participant management, and compliance tools in one platform.",
  },
  "/scheduling": {
    title: "Scheduling Software | Workforce Scheduling | TesseractApps",
    description:
      "Smart scheduling solutions for NDIS providers. Auto-scheduling, shift management, staff allocation, and real-time roster updates for efficient workforce coordination.",
  },
  "/time-management": {
    title: "Time Management Software | Attendance Tracking | TesseractApps",
    description:
      "Complete time management for NDIS providers. Clock in/out, timesheet tracking, break management, and attendance monitoring with GPS verification.",
  },
  "/hr-management": {
    title: "HR Management Software | Human Resources Suite | TesseractApps",
    description:
      "Comprehensive HR management for NDIS providers. Staff records, onboarding, leave management, performance tracking, and compliance documentation.",
  },
  "/communication": {
    title: "Team Communication Tools | Internal Messaging | TesseractApps",
    description:
      "Built-in communication tools for NDIS teams. Group chat, notifications, announcements, and seamless collaboration within your workforce management platform.",
  },

  // Product Feature Pages
  "/roster-management": {
    title:
      "Roster Management Software | Auto Scheduling for NDIS | TesseractApps",
    description:
      "Streamline shift scheduling with TesseractApps roster management. Features auto-scheduling, drag-and-drop shifts, recurring rosters, and real-time staff allocation for NDIS providers.",
  },
  "/timesheet": {
    title:
      "Digital Timesheet Software | Time Tracking for NDIS | TesseractApps",
    description:
      "Accurate time tracking and timesheet management for NDIS providers. Features billable hours calculation, break tracking, CSV/PDF exports, and payroll integration.",
  },
  "/admin-console": {
    title: "Admin Console | System Oversight & Control Panel | TesseractApps",
    description:
      "Centralised admin console for complete system oversight. Manage facilities, users, settings, and permissions with TesseractApps comprehensive administration tools.",
  },
  "/access-control-panel": {
    title: "Access Control Panel | Role-Based Permissions | TesseractApps",
    description:
      "Secure your NDIS data with role-based access controls. Define user permissions, manage security settings, and ensure compliance with TesseractApps access control panel.",
  },
  "/hr-operations": {
    title: "HR Operations Software | Staff Management Suite | TesseractApps",
    description:
      "Complete HR management for NDIS providers. Manage staff records, leave requests, onboarding, training, performance reviews, and compliance documentation in one platform.",
  },
  "/t-sign": {
    title:
      "T-Sign Digital Signatures | Electronic Document Signing | TesseractApps",
    description:
      "Secure digital signature solution for NDIS documents. Create templates, collect signatures, track document status, and maintain compliance with T-Sign by TesseractApps.",
  },
  "/clock-in-and-clock-out": {
    title: "Clock In & Clock Out | GPS Time Attendance | TesseractApps",
    description:
      "Mobile time clock with GPS verification for NDIS staff. Geolocation-based sign-in, break tracking, and real-time attendance monitoring for compliance.",
  },
  "/participant-management": {
    title: "Participant Management | NDIS Care Coordination | TesseractApps",
    description:
      "Comprehensive participant management for NDIS providers. Manage profiles, care plans, budgets, documents, and support allocations in one secure platform.",
  },
  "/incident-management": {
    title: "Incident Management & Reporting | NDIS Compliance | TesseractApps",
    description:
      "Streamlined incident reporting and management for NDIS providers. Log, track, and resolve incidents with audit trails and compliance documentation.",
  },
  "/role-based-dashboard": {
    title: "Role-Based Dashboards | Smart Analytics | TesseractApps",
    description:
      "Customisable dashboards tailored to each role - administrators, roster managers, HR, and staff. Real-time insights and KPIs for NDIS operations.",
  },
  "/Documents": {
    title: "Documents | Secure File Storage | TesseractApps",
    description:
      "Centralised documents for NDIS providers. Store, organise, and access compliance documents, policies, and staff files with secure cloud storage.",
  },
  "/chat": {
    title: "Team Chat & Communication | Internal Messaging | TesseractApps",
    description:
      "Built-in team communication for NDIS providers. 1:1 and group chat, notifications, and seamless collaboration within your workforce management platform.",
  },
  "/my-profile": {
    title: "My Profile | Staff Account Management | TesseractApps",
    description:
      "Personal profile management for NDIS staff. Update availability, view schedules, manage documents, and track performance all in one place.",
  },
  "/forms": {
    title: "Custom Forms Builder | Digital Forms for NDIS | TesseractApps",
    description:
      "Create and manage custom digital forms for NDIS operations. Smart forms, templates, and automated workflows for participant care and staff management.",
  },
  "/accounting": {
    title: "Accounting Software | Finance Suite for NDIS | TesseractApps",
    description:
      "Full accounting suite for NDIS providers. Payroll, invoicing, general ledger, chart of accounts, and financial reporting integrated with your workforce platform.",
  },
  "/t-learning-hub": {
    title: "T-Learning Hub | Staff Training & Tutorials | TesseractApps",
    description:
      "Built-in learning management system for NDIS staff. Step-by-step guides, training modules, and certification tracking to onboard and upskill your team.",
  },
  "/salesforce-integration": {
    title: "Salesforce Integration | CRM Connectivity | TesseractApps",
    description:
      "Seamlessly integrate TesseractApps with Salesforce CRM. Built on the Salesforce platform for enterprise-grade reliability and customisation options.",
  },
  "/xero": {
    title: "Xero Integration | Accounting Sync | TesseractApps",
    description:
      "Connect TesseractApps with Xero for automated invoice and payroll synchronisation. Streamline your NDIS financial workflows with seamless accounting integration.",
  },
  "/wyzed": {
    title: "Wyzed Integration | Learning Management System | TesseractApps",
    description:
      "Integrate Wyzed LMS with TesseractApps for comprehensive staff training. Track certifications, assign courses, and manage compliance training.",
  },

  // Industry Pages
  "/ndis-industry": {
    title:
      "NDIS Software Solutions | Disability Provider Management | TesseractApps",
    description:
      "Purpose-built software for NDIS providers. Manage participants, rostering, billing, compliance, and NDIS Quality and Safeguards requirements in one platform.",
  },
  "/ict-industry": {
    title: "ICT Workforce Management | Project Timesheets | TesseractApps",
    description:
      "Workforce management software for ICT businesses. Project timesheets, resource allocation, billing, and contractor management for technology companies.",
  },
  "/retail-hospitality": {
    title: "Retail & Hospitality Rostering | Staff Scheduling | TesseractApps",
    description:
      "Workforce scheduling software for retail and hospitality. Manage shifts, track attendance, handle payroll, and optimise staffing across multiple locations.",
  },
  "/multi-site-businesses": {
    title:
      "Multi-Site Business Management | Multi-Location Workforce | TesseractApps",
    description:
      "Centralised workforce management for multi-site businesses. Manage staff, rosters, and compliance across all locations from one unified platform.",
  },
  "/construction": {
    title:
      "Construction Workforce Management | Site Staff Scheduling | TesseractApps",
    description:
      "Workforce management for construction companies. Site-based rostering, time tracking with GPS, compliance documentation, and project-based staffing.",
  },
  "/manufacturing": {
    title:
      "Manufacturing Workforce Software | Shift Management | TesseractApps",
    description:
      "Workforce management for manufacturing operations. Shift scheduling, time and attendance, production staffing, and compliance tracking for manufacturing facilities.",
  },

  // Care Sector Pages
  "/disability-support-ndis": {
    title:
      "Disability Support Software | NDIS Provider Platform | TesseractApps",
    description:
      "Comprehensive software for disability support providers. Participant management, NDIS billing, staff rostering, incident reporting, and compliance tools.",
  },
  "/support-coordination": {
    title:
      "Support Coordination Software | NDIS Coordinator Tools | TesseractApps",
    description:
      "Tools for NDIS support coordinators. Manage participant plans, track budgets, coordinate services, generate reports, and maintain audit trails.",
  },
  "/aged-care-services": {
    title: "Aged Care Software | Elderly Care Management | TesseractApps",
    description:
      "Workforce management software for aged care providers. Staff rostering, resident care coordination, compliance tracking, and reporting for aged care facilities.",
  },
  "/child-care-services": {
    title:
      "Childcare Management Software | Early Learning Centres | TesseractApps",
    description:
      "Workforce and centre management for childcare providers. Staff scheduling, ratio compliance, parent communication, and childcare-specific pay guides.",
  },
  "/allied-health-services": {
    title:
      "Allied Health Practice Software | Clinic Management | TesseractApps",
    description:
      "Practice management software for allied health providers. Appointment scheduling, client management, billing, and compliance for healthcare practices.",
  },
  "/home-community-care-services": {
    title: "Home Care Software | Community Care Management | TesseractApps",
    description:
      "Software for home and community care providers. Mobile workforce management, visit scheduling, client care plans, and in-home service coordination.",
  },

  // Role-Based Pages
  "/administrator": {
    title: "Administrator Software Tools | System Management | TesseractApps",
    description:
      "Powerful admin tools for NDIS providers. Manage users, configure settings, monitor operations, and maintain system-wide oversight with TesseractApps.",
  },
  "/roster-manager": {
    title: "Roster Manager Tools | Shift Scheduling Software | TesseractApps",
    description:
      "Streamline roster management with dedicated tools. Auto-scheduling, shift publishing, staff matching, and real-time roster adjustments for managers.",
  },
  "/ndis-staff": {
    title: "NDIS Support Worker App | Staff Mobile Tools | TesseractApps",
    description:
      "Mobile app for NDIS support workers. View shifts, clock in/out with GPS, submit timesheets, report incidents, and communicate with your team.",
  },
  "/hr-manager": {
    title: "HR Manager Software | Human Resources Tools | TesseractApps",
    description:
      "HR management tools for NDIS providers. Staff onboarding, leave management, performance tracking, compliance documentation, and workforce analytics.",
  },
  "/accountant": {
    title: "Accountant Tools | Financial Management | TesseractApps",
    description:
      "Financial management tools for NDIS accountants. Invoicing, payroll processing, NDIS billing, financial reports, and accounting integrations.",
  },
  "/participant": {
    title: "Participant Portal | NDIS Client Access | TesseractApps",
    description:
      "Secure participant portal for NDIS clients. View schedules, track budgets, access documents, communicate with providers, and manage your care plan.",
  },

  // Business Size Pages
  "/small-businesses": {
    title:
      "Small Business NDIS Software | Affordable Workforce Management | TesseractApps",
    description:
      "NDIS software designed for small providers. Affordable pricing, easy setup, and essential features to manage your team, participants, and compliance.",
  },
  "/enterprise": {
    title:
      "Enterprise NDIS Software | Large Provider Solutions | TesseractApps",
    description:
      "Enterprise-grade NDIS software for large providers. Advanced features, custom workflows, dedicated support, and scalable infrastructure for growing organisations.",
  },
  "/franchise": {
    title:
      "Franchise Management Software | Multi-Brand Operations | TesseractApps",
    description:
      "Workforce management for franchise networks. Centralised control, location-based settings, brand consistency, and scalable operations across all franchise locations.",
  },
  "/startups": {
    title: "Startup NDIS Software | New Provider Solutions | TesseractApps",
    description:
      "NDIS software for new providers and startups. Quick setup, free trial, guided onboarding, and all the tools to launch your care business successfully.",
  },

  // Use Case Pages
  "/compliance": {
    title: "NDIS Compliance Software | Quality & Safeguards | TesseractApps",
    description:
      "Stay compliant with NDIS Quality and Safeguards requirements. Audit trails, incident reporting, documentation management, and compliance dashboards.",
  },
  "/employee-engagement": {
    title: "Employee Engagement Tools | Staff Retention | TesseractApps",
    description:
      "Boost staff engagement and retention. Performance management, goal tracking, recognition, communication tools, and career development for NDIS teams.",
  },
  "/time-efficiency": {
    title: "Time Efficiency Software | Productivity Tools | TesseractApps",
    description:
      "Save time with automated workflows. Auto-scheduling, bulk actions, templates, and smart features that reduce administrative burden for NDIS providers.",
  },
  "/cost-optimisation": {
    title: "Cost Optimisation | Reduce Operating Costs | TesseractApps",
    description:
      "Reduce operational costs with smart workforce management. Overtime alerts, under/over rostering reports, budget tracking, and efficiency analytics.",
  },

  // Resource Pages
  "/blogs": {
    title: "TesseractApps Blog | NDIS Industry Insights & Tips | Australia",
    description:
      "Expert articles on NDIS compliance, workforce management, digital transformation, and care sector innovation. Stay informed with industry updates and practical tips.",
  },
  "/whitepapers": {
    title:
      "Whitepapers & Research | NDIS Digital Transformation | TesseractApps",
    description:
      "Download free whitepapers on NDIS digital transformation, workforce management best practices, and care sector innovation for 2025-2030.",
  },
  "/help-center": {
    title: "Help Center | FAQs & Support Resources | TesseractApps",
    description:
      "Find answers to common questions about TesseractApps. Browse FAQs, guides, and support resources to get the most from your NDIS software platform.",
  },
  "/release-notes": {
    title: "Release Notes | Product Updates & New Features | TesseractApps",
    description:
      "Stay updated with TesseractApps latest features and improvements. Browse release notes for all platform updates, bug fixes, and new functionality.",
  },

  // Blog Posts
  "/protecting-participant-data": {
    title:
      "Protecting Participant Data | Why Security Matters for NDIS | TesseractApps",
    description:
      "Learn why data security is essential for NDIS and care providers. Protect participant information, ensure compliance, and build client trust with robust security measures.",
  },
  "/future-proofing-disability-services": {
    title:
      "Future-Proofing Disability Services | NDIS Provider Systems | TesseractApps",
    description:
      "Learn how to future-proof your NDIS business with technology. Digital transformation strategies, automation trends, and compliance preparation for providers.",
  },
  "/hidden-costs-workforce-management": {
    title:
      "Hidden Costs of Poor Workforce Management | NDIS Providers | TesseractApps",
    description:
      "Discover the hidden costs of poor workforce management for NDIS providers. Compliance risks, staff turnover, and inefficiency impacts on your bottom line.",
  },
  "/sydney-disability-workability-expo-2025": {
    title:
      "Sydney Disability & WorkAbility Expo 2025 | Event Recap | TesseractApps",
    description:
      "TesseractApps at Sydney Disability & WorkAbility Expo 2025. Connecting with NDIS providers, support coordinators, and industry leaders in Sydney.",
  },
  "/canberra-ndis-expo": {
    title: "TesseractApps at Canberra NDIS Expo | Event Recap | Australia",
    description:
      "TesseractApps connects with Canberra's NDIS community at the expo. Read about our conversations with providers and insights from the Australian disability sector.",
  },
  "/beyond-compliance-care-quality": {
    title:
      "Beyond Compliance: Elevating Care Quality | NDIS Excellence | TesseractApps",
    description:
      "Move beyond basic NDIS compliance to deliver quality care. Strategies for provider excellence, participant outcomes, and operational improvement.",
  },
  "/manual-rostering-hidden-costs": {
    title:
      "Why Manual Rostering Costs More Than You Think | NDIS | TesseractApps",
    description:
      "Calculate the true cost of manual rostering for your NDIS business. Time waste, errors, compliance risks, and how automation delivers ROI.",
  },
  "/future-proof-ndis-organisation-2025": {
    title:
      "Future-Proof Your NDIS Organisation 2025 | Strategy Guide | TesseractApps",
    description:
      "Strategies to future-proof your NDIS organisation for 2025 and beyond. Compliance, operations, workforce empowerment, and quality care delivery.",
  },
  "/top-3-compliance-myths-busted": {
    title:
      "Top 3 NDIS Compliance Myths Busted | Provider Guide | TesseractApps",
    description:
      "Debunking common NDIS compliance myths. Understand what's really required, avoid costly mistakes, and simplify your compliance approach.",
  },
  "/common-payroll-pitfalls-ndis": {
    title:
      "Common Payroll Pitfalls for NDIS Providers | Avoid Mistakes | TesseractApps",
    description:
      "Avoid common payroll mistakes as an NDIS provider. SCHADS Award compliance, timesheet accuracy, and payroll processing best practices.",
  },
  "/melbourne-expo-2025": {
    title:
      "TesseractApps at Melbourne Expo 2025 | NDIS Event Recap | Australia",
    description:
      "TesseractApps showcases NDIS management platform at Melbourne Expo 2025. Simplifying compliance and improving participant outcomes for Victorian providers.",
  },
  "/ndis-compliance-audit-failures-2026": {
    title:
      "Why NDIS Providers Fail Compliance Audits 2026 | How to Fix It | TesseractApps",
    description:
      "Learn why NDIS providers fail compliance audits in 2026 and how to fix common issues. Documentation, training records, risk management, and governance gaps explained.",
  },

  // Legal Pages
  "/privacy-policy": {
    title: "Privacy Policy | Data Protection | TesseractApps Australia",
    description:
      "TesseractApps privacy policy. Learn how we collect, use, and protect your personal information. Data hosted securely in Australia, compliant with Privacy Act 1988.",
  },
  "/terms-and-Conditions": {
    title: "Terms & Conditions | Service Agreement | TesseractApps Australia",
    description:
      "TesseractApps terms and conditions for NDIS software services. Understand your rights, subscription terms, data ownership, and service agreements.",
  },

  // Modal/Popup Pages
  "/book-a-demo": {
    title:
      "Book a Demo | See TesseractApps in Action | NDIS Software Australia",
    description:
      "Book a free demo of TesseractApps NDIS software. See how our platform can streamline your rostering, compliance, and participant management. No obligation.",
  },
  "/signup": {
    title: "Sign Up | Start Your Free Trial | TesseractApps NDIS Software",
    description:
      "Start your 7-day free trial of TesseractApps. No credit card required. Experience NDIS workforce management, rostering, and compliance software today.",
  },
  "/coming-soon": {
    title: "Coming Soon | New Features | TesseractApps",
    description:
      "Exciting new features coming soon to TesseractApps. Stay tuned for platform updates that will enhance your NDIS workforce management experience.",
  },
};

export const getMetaTags = (pathname: string): MetaTagConfig => {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  return (
    metaTagsConfig[cleanPath] || {
      title:
        "TesseractApps | NDIS Software & Workforce Management Platform Australia",
      description:
        "TesseractApps is Australia's leading NDIS software solution for workforce management, rostering, compliance, and billing. Streamline your care operations with our all-in-one Salesforce-based platform.",
    }
  );
};
