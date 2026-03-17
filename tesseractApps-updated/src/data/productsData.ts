import resterManagement from "../assets/Roster manager schedule.webp";
import rosternew from "../assets/Roster Management  N.webp";
import adminConsole from "../assets/Product Admin con.webp";
import adminConsole2 from "../assets/admin 2.webp";
import adminConsoleNew from "../assets/Admin Console N.webp";
import timesheetNew from "../assets/My roster time sheet N.webp";
import accessControl from "../assets/Product Access control.webp";
import accessControlPanel from "../assets/access.webp";
import accessNew from "../assets/Access control panel N.webp";
import hrOperations from "../assets/Product HR.webp";
import hrnew from "../assets/HR N.webp";
import tsign from "../assets/Product Sign.webp";
import tsignNew from "../assets/T Sign N.webp";
import clockiN from "../assets/clock in clock out N.webp";
import participantManagement from "../assets/partispant management.webp";
import participantNew from "../assets/Participants N.webp";
import incidentManagement from "../assets/incident.webp";
import incidentNew from "../assets/Incident Register N.webp";
import Documents from "../assets/Product Repository.webp";
import repoNew from "../assets/Repository 2.webp";
import roleBasedDashboard from "../assets/Product Rolebase dashboard.webp";
import rollbased from "../assets/Role-Based Dashboards N.webp";
import prodForms from "../assets/Product Forms.webp";
import formsNew from "../assets/Form N.webp";
import prodChat from "../assets/Product Access control.webp";
import chatNew from "../assets/Chat N.webp";
import accounting from "../assets/Product Accounting.webp";
import accountingNew from "../assets/Accounting N.webp";
import accountingImage from "../assets/Role Accounting.webp";
import tLearingHub from "../assets/learning.webp";
import TLEARNINGNEW from "../assets/T learner N.webp";
import myProfile from "../assets/Product My profile.webp";
import myProfileNew from "../assets/My profile N.webp";
import salesforce from "../assets/service.webp";
import wyzed from "../assets/S and L.webp";

const dots = {
  dot1: { outer: "#E6EEFF", middle: "#B4CCFF", inner: "#2563EB" },
  dot2: { outer: "#FFE3E3", middle: "#FEB4B4", inner: "#FC4343" },
  dot3: { outer: "#DBF2E8", middle: "#9DD9C2", inner: "#08A965" },
  dot4: { outer: "#DBE8EF", middle: "#9DC2D1", inner: "#3B7793" },
  dot5: { outer: "#F7ECD9", middle: "#E8C9A5", inner: "#D77E1B" },
  dot6: { outer: "#EBE2FE", middle: "#C7ADFC", inner: "#932EFA" },
};

