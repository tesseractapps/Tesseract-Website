import rosternew from "../assets/Roster Management  N.webp";
import timesheetNew from "../assets/My roster time sheet N.webp";
import adminConsoleNew from "../assets/Admin Console N.webp";
import accessNew from "../assets/Access control panel N.webp";
import hrnew from "../assets/HR N.webp";
import repoNew from "../assets/Repository 2.webp";
import participantNew from "../assets/Participants N.webp";
import incidentNew from "../assets/Incident Register N.webp";
import rollbased from "../assets/Role-Based Dashboards N.webp";
import tsignNew from "../assets/T Sign N.webp";
import chatNew from "../assets/Chat N.webp";
import myprofileNew from "../assets/My profile N.webp";
import clockiN from "../assets/clock in clock out N.webp";
import formsNew from "../assets/Form N.webp";
import accountingNew from "../assets/Accounting N.webp";
import TLEARNINGNEW from "../assets/T learner N.webp";
import productImage from "../assets/productImage.webp";

export const SubPagesDummyData = {
  Product: {
    page: "Product",

    section1: {
      title: "TesseractApps Designed for the Way You Work",
      page: "Product",
      description: "Simplify Your Care Operations",
      conclusion:
        "Manage rosters, track mobile staff hours, onboard new team members, and improve communication. TesseractApps provides real-time, cloud-based tools for NDIS providers. Keep everything in one platform so your team can focus on care delivery. ",
      image: "",
      backgroundColor: "var(--color-secondary)",
      cta: {
        buttons: [{ title: "Begin Your Journey", navigate: "Signup" }],
        conclusion: "No credit card is required.   ",
      },
    },
    // section2: {
    //   title: "One Connected Platform",
    //   points: [
    //     {
    //       dot: dots.dot1,
    //       title: "",
    //       description: "Access all essential tools in one system.",
    //     },
    //     {
    //       dot: dots.dot2,
    //       title: "",
    //       description:
    //         "Workforce and participant data live in a single source.",
    //     },
    //     {
    //       dot: dots.dot3,
    //       title: "",
    //       description:
    //         "Gain visibility across care delivery, HR, finance, and operations.",
    //     },
    //     {
    //       dot: dots.dot4,
    //       title: "",
    //       description: "Automation reduces errors and saves time.",
    //     },
    //   ],
    // },
    section3: {
      title: "One Connected Platform",
      images: [productImage],
      description:
        "Access all essential tools in one system. Workforce and participant data live in a single source. Gain visibility across care delivery, HR, finance, and operations. Automation reduces errors and saves time.",
      // discriptionsPoints: [
      //   "Access all essential tools in one system.",
      //   "Workforce and participant data live in a single source.",
      //   "Gain visibility across care delivery, HR, finance, and operations.",
      //   "Automation reduces errors and saves time.",
      // ],
    },
    products: {
      title: "Get Started Today",
      description:
        "See how TesseractApps can simplify your workflows and drive better outcomes for staff and participants alike. ",
      productsData: [
        {
          image: rosternew,
          title: "Roster Management",
          subTitle:
            "Precision Rostering Simplified for Disability Support Carers",
          description:
            "Create rosters that work for both staff and participants. Handle recurring shifts, resolve conflicts, and see changes in real time so your team stays on track.",
        },
        {
          image: timesheetNew,
          title: "Timesheet",
          subTitle:
            "Accurate Tracking. Seamless Approvals. Effortless Payroll. ",
          description:
            "Capture hours with geo-verified clock-ins and match them directly to scheduled shifts. Approvals are flexible, whether you want to check them by staff, by shift, or in bulk. Timesheets connect straight to payroll, so overtime and allowances are always accounted for.",
        },
        {
          image: adminConsoleNew,
          title: "Admin Console",
          description:
            "Control your operations from one place. Update sites, adjust settings, and maintain compliance without switching between different systems. ",
        },
        {
          image: accessNew,
          title: "Access Control Panel",
          description:
            "Keep data secure with role-based access. Add new users in bulk, scale permissions as your team grows, and always know who has access to what. ",
        },
        {
          image: hrnew,
          title: "HR Operations",
          description:
            "Stay across your workforce from hire to performance. Track leave, qualifications, and training to keep your staff supported and compliant. ",
        },
        {
          image: tsignNew,
          title: "T-sign",
          description:
            "Approve documents online with full security. Each action is logged, creating a clear audit trail that supports compliance and reduces manual paperwork. ",
        },
        {
          image: clockiN,
          title: "Clock In & Clock Out",
          description:
            "Record shifts in real time with accuracy. Staff log their hours instantly, managers approve quickly, and payroll runs smoothly with fewer errors.",
        },
        {
          image: participantNew,
          title: "Participant Management",
          description:
            "Organise participant data in a clean, structured way. Access records instantly without the clutter, ensuring care delivery stays focused.",
        },
        {
          image: incidentNew,
          title: "Incident Management",
          description:
            "Log incidents as they occur. Support workplace safety, meet compliance requirements, and keep clear records for audits. ",
        },
        {
          image: repoNew,
          title: "Documents",
          description:
            " Store and share documents in one secure place. Version control keeps every edit tracked and ensures files are always easy to find.",
        },
        {
          image: rollbased,
          title: "Role based Dashboard",
          description:
            "See the data that matters to you. Monitor rosters, HR records, and performance metrics in real time with a clear, role-specific view. ",
        },
        {
          image: chatNew,
          title: "ChaT",
          description:
            " Communicate with your team in a secure channel. Share updates and reduce reliance on external messaging tools.",
        },
        {
          image: myprofileNew,
          title: "My Profile",
          description:
            "Give staff visibility of their own information. From schedules to leave and performance history, everything is managed in one place.",
        },
        {
          image: formsNew,
          title: "Forms",
          description:
            "Replace paperwork with digital forms. Customise them by role and streamline approvals to save time and reduce admin. ",
        },
        {
          image: accountingNew,
          title: "Accounting",
          description: `Connect budgets, invoices, and payroll in one system. Keep financial reporting accurate and ready for compliance checks. `,
        },
        {
          image: TLEARNINGNEW,
          title: "T Learning Hub",
          description:
            " Provide training on demand. Staff learn by role, track progress, and maintain compliance with ongoing development. ",
        },
        // {
        //   image: tesseractApsImage,
        //   title: "AI Coming Soon",
        //   description: "Predict. Act. Simplify",
        // },
      ],
    },
  },
};

