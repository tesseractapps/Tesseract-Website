// src/contexts/AppContext.tsx
import { createContext, useContext, ReactNode, useMemo, useState } from "react";
import {
  // aboutUsPageData,
  byBusinessProblem,
  byBusinessType,
  byCareData,
  byIndustryData,
  byRoleData,
  itemsPageDummyData,
  productsDetailsData,
  SubPagesDummyData,
} from "../utils/DummyData";

export type RouteConfig = {
  name: string;
  path: string;
  data?: any;
  external?: boolean;
};

type AppContextType = {
  getRoute: (route: string) => RouteConfig | null;
  getRouteByName: (name: string) => RouteConfig | null;
  signUp: boolean;
  handleSignup: (value?: boolean) => void;
  bookADemo: boolean;
  handleBookADemo: (value?: boolean) => void;
  closeRoute: string;
  setCloseRoute: React.Dispatch<React.SetStateAction<string>>;
  expoBanner: boolean;
  setExpoBanner: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const location = window.location.pathname;
  // console.log("location:", location);
  const [signUp, setSignUp] = useState(false);
  const [bookADemo, setBookADemo] = useState(false);
  const [closeRoute, setCloseRoute] = useState("");
  const [expoBanner, setExpoBanner] = useState(
    location == "/privacy-policy" ? false : true
  );
  const handleSignup = (value?: boolean) => {
    if (value != undefined) {
      setSignUp(value);
    } else {
      setSignUp(!signUp);
    }
  };
  const handleBookADemo = (value?: boolean) => {
    if (value != undefined) {
      setBookADemo(value);
    } else {
      setBookADemo(!bookADemo);
    }
  };
  // Use useMemo so object identity is stable
  const routes = useMemo<Record<string, RouteConfig>>(
    () => ({
      // ------------------- Static pages -------------------
      "/": { name: "Home", path: "/" },
      "/pricing": { name: "Pricing", path: "/pricing" },
      "/requestDemo": { name: "Book a Demo", path: "/requestDemo" },
      "/book-a-demo": { name: "Book a Demo", path: "/book-a-demo" },
      "/signup": { name: "SignUp", path: "/signup" },
      "/expo": { name: "SignUp", path: "/expo" },
      "/blogs": {
        name: "Blog",
        path: "/blogs",
        data: itemsPageDummyData["Blog"],
      },
      "/whitepapers": {
        name: "Whitepapers",
        path: "/whitepapers",
        data: itemsPageDummyData["Whitepapers"],
      },
      // "/careers": { name: "Careers", path: "/careers" },
      "/contact-us": { name: "Contact Us", path: "/contact-us" },
      "/privacy-policy": { name: "Privacy Policy", path: "/privacy-policy" },
      "/terms-and-Conditions": {
        name: "Terms & Conditions",
        path: "/terms-and-Conditions",
      },
      "/release-notes": { name: "Release Notes", path: "/release-notes" },
      "/careers": { name: "Careers", path: "/about" },
      "/about": { name: "About", path: "/about" },
      "/help-center": { name: "Help Center", path: "/help-center" },
      // "/our-story": {
      //   name: "Our Story",
      //   path: "/our-story",
      //   data: aboutUsPageData["Our Story"],
      // },
      // "/our-mission-and-vision": {
      //   name: "Our Mission & Vision",
      //   path: "/our-mission-and-vision",
      //   data: aboutUsPageData["Our Mission & Vision"],
      // },

      // ------------------- By Role -------------------
      "/administrator": {
        name: "Administrator",
        path: "/administrator",
        data: byRoleData["Administrator"],
      },
      "/roster-manager": {
        name: "Roster Manager",
        path: "/roster-manager",
        data: byRoleData["Roster Manager"],
      },
      "/ndis-staff": {
        name: "NDIS Staff",
        path: "/ndis-staff",
        data: byRoleData["NDIS Staff"],
      },
      "/hr-manager": {
        name: "HR Manager",
        path: "/hr-manager",
        data: byRoleData["HR Manager"],
      },
      "/accountant": {
        name: "Accountant",
        path: "/accountant",
        data: byRoleData["Accountant"],
      },
      "/participant": {
        name: "Participant",
        path: "/participant",
        data: byRoleData["Participant"],
      },

      // ------------------- By Industry -------------------
      "/ndis-industry": {
        name: "NDIS",
        path: "/ndis-industry",
        data: byIndustryData["NDIS Industry"],
      },
      "/ict-industry": {
        name: "ICT",
        path: "/ict-industry",
        data: byIndustryData["ICT Industry"],
      },
      "/retail-hospitality": {
        name: "Retail & Hospitality",
        path: "/retail-hospitality",
        data: byIndustryData["Retail & Hospitality"],
      },
      "/multi-site-businesses": {
        name: "Multi-site Businesses",
        path: "/multi-site-businesses",
        data: byIndustryData["Multi-Site Businesses"],
      },
      "/construction": {
        name: "Construction",
        path: "/construction",
        data: byIndustryData["Construction"],
      },
      "/manufacturing": {
        name: "Manufacturing",
        path: "/manufacturing",
        data: byIndustryData["Manufacturing"],
      },

      // ------------------- By Care -------------------
      "/disability-support-ndis": {
        name: "Disability Support (NDIS Providers)",
        path: "/disability-support-ndis",
        data: byCareData["Disability Support (NDIS)"],
      },
      "/support-coordination": {
        name: "Support Coordination",
        path: "/support-coordination",
        data: byCareData["Support Coordination"],
      },
      "/aged-care-services": {
        name: "Aged Care Services",
        path: "/aged-care-services",
        data: byCareData["Aged Care Services"],
      },
      "/child-care-services": {
        name: "Childcare Services",
        path: "/child-care-services",
        data: byCareData["Childcare Services"],
      },
      "/allied-health-services": {
        name: "Allied Health Practices",
        path: "/allied-health-services",
        data: byCareData["Allied Health Services"],
      },
      "/home-community-care-services": {
        name: "Home & Community Care",
        path: "/home-community-care-services",
        data: byCareData["Home & Community Care Services"],
      },

      // ------------------- By Business Type -------------------
      "/small-businesses": {
        name: "Small Businesses",
        path: "/small-businesses",
        data: byBusinessType["Small Businesses"],
      },
      "/enterprise": {
        name: "Enterprise",
        path: "/enterprise",
        data: byBusinessType["Enterprises"],
      },
      "/franchise": {
        name: "Franchises",
        path: "/franchise",
        data: byBusinessType["Franchises"],
      },
      "/startups": {
        name: "Startups",
        path: "/startups",
        data: byBusinessType["Startups"],
      },

      // ------------------- By Business Problem -------------------
      "/compliance": {
        name: "Compliance",
        path: "/compliance",
        data: byBusinessProblem["Compliance"],
      },
      "/employee-engagement": {
        name: "Employee Engagement",
        path: "/employee-engagement",
        data: byBusinessProblem["Employee Engagement"],
      },
      "/time-efficiency": {
        name: "Time Efficiency",
        path: "/time-efficiency",
        data: byBusinessProblem["Time Efficiency"],
      },
      "/cost-optimisation": {
        name: "Cost Optimisation",
        path: "/cost-optimisation",
        data: byBusinessProblem["Cost Optimisation"],
      },

      // ------------------- Product Details -------------------
      "/product": {
        name: "Product",
        path: "/product",
        data: SubPagesDummyData["Product"],
      },
      "/roster-management": {
        name: "Roster Management",
        path: "/roster-management",
        data: productsDetailsData["Roster Management"],
      },
      "/timesheet": {
        name: "Timesheet",
        path: "/timesheet",
        data: productsDetailsData["Timesheet"],
      },
      "/admin-console": {
        name: "Admin Console",
        path: "/admin-console",
        data: productsDetailsData["Admin Console"],
      },
      "/access-control-panel": {
        name: "Access Control Panel",
        path: "/access-control-panel",
        data: productsDetailsData["Access Control Panel"],
      },
      "/hr-operations": {
        name: "HR Operations",
        path: "/hr-operations",
        data: productsDetailsData["HR Operations"],
      },
      "/t-sign": {
        name: "T-sign",
        path: "/t-sign",
        data: productsDetailsData["T-Sign"],
      },
      "/clock-in-and-clock-out": {
        name: "Clock In & Clock Out",
        path: "/clock-in-and-clock-out",
        data: productsDetailsData["Clock In & Clock Out"],
      },
      "/participant-management": {
        name: "Participant Management",
        path: "/participant-management",
        data: productsDetailsData["Participant Management"],
      },
      "/incident-management": {
        name: "Incident Management",
        path: "/incident-management",
        data: productsDetailsData["Incident Management"],
      },
      "/role-based-dashboard": {
        name: "Role based Dashboard",
        path: "/role-based-dashboard",
        data: productsDetailsData["Role Based Dashboard"],
      },
      "/repository": {
        name: "Repository",
        path: "/repository",
        data: productsDetailsData["Repository"],
      },
      "/chat": {
        name: "ChaT",
        path: "/chat",
        data: productsDetailsData["ChaT (Secure Communication)"],
      },
      "/my-profile": {
        name: "My Profile",
        path: "/my-profile",
        data: productsDetailsData["My Profile"],
      },
      "/forms": {
        name: "Forms",
        path: "/forms",
        data: productsDetailsData["Forms"],
      },
      "/accounting": {
        name: "Accounting",
        path: "/accounting",
        data: productsDetailsData["Accounting"],
      },
      "/t-learning-hub": {
        name: "T Learning Hub",
        path: "/t-learning-hub",
        data: productsDetailsData["T Learning Hub"],
      },
      "/salesforce-integration": {
        name: "Salesforce",
        path: "/salesforce-integration",
        data: productsDetailsData["Salesforce Integration"],
      },
      "/xero": {
        name: "Xero",
        path: "/xero",
        data: productsDetailsData["Xero Integration"],
      },
      "/wyzed": {
        name: "Wyzed",
        path: "/wyzed",
        data: productsDetailsData["Wyzed Integration"],
      },

      // ------------------- External links -------------------
      android: {
        name: "Play Store",
        path: "https://play.google.com/store/apps/details?id=com.compinacle&hl=en&pli=1",
        external: true,
      },
      ios: {
        name: "App Store",
        path: "https://apps.apple.com/al/app/tesseract-apps/id6476831276",
        external: true,
      },
      linkedin: {
        name: "LinkedIn",
        path: "https://www.linkedin.com/company/tesseractapps",
        external: true,
      },
      facebook: {
        name: "Facebook",
        path: "https://www.facebook.com/people/TesseractApps/61573872703468/",
        external: true,
      },
      instagram: {
        name: "Instagram",
        path: "https://www.instagram.com/tesseract_apps",
        external: true,
      },
      youtube: {
        name: "YouTube",
        path: "https://www.youtube.com/@TesseractApps",
        external: true,
      },
    }),
    []
  );

  const getRoute = (route: string) => routes[route] || null;
  const getRouteByName = (name: string) =>
    Object.values(routes).find((r) => r.name === name) || null;

  return (
    <AppContext.Provider
      value={{
        getRoute,
        getRouteByName,
        signUp,
        handleSignup,
        bookADemo,
        handleBookADemo,
        closeRoute,
        setCloseRoute,
        expoBanner,
        setExpoBanner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
