import adminImage from "../assets/Role Administrator.webp";
import rosterManager from "../assets/Product Roster management.webp";
import ndisStaff from "../assets/Role NDIS staff.webp";
import hr from "../assets/Role HR manager.webp";
import accountingImage from "../assets/Role Accounting.webp";
import participantsImage from "../assets/Role Participants.webp";
import one from "../assets/01.webp";
import two from "../assets/02.webp";

const dots = {
  dot1: { outer: "#E6EEFF", middle: "#B4CCFF", inner: "#2563EB" },
  dot2: { outer: "#FFE3E3", middle: "#FEB4B4", inner: "#FC4343" },
  dot3: { outer: "#DBF2E8", middle: "#9DD9C2", inner: "#08A965" },
  dot4: { outer: "#DBE8EF", middle: "#9DC2D1", inner: "#3B7793" },
  dot5: { outer: "#F7ECD9", middle: "#E8C9A5", inner: "#D77E1B" },
  dot6: { outer: "#EBE2FE", middle: "#C7ADFC", inner: "#932EFA" },
};

export const byRoleData = {
  Administrator: {
    hero: {
      image: adminImage,
      title: "Full control in one place",
      page: "Administrator",
      description: `Run your organisation efficiently using TesseractApps. Manage modules, users, and settings from a secure dashboard, maintaining compliance and protecting sensitive data. `,
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Roster Management",
          description:
            "Create and adjust staff schedules easily, approve shifts, and monitor attendance, ensuring administrators maintain proper coverage and reduce scheduling conflicts.",
        },
        {
          dot: dots.dot2,
          title: "Payroll and Accounting",
          description: `Process payroll, reconcile costs, and generate invoices, linking payments to accounting systems and tracking participant budgets. Administrators ensure accurate payments and maintain financial compliance.`,
        },
        {
          dot: dots.dot3,
          title: "Compliance Tracker",
          description:
            "Monitor staff training, certifications, and audit requirements, receiving automated alerts for upcoming deadlines. Administrators stay audit-ready and reduce compliance risks.",
        },
        {
          dot: dots.dot4,
          title: "User Management",
          description:
            "Add, update, or remove users, assign roles and permissions, and track system activity. Administrators maintain security and control access across the organisation. ",
        },
        {
          dot: dots.dot5,
          title: "Documents and T-Sign",
          description:
            "Store documents securely and approve digitally, tracking revisions and maintaining full audit trails. Administrators protect sensitive data and ensure records remain compliant.",
        },
        {
          dot: dots.dot6,
          title: "Role-Based Dashboard",
          description:
            "Monitor operations in one place, tracking staff activity, performance, compliance, and workflows in real-time. Administrators make informed decisions quickly.",
        },
        {
          dot: dots.dot5,
          title: "Communication Tools",
          description:
            "Send messages, share files, and update teams instantly, improving collaboration and ensuring clear communication across departments.",
        },
        {
          dot: dots.dot4,
          title: "Training Hub",
          description:
            "Deliver role-based training to staff, providing tutorials, mobile-friendly courses, and personalised learning, while administrators track progress and support staff development. ",
        },
        {
          dot: dots.dot3,
          title: "Operational Efficiency",
          description:
            "Connect rostering, payroll, HR, and compliance into one workflow, approving shifts and leave through mobile or desktop. Administrators reduce manual steps and streamline operations. ",
        },
        {
          dot: dots.dot2,
          title: "Security and Audit Control",
          description:
            "Control access with role-based permissions, protect sensitive data, track audit histories, and ensure every record is fully traceable. Administrators maintain regulatory compliance effortlessly. ",
        },
      ],
    },
    section3: [
      {
        title: "Management and Compliance",
        description:
          "TesseractApps provides a centralised dashboard for administrators to manage all users, modules, and system settings in one place. Compliance tracking and automated alerts ensure that staff certifications and training remain up to date. Audit logs and secure data storage protect sensitive information while maintaining organisational accountability.",
        images: [one],
      },
      {
        title: "Reporting and Workflow Efficiency ",
        description:
          "Reporting tools and dashboards provide real-time insights into staff performance, service delivery, and operational metrics. Workflow automation reduces manual tasks, allowing administrators to focus on improving efficiency, streamlining processes, and maintaining full organisational oversight.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question:
            "How can I manage all users and system settings efficiently? ",
          answer:
            "TesseractApps centralises management in one dashboard. You can add, update, or remove users, assign roles, and configure system modules from a single interface.",
        },
        {
          question: "How does TesseractApps help with compliance? ",
          answer:
            "Compliance tracking and automated alerts ensure staff certifications and mandatory trainings remain current. Audit logs record all activity for accountability and regulatory readiness. ",
        },
        {
          question:
            " Can I get insights into staff performance and operations? ",
          answer:
            "Yes. Dashboards and reporting tools provide real-time insights into staff performance, service delivery, and operational efficiency. You can generate reports for audits or management review instantly. ",
        },
        {
          question: "How does TesseractApps reduce manual work? ",
          answer:
            "Workflow automation streamlines recurring tasks, approvals, and processes, freeing administrators to focus on strategic oversight and operational improvements. ",
        },
        {
          question: "Is sensitive data protected?",
          answer:
            "All information is stored securely, with audit logs and role-based access to ensure data remains safe and fully traceable.",
        },
      ],
    },
  },
  "Roster Manager": {
    hero: {
      image: rosterManager,
      title: "Full control over staffing and schedules ",
      page: "Roster Manager",
      description:
        "Manage your workforce efficiently using TesseractApps. Plan shifts, track attendance, and optimise staff allocation from a single secure platform. Maintain coverage, reduce conflicts, and ensure compliance. ",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Roster Management",
          description: `Create, adjust, and approve staff schedules with ease, tracking attendance and availability in real-time. Roster Managers ensure proper coverage, reduce scheduling conflicts, and balance workloads effectively. `,
        },
        {
          dot: dots.dot2,
          title: "Timesheets and Attendance",
          description: `Monitor staff hours, submit and approve timesheets, and link shifts to payroll for seamless integration. Ensure accurate reporting, reducing errors in staff payments. `,
        },
        {
          dot: dots.dot3,
          title: "Compliance Tracker",
          description: `Track mandatory training, certifications, and shift requirements. Receive automated alerts for missing documentation or upcoming deadlines, ensuring compliance. Roster Managers stay compliant and reduce risk. `,
        },
        {
          dot: dots.dot4,
          title: "User Management",
          description: ` Assign shifts and access permissions to staff, tracking activity across sites and teams. Roster Managers maintain control of workforce access and responsibilities. `,
        },
        {
          dot: dots.dot5,
          title: "Role-Based Dashboard",
          description: `Monitor roster performance, attendance, and compliance in real-time using the Role-Based Dashboard. Gain insights into staff availability, absences, and workload balance. `,
        },
        {
          dot: dots.dot6,
          title: "Communication Tools",
          description: `Notify staff instantly about shifts, changes, and updates. Share important documents and collaborate with team members across different locations. `,
        },
        {
          dot: dots.dot1,
          title: "Operational Efficiency",
          description: `Connect rostering, payroll, and compliance workflows into one integrated system. Automate shift approvals and streamline schedule updates, reducing manual tasks. `,
        },
        {
          dot: dots.dot2,
          title: "Reporting and Insights",
          description: `Generate reports on shift coverage, staff performance, and attendance trends for better planning. Make informed decisions about workforce allocation and planning using real-time insights. `,
        },
        {
          dot: dots.dot3,
          title: "Security and Audit Control",
          description: `Ensure shift records and timesheets are secure, fully auditable, and compliant with regulations. Maintain transparency and compliance across all workforce activities, ensuring accountability. `,
        },
      ],
    },
    section3: [
      {
        title: "Optimised Workforce Management",
        description:
          "TesseractApps enables Roster Managers to balance workloads, assign staff based on skills or availability, and manage leave seamlessly. Real-time dashboards provide visibility into shift coverage, staff utilisation, and upcoming absences, enabling informed decisions that reduce overtime, prevent burnout, and enhance service delivery.",
        images: [one],
      },
      {
        title: "Reporting and Workflow Efficiency",
        description:
          "Dashboards and reporting tools offer insights into staffing levels, shift coverage, attendance patterns, and workload distribution. Automation reduces manual scheduling and approval tasks, allowing Roster Managers to focus on workforce optimisation and improving operational efficiency.",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I manage staff schedules efficiently?",
          answer:
            "TesseractApps lets you create, adjust, and approve shifts in one platform. Track availability and attendance in real time for accurate planning.",
        },
        {
          question: "Can I monitor staff performance and attendance trends?",
          answer:
            "Yes. Dashboards provide real-time insights into shift coverage, attendance, and workload distribution. Reports are easy to generate and export for review.",
        },
        {
          question: "How does TesseractApps reduce manual work?",
          answer:
            "Automation of shift approvals, notifications, and timesheet tracking reduces repetitive tasks and errors, allowing managers to focus on scheduling and workforce optimisation.",
        },
        {
          question: "Is sensitive staff information secure?",
          answer:
            "All data is stored securely with role-based access and audit logs, ensuring only authorised personnel can view or modify records.",
        },
      ],
    },
  },
  Accountant: {
    hero: {
      image: accountingImage,
      title: "Streamline Financial Operations",
      page: "Accountant",
      description:
        "Manage your financial processes efficiently using TesseractApps. Track payroll, invoices, budgets, and reporting from a single secure platform. Ensure accuracy, compliance, and full financial visibility. ",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Payroll Management",
          description: `Process staff pay runs, reconcile costs, and track allowances efficiently. Link payroll to timesheets for accurate and timely payments. Accountants ensure accuracy and reduce errors. `,
        },
        {
          dot: dots.dot2,
          title: "Invoicing and Billing",
          description: `Generate invoices for services and participants, streamlining the billing process. Automate billing for funded services, linking to accounting systems for seamless financial management. Accountants ensure timely payments and maintain financial compliance. `,
        },
        {
          dot: dots.dot3,
          title: "Budget and Funding Tracker",
          description: `Monitor participant budgets, funding allocations, and expenses in real-time. Track spending and reconcile costs efficiently for accurate financial control. Accountants maintain financial control and accountability. `,
        },
        {
          dot: dots.dot4,
          title: "Reporting and Insights",
          description: `Generate financial reports, audit-ready statements, and budget summaries for quick review. Export data easily for management review or regulatory reporting requirements. Accountants gain clear visibility over operations. `,
        },
        {
          dot: dots.dot5,
          title: "Role-Based Dashboard",
          description: `Monitor all financial metrics in real-time using the role-based dashboard. Track payroll, expenses, invoices, and budgets from one dashboard for easy visibility. Make informed decisions quickly with real-time financial insights. `,
        },
        {
          dot: dots.dot6,
          title: "Compliance Tracker",
          description: `Stay compliant with taxation, auditing, and NDIS reporting requirements, ensuring timely action. Receive automated alerts for upcoming deadlines, ensuring you never miss a crucial date. Accountants minimise risk and ensure accurate financial reporting. `,
        },
        {
          dot: dots.dot1,
          title: "Secure Document Documents",
          description: `Store financial records, invoices, and reports securely with role-based access control. Track revisions, maintain audit trails, and ensure data is accessible only to authorised staff. `,
        },
        {
          dot: dots.dot2,
          title: "Operational Efficiency",
          description: `Connect payroll, invoicing, accounting, and compliance workflows seamlessly on one platform. Automate recurring processes and reduce manual tasks to improve operational efficiency. Accountants streamline operations and minimise errors in financial management. `,
        },
        {
          dot: dots.dot3,
          title: "Communication Tools",
          description: `Share financial updates, reports, and notifications securely with managers or external stakeholders. Improve transparency and collaboration across teams with secure communication tools. `,
        },
      ],
    },
    section3: [
      {
        title: "Financial Management and Compliance",
        description:
          "TesseractApps provides a centralised platform for accountants to manage payroll, invoicing, budgets, and financial reporting. Automated alerts and compliance tracking ensure deadlines, taxation, and auditing requirements are met on time. Secure storage and audit logs protect sensitive financial data, maintaining full compliance.",
        images: [one],
      },
      {
        title: "Reporting and Workflow Efficiency ",
        description:
          "Dashboards and reporting tools provide staff real-time visibility into payroll, spending, and financial performance. Automation reduces manual processes, allowing accountants to focus on accuracy, analysis, and strategic financial planning. ",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I manage payroll and expenses efficiently?",
          answer:
            "TesseractApps centralises payroll, invoicing, and budget tracking, linking them to timesheets and funding allocations for accuracy.",
        },
        {
          question: "How does TesseractApps help with compliance?",
          answer:
            "Automated alerts and audit logs ensure taxation, NDIS reporting, and auditing deadlines are met, maintaining financial accountability.",
        },
        {
          question: "Can I get real-time financial insights?",
          answer:
            "Yes. Dashboards and reports provide instant visibility into payroll, budgets, expenses, and invoices, making decision-making faster and more accurate.",
        },
        {
          question: "How does TesseractApps reduce manual work?",
          answer:
            "Automation of payroll, invoicing, and recurring financial processes reduces errors and repetitive tasks, freeing time for analysis and planning.",
        },
        {
          question: "Is financial data secure?",
          answer:
            "All financial records are stored securely with role-based access and full audit trails, ensuring sensitive information is protected.",
        },
      ],
    },
  },
  "NDIS Staff": {
    hero: {
      image: ndisStaff,
      title: "Deliver Care with Confidence ",
      page: "NDIS Staff",
      description:
        "Manage your daily tasks efficiently using TesseractApps. Access schedules, update participant records, and track sessions from a single secure platform. Stay compliant, organised, and connected to your team. ",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Participant Management",
          description: `View participant profiles, care plans, and session histories, updating progress notes and recording visit details securely. NDIS staff maintain accurate participant records, improving service quality. `,
        },
        {
          dot: dots.dot2,
          title: "Roster and Timesheets",
          description: `Access your schedule, submit timesheets, and track shifts, receiving notifications for changes or approvals. Staff stay on top of rosters, ensuring accurate work hours. `,
        },
        {
          dot: dots.dot3,
          title: "Compliance Tracker",
          description: `Track mandatory training, certifications, and required qualifications, with automated alerts notifying you of upcoming deadlines. NDIS staff maintain compliance with ease. `,
        },
        {
          dot: dots.dot4,
          title: "Communication Tools",
          description: `Send and receive messages with supervisors and colleagues, sharing updates, files, or important notifications instantly. Staff improve collaboration and response times. `,
        },
        {
          dot: dots.dot5,
          title: "T-Sign and Digital Documents",
          description: `Sign care plans, agreements, and other documents digitally, maintaining a secure audit trail and reducing paperwork. Staff save time and remain compliant. `,
        },
        {
          dot: dots.dot6,
          title: "Role-Based Dashboard",
          description: `Monitor your tasks, shifts, and progress in one view. Access quick summaries of participant sessions, attendance, and key responsibilities. `,
        },
        {
          dot: dots.dot1,
          title: "Training Hub",
          description: `Access role-based training, tutorials, and step-by-step learning courses, tracking your progress. Track progress and ensure you meet mandatory requirements efficiently. `,
        },
        {
          dot: dots.dot2,
          title: "Operational Efficiency",
          description: `Submit leave requests, update profiles, and log care sessions via mobile or desktop. Reduce manual paperwork, allowing you to focus on delivering care. `,
        },
        {
          dot: dots.dot3,
          title: "Security and Privacy",
          description: `Protect participant and personal staff data. Access and update records only with authorised permissions, ensuring compliance with NDIS standards. `,
        },
      ],
    },

    section3: [
      {
        title: "Care Management and Compliance ",
        description:
          "TesseractApps provides NDIS staff with a centralised platform to manage participants, schedules, and tasks. Automated alerts ensure that staff certifications, training, and compliance requirements are kept up to date. Digital records and audit trails protect sensitive participant and staff data. ",
        images: [one],
      },
      {
        title: "Reporting and Workflow Efficiency ",
        description:
          "Dashboards and reporting tools provide staff real-time visibility into schedules, session records, and participant progress. Automation reduces manual reporting and paperwork, allowing staff to focus on care delivery and operational efficiency.   ",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question:
            "How can I track participant care and sessions efficiently?",
          answer:
            "TesseractApps allows you to access participant profiles, update session notes, and maintain accurate care records from one platform.",
        },
        {
          question: "How does TesseractApps help me stay compliant?",
          answer:
            "Automated alerts track mandatory trainings, certifications, and qualifications. Digital logs maintain audit-ready records.",
        },
        {
          question: "Can I manage my schedule and timesheets easily?",
          answer:
            "Yes. View rosters, submit timesheets, and receive shift notifications all from your dashboard.",
        },
        {
          question: "How does TesseractApps reduce paperwork?",
          answer:
            "Digital forms, T-Sign approvals, and automated session tracking eliminate manual logs and streamline administrative tasks.",
        },
        {
          question: "Is participant and staff data secure?",
          answer:
            "All information is stored securely with role-based access and full audit trails, ensuring sensitive data is protected.",
        },
      ],
    },
  },
  "HR Manager": {
    hero: {
      image: hr,
      title: " Simplify HR Operations ",
      page: "HR Manager",
      description:
        "Manage your workforce efficiently using TesseractApps. Oversee recruitment, onboarding, leave, and staff development from one secure platform. Ensure compliance, track performance, and optimise HR processes. ",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "HR Operations",
          description: `Manage recruitment, onboarding, and employee records in a single system. Track staff profiles, qualifications, and leave, ensuring workforce information is accurate, up-to-date, and accessible for HR Managers. `,
        },
        {
          dot: dots.dot2,
          title: "Payroll Integration",
          description: `Link HR data to payroll and accounting systems, tracking hours, leave, and staff allowances to ensure accurate pay. HR Managers minimise errors and maintain financial compliance. `,
        },
        {
          dot: dots.dot3,
          title: "Compliance Tracker",
          description: `Monitor mandatory training, certifications, and regulatory requirements efficiently. Receive automated alerts for upcoming deadlines, ensuring timely action. HR Managers remain audit-ready and mitigate compliance risks. `,
        },
        {
          dot: dots.dot4,
          title: "Role-Based Dashboard",
          description: `Monitor workforce metrics, leave balances, training progress, and staff performance in real-time. Gain valuable insights to inform HR decisions and workforce planning. `,
        },
        {
          dot: dots.dot5,
          title: "User Management",
          description: `Assign roles and permissions, track user activity, and control access to sensitive HR data securely. HR Managers ensure security and accountability across the organisation. `,
        },
        {
          dot: dots.dot6,
          title: "Training Hub",
          description: `Deliver role-based training to employees, ensuring they are equipped with the necessary skills.  Provide tutorials, mobile-friendly courses, and personalised learning paths to staff. Track training progress and ensure compliance with organisational standards. `,
        },
        {
          dot: dots.dot1,
          title: "Communication Tools",
          description: `Notify staff instantly about HR updates, policy changes, or training requirements. Share documents and collaborate seamlessly across teams. `,
        },
        {
          dot: dots.dot2,
          title: "Operational Efficiency",
          description: `Automate HR workflows, including leave approvals, onboarding checklists, and performance reviews. Reduce manual tasks and optimise HR operations for greater efficiency. `,
        },
        {
          dot: dots.dot3,
          title: "Security and Audit Control",
          description: ` Maintain secure and traceable employee records that are easily accessible. Track audits, document changes, and ensure compliance with organisational and regulatory standards efficiently. `,
        },
      ],
    },
    section3: [
      {
        title: "HR Management and Compliance ",
        description:
          "TesseractApps provides a centralised dashboard that allows HR Managers to manage all staff records, qualifications, leave, and training requirements. Automated alerts notify managers of upcoming deadlines or missing documentation, ensuring compliance and workforce readiness. ",
        images: [one],
      },
      {
        title: "Reporting and Workflow Efficiency ",
        description:
          "Dashboards and reporting tools offer insights into HR metrics, staff performance, training completion, and leave patterns. Automation reduces manual HR tasks, allowing managers to focus on workforce planning, staff development, and improving operational efficiency. ",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I manage employee records efficiently?",
          answer:
            "TesseractApps centralises HR data, including profiles, qualifications, leave, and training records, all in one platform.",
        },
        {
          question: "How does TesseractApps help with compliance?",
          answer:
            "Automated alerts track mandatory training, certifications, and regulatory deadlines. Audit logs maintain accountability and transparency.",
        },
        {
          question:
            "Can I monitor workforce performance and training progress?",
          answer:
            "Yes. Dashboards provide real-time insights into staff metrics, training completion, and leave trends. Reports are easy to generate for review.",
        },
        {
          question: "How does TesseractApps reduce manual HR work?",
          answer:
            "Workflow automation streamlines onboarding, leave approvals, and performance tracking, reducing errors and repetitive tasks.",
        },
        {
          question: "Is sensitive HR data secure?",
          answer:
            "All HR records are stored securely, with role-based access and full audit logs to protect employee information.",
        },
      ],
    },
  },
  Participant: {
    hero: {
      image: participantsImage,
      title: "Access Your Care and Support Easily ",
      page: "Participant",
      description:
        "Manage your services and personal information using TesseractApps. View your schedules, track support sessions, and access documents securely on one platform. Stay informed and engaged in your care journey.",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    details: {
      points: [
        {
          dot: dots.dot1,
          title: "Personal Dashboard",
          description: `View your upcoming sessions, support staff, and service plans in one place for easy access. Track your schedule and upcoming appointments efficiently. `,
        },
        {
          dot: dots.dot2,
          title: "Service Tracking",
          description: `Monitor your care sessions and goals, ensuring that progress is tracked. Update progress notes and communicate outcomes with your support team to stay aligned. Participants remain informed about the services they receive. `,
        },
        {
          dot: dots.dot3,
          title: "Document Access",
          description: `Access agreements, care plans, invoices, and other important documents securely, keeping everything organised. Digital storage ensures that your records are organised and easily retrievable. `,
        },
        {
          dot: dots.dot4,
          title: "Communication Tools",
          description: `Message your support staff and coordinators directly for quick communication. Share updates, ask questions, and receive timely responses to stay informed. Participants maintain clear and direct communication with their care team. `,
        },
        {
          dot: dots.dot5,
          title: "Notifications and Alerts",
          description: `Receive reminders for upcoming appointments, session changes, and important updates, staying on top of your care schedule. Participants stay on top of their care schedule, ensuring they never miss critical tasks. `,
        },
        {
          dot: dots.dot6,
          title: "Feedback and Reporting",
          description: `Provide feedback on services and support staff, helping improve care delivery. Track your progress and review completed sessions to monitor your care journey. Participants are empowered to actively engage in their care planning and decision-making. `,
        },
        {
          dot: dots.dot1,
          title: "Security and Privacy",
          description: `All personal and care information is securely stored, ensuring privacy. Access is controlled, and data is protected according to NDIS standards, safeguarding participant privacy. `,
        },
      ],
    },

    section3: [
      {
        title: "Centralised Access and Transparency",
        description:
          "TesseractApps provides participants with a single platform to view schedules, documents, and service updates easily. Notifications and reminders ensure participants are informed about upcoming appointments and any changes to their support. Secure access protects personal information while ensuring transparency and engagement in care. ",
        images: [one],
      },
      {
        title: "Participation and Workflow Efficiency",
        description:
          "Participants can track their goals, provide feedback, and communicate with their care team in real-time. Digital records and automated alerts reduce confusion, improve engagement, and simplify the management of support services. ",
        images: [two],
      },
    ],
    faqSection: {
      title: "Q&A",
      faqData: [
        {
          question: "How can I view my schedule and upcoming sessions?",
          answer:
            "TesseractApps provides a personal dashboard where you can see all upcoming appointments and assigned support staff.",
        },
        {
          question: "Can I access my care plans and documents securely?",
          answer:
            "Yes. All important documents, agreements, and session records are stored digitally and accessible only to authorised users.",
        },
        {
          question: "How do I communicate with my support team?",
          answer:
            "Use built-in messaging tools to contact your support staff or coordinators instantly.",
        },
        {
          question: "How will I stay updated on changes to my services?",
          answer:
            "Notifications and alerts inform you of schedule changes, session updates, and other important care information.",
        },
        {
          question: "Is my personal information protected?",
          answer:
            "All participant data is stored securely with role-based access and full compliance with NDIS privacy and security standards.",
        },
      ],
    },
  },
};