export const productsDetailsData = {
  "Roster Management": {
    page: "Roster Management",
    hero: {
      image: rosternew,
      title: "Streamline Staff Scheduling",
      description:
        "Efficiently plan, approve, and manage shifts with TesseractApps. Keep your workforce organised, reduce conflicts, and ensure proper coverage across all sites.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Create and Adjust Shifts",
          description:
            "Easily build rosters for teams and adjust schedules in real time to accommodate changes in staff availability.",
        },
        {
          dot: dots.dot2,
          title: "Attendance Tracking",
          description:
            "Monitor staff attendance and ensure accurate timesheets for payroll and reporting.",
        },
        {
          dot: dots.dot3,
          title: "Automated Approvals",
          description:
            "Set rules for shift approvals to reduce delays and enable managers to quickly authorise schedules.",
        },
        {
          dot: dots.dot4,
          title: "Staff Notifications",
          description:
            "Send automated alerts to staff about upcoming shifts, changes, or cancellations to keep teams informed and reduce miscommunication.",
        },
        {
          dot: dots.dot5,
          title: "Compliance Integration",
          description:
            "Track mandatory trainings and qualifications when scheduling staff to ensure shifts are assigned only to qualified personnel.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate reports on coverage, shift patterns, and staff performance using dashboards to optimise scheduling and workload distribution.",
        },
      ],
    },
    section3: [
      {
        title: "Scheduling and Efficiency",
        description:
          "TesseractApps Roster Management centralises staff scheduling in one platform. Automated notifications, compliance checks, and real-time updates reduce errors and simplify workforce planning. Managers can respond quickly to changes while maintaining proper coverage and audit-ready records.",
        images: [resterManagement],
      },
    ],
    section4: {
      title: "How Roster Management Can Help Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Gain full visibility of staffing levels, track attendance, and maintain compliance with minimal effort.",
          images: [accountingImage],
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers",
          description:
            "Easily create, update, and approve rosters, balance workloads, and reduce scheduling conflicts across teams.",
          images: [accountingImage],
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers",
          description:
            "Link rostering with leave, qualifications, and payroll to ensure smooth workforce management and accurate records.",
          images: [accountingImage],
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            " Access schedules, submit availability, and receive shift updates instantly, keeping your day organised and tasks clear.",
          images: [accountingImage],
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "Can I adjust schedules on the fly?",
          answer:
            "Yes. You can edit shifts in real time, notify staff automatically, and ensure coverage is maintained.",
        },
        {
          question: "How do I track attendance and shift completion?",
          answer:
            "Attendance is monitored through digital check-ins and timesheets, integrated directly with payroll.",
        },
        {
          question: "Can I ensure staff are qualified for shifts?",
          answer:
            "Compliance integration checks mandatory training and certifications before assigning staff to shifts.",
        },
        {
          question: "How does this reduce administrative work?",
          answer:
            "Automation of approvals, notifications, and reporting reduces manual tasks and saves time.",
        },
        {
          question: "Can I get insights into workforce trends?",
          answer:
            "Dashboards and reports provide analytics on staffing patterns, attendance, and performance to optimise scheduling.",
        },
      ],
    },
  },

  Timesheet: {
    page: "Timesheet",
    hero: {
      title: "Simplify Staff Time Tracking ",
      description:
        "Efficiently record, approve, and manage staff hours with TesseractApps. Ensure accurate payroll, reduce errors, and stay compliant.",
      image: timesheetNew, // Replace with actual image import
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Submit and Approve Timesheets",
          description:
            "Staff can submit hours digitally, and managers can review and approve with one click, reducing delays and errors.",
        },
        {
          dot: dots.dot2,
          title: "Integration with Payroll",
          description:
            "Automatically link approved timesheets to payroll, ensuring accurate payments and reducing manual reconciliation.",
        },
        {
          dot: dots.dot3,
          title: "Attendance Tracking",
          description:
            "Monitor attendance and shift duration in real time to ensure precise staff records.",
        },
        {
          dot: dots.dot4,
          title: "Automated Alerts",
          description:
            "Receive notifications for missing or overdue timesheets to keep payroll processes on schedule.",
        },
        {
          dot: dots.dot5,
          title: "Compliance Checks",
          description:
            "Verify staff training and certification before approving hours to maintain compliance effortlessly.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate detailed reports on staff hours, overtime, and attendance, and use dashboards to identify patterns and optimise productivity.",
        },
      ],
    },
    section4: {
      title: "How Timesheets Help Your Team ",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Track staff hours, verify compliance, and ensure payroll accuracy with minimal manual work.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers",
          description:
            "Monitor shift completion, approve timesheets quickly, and integrate with rostering to maintain coverage.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers",
          description:
            "Link timesheets to leave and payroll, track overtime, and manage workforce records accurately.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Easily submit hours, receive approval notifications, and track your work in real time.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },
    section3: [
      {
        title: "Time Management and Accuracy",
        description:
          "TesseractApps Timesheets centralises time tracking for both staff and managers. Automated approvals, payroll integration, and compliance checks reduce administrative work, eliminate errors, and keep workforce records accurate and audit-ready. ",
        images: [adminConsole],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How do staff submit timesheets?",
          answer:
            "Staff can enter hours digitally through the platform, which managers can review and approve instantly.",
        },
        {
          question: "Can approved hours integrate with payroll?",
          answer:
            "Yes. Timesheets link directly to payroll, ensuring accurate pay and reducing manual reconciliation.",
        },
        {
          question: "How does this support compliance?",
          answer:
            "Timesheets check mandatory training and certifications before approval, ensuring staff meet all requirements.",
        },
        {
          question: "Can I monitor attendance in real time?",
          answer:
            "Yes. Check-ins, check-outs, and shift durations are tracked digitally and displayed on dashboards.",
        },
        {
          question: "How do I get insights into staff productivity?",
          answer:
            "Reports provide data on hours worked, overtime, and attendance trends to help optimise scheduling and workloads.",
        },
      ],
    },
  },
  "Admin Console": {
    page: "Admin Console",
    hero: {
      image: adminConsoleNew,
      title: "Full Control in One Place",
      description:
        "Manage your organisation efficiently using TesseractApps. Oversee users, modules, settings, and compliance from one secure dashboard.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "User Management",
          description:
            "Add, update, or remove users, and assign roles and permissions to control access and protect sensitive data.",
        },
        {
          dot: dots.dot2,
          title: "System Configuration",
          description:
            "Set up modules and workflows to match your organisation's needs and automate recurring tasks for consistency.",
        },
        {
          dot: dots.dot3,
          title: "Compliance Oversight",
          description:
            "Track staff certifications, mandatory training, and audit requirements, receiving automated alerts for upcoming deadlines.",
        },
        {
          dot: dots.dot4,
          title: "Audit Logs",
          description:
            "Maintain detailed logs of system activity to ensure transparency and accountability across the organisation.",
        },
        {
          dot: dots.dot5,
          title: "Reporting and Insights",
          description:
            "Generate reports on user activity, system usage, and operational metrics, using dashboards to make informed decisions quickly.",
        },
        {
          dot: dots.dot6,
          title: "Integration with Other Modules",
          description:
            "Connect rostering, timesheets, HR, payroll, and compliance tools for a complete operational overview.",
        },
      ],
    },
    section3: [
      {
        title: "System Management",
        description:
          "TesseractApps Admin Console centralises the management of your organisation’s modules and settings. Automation, audit logs, and role-based access reduce manual work, enhance security, and keep operations compliant and organised.",
        images: [adminConsole2],
      },
    ],
    section4: {
      title: "How Admin Console Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain full control over system settings, user roles, and compliance tracking from one central location.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR Managers and Roster Managers",
          description:
            "Monitor staff access, track activities, and ensure workflows are followed efficiently using the Admin Console.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For Accountants",
          description:
            "Access system data to support payroll, financial reporting, and regulatory compliance easily.",
          cta: {
            title: "Learn more",
            navigate: "Accountant",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: Admin Console",
      faqData: [
        {
          question: "How can I manage all users efficiently?",
          answer:
            "Add, update, or remove users, assign roles, and track activity from a single dashboard.",
        },
        {
          question: "Can I configure the system to fit our workflow?",
          answer:
            "Yes. Set preferences, module configurations, and automate recurring tasks to match your operations.",
        },
        {
          question: "How does Admin Console support compliance?",
          answer:
            "Automated alerts and audit logs monitor training, certifications, and activity for regulatory readiness.",
        },
        {
          question: "Can I connect other TesseractApps modules?",
          answer:
            "Yes. Admin Console integrates rostering, timesheets, HR, payroll, and compliance modules for full operational visibility.",
        },
        {
          question: "How do I access insights and reports?",
          answer:
            "Dashboards provide real-time metrics on system usage, user activity, and operational performance for informed decisions.",
        },
      ],
    },
  },

  "Access Control Panel": {
    page: "Access Control Panel",
    hero: {
      image: accessNew,
      title: "Manage Access and Permissions Securely",
      description:
        "Control who can access what with TesseractApps. Assign roles, scale permissions, and monitor activity to keep your organisation secure and compliant efficiently.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Role-Based Permissions",
          description:
            "Assign different access levels to staff, managers, and administrators to ensure sensitive data is only accessible to authorised personnel.",
        },
        {
          dot: dots.dot2,
          title: "User Group Management",
          description:
            "Organise users into groups based on teams, departments, or roles, applying consistent permissions across multiple users efficiently.",
        },
        {
          dot: dots.dot3,
          title: "Access Monitoring",
          description:
            "Track logins, system activity, and document access to identify unusual activity and maintain accountability.",
        },
        {
          dot: dots.dot4,
          title: "Integration with Modules",
          description:
            "Link access permissions to rostering, timesheets, HR, payroll, and compliance modules to control workflows and visibility across the organisation.",
        },
        {
          dot: dots.dot5,
          title: "Automated Alerts",
          description:
            "Receive notifications for unauthorised access attempts or changes to user roles, enabling quick responses to security issues.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Audit Trails",
          description:
            "Generate detailed reports on user access and activity, maintaining full audit-ready records for compliance purposes.",
        },
      ],
    },
    section3: [
      {
        title: "Access Management",
        description:
          "TesseractApps Access Control Panel centralises permission management across all modules for enhanced security. Role-based access, monitoring, and automated alerts improve security, reduce errors, and ensure your organisation complies with regulatory standards.",
        images: [accessControlPanel],
      },
    ],
    section4: {
      title: "How Access Control Panel Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain complete oversight of user permissions and system security using one central dashboard.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR Managers and Roster Managers",
          description:
            "Control staff access to personal data, schedules, and operational tools to ensure workflows comply with internal policies.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For Accountants",
          description:
            "Restrict access to financial records, payroll, and sensitive participant data to maintain regulatory compliance.",
          cta: {
            title: "Learn more",
            navigate: "Accountant",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Access only the tools and information necessary for their role, reducing errors and ensuring privacy protection.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: Access Control Panel",
      faqData: [
        {
          question: "How can I control who accesses sensitive data?",
          answer:
            "Assign role-based permissions to staff, managers, and administrators, restricting access according to responsibilities.",
        },
        {
          question: "Can I manage multiple users efficiently?",
          answer:
            "Yes. Organise staff into groups and apply consistent permissions across teams or departments.",
        },
        {
          question: "How do I monitor user activity?",
          answer:
            "Track logins, document access, and system activity in real time, with reports available for audits.",
        },
        {
          question: "Can access integrate with other TesseractApps modules?",
          answer:
            "Yes. Permissions link with rostering, timesheets, HR, payroll, and compliance modules for consistent control.",
        },
        {
          question: "How do I get alerts for security issues?",
          answer:
            "Automated notifications notify you of unauthorised access attempts or changes to user roles so you can act quickly.",
        },
      ],
    },
  },

  "HR Operations": {
    page: "HR Operations",
    hero: {
      image: hrnew,
      title: "Manage Your Workforce Efficiently",
      description:
        "Oversee recruitment, onboarding, staff records, and performance using TesseractApps. Keep all HR processes in one secure platform, ensuring accuracy, compliance, and operational efficiency.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Recruitment and Onboarding",
          description:
            "Track job applications, manage candidate profiles, and streamline onboarding. Ensure new hires are correctly set up from day one.",
        },
        {
          dot: dots.dot2,
          title: "Employee Records Management",
          description:
            "Maintain up-to-date staff profiles, qualifications, and employment history. Store sensitive information securely and access it easily when required.",
        },
        {
          dot: dots.dot3,
          title: "Leave and Attendance Tracking",
          description:
            "Monitor leave balances, approvals, and absences, integrating with timesheets and payroll for accurate tracking.",
        },
        {
          dot: dots.dot4,
          title: "Performance and Training",
          description:
            "Track employee performance, certifications, and training completion using dashboards to monitor progress and compliance.",
        },
        {
          dot: dots.dot5,
          title: "Role-Based Permissions",
          description:
            "Assign access levels for HR staff and managers to control who can view or edit sensitive employee data.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate HR reports on staff performance, leave trends, training completion, and compliance, using data to optimise workforce planning.",
        },
      ],
    },
    section3: [
      {
        title: "HR Management and Efficiency",
        description:
          "TesseractApps HR Operations centralises all HR workflows on one platform. Automated processes for recruitment, onboarding, leave, and performance reduce manual tasks and ensure staff records are accurate, secure, and compliant.",
        images: [hrOperations],
      },
    ],
    section4: {
      title: "How HR Operations Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain complete oversight of employee records, leave, and training while ensuring security and compliance with TesseractApps.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR Managers",
          description:
            "Simplify recruitment, onboarding, and performance tracking, linking HR data directly to payroll and rostering.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For Roster Managers",
          description:
            "Access HR insights to manage staff availability, qualifications, and leave for more accurate scheduling.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Update personal profiles, track leave balances, and monitor training requirements with ease.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I manage employee records efficiently?",
          answer:
            "TesseractApps centralises all staff data, including profiles, qualifications, leave, and performance, in one secure platform.",
        },
        {
          question: "Can I track leave and attendance accurately?",
          answer:
            "Yes. Leave balances, approvals, and absences are monitored and integrated with payroll for accurate records.",
        },
        {
          question: "How does this help with staff training and compliance?",
          answer:
            "Track training completion, certifications, and mandatory requirements to ensure staff are compliant.",
        },
        {
          question: "Can I control who accesses sensitive HR data?",
          answer:
            "Role-based permissions allow HR staff and managers to access only the information they need.",
        },
        {
          question: "How do I generate reports for workforce planning?",
          answer:
            "Dashboards and reports provide insights on leave trends, staff performance, and training compliance for strategic decision-making.",
        },
      ],
    },
  },

  "T-Sign": {
    page: "T-Sign (Digital Signatures)",
    hero: {
      image: tsignNew,
      title: "Approve Documents Securely and Efficiently",
      description:
        "Digitally sign and manage documents using TesseractApps. Maintain compliance, streamline approvals, and ensure accurate audit trails for all critical records.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Secure Digital Signatures",
          description:
            "Sign documents electronically with full security to replace manual signatures while ensuring authenticity and traceability.",
        },
        {
          dot: dots.dot2,
          title: "Multi-Level Approvals",
          description:
            "Set multiple approval levels for different types of documents to ensure the right people sign at the right stage.",
        },
        {
          dot: dots.dot3,
          title: "Compliance and Audit Tracking",
          description:
            "Maintain full audit trails for all signed documents, easily demonstrating compliance with organisational policies and regulatory standards.",
        },
        {
          dot: dots.dot4,
          title: "Document Notifications",
          description:
            "Automatically notify staff and managers when documents require signing to reduce delays and improve workflow efficiency.",
        },
        {
          dot: dots.dot5,
          title: "Integration with Documents",
          description:
            "Store signed documents securely in the central repository, tracking versions, revisions, and access permissions.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate reports on signed documents, pending approvals, and completed workflows to use data for improving process management.",
        },
      ],
    },
    section3: [
      {
        title: "Digital Approval",
        description:
          "TesseractApps T-Sign centralises digital signatures and approval workflows on one secure platform. Automated notifications, multi-level approvals, and audit-ready records reduce administrative burden, improve compliance, and save time.",
        images: [tsign],
      },
    ],
    section4: {
      title: "How T-Sign Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain oversight of all approvals, track document history, and ensure compliance without manual paperwork.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR and Roster Managers",
          description:
            "Streamline approvals for staff onboarding, contracts, and rostering changes efficiently using T-Sign.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For NDIS Staff",
          description:
            "Sign care plans, agreements, and mandatory documents digitally to reduce delays and stay compliant.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: T-Sign",
      faqData: [
        {
          question: "How do I sign Documents digitally?",
          answer:
            "Use T-Sign to apply secure electronic signatures directly within the platform, replacing manual signatures.",
        },
        {
          question: "Can I set multiple approval levels?",
          answer:
            "Yes. Documents can require multiple signatures in sequence, ensuring proper verification.",
        },
        {
          question: "How does T-Sign ensure compliance?",
          answer:
            "All signatures are traceable, and audit logs maintain a full history of approvals, meeting regulatory requirements.",
        },
        {
          question: "Can I store signed Documents securely?",
          answer:
            "Yes. Signed Documents are saved in the Documents with access control, tracking edits and revisions.",
        },
        {
          question: "Can I get insights into pending and completed approvals?",
          answer:
            "Dashboards and reports show pending signatures, completed approvals, and workflow progress for better management.",
        },
      ],
    },
  },

  "Clock In & Clock Out": {
    page: "Clock In & Clock Out",
    hero: {
      image: clockiN,
      title: "Track Staff Attendance Accurately",
      description:
        "Digitally record staff start and end times with TesseractApps. Ensure accurate attendance, streamline payroll, and easily maintain compliance.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Digital Check-In and Check-Out",
          description:
            "Staff can clock in and out from mobile or desktop devices, with records captured in real time for accuracy.",
        },
        {
          dot: dots.dot2,
          title: "GPS and Location Tracking",
          description:
            "Confirm staff location during clock-ins for both on-site and remote shifts to ensure accountability and accurate reporting.",
        },
        {
          dot: dots.dot3,
          title: "Integration with Timesheets and Payroll",
          description:
            "Clock-in data automatically updates timesheets and links to payroll, reducing manual entry and preventing errors.",
        },
        {
          dot: dots.dot4,
          title: "Shift Notifications",
          description:
            "Receive alerts for missed or late clock-ins and check-outs to keep managers informed and maintain coverage.",
        },
        {
          dot: dots.dot5,
          title: "Compliance Monitoring",
          description:
            "Track hours worked against staff certifications and qualifications to ensure shifts comply with regulatory standards.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate attendance reports, track late arrivals, and monitor shift durations. Use dashboards to optimise and streamline workforce management.",
        },
      ],
    },
    section3: [
      {
        title: "Attendance and Efficiency",
        description:
          "TesseractApps Clock In & Clock Out centralises attendance tracking for all teams. Real-time data, automated alerts, and seamless integration with timesheets and payroll reduce errors, improve accountability, and simplify workforce management. ",
        images: [accessControl],
      },
    ],
    section4: {
      title: "How Clock In & Clock Out Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Monitor staff attendance in real time, ensure accurate records, and maintain compliance with ease.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers",
          description:
            "Track shift start and end times, receive alerts for anomalies, and ensure adequate coverage.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers",
          description:
            "Integrate attendance data with leave, timesheets, and payroll to maintain accurate employee records.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Easily clock in and out, receive shift notifications, and ensure your hours are accurately recorded.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How do staff clock in and out?",
          answer:
            "Staff can use mobile devices or desktop tools to clock in and out digitally, with time and location recorded in real time.",
        },
        {
          question: "Can this integrate with payroll and timesheets?",
          answer:
            "Yes. Clock-in data automatically updates timesheets and links to payroll for accurate payments.",
        },
        {
          question: "How does it support compliance?",
          answer:
            "Hours are monitored against certifications and qualifications to ensure staff are assigned appropriately.",
        },
        {
          question: "Can I track staff location for shifts?",
          answer:
            "Yes. GPS tracking verifies staff location during check-ins for remote or on-site work.",
        },
        {
          question: "How do I get insights on attendance trends?",
          answer:
            "Dashboards and reports show late arrivals, missed clock-ins, and overall attendance patterns for better workforce planning.",
        },
      ],
    },
  },

  "Participant Management": {
    page: "Participant Management",
    hero: {
      image: participantNew,
      title: "Manage Participants Efficiently",
      description:
        "Track participant information, support plans, and service delivery using TesseractApps. Ensure accurate records, improve care quality, and maintain compliance with ease.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Participant Profiles",
          description:
            "Create and update participant records with detailed personal, health, and support information to keep data organised and accessible.",
        },
        {
          dot: dots.dot2,
          title: "Care Plans and Goals",
          description:
            "Manage support plans, goals, and progress notes, tracking participant outcomes to ensure care aligns with their needs.",
        },
        {
          dot: dots.dot3,
          title: "Session Tracking",
          description:
            "Record visits, attendance, and services provided, verifying hours for funding, reporting, and audit purposes.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Checks",
          description:
            "Monitor mandatory requirements, funding limits, and approvals to ensure all services meet regulatory and organisational standards.",
        },
        {
          dot: dots.dot5,
          title: "Reporting and Insights",
          description:
            "Generate reports on participant progress, session frequency, and service utilisation, using dashboards to monitor outcomes and optimise care.",
        },
        {
          dot: dots.dot6,
          title: "Document Management",
          description:
            "Attach and manage care plans, agreements, and other important documents securely, ensuring quick access and audit-ready records.",
        },
      ],
    },
    section3: [
      {
        title: "Participant Management",
        description:
          "TesseractApps Participant Management centralises participant information, care plans, and session tracking on one platform. Automated alerts, secure storage, and reporting tools reduce errors, improve care quality, and maintain compliance with NDIS standards.",
        images: [participantManagement],
      },
    ],
    section4: {
      title: "How Participant Management Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For NDIS Staff",
          description:
            "Access participant details, update session notes, and track care plans easily to stay informed about the participants you support.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Administrators and Managers",
          description:
            "Monitor service delivery, compliance, and participant outcomes to ensure staff are providing quality care efficiently.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR and Payroll Teams",
          description:
            "Verify staff hours against participant sessions for accurate payroll and funding reporting purposes.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: Participant Management",
      faqData: [
        {
          question: "How can I manage participant information efficiently?",
          answer:
            "TesseractApps centralises participant records, support plans, and session history for easy access and updates.",
        },
        {
          question: "Can I track service delivery and attendance?",
          answer:
            "Yes. Record visits, monitor attendance, and track services for accurate reporting and audit readiness.",
        },
        {
          question: "How does this help with compliance?",
          answer:
            "Compliance checks and automated alerts ensure mandatory requirements and funding limits are always met.",
        },
        {
          question: "Can I generate reports on participant outcomes?",
          answer:
            "Yes. Dashboards and reporting tools provide insights on progress, service utilisation, and overall care quality.",
        },
        {
          question: "Is participant data secure?",
          answer:
            "All participant information is stored securely with role-based access and full audit trails, protecting sensitive data.",
        },
      ],
    },
  },

  "Incident Management": {
    page: "Incident Management",
    hero: {
      image: incidentNew,
      title: "Record and Resolve Incidents Efficiently",
      description:
        "Track, manage, and report incidents using TesseractApps. Ensure staff and participant safety, maintain compliance, and keep accurate real-time records.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Incident Reporting",
          description:
            "Log incidents quickly with detailed information about what happened, when, and who was involved, capturing all necessary details for accurate records.",
        },
        {
          dot: dots.dot2,
          title: "Investigation and Follow-Up",
          description:
            "Assign tasks, track investigations, and ensure timely resolution, keeping all parties informed and accountable.",
        },
        {
          dot: dots.dot3,
          title: "Compliance and Audit Tracking",
          description:
            "Ensure all incidents are managed according to organisational and NDIS regulatory requirements, maintaining audit-ready documentation.",
        },
        {
          dot: dots.dot4,
          title: "Notifications and Alerts",
          description:
            "Automatically notify managers, supervisors, or relevant staff about new incidents to ensure prompt attention and response.",
        },
        {
          dot: dots.dot5,
          title: "Reporting and Insights",
          description:
            "Generate reports on incident trends, types, and resolutions, using dashboards to identify patterns and improve risk management.",
        },
        {
          dot: dots.dot6,
          title: "Document Management",
          description:
            "Attach photos, reports, or supporting documentation to each incident record, keeping files secure and accessible for audits.",
        },
      ],
    },
    section3: [
      {
        title: "Incident Management",
        description:
          "TesseractApps Incident Management centralises incident reporting, investigations, and resolutions. Automated alerts, secure document storage, and reporting tools reduce administrative burden, improve safety outcomes, and ensure regulatory compliance.",
        images: [incidentManagement],
      },
    ],
    section4: {
      title: "How Incident Management Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain oversight of all incidents, track resolution status, and ensure compliance with policies and regulations efficiently. ",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers and HR",
          description:
            "Quickly access incident records to inform staffing, training, and workforce planning decisions effectively.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For NDIS Staff",
          description:
            "Report incidents easily, track follow-ups, and stay informed about the progress of resolutions.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: Incident Management",
      faqData: [
        {
          question: "How can I report incidents efficiently?",
          answer:
            "TesseractApps allows you to log incidents quickly with detailed information and supporting documentation.",
        },
        {
          question: "Can I track the resolution process?",
          answer:
            "Yes. Assign tasks, monitor follow-ups, and view the status of investigations in real time.",
        },
        {
          question: "How does this ensure compliance?",
          answer:
            "All incidents are managed according to organisational and NDIS standards, with automated alerts and audit-ready records.",
        },
        {
          question: "Can I generate reports on incidents?",
          answer:
            "Yes. Dashboards provide insights into incident trends, types, and resolutions to improve safety and planning.",
        },
        {
          question: "Is sensitive data protected?",
          answer:
            "All incident records and attached files are stored securely with role-based access to protect privacy.",
        },
      ],
    },
  },

  Documents: {
    page: "Documents",
    hero: {
      image: repoNew,
      title: "Store and Manage Documents Securely",
      description:
        "Centralise all your Documents using TesseractApps. Keep care plans, agreements, policies, and records organised, secure, and easily accessible at all times.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Centralised Document Storage",
          description:
            "Store all organisational documents in one secure location to reduce clutter and ensure quick access when needed.",
        },
        {
          dot: dots.dot2,
          title: "Version Control and Revisions",
          description:
            "Track edits, updates, and revisions for every document, maintaining a full history of changes to ensure accuracy and accountability.",
        },
        {
          dot: dots.dot3,
          title: "Access Control",
          description:
            "Assign permissions to individuals or groups to ensure only authorised staff can view or edit sensitive documents.",
        },
        {
          dot: dots.dot4,
          title: "Compliance and Audit Trails",
          description:
            "Maintain records in line with regulatory standards, tracking who accessed or modified documents to stay audit-ready.",
        },
        {
          dot: dots.dot5,
          title: "Integration with Other Modules",
          description:
            "Link documents to rostering, participant management, payroll, HR, and T-Sign workflows to keep all related records connected.",
        },
        {
          dot: dots.dot6,
          title: "Search and Retrieval",
          description:
            "Quickly search and retrieve documents using filters and keywords to reduce time spent hunting for files and improve workflow efficiency.",
        },
      ],
    },
    section3: [
      {
        title: "Document Management",
        description:
          "TesseractApps Documents hub centralises all documents in a secure, organised hub for easy access. Role-based access, version tracking, and integration with workflows improve efficiency, accountability, and regulatory compliance.",
        images: [Documents],
      },
    ],
    section4: {
      title: "How Documents Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Maintain control over all organisational documents, monitor access, and ensure compliance easily. ",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR and Roster Managers",
          description:
            "Store contracts, care schedules, and staff records securely, accessing files when needed to support operational decisions.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For NDIS Staff",
          description:
            "Access care plans, agreements, and mandatory documents relevant to your role, updating files where permitted and staying informed.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: documents",
      faqData: [
        {
          question: "How can I store documents securely?",
          answer:
            "All files are saved in a secure, central documents with role-based access permissions.",
        },
        {
          question: "Can I track changes and revisions?",
          answer:
            "Yes. Version control maintains a complete history of edits and updates for every document.",
        },
        {
          question: "How does it help with compliance?",
          answer:
            "Audit trails record who accessed or modified each document, ensuring regulatory standards are met.",
        },
        {
          question:
            "Can I integrate documents with other TesseractApps modules?",
          answer:
            "Yes. Link files to rostering, payroll, participant management, HR, and T-Sign workflows.",
        },
        {
          question: "How do I find documents quickly?",
          answer:
            "Use search filters and keywords to retrieve files instantly, reducing time spent looking for information.",
        },
      ],
    },
  },

  "Role Based Dashboard": {
    page: "Role Based Dashboard",
    hero: {
      image: rollbased,
      title: "Monitor Your Operations in One Place",
      description:
        "Access real-time insights and manage workflows efficiently using TesseractApps. Track performance, compliance, and tasks specific to each role, all from one secure, centralised dashboard.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Customised Views by Role",
          description:
            "Display relevant metrics and tasks for each role, ensuring that administrators, managers, and staff see only the information they need to make decisions.",
        },
        {
          dot: dots.dot2,
          title: "Real-Time Monitoring",
          description:
            "Track staff activity, shift completion, and operational workflows instantly to ensure proper coverage and task progress without delay.",
        },
        {
          dot: dots.dot3,
          title: "Compliance and Audit Tracking",
          description:
            "View upcoming certifications, training, and regulatory requirements, receiving alerts for deadlines and maintaining audit-ready records.",
        },
        {
          dot: dots.dot4,
          title: "Task Management",
          description:
            "Assign, track, and monitor tasks across teams to keep workflows organised and ensure accountability.",
        },
        {
          dot: dots.dot5,
          title: "Performance Analytics",
          description:
            "Access reports and insights on staff performance, service delivery, and operational efficiency, using data to improve decision-making and resource allocation.",
        },
        {
          dot: dots.dot6,
          title: "Integration with Other Modules",
          description:
            "Connect rostering, timesheets, HR, and payroll data for a complete operational overview, enabling informed decisions based on accurate, consolidated information.",
        },
      ],
    },
    section4: {
      title: "How Role-Based Dashboard Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Monitor all operations, compliance, and performance metrics from a central dashboard, maintaining visibility and control effortlessly.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers",
          description:
            "Track shift completion, attendance, and workforce allocation in real time, adjusting schedules and resources quickly.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers",
          description:
            "View leave, training, and performance metrics across teams to make data-driven decisions about staff development and workforce planning.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For Accountants",
          description:
            "Access financial and payroll insights linked to operational activity for accurate, comprehensive reporting.",
          cta: {
            title: "Learn more",
            navigate: "Accountant",
            type: "text",
          },
        },
        {
          dot: dots.dot5,
          title: "For NDIS Staff",
          description:
            "View tasks, schedules, and progress updates relevant to your role to stay organised and informed.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },
    section3: [
      {
        title: "Insights and Efficiency",
        description:
          "TesseractApps Role-Based Dashboard consolidates critical operational data onto one platform. Customised views, real-time monitoring, and integrated reporting reduce manual tracking, improve transparency, and help your team act quickly on insights.",
        images: [roleBasedDashboard],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I see only the information relevant to my role?",
          answer:
            "Each dashboard is customised by role, showing only the metrics, tasks, and reports you need.",
        },
        {
          question:
            "Can I track compliance and certifications from the dashboard?",
          answer:
            "Yes. Upcoming trainings, certifications, and regulatory deadlines are displayed with alerts to keep you audit-ready.",
        },
        {
          question: "How does it help with workforce management?",
          answer:
            "Track attendance, shift completion, and task progress in real time to optimise scheduling and resource allocation.",
        },
        {
          question: "Can I integrate other TesseractApps modules?",
          answer:
            "Yes. The dashboard integrates rostering, timesheets, HR, and payroll data for a complete operational overview.",
        },
        {
          question: "How do I get insights into performance?",
          answer:
            "Reports and analytics provide actionable data on staff performance, service delivery, and operational efficiency.",
        },
      ],
    },
  },

  "ChaT (Secure Communication)": {
    page: "ChaT (Secure Communication)",
    hero: {
      image: chatNew,
      title: "Communicate Safely and Effectively",
      description:
        "Send messages, share files, and collaborate securely with your team. TesseractApps ChaT keeps communication private, organised, and integrated with your workflows.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Real-Time Messaging",
          description:
            "Send and receive messages instantly to keep teams connected and informed, no matter where they are.",
        },
        {
          dot: dots.dot2,
          title: "File Sharing",
          description:
            "Share documents, images, and forms securely within the platform to reduce email dependency and keep records centralised.",
        },
        {
          dot: dots.dot3,
          title: "Group and Role-Based Chats",
          description:
            "Create groups for teams, departments, or projects, and control who can participate and view specific conversations.",
        },
        {
          dot: dots.dot4,
          title: "Integration with Modules",
          description:
            "Link messages to rostering, HR, participant management, and forms to keep communication aligned with operational workflows.",
        },
        {
          dot: dots.dot5,
          title: "Notifications and Alerts",
          description:
            "Receive instant notifications for new messages, shared files, or task updates to ensure timely responses and accountability.",
        },
        {
          dot: dots.dot6,
          title: "Secure and Compliant",
          description:
            "All communication is encrypted and stored securely to maintain privacy, compliance, and audit trails for sensitive information.",
        },
      ],
    },
    section3: [
      {
        title: "Secure Communication",
        description:
          "TesseractApps ChaT centralises team communication in a secure, compliant environment. Real-time messaging, role-based groups, and module integration streamline collaboration, improve response times, and maintain compliance.",
        images: [prodChat],
      },
    ],
    section4: {
      title: "How ChaT Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Monitor communication channels, manage group access, and ensure compliance with organisational policies.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Roster Managers",
          description:
            "Coordinate shifts, update teams, and resolve operational issues in real-time.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers",
          description:
            "Share policy updates, training information, and staff notifications efficiently with TesseractApps ChaT.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Communicate securely with colleagues and supervisors, share files, report updates, and access important announcements quickly.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: ChaT",
      faqData: [
        {
          question: "How can I communicate securely with my team?",
          answer:
            "Use ChaT to send encrypted messages and share files safely within your organisation.",
        },
        {
          question: "Can I create groups for teams or departments?",
          answer:
            "Yes. Set up group or role-based chats to keep conversations organised and relevant.",
        },
        {
          question: "Does ChaT integrate with other TesseractApps modules?",
          answer:
            "Yes. Messages and files can be linked to rostering, HR, participant management, and forms.",
        },
        {
          question: "How will I know when messages or files are received?",
          answer:
            "Notifications alert you instantly to new messages, shared documents, or task updates.",
        },
        {
          question: "Is all communication compliant and auditable?",
          answer:
            "Yes. All messages and files are encrypted, securely stored, and fully traceable for audits.",
        },
      ],
    },
  },

  "My Profile": {
    page: "My Profile",
    hero: {
      image: myProfileNew,
      title: "Manage Your Information Efficiently",
      description:
        "Keep your personal and work details up-to-date with TesseractApps. Access schedules, leave balances, certifications, and preferences through a single, secure portal.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Personal Information Management",
          description:
            "Easily update your contact details, emergency contacts, and personal preferences to ensure your information is always current.",
        },
        {
          dot: dots.dot2,
          title: "Leave and Availability",
          description:
            "Track leave balances, submit leave requests, and update availability, with managers able to view and approve requests seamlessly.",
        },
        {
          dot: dots.dot3,
          title: "Training and Certifications",
          description:
            "View completed training, upcoming courses, and mandatory certifications to stay compliant with all role requirements.",
        },
        {
          dot: dots.dot4,
          title: "Shift and Schedule Access",
          description:
            "Check your upcoming shifts, submit timesheets, and view past attendance records to stay organised and aware of your responsibilities.",
        },
        {
          dot: dots.dot5,
          title: "Notifications and Alerts",
          description:
            "Receive reminders for shifts, training, and pending approvals to stay informed and proactive in managing your tasks.",
        },
        {
          dot: dots.dot6,
          title: "Secure and Role-Based Access",
          description:
            "Access is tailored to your role, with your data stored securely and only accessible by authorised personnel.",
        },
      ],
    },
    section3: [
      {
        title: "Personal Management",
        description:
          "TesseractApps My Profile provides a secure portal for staff to manage personal, training, and work-related information. Automated notifications and integration with rostering and HR ensure your details are always current and accurate.",
        images: [myProfile],
      },
    ],
    section4: {
      title: "How My Profile Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For NDIS Staff",
          description:
            "Update personal details, track shifts, and manage training progress independently to maintain accurate records and reduce administrative follow-ups.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Administrators and Managers",
          description:
            "View staff profiles, monitor leave, training, and attendance efficiently, ensuring data accuracy and compliance across your organisation.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
      ],
      images: [accountingImage],
    },
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I update my personal information?",
          answer:
            "You can edit contact details, emergency contacts, and preferences directly in your profile.",
        },
        {
          question: "Can I track my leave and availability?",
          answer:
            "Yes. View balances, submit requests, and monitor approval status easily.",
        },
        {
          question: "How do I keep track of my training and certifications?",
          answer:
            "All completed and upcoming trainings are displayed in your profile, with alerts for mandatory courses.",
        },
        {
          question: "Can I access my schedule and shifts?",
          answer:
            "Yes. View upcoming shifts, submit timesheets, and check attendance records from your dashboard.",
        },
        {
          question: "Is my data secure?",
          answer:
            "All information is stored securely with role-based access, ensuring only authorised personnel can view sensitive data.",
        },
      ],
    },
  },

  Forms: {
    page: "Forms / Custom Forms",
    hero: {
      image: formsNew,
      title: "Streamline Data Collection and Reporting",
      description:
        "Create, manage, and submit digital forms using TesseractApps. Capture participant information, staff records, and operational data efficiently and accurately with TesseractApps.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Custom Form Builder",
          description:
            "Design forms to match your organisation’s needs, including fields for text, checkboxes, signatures, and more.",
        },
        {
          dot: dots.dot2,
          title: "Digital Submission",
          description:
            "Submit forms digitally from mobile or desktop to reduce paper use and streamline data collection.",
        },
        {
          dot: dots.dot3,
          title: "Integration with Modules",
          description:
            "Link forms to participant management, HR, rostering, payroll, or compliance workflows, keeping all records connected and up to date.",
        },
        {
          dot: dots.dot4,
          title: "Approval Workflows",
          description:
            "Set up automated approvals and notifications to ensure forms are reviewed and processed efficiently.",
        },
        {
          dot: dots.dot5,
          title: "Reporting and Analytics",
          description:
            "Generate reports from submitted forms and analyse data for compliance, audits, and operational insights.",
        },
        {
          dot: dots.dot6,
          title: "Secure Storage and Access",
          description:
            "Store all forms in a central repository with role-based access to ensure sensitive data is protected and easily retrievable.",
        },
      ],
    },
    section3: [
      {
        title: "Form Management",
        description:
          "TesseractApps Forms centralises data collection in one platform. Automated workflows, integration with modules, and secure storage reduce administrative work, improve accuracy, and support compliance.",
        images: [prodForms],
      },
    ],
    section4: {
      title: "How Forms / Custom Forms Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Monitor all form submissions, track approvals, and ensure compliance with organisational standards.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR Managers",
          description:
            "Collect staff information, manage onboarding, and track training using custom forms.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For Roster Managers",
          description:
            "Capture shift updates, leave requests, and operational data efficiently using custom forms.",
          cta: {
            title: "Learn more",
            navigate: "Roster Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "Submit care plans, incident reports, and participant updates digitally to reduce errors and improve communication.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: Forms / Custom Forms",
      faqData: [
        {
          question: "Can I create forms specific to my organisation?",
          answer:
            "Yes. The custom form builder allows you to design forms with fields, checkboxes, signatures, and more.",
        },
        {
          question: "How do I submit forms digitally?",
          answer:
            "Staff can complete and submit forms from mobile devices or desktops, eliminating paper forms.",
        },
        {
          question: "Can forms integrate with other TesseractApps modules?",
          answer:
            "Yes. Forms link to participant management, HR, payroll, rostering, and compliance workflows.",
        },
        {
          question: "How can I track approvals?",
          answer:
            "Automated approval workflows notify managers and track the status of each form in real time.",
        },
        {
          question: "Is data secure?",
          answer:
            "All forms are stored securely in the documents with role-based access and full audit trails.",
        },
      ],
    },
  },

  Accounting: {
    page: "Accounting",
    hero: {
      image: accountingNew,
      title: "Simplify Payroll and Financial Management",
      description:
        "Manage payroll, track budgets, and process invoices efficiently using TesseractApps. Integrate finance workflows with rostering, HR, and participant management to ensure accuracy and compliance.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Payroll Processing",
          description:
            "Process pay runs individually or in bulk, tracking hours, leave, and allowances to ensure accurate staff payments.",
        },
        {
          dot: dots.dot2,
          title: "Budget and Cost Tracking",
          description:
            "Monitor participant funding, staff costs, and program budgets to ensure spending aligns with organisational and regulatory requirements.",
        },
        {
          dot: dots.dot3,
          title: "Invoice Generation",
          description:
            "Create invoices for services delivered, link them to participant funding, and export to accounting systems to reduce errors and save time.",
        },
        {
          dot: dots.dot4,
          title: "Bank Integration",
          description:
            "Connect payroll and invoicing to live bank feeds for smooth reconciliation and reporting.",
        },
        {
          dot: dots.dot5,
          title: "Compliance Management",
          description:
            "Ensure all financial processes meet NDIS and organisational compliance standards, maintaining audit-ready records for every transaction.",
        },
        {
          dot: dots.dot6,
          title: "Reporting and Insights",
          description:
            "Generate financial reports on payroll, budgets, and service funding, using dashboards for real-time insights and informed decision-making.",
        },
      ],
    },
    section3: [
      {
        title: "Financial Management",
        description:
          "TesseractApps Accounting centralises payroll, budgeting, and invoicing on one platform. Automated calculations, bank integrations, and compliance tracking reduce errors, save time, and provide full visibility of financial operations.",
        images: [accounting],
      },
    ],
    section4: {
      title: "How Accounting Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Monitor overall financial health, approve payroll, and maintain compliance using one central platform.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For Accountants",
          description:
            "Track costs, reconcile accounts, and generate reports efficiently to reduce errors and save time on manual calculations.",
          cta: {
            title: "Learn more",
            navigate: "Accountant",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For HR Managers and Roster Managers",
          description:
            "Link staff hours and attendance to payroll for accurate payments and effective budget management.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot4,
          title: "For NDIS Staff",
          description:
            "View payslips, track approved hours, and ensure submitted timesheets are processed accurately.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A:",
      faqData: [
        {
          question: "How can I process payroll efficiently?",
          answer:
            "Track staff hours, leave, and allowances and run pay for individuals or in bulk, all from a single platform.",
        },
        {
          question: "Can I monitor participant funding and budgets?",
          answer:
            "Yes. Track costs, budgets, and funding allocations in real time to ensure accuracy and compliance.",
        },
        {
          question: "How do I generate invoices?",
          answer:
            "Create invoices linked to participant services and export them to accounting systems automatically.",
        },
        {
          question: "Is financial data secure and compliant?",
          answer:
            "Yes. All transactions are securely stored, fully traceable, and maintained in line with NDIS and organisational standards.",
        },
        {
          question: "Can I get insights into financial performance?",
          answer:
            "Dashboards and reports provide real-time insights on payroll, budgets, and service funding for informed decision-making.",
        },
      ],
    },
  },
  "T Learning Hub": {
    page: "T Learning Hub",
    hero: {
      image: TLEARNINGNEW,
      title: "Deliver Role-Based Training with Ease",
      description:
        "Provide staff with accessible, personalised training using TesseractApps. Track progress, ensure compliance, and support professional development across your organisation efficiently.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Key Features",
      points: [
        {
          dot: dots.dot1,
          title: "Role-Based Courses",
          description:
            "Assign training based on staff roles, responsibilities, and compliance requirements to ensure everyone receives the right learning content.",
        },
        {
          dot: dots.dot2,
          title: "Mobile-Friendly Learning",
          description:
            "Access courses and tutorials from mobile devices or desktops to learn anytime, anywhere without disrupting workflows.",
        },
        {
          dot: dots.dot3,
          title: "Interactive Tutorials",
          description:
            "Engage staff with step-by-step guides, quizzes, and practical exercises to reinforce their learning.",
        },
        {
          dot: dots.dot4,
          title: "Compliance Tracking",
          description:
            "Monitor completion of mandatory training and certifications, receiving automated alerts for upcoming or overdue courses.",
        },
        {
          dot: dots.dot5,
          title: "Progress Reports",
          description:
            "Generate insights on staff progress, course completion rates, and knowledge gaps to guide development and staffing decisions.",
        },
        {
          dot: dots.dot6,
          title: "Integration with Other Modules",
          description:
            "Link training with HR, rostering, and compliance modules to ensure training records are accurate and easily auditable.",
        },
      ],
    },
    section3: [
      {
        title: "Learning Management",
        description:
          "TesseractApps T Learning Hub centralises training for your organisation. Automated assignments, progress tracking, and integrated reporting streamline professional development, ensure compliance, and support continuous improvement.",
        images: [tLearingHub],
      },
    ],
    section4: {
      title: "How T Learning Hub Helps Your Team",
      points: [
        {
          dot: dots.dot1,
          title: "For Administrators",
          description:
            "Assign courses, monitor compliance, and maintain training records using one central platform.",
          cta: {
            title: "Learn more",
            navigate: "Administrator",
            type: "text",
          },
        },
        {
          dot: dots.dot2,
          title: "For HR Managers",
          description:
            "Manage onboarding, professional development, and mandatory training efficiently with T-Sign.",
          cta: {
            title: "Learn more",
            navigate: "HR Manager",
            type: "text",
          },
        },
        {
          dot: dots.dot3,
          title: "For NDIS Staff",
          description:
            "Access personalised learning content, track progress, and stay compliant with role requirements easily.",
          cta: {
            title: "Learn more",
            navigate: "NDIS Staff",
            type: "text",
          },
        },
      ],
    },

    faqSection: {
      title: "Q&A: T Learning Hub",
      faqData: [
        {
          question: "Can I assign training based on staff roles?",
          answer:
            "Yes. Role-based courses ensure each team member receives content relevant to their responsibilities.",
        },
        {
          question: "How can staff access courses?",
          answer:
            "Courses are mobile-friendly and accessible on desktops or mobile devices anytime, anywhere.",
        },
        {
          question: "Can I track training progress and compliance?",
          answer:
            "Yes. Automated alerts, dashboards, and reports allow you to monitor completion and mandatory training compliance.",
        },
        {
          question: "Does T Learning Hub integrate with other modules?",
          answer:
            "Yes. Training records link with HR, rostering, and compliance modules for accurate reporting and workflow alignment.",
        },
        {
          question: "How do I generate insights on staff learning?",
          answer:
            "Reports provide data on progress, completion rates, and knowledge gaps, supporting informed decisions for development and staffing.",
        },
      ],
    },
  },
  "Salesforce Integration": {
    page: "Salesforce Integration",
    hero: {
      image: salesforce,
      title: "Centralise Participant and Service Data",
      description:
        "TesseractApps is built on Salesforce, providing a secure, scalable, and reliable platform to manage staff, participants, and operations across your organisation.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Core Capabilities",
      points: [
        {
          dot: dots.dot1,
          title: "Secure and Scalable Platform",
          description:
            "Manage your participant, staff, and service data in one system, with Salesforce ensuring enterprise-grade security and supporting organisational growth without disruption.",
        },
        {
          dot: dots.dot2,
          title: "Centralised Data Management",
          description:
            "Store all participant records, staff profiles, and service information in one location to reduce duplication, improve accuracy, and access data instantly when needed.",
        },
        {
          dot: dots.dot3,
          title: "Real-Time Insights",
          description:
            "Dashboards and reporting tools provide real-time visibility into participant engagement, staff performance, and operational metrics, helping you make informed decisions quickly.",
        },
        {
          dot: dots.dot4,
          title: "Automation and Workflow",
          description:
            "Automate tasks such as approvals, notifications, and compliance tracking to reduce manual work and ensure consistent processes across your organisation.",
        },
        {
          dot: dots.dot5,
          title: "Seamless Integration",
          description:
            "Connect TesseractApps with other Salesforce apps and third-party systems to maintain a single source of truth for data and workflows across platforms.",
        },
      ],
    },
    section4: {
      title: "Key Features",
      description: "",
      points: [
        {
          dot: dots.dot1,
          title: "Participant Management",
          description:
            "Track participant details, goals, and services using integrated Salesforce data.",
        },
        {
          dot: dots.dot2,
          title: "Staff Management",
          description:
            "Maintain profiles, qualifications, and training records in a central location.",
        },
        {
          dot: dots.dot3,
          title: "Service Tracking",
          description:
            "Monitor service delivery, session attendance, and participant progress effectively.",
        },
        {
          dot: dots.dot4,
          title: "Reporting and Analytics",
          description:
            "Generate customised reports and dashboards to track performance and outcomes accurately.",
        },
        {
          dot: dots.dot5,
          title: "Compliance and Audit Readiness",
          description:
            "Maintain regulatory compliance through automated alerts, digital approvals, and secure data storage.",
        },
      ],
    },

    faqSection: {
      title: "Q&A: Salesforce Integration",
      faqData: [
        {
          question: "How does Salesforce integration improve data management?",
          answer:
            "It centralises participant, staff, and service data, reducing duplication and ensuring accurate, real-time information.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Yes. TesseractApps leverages Salesforce’s enterprise-grade security, including role-based access, encryption, and audit logs.",
        },
        {
          question: "Can I automate workflows across departments?",
          answer:
            "Absolutely. Approvals, notifications, and compliance tracking can all be automated, saving time and reducing errors.",
        },
        {
          question: "Can I connect TesseractApps with other Salesforce apps?",
          answer:
            "Yes. Integration allows seamless data sharing and workflow coordination across platforms.",
        },
        {
          question: "How does it help with reporting and insights?",
          answer:
            "Dashboards provide real-time visibility into operations, staff performance, and participant outcomes. You can generate reports for management or audits instantly.",
        },
      ],
    },
  },
  "Xero Integration": {
    page: "Xero Integration",
    hero: {
      image: accounting,
      title: "Simplify Payroll and Invoicing",
      description:
        "TesseractApps integrates with Xero to offer accurate, secure, and efficient payroll and financial management for your organisation.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Core Capabilities",
      points: [
        {
          dot: dots.dot1,
          title: "Automated Payroll Processing",
          description:
            "Sync timesheets and roster data with Xero to calculate staff pay accurately, reducing manual entry and minimising errors.",
        },
        {
          dot: dots.dot2,
          title: "Accurate Invoicing",
          description:
            "Generate invoices automatically and export them to Xero, tracking payments, reconciling accounts, and managing participant budgets efficiently.",
        },
        {
          dot: dots.dot3,
          title: "Real-Time Financial Insights",
          description:
            "Dashboards provide instant visibility into payroll expenses, cash flow, and operational costs to help you make informed decisions quickly.",
        },
        {
          dot: dots.dot4,
          title: "Compliance and Reporting",
          description:
            "Maintain compliance with financial regulations by generating audit-ready reports, tracking payroll changes, and keeping complete records for accountability.",
        },
        {
          dot: dots.dot5,
          title: "Seamless Integration",
          description:
            "Connect TesseractApps with Xero to maintain a single source of truth for financial data, synchronising updates automatically to reduce administrative work.",
        },
      ],
    },
    section4: {
      title: "Features",
      description: "",
      points: [
        {
          dot: dots.dot1,
          title: "Payroll Automation",
          description:
            "Process pay runs, leave, allowances, and deductions directly from TesseractApps to Xero efficiently.",
        },
        {
          dot: dots.dot2,
          title: "Invoice Management",
          description:
            "Create and export invoices for funded services or clients, tracking payment status and reconciling with accounting records.",
        },
        {
          dot: dots.dot3,
          title: "Financial Reporting",
          description:
            "Generate reports on staff costs, participant budgets, and operational expenditure for reviews or audits.",
        },
        {
          dot: dots.dot4,
          title: "Budget Tracking",
          description:
            "Monitor participant funding, service costs, and overall budgets, receiving alerts for overages or discrepancies.",
        },
        {
          dot: dots.dot5,
          title: "Audit Readiness",
          description:
            "Maintain complete financial records with secure storage, approval workflows, and traceable changes for full accountability.",
        },
      ],
    },

    faqSection: {
      title: "Q&A: Xero Integration",
      faqData: [
        {
          question: "How does Xero integration improve payroll accuracy?",
          answer:
            "Timesheets and rosters sync directly with Xero, automating calculations and reducing errors.",
        },
        {
          question: "Can I manage invoices efficiently?",
          answer:
            "Yes. TesseractApps generates and exports invoices to Xero automatically, making tracking and reconciliation simple.",
        },
        {
          question: "How does it help with financial compliance?",
          answer:
            "Audit-ready reports, secure data storage, and approval workflows ensure compliance with financial regulations.",
        },
        {
          question: "Can I track budgets in real time?",
          answer:
            "Yes. Dashboards provide live visibility into participant budgets, staff costs, and operational expenditure.",
        },
        {
          question: "Does it reduce administrative work?",
          answer:
            "Absolutely. Automation and integration streamline payroll, invoicing, and reporting, freeing staff to focus on operations.",
        },
      ],
    },
  },
  "Wyzed Integration": {
    page: "Wyzed Integration",
    hero: {
      image: wyzed,
      title: "Streamline Training and Learning",
      description:
        "TesseractApps integrates with Wyzed to provide role-based training, track progress, and maintain compliance across your organisation.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.",
      },
    },
    section2: {
      title: "Core Capabilities",
      points: [
        {
          dot: dots.dot1,
          title: "Role-Based Training",
          description:
            "Assign courses and learning paths to staff based on their roles, ensuring everyone receives relevant training and skills development.",
        },
        {
          dot: dots.dot2,
          title: "Progress Tracking",
          description:
            "Monitor staff training completion in real-time, identifying gaps and providing targeted support to improve performance.",
        },
        {
          dot: dots.dot3,
          title: "Compliance and Audit Readiness",
          description:
            "Track mandatory training for regulatory compliance, generating reports to demonstrate audit readiness and securely maintaining records.",
        },
        {
          dot: dots.dot4,
          title: "Centralised Learning Hub",
          description:
            "Deliver training through a single platform, allowing staff to access courses anytime, on desktop or mobile, ensuring flexibility and engagement.",
        },
        {
          dot: dots.dot5,
          title: "Seamless Integration",
          description:
            "Connect TesseractApps with Wyzed to synchronise staff profiles, roles, and training records automatically, reducing administrative work and ensuring accurate data.",
        },
      ],
    },
    section4: {
      title: "Features",
      description: "",
      points: [
        {
          dot: dots.dot1,
          title: "Course Management",
          description:
            "Create, assign, and manage training courses specific to each role.",
        },
        {
          dot: dots.dot2,
          title: "Progress Reporting",
          description:
            "Track completion, assessment results, and certifications for every staff member.",
        },
        {
          dot: dots.dot3,
          title: "Compliance Tracking",
          description:
            "Monitor mandatory training, generating reports for audits.",
        },
        {
          dot: dots.dot4,
          title: "Mobile-Friendly Learning",
          description:
            "Allow staff to access training anytime, anywhere, on desktop or mobile devices for added convenience.",
        },
        {
          dot: dots.dot5,
          title: "Automated Notifications",
          description:
            "Send reminders for upcoming or overdue training, ensuring compliance.",
        },
      ],
    },

    faqSection: {
      title: "Q&A: Wyzed Integration",
      faqData: [
        {
          question: "How does Wyzed integration improve staff training?",
          answer:
            "Role-based courses and automated tracking ensure staff complete the right training at the right time.",
        },
        {
          question: "Can I monitor training progress in real time?",
          answer:
            "Yes. Dashboards provide instant visibility into course completion and staff performance.",
        },
        {
          question: "How does it support compliance?",
          answer:
            "Track mandatory training and generate audit-ready reports to meet regulatory requirements.",
        },
        {
          question: "Can staff access training on mobile devices?",
          answer:
            "Yes. All courses are accessible on desktop or mobile, providing flexibility and convenience.",
        },
        {
          question: "Does integration reduce administrative workload?",
          answer:
            "Absolutely. Staff profiles and training records sync automatically, removing manual updates and errors.",
        },
      ],
    },
  },
};

