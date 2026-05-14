export const accordiaDummyData = [
  {
    id: 1,
    question: "Is TesseractApps NDIS-compliant?",
    answer:
      "Yes. TesseractApps is purpose-built to align with NDIS regulations. Our platform supports invoicing, claims, participant management, and incident reporting in line with the NDIS Practice Standards.",
  },
  {
    id: 2,
    question: "What can an admin do on the dashboard?",
    answer: "Admins have full visibility and control, including:",
    points: [
      "Managing rosters and shifts",
      "Accessing compliance and payroll tools",
      "Overseeing incident reporting",
      "Generating reports",
      "Customising staff access and permissions",
    ],
  },
  {
    id: 3,
    question: "What is the Incident Management feature?",
    answer:
      "Our Incident Management allows you to record, manage, and track incidents like accidents or compliance breaches. It helps ensure staff and participant safety, meet regulatory obligations, and build a culture of transparency.",
  },
  {
    id: 4,
    question: "Can I Customize the Modules I Use?",
    answer:
      "Absolutely! TesseractApps offers flexible, modular plans so you can choose only the features your organisation needs, from HR to scheduling to compliance.",
  },
  {
    id: 5,
    question: "Is the platform secure?",
    answer:
      "Yes. Built on Salesforce, our platform follows ISO 27001-aligned practices, with encryption, access control, audit logs, and continuous security monitoring to keep your data protected.",
  },
  {
    id: 6,
    question: "Do you provide onboarding and support?",
    answer:
      "Yes. We offer step-by-step onboarding, training sessions, and 24/7 Premium Support (available on select plans) to ensure a smooth transition and ongoing success.",
  },
  {
    id: 7,
    question: "Can support workers use TesseractApps on mobile?",
    answer:
      "Yes. TesseractApps is mobile-friendly. Support workers can log notes, check rosters, and receive alerts in real time, from any device, anywhere.",
  },
  {
    id: 8,
    question: "How do I get started with TesseractApps?",
    answer:
      "You can start by selecting the Request a Demo option. Our team will guide you through the setup and ensure the platform is tailored to your organisation's specific needs.",
  },
];


