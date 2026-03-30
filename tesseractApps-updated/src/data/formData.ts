export const bookADemoFormData = [
  {
    text: "Organisation",
    question: "What type of organisation are you?",
    hint: "Select the category that best describes your primary service.",
    id: "organisationType",
    multiSelect: false,
    fields: [
      { id: "", type: "option", value: "NDIS Provider", displayName: "NDIS Provider", description: "Specialised support for National Disability Insurance Scheme participants.", icon: "Users" },
      { id: "", type: "option", value: "Support Coordination", displayName: "Support Coordination", description: "Support coordinators and LAC providers.", icon: "Heart" },
      { id: "", type: "option", value: "Allied Health", displayName: "Allied Health", description: "Physiotherapy, occupational therapy, and clinical health practices.", icon: "Stethoscope" },
      { id: "", type: "option", value: "SIL", displayName: "SIL", description: "Supported Independent Living and specialist disability accommodation.", icon: "Home" },
    ],
  },
  {
    text: "Staff Size",
    question: "Select your team size",
    hint: "This helps us customize the modules and user roles for your organisation’s specific needs.",
    id: "staff",
    multiSelect: false,
    fields: [
      { id: "", type: "option", value: "1–15 Staff", displayName: "1–15 Staff", description: "Perfect for small teams and independent clinics starting out.", icon: "User" },
      { id: "", type: "option", value: "16–60 Staff", displayName: "16–60 Staff", description: "Ideal for growing agencies and multi-provider health sites.", icon: "Users" },
      { id: "", type: "option", value: "61–120 Staff", displayName: "61–120 Staff", description: "Comprehensive support for large multi-site organisations.", icon: "Building2" },
      { id: "", type: "option", value: "120+ Staff", displayName: "120+ Staff", description: "Enterprise-grade platform for national service providers.", icon: "Building" },
    ],
  },
  {
    text: "Service Type",
    question: "Let’s lock in a time",
    hint: "Complete your details and select a slot that works for you. We’ll prepare a personalised walkthrough based on your needs.",
    id: "",
    multiSelect: false,
    fields: [
      { type: "input", id: "firstName", displayName: "First Name", value: "" },
      { type: "input", id: "lastName", displayName: "Last Name", value: "" },
      { type: "input", id: "email", displayName: "Work Email", value: "" },
      { type: "input", id: "companyName", displayName: "Organisation Name", value: "" },
      { type: "textarea", id: "notes", displayName: "Anything else?", value: "", placeholder: "Specific features you’d like to see..." },
      { type: "input", id: "schedule", displayName: "Pick a date & time", value: "" },
    ],
  },
];


export const signupFormData = [
  [
    { label: "ABN", required: true, id: "abn", type: "text" },
    { label: "Company Name", required: true, id: "company", type: "text" },
    {
      label: "Industry Served",
      required: true,
      id: "industry",
      type: "select",
      options: [
        { name: "NDIS Provider", value: "NDIS Provider" },
        { name: "Aged Care", value: "Aged Care" },
        { name: "Childcare", value: "Childcare" },
        { name: "Allied Health", value: "Allied Health" },
        { name: "Other", value: "Other" },
      ],
    },
  ],
  [
    { label: "First Name", required: true, id: "firstName", type: "text" },
    { label: "Last Name", required: true, id: "lastName", type: "text" },
    { label: "Email", required: true, id: "email", type: "email" },
    { label: "Phone Number", required: true, id: "phone", type: "text" },
  ],
  [
    {
      label: "Which features are most relevant to your business?",
      required: false,
      id: "features",
      type: "select",
      multiSelect: true,
      options: [
        { name: "Workforce Management", value: "Roster & Schedule " },
        { name: "Workforce Management", value: "Timesheet & Payroll" },
        { name: "Workforce Management", value: "HR Operations" },
        { name: "Business Operations & Admin", value: "Admin Console" },
        { name: "Business Operations & Admin", value: "Access Control Panel " },
        {
          name: "Business Operations & Admin",
          value: "Reporting & Dashboard ",
        },
        {
          name: "Compliance & Client Management",
          value: "NDIS Claims & Invoicing",
        },
        { name: "Compliance & Client Management", value: "Digital Signatures" },
        { name: "other", value: "other" },
      ],
    },
  ],
  [
    {
      label: "How would you like to start?",
      required: true,
      id: "preference",
      type: "select",
      options: [
        {
          name: "Book a Demo",
          value: "Book a Demo - schedule a session with TesseractApps team",
        },
        {
          name: "Start Free Trial",
          value: "Start Free Trial – no credit card required",
        },
      ],
    },
  ],
];

