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