export const faqPageDummyData = [
  {
    section: "General FAQs",
    faq: [
      {
        question: "What is this platform designed for?",
        answer:
          "This platform provides an all-in-one solution for NDIS providers and ICT organisations to manage participants, staff, rostering, HR, compliance, incidents, finances, and more. It supports smooth operations, data security, and regulatory compliance.",
      },
      {
        question: "Who can use this platform?",
        answer:
          "The platform suits support coordinators, administrative staff, HR professionals, roster managers, finance teams, frontline workers, and ICT administrators. Role-based access ensures users see only the tools and information relevant to their role.",
      },
      {
        question: "Is there role-based access control?",
        answer:
          "Yes. Users access only the features aligned with their roles. Staff can submit leave requests but cannot access financial modules.",
      },
      {
        question: "Can I access the platform on mobile devices?",
        answer:
          "Yes. The platform works on phones and tablets, allowing you to check schedules and complete shift tasks on the move.",
      },
      {
        question: "How secure is the platform?",
        answer:
          "The platform uses role-based access, audit logs, encrypted data, and secure file storage to protect information.",
      },
      {
        question: "Is training available for new users?",
        answer:
          "Yes. The learning hub offers role-specific training videos to get users up to speed quickly.",
      },
      {
        question: "Is support available if I need help?",
        answer:
          "Yes. Support is available during business hours. Users can also submit tickets through the platform.",
      },
      {
        question: "How does the accounting feature work?",
        answer:
          "The platform manages invoices, payroll, expenses, and generates real-time financial reports.",
      },
      {
        question: "Can the software be customised for my organisation?",
        answer:
          "Yes. The platform can be tailored to fit workflows, user roles, and reporting requirements.",
      },
    ],
  },
  {
    section: "Product-Wise FAQs",
    data: [
      {
        title: "Admin Console",
        faq: [
          {
            question: "How can I update my organisation’s details?",
            answer:
              "Update basic organisational information through the admin console. Contact support for changes to sensitive data.",
          },
          {
            question: "What settings can I configure?",
            answer:
              "You can manage support emails, teams, shift timings, and expense reimbursements. Advanced settings, including user roles, require support collaboration.",
          },
          {
            question: "Can I create and manage multiple facilities?",
            answer:
              "Yes. You can add facility profiles with services, contact details, and location addresses.",
          },
        ],
      },
      {
        title: "Access Control Panel",
        faq: [
          {
            question: "What if I forget my username or password?",
            answer:
              "Contact your administrator for your username. Password resets are sent via email link.",
          },
          {
            question: "Can I upload multiple user accounts at once?",
            answer: "Yes. Bulk uploads simplify onboarding for large groups.",
          },
        ],
      },
      {
        title: "HR Operations",
        faq: [
          {
            question: "How are staff created and managed?",
            answer:
              "Staff profiles store personal details, employment information, banking data, documents, and status.",
          },
          {
            question: "How is staff training managed?",
            answer:
              "Training assignments and progress tracking are integrated into the learning platform.",
          },
          {
            question: "Can I monitor staff performance?",
            answer:
              "Yes. The platform supports goal setting, reviews, and evaluations.",
          },
        ],
      },
      {
        title: "Roster Management",
        faq: [
          {
            question: "How are shifts categorised?",
            answer:
              "Shifts are grouped by type such as morning, afternoon, night, sleepover, or custom.",
          },
          {
            question: "What does the auto-scheduling feature do?",
            answer:
              "It assigns staff to shifts based on availability, preferences, and employment rules.",
          },
          {
            question: "What are group shifts?",
            answer: "Group shifts allow:",
            points: [
              "one participant with multiple staff",
              "one staff with multiple participants",
              "or multiple staff and participants at the same location.",
            ],
          },
          {
            question: "Can I add breaks during shifts?",
            answer:
              "Yes. Breaks can be paid or unpaid and factor into timesheets and payroll.",
          },
          {
            question: "How do employees access schedules?",
            answer: "Employees log in to view personalised rosters online.",
          },
          {
            question: "Can employees see other people's schedules?",
            answer: "No. Each employee sees only their own schedule.",
          },
          {
            question: "How do I set up recurring shifts?",
            answer:
              "Shifts can repeat daily, weekly, fortnightly, or monthly. Public holidays are included automatically.",
          },
          {
            question: "What shift types are supported?",
            answer:
              "General, morning, afternoon, night, sleepover, and custom long-duration shifts.",
          },
          {
            question: "How are public holidays handled?",
            answer:
              "Rates apply automatically during manual shift creation and auto-scheduling.",
          },
          {
            question: "How are timesheets created?",
            answer:
              "Timesheets are generated from recorded shifts. Organisations may choose manual or automatic approval.",
          },
          {
            question: "Do timesheets include overtime and penalty rates?",
            answer:
              "Yes. Extended hours, short breaks, weekends, and public holidays are included.",
          },
          {
            question: "How are sleepover shifts reflected?",
            answer:
              "Sleepovers include allowances and active work hours in the final timesheet.",
          },
          {
            question: "Where can I access timesheets and wage reports?",
            answer: "Employees download records from their profile.",
          },
          {
            question: "Can staff claim expenses after a shift?",
            answer:
              "Yes. Reimbursements for eligible expenses are submitted post-shift.",
          },
          {
            question: "How is mileage calculated?",
            answer:
              "Claims are calculated using vehicle type and pre-set per-kilometre rates.",
          },
          {
            question: "What notifications do users receive?",
            answer:
              "Alerts for shift assignments, rejections, cancellations, EOIs, and sign-in reminders.",
          },
          {
            question: "What is an EOI?",
            answer:
              "Expression of Interest allows staff to express interest in open shifts for assignment based on suitability.",
          },
        ],
      },
      {
        title: "T-sign",
        faq: [
          {
            question: "Where can I view signed documents?",
            answer:
              "Access is restricted by role. Administrators and HR personnel manage permissions.",
          },
          {
            question: "How do I know when a document needs my signature?",
            answer: "Notifications prompt you to review and sign documents.",
          },
          {
            question: "Is the signing process secure?",
            answer: "Yes. Signatures are encrypted, compliant, and logged.",
          },
        ],
      },
      {
        title: "Clock In & Clock Out",
        faq: [
          {
            question: "When can I sign in?",
            answer: "Sign in shortly before the scheduled start time.",
          },
          {
            question: "What if I work beyond my scheduled hours?",
            answer: "Record additional hours through follow-up submission.",
          },
          {
            question: "Is supervisor approval required?",
            answer: "Yes. All shift records require sign-off.",
          },
          {
            question: "What if I arrive late?",
            answer: "Submit a manual sign-in request for approval.",
          },
        ],
      },
      {
        title: "Participants Management",
        faq: [
          {
            question: "How do I add a participant?",
            answer:
              "Authorised users create profiles including care, services, and funding data.",
          },
          {
            question: "What is a Participant Journal?",
            answer:
              "It is a secure space for care notes, progress, and instructions.",
          },
          {
            question: "Can participant funding be tracked?",
            answer:
              "Yes. Funding allocation across services and agreements is monitored.",
          },
          {
            question: "What is the Risk Profile?",
            answer:
              "It Documents participant-specific risks to support safe care planning.",
          },
        ],
      },
      {
        title: "Incident Management",
        faq: [
          {
            question: "How do I report an incident?",
            answer:
              "Submit incidents through the platform. Follow-up actions are supported.",
          },
          {
            question: "Can I edit an incident after submission?",
            answer: "Yes, until it is resolved. Resolved incidents are locked.",
          },
          {
            question: "Who can see incidents?",
            answer:
              "Access is role-based. Administrators have broader visibility.",
          },
        ],
      },
      {
        title: "Documents",
        faq: [
          {
            question: "What is the Documents used for?",
            answer: "It stores and manages internal Documents securely.",
          },
          {
            question: "Who can delete files?",
            answer: "Only owners or authorised administrators.",
          },
          {
            question: "Can I control access to specific files?",
            answer: "Yes. Permissions can be assigned by role or user.",
          },
        ],
      },
      {
        title: "Role-based Dashboard",
        faq: [
          {
            question: "How often is data updated?",
            answer:
              "Some dashboards update in real time. Others refresh hourly or daily.",
          },
          {
            question: "Who can access dashboards?",
            answer:
              "Admins access all data. Managers see team data. Users see assigned or personal data.",
          },
        ],
      },
      {
        title: "Chat",
        faq: [
          {
            question: "Is chat secure?",
            answer:
              "Yes. Only verified users communicate within the organisation.",
          },
          {
            question: "Can I share files?",
            answer:
              "Yes. Share PDFs, images, and notes in group or private messages.",
          },
          {
            question: "Can I search previous messages?",
            answer:
              "Yes. Users search by keyword or participant. Admins access logs.",
          },
        ],
      },
      {
        title: "My Profile",
        faq: [
          {
            question: "Where can I complete training?",
            answer:
              "All training is online through your profile. Progress is tracked automatically.",
          },
          {
            question: "How do I prepare for performance reviews?",
            answer:
              "Complete self-assessments, track achievements, respond honestly, and use feedback constructively.",
          },
          {
            question: "How do I request leave?",
            answer: "Submit leave requests through your profile for approval.",
          },
        ],
      },
      {
        title: "Forms",
        faq: [
          {
            question: "Can I create custom forms?",
            answer:
              "Yes. Forms support client onboarding, staff records, and workflows.",
          },
          {
            question: "How are forms shared?",
            answer: "Forms are assigned based on role or context.",
          },
          {
            question: "Can I track form submissions?",
            answer:
              "Yes. Submissions are recorded with timestamps and activity history. Reports are available.",
          },
        ],
      },
      {
        title: "Accounting",
        faq: [
          {
            question: "Can I manage payroll?",
            answer:
              "Yes. The system supports pay runs, payslips, and banking files.",
          },
          {
            question: "How are invoices managed?",
            answer:
              "Create, track, and manage invoices aligned with your accounting structure.",
          },
          {
            question: "What is a general ledger?",
            answer:
              "It records all financial transactions and generates income statements and balance sheets.",
          },
          {
            question: "Does the system support Single Touch Payroll?",
            answer: "Yes. STP reporting is included for compliance.",
          },
          {
            question: "Can I track participant invoices?",
            answer: "Yes. All transactions are recorded and accessible.",
          },
          {
            question: "Can I generate wage reports?",
            answer: "Yes. Reports can be exported in Excel format.",
          },
        ],
      },
      {
        title: "T Learning Hub",
        faq: [
          {
            question: "Who has access to training content?",
            answer: "Access is role-based.",
          },
          {
            question: "Can I track training progress?",
            answer: "Yes. Track completion and revisit materials as needed.",
          },
          {
            question: "Is the training library updated?",
            answer:
              "Yes. Content is regularly refreshed to match platform updates and best practices.",
          },
        ],
      },
    ],
  },
  {
    section: "Timesheet",
    faq: [
      {
        question: "Where can I access timesheets and wage reports?",
        answer: "Records are available in your profile.",
      },
      {
        question: "Can I duplicate entries from previous days?",
        answer: "Yes. The Clone feature reduces repetitive logging.",
      },
      {
        question: "Is timesheet approval supported?",
        answer:
          "Yes. Approvers review, comment, and take action according to business rules.",
      },
    ],
  },
];

