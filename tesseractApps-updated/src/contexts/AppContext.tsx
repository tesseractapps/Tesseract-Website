// src/contexts/AppContext.tsx
import { createContext, useContext, ReactNode, useMemo, useState } from "react";
import { productsDetailsData } from "../data/productsData";
import { SubPagesDummyData } from "../data/subPagesData";

type RouteConfig = {
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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [signUp, setSignUp] = useState(false);
  const [bookADemo, setBookADemo] = useState(false);
  const [closeRoute, setCloseRoute] = useState("");
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
      "/platform": { name: "Platform", path: "/platform" },
      "/requestDemo": { name: "Book a Demo", path: "/requestDemo" },
      "/requestdemo": { name: "Book a Demo", path: "/requestdemo" },
      "/book-a-demo": { name: "Book a Demo", path: "/book-a-demo" },
      "/signup": { name: "SignUp", path: "/signup" },

      "/capabilities": { name: "Capabilities", path: "/capabilities" },
      "/solutions": { name: "Solutions", path: "/solutions" },

      // ------------------- Capability pages -------------------
      "/capabilities/rostering-scheduling": { name: "Rostering & Scheduling", path: "/capabilities/rostering-scheduling" },
      "/capabilities/timesheets-payroll": { name: "Timesheets & Payroll Alignment", path: "/capabilities/timesheets-payroll" },
      "/capabilities/workforce-management": { name: "Workforce Management", path: "/capabilities/workforce-management" },
      "/capabilities/participant-management": { name: "Participant Management", path: "/capabilities/participant-management" },
      "/capabilities/incidents": { name: "Incidents", path: "/capabilities/incidents" },
      "/capabilities/compliance-audit": { name: "Compliance & Audit Readiness", path: "/capabilities/compliance-audit" },
      "/capabilities/ndis-claiming": { name: "NDIS Claiming & Invoicing", path: "/capabilities/ndis-claiming" },
      "/capabilities/accounting-reporting": { name: "Accounting & Financial Reporting", path: "/capabilities/accounting-reporting" },
      "/capabilities/dashboards-reporting": { name: "Dashboards & Reporting", path: "/capabilities/dashboards-reporting" },
      "/blogs": { name: "Blog", path: "/blogs" },
      "/whitepapers": { name: "Whitepapers", path: "/whitepapers" },
      "/case-studies": { name: "Case Studies", path: "/case-studies" },
      "/webinars": { name: "Webinars", path: "/webinars" },
      "/contact-us": { name: "Contact Us", path: "/contact-us" },
      "/privacy-policy": { name: "Privacy Policy", path: "/privacy-policy" },
      "/terms-and-conditions": {
        name: "Terms & Conditions",
        path: "/terms-and-conditions",
      },
      "/changelog": { name: "Release Notes", path: "/changelog" },
      "/careers": { name: "Careers", path: "/careers" },
      "/about": { name: "About", path: "/about" },
      "/help-center": { name: "Help Centre", path: "/help-center" },
      "/help-centre": { name: "Help Centre", path: "/help-centre" },

      // ------------------- By Stage (active, Sanity CMS, no hardcoded data) -------------------
      "/solutions/start": { name: "Start", path: "/solutions/start" },
      "/solutions/growth": { name: "Growth", path: "/solutions/growth" },
      "/solutions/scale": { name: "Scale", path: "/solutions/scale" },
      "/solutions/enterprise": { name: "Enterprise", path: "/solutions/enterprise" },

      // ------------------- By Care (active, Sanity CMS, no hardcoded data) -------------------
      "/solutions/disability-support-ndis": {
        name: "Disability Support (NDIS Providers)",
        path: "/solutions/disability-support-ndis",
      },
      "/solutions/support-coordination": {
        name: "Support Coordination",
        path: "/solutions/support-coordination",
      },
      "/solutions/allied-health-services": {
        name: "Allied Health Practices",
        path: "/solutions/allied-health-services",
      },
      "/solutions/sil": {
        name: "Supported Independent Living",
        path: "/solutions/sil",
      },
      // Legacy paths preserved so getRoute() resolves for setCloseRoute etc.
      "/disability-support-ndis": {
        name: "Disability Support (NDIS Providers)",
        path: "/disability-support-ndis",
      },
      "/support-coordination": {
        name: "Support Coordination",
        path: "/support-coordination",
      },
      "/allied-health-services": {
        name: "Allied Health Practices",
        path: "/allied-health-services",
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
      "/Documents": {
        name: "Documents",
        path: "/Documents",
        data: productsDetailsData["Documents"],
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
