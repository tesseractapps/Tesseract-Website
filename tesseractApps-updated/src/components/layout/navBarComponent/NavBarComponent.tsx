import { Search } from 'lucide-react';
import Popup from "../../layout/popupComponent/PopupComponent";
import "./NavBarStyles.css";
import { useEffect, useMemo, useState } from "react";
import { RefObject } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { navBarDummyData } from "../../../data/navData";
import type { NavGroup, NavLink } from "../../../data/navData";
import { useSanityCapabilityNav } from "../../../hooks/useSanityCapabilityNav";
import { useSanitySolutionNav } from "../../../hooks/useSanitySolutionNav";
interface PopupPosition {
  top: number;
  left: number;
}
import ArrowDown from "../../../assets/arrow_down.svg";
import useAppNavigate from "../../../hooks/useAppNavigate";
import AppLogo from "../../layout/appLogo/AppLogo";

type SearchItem = { label: string; path: string; category: string };

// Fallback capability items used when Sanity hasn't loaded yet
const STATIC_CAPABILITY_ITEMS: SearchItem[] = [
  { label: "Rostering & Scheduling",           path: "/capabilities/rostering-scheduling",  category: "Capability" },
  { label: "Timesheets & Payroll",             path: "/capabilities/timesheets-payroll",     category: "Capability" },
  { label: "Workforce Management",             path: "/capabilities/workforce-management",   category: "Capability" },
  { label: "Participant Management",           path: "/capabilities/participant-management", category: "Capability" },
  { label: "Incidents",                        path: "/capabilities/incidents",              category: "Capability" },
  { label: "Compliance & Audit Readiness",     path: "/capabilities/compliance-audit",       category: "Capability" },
  { label: "NDIS Claiming & Invoicing",        path: "/capabilities/ndis-claiming",          category: "Capability" },
  { label: "Accounting & Financial Reporting", path: "/capabilities/accounting-reporting",   category: "Capability" },
  { label: "Dashboards & Reporting",           path: "/capabilities/dashboards-reporting",   category: "Capability" },
];

// Fallback solution items used when Sanity hasn't loaded yet
const STATIC_SOLUTION_ITEMS: SearchItem[] = [
  { label: "Disability Support (NDIS)",  path: "/solutions/disability-support-ndis",  category: "Solution" },
  { label: "Support Coordination",       path: "/solutions/support-coordination",      category: "Solution" },
  { label: "Allied Health",              path: "/solutions/allied-health-services",    category: "Solution" },
  { label: "SIL",                        path: "/solutions/sil",                       category: "Solution" },
  { label: "Operations Manager",         path: "/solutions/operations-manager",        category: "Solution" },
  { label: "Compliance Lead",            path: "/solutions/compliance-lead",           category: "Solution" },
  { label: "Finance Manager",            path: "/solutions/finance-manager",           category: "Solution" },
  { label: "Support Worker",             path: "/solutions/support-worker",            category: "Solution" },
  { label: "Start (1–15 staff)",         path: "/solutions/start",                     category: "Solution" },
  { label: "Growth (15–60 staff)",       path: "/solutions/growth",                    category: "Solution" },
  { label: "Scale (60–120 staff)",       path: "/solutions/scale",                     category: "Solution" },
  { label: "Enterprise (120+ staff)",    path: "/solutions/enterprise",                category: "Solution" },
];

// Static pages — always present regardless of Sanity
const STATIC_PAGE_ITEMS: SearchItem[] = [
  { label: "Platform",      path: "/platform",     category: "Page" },
  { label: "Pricing",       path: "/pricing",      category: "Page" },
  { label: "About Us",      path: "/about",        category: "Page" },
  { label: "Our Story",     path: "/our-story",    category: "Page" },
  { label: "Careers",       path: "/careers",      category: "Page" },
  { label: "Contact Us",    path: "/contact-us",   category: "Page" },
  { label: "Book a Demo",   path: "/book-a-demo",  category: "Page" },
  { label: "Sign Up",       path: "/signup",       category: "Page" },
  { label: "Blog",          path: "/blogs",        category: "Resource" },
  { label: "Whitepapers",   path: "/whitepapers",  category: "Resource" },
  { label: "Case Studies",  path: "/case-studies", category: "Resource" },
  { label: "Webinars",      path: "/webinars",     category: "Resource" },
  { label: "Help Centre",   path: "/help-center",  category: "Resource" },
  { label: "Release Notes", path: "/changelog",    category: "Resource" },
];

const NavBarComponent = ({
  portalContainerRef,
}: {
  portalContainerRef: RefObject<HTMLDivElement | null>;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  const appNavigate = useAppNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<
    "About" | "Platform" | "Capabilities" | "Solutions" | "Pricing" | "Resources" | "Contact Us" | ""
  >("");
  const DROPDOWN_LINKS = ["Capabilities", "Solutions", "Resources"];
  const NAV_LINKS = ["Platform", "Capabilities", "Pricing", "Solutions", "Resources", "About", "Contact Us"];
  const CAP_IDX = NAV_LINKS.indexOf("Capabilities");
  const SOL_IDX = NAV_LINKS.indexOf("Solutions");
  const RES_IDX = NAV_LINKS.indexOf("Resources");

  // Live Sanity nav data — falls back to navData.ts while loading (no flash)
  const { links: capLinks, loading: capLoading } = useSanityCapabilityNav();
  const { links: solLinks, loading: solLoading } = useSanitySolutionNav();

  // Capabilities: group live Sanity links by navGroup; fall back to hardcoded while loading
  const capNavGroups: NavGroup[] = (!capLoading && capLinks.length > 0)
    ? (() => {
        const groupMap = new Map<string, NavLink[]>();
        capLinks.forEach((link) => {
          if (!groupMap.has(link.navGroup)) groupMap.set(link.navGroup, []);
          groupMap.get(link.navGroup)!.push({
            title: link.title,
            subTitle: link.navSubtitle ?? link.heroSubtitle,
            href: `/capabilities/${link.slug.current}`,
          });
        });
        return Array.from(groupMap.entries()).map(([heading, links]) => ({ heading, links }));
      })()
    : navBarDummyData["Capabilities"];

  // Solutions: group live Sanity links by navCategory; fall back to hardcoded while loading
  const solNavCategories: Record<string, NavLink[]> = (!solLoading && solLinks.length > 0)
    ? (() => {
        const catMap: Record<string, NavLink[]> = {
          "BY CARE TYPE": [],
          "BY ROLE": [],
          "BY STAGE": [],
        };
        solLinks.forEach((link) => {
          if (catMap[link.navCategory]) {
            catMap[link.navCategory].push({
              title: link.title,
              subTitle: link.navSubtitle ?? link.heroSubtitle,
              href: `/solutions/${link.slug.current}`,
            });
          }
        });
        // Do not fallback to navBarDummyData for empty categories to avoid coming-soon links
        // if (catMap["BY ROLE"].length === 0) catMap["BY ROLE"] = navBarDummyData["Solutions"]["BY ROLE"];
        // if (catMap["BY STAGE"].length === 0) catMap["BY STAGE"] = navBarDummyData["Solutions"]["BY STAGE"];
        return catMap;
      })()
    : navBarDummyData["Solutions"];

  // Dynamic search items built from live Sanity data — always accurate slugs
  const dynamicSearchItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // Capabilities from live Sanity (slug is ground truth)
    if (capLinks.length > 0) {
      capLinks.forEach((link) => {
        items.push({
          label: link.title,
          path: `/capabilities/${link.slug.current}`,
          category: "Capability",
        });
      });
    } else {
      // Fallback: only the 9 hardcoded capability pages that exist in AppRoutes
      STATIC_CAPABILITY_ITEMS.forEach((item) => items.push(item));
    }

    // Solutions from live Sanity
    if (solLinks.length > 0) {
      solLinks.forEach((link) => {
        items.push({
          label: link.title,
          path: `/solutions/${link.slug.current}`,
          category: "Solution",
        });
      });
    } else {
      STATIC_SOLUTION_ITEMS.forEach((item) => items.push(item));
    }

    // Static pages — always appended
    STATIC_PAGE_ITEMS.forEach((item) => items.push(item));

    return items;
  }, [capLinks, solLinks]);

  // useEffect(() => {
  // const handleScroll = () => {
  //   const currentScrollY = window.scrollY;

  //   if (currentScrollY < lastScrollY) {
  //     // scrolling up
  //     setShowHeader(true);
  //   } else {
  //     // scrolling down
  //     setShowHeader(false);
  //   }

  //   setLastScrollY(currentScrollY);
  // };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);
  useEffect(() => {
    const currentPath = pathname.split("/")[1];
    if (currentPath == "" || currentPath == "coming-soon") {
      setActiveLink("");
    }
    if (
      currentPath == "our-story" ||
      currentPath == "our-mission" ||
      currentPath == "our-vision" ||
      currentPath == "team" ||
      currentPath == "careers" ||
      currentPath == "contact-information" ||
      currentPath == "about"
    ) {
      setActiveLink("About");
    }
    if (currentPath == "platform") {
      setActiveLink("Platform");
    }
    if (currentPath == "capabilities") {
      setActiveLink("Capabilities");
    }
    if (
      currentPath == "solutions" ||
      currentPath == "ndis-industry" ||
      currentPath == "ict-industry" ||
      currentPath == "administrator" ||
      currentPath == "roster-manager" ||
      currentPath == "ndis-staff" ||
      currentPath == "hr-manager" ||
      currentPath == "accountant" ||
      currentPath == "participant" ||
      currentPath == "retail-hospitality" ||
      currentPath == "multi-site-businesses" ||
      currentPath == "construction" ||
      currentPath == "manufacturing" ||
      currentPath == "disability-support-ndis" ||
      currentPath == "support-coordination" ||
      currentPath == "aged-care-services" ||
      currentPath == "child-care-services" ||
      currentPath == "allied-health-services" ||
      currentPath == "home-community-care-services" ||
      currentPath == "small-businesses" ||
      currentPath == "enterprise" ||
      currentPath == "franchise" ||
      currentPath == "startups" ||
      currentPath == "compliance" ||
      currentPath == "employee-engagement" ||
      currentPath == "time-efficiency" ||
      currentPath == "cost-optimisation"
    ) {
      setActiveLink("Solutions");
    }
    if (currentPath == "pricing") {
      setActiveLink("Pricing");
    }
    if (
      currentPath == "blogs" ||
      currentPath == "faq" ||
      currentPath == "whitepapers" ||
      currentPath == "help-center" ||
      currentPath == "case-studies" ||
      currentPath == "webinars" ||
      currentPath == "changelog"
    ) {
      setActiveLink("Resources");
    }
    if (currentPath == "contact-us") {
      setActiveLink("Contact Us");
    }
    if (currentPath == "requestDemo") {
      setActiveLink("");
    }
  }, [pathname]);
  const [selectedLink, setSelectedLink] = useState<
    keyof typeof navBarDummyData | "" | "navbar-profile-icon"
  >("");
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(
    null
  );

  const handleSearchIcon = (value?: boolean) => {
    typeof value === "boolean"
      ? setShowSearch(value)
      : setShowSearch(!showSearch);
  };
  const NAV_ROUTES: Record<string, string> = {
    Capabilities: "/capabilities",
    Solutions: "/solutions",
    About: "/about",
    "Contact Us": "/contact-us",
  };
  const handleNavClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const name = event.currentTarget.id;
    setToggleDrawer(false);
    if (name) {
      appNavigate(NAV_ROUTES[name] ?? name);
    }
  };
  const handleNavPopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    // 🎯 Calculate CENTER of the nav link
    let centerX = rect.left + rect.width / 2;

    setPopupPosition({
      top: rect.bottom + 6, // just below the nav link
      left: centerX,
    });
    setPopupOpen(true);
    const name = event.currentTarget.id;
    setSelectedLink(name as keyof typeof navBarDummyData | "");
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupPosition(null);
  };
  const popupLinkClickHandler = (name: string) => {
    closePopup();
    handleSearchIcon(false);
    setSearchTerm("");
    handleSearch(name);
    setToggleDrawer(false);
    if (name && name == "Free Trial Sign-Up") {
      appNavigate("/signup");
      return;
    }
    if (name && name == "Book a Demo") {
      appNavigate("/book-a-demo");
      return;
    }
    if (name) {
      appNavigate(name);
    }
  };
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [expanded, setExpanded] = useState(-1);

  // Lock body scroll and handle Escape key when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = toggleDrawer ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToggleDrawer(false);
    };
    if (toggleDrawer) document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [toggleDrawer]);

  const handleExpansion = (index: number) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded === index) {
        return -1;
      } else {
        return index;
      }
    });
  };
  const loginHandler = () => {
    window.open("https://tesseractapps.my.site.com/s/login/", "_blank");
    // appNavigate("Signup", navigate);
    closePopup();
  };
  const signupHandler = () => {
    appNavigate("/signup");
    closePopup();
  };

  const handleSearch = (name: string) => {
    if (name) {
      addSearch(name);
    }
  };
  const addSearch = (term: string) => {
    setSearchHistory((prev) => {
      const updated = [...prev, term];
      if (updated.length > 5) {
        updated.shift(); // remove oldest
      }
      return updated;
    });
  };
  useNavigationType();
  return (
    <nav
      // className={`navbar-container ${showHeader ? "visible" : "hidden"}`}
      id="navbar-container"
    >
      {/* {pathname.split("/")[1] && canGoBack && (
        // <img loading="lazy"
        //   id="nav-back"
        //   src={BackArrow}
        //   alt="nav-back"
        //   onClick={() => navigate(-1)}
        // />

        <div
          className="arrow-container"
          id="nav-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </div>
      )} */}

      {/* <div id="navbar-logo" onClick={() => navigate("/")}>
        <img loading="lazy" src={logo_small} alt="tesseract logo" />
        TesseractApps
      </div> */}
      <AppLogo />
      <div id="nav-mobile-actions">
        <div
          id="nav-mobile-search-icon"
          onClick={() => handleSearchIcon()}
          aria-label="Search"
          role="button"
        >
          <Search size={20} />
        </div>

        <div
          id="nav-menu-icon"
          onClick={() => setToggleDrawer(!toggleDrawer)}
          aria-label="Open navigation menu"
          role="button"
        >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </div>
      </div>

      {/* Backdrop — clicking it closes the drawer */}
      {toggleDrawer && (
        <div
          id="nav-drawer-backdrop"
          onClick={() => setToggleDrawer(false)}
          aria-hidden="true"
        />
      )}

      {/* Native CSS drawer — replaces MUI Drawer to remove vendor-ui from initial bundle */}
      <div
        id="nav-menu-drawer"
        className={toggleDrawer ? "open" : ""}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div id="nav-menu-card">
          <div id="nav-menu-header">
            <div onClick={() => setToggleDrawer(false)}>
              <AppLogo />
            </div>
            <button
              id="nav-drawer-close"
              onClick={() => setToggleDrawer(false)}
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div id="nav-menu-ctas">
              <div
                className="navbar-tryItFree nav-drawer-btn"
                onClick={() => {
                  appNavigate("/signup");
                  setToggleDrawer(false);
                }}
              >
                <span className="navbar-requestDemo-text">Begin Your Journey</span>
              </div>
              <div
                className="navbar-requestDemo nav-drawer-btn"
                onClick={() => {
                  appNavigate("/book-a-demo");
                  setToggleDrawer(false);
                }}
              >
                <span className="navbar-requestDemo-text">Book a Demo</span>
              </div>
            </div>
        <div id="nav-menu-links">
            {NAV_LINKS.map((label, index) => {
              if (label != "Pricing" && label != "About" && label != "Platform" && label != "Contact Us") {
                return (
                  <div key={label} className="nav-accordion">
                    <div
                      className="nav-accordion-summary"
                      onClick={() => handleExpansion(index)}
                    >
                      <span className="nav-accordion-label">{label}</span>
                      <img
                        loading="lazy"
                        src={ArrowDown}
                        alt="arrow"
                        className={
                          expanded === index
                            ? "nav-accordion-arrow expanded"
                            : "nav-accordion-arrow"
                        }
                      />
                    </div>
                    <div
                      className={
                        expanded === index
                          ? "nav-accordion-details open"
                          : "nav-accordion-details"
                      }
                    >
                      <div className="nav-accordion-content">
                        {expanded == CAP_IDX && (
                            <>
                              {capNavGroups.map(
                                (value, index) => (
                                  <div key={value.heading + index}>
                                    <div className="nav-accordion-group-heading">{value.heading}</div>
                                    {value.links.map((link, innerIndex) => (
                                      <div
                                        key={link.title + innerIndex}
                                        className="nav-inner-container"
                                        onClick={() => {
                                          if (link.href) {
                                            appNavigate(link.href);
                                            setToggleDrawer(false);
                                          } else {
                                            popupLinkClickHandler(link.title);
                                          }
                                        }}
                                      >
                                        <div className="nav-title">
                                          {link.title}
                                        </div>
                                        <div className="nav-sub-title">
                                          {link.subTitle}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )
                              )}
                            </>
                          )}
                        {expanded == RES_IDX &&
                          Array.isArray(navBarDummyData["Resources"]) &&
                          navBarDummyData["Resources"].map((value, index) => (
                            <div
                              key={value.title + index}
                              className="nav-inner-container"
                              onClick={() => {
                                if (value.href) {
                                  appNavigate(value.href);
                                  setToggleDrawer(false);
                                } else {
                                  popupLinkClickHandler(value.title);
                                }
                              }}
                            >
                              <div className="nav-title">{value.title}</div>
                              <div className="nav-sub-title">
                                {value.subTitle}
                              </div>
                            </div>
                          ))}
                        {expanded == SOL_IDX && (
                          <div id="nav-menu-solutions">
                            {(["BY CARE TYPE", "BY ROLE", "BY STAGE"] as const).map((cat) => (
                              <div key={cat}>
                                <div className="services-heading">{cat}</div>
                                {Array.isArray(solNavCategories[cat]) &&
                                  solNavCategories[cat].map((value, index) => (
                                    <div
                                      key={value.title + index}
                                      className="nav-inner-container"
                                      onClick={() => {
                                        if (value.href) {
                                          appNavigate(value.href);
                                          setToggleDrawer(false);
                                        } else {
                                          popupLinkClickHandler(value.title);
                                        }
                                      }}
                                    >
                                      <div className="nav-title">{value.title}</div>
                                      <div className="nav-sub-title">{value.subTitle}</div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else if (label == "Platform" || label == "About" || label == "Contact Us") {
                return (
                  <div
                    className="nav-menu-link no-dropdown"
                    key={label}
                    onClick={() => {
                      appNavigate(NAV_ROUTES[label] ?? `/${label.toLowerCase().replace(/ /g, "-")}`);
                      setToggleDrawer(false);
                    }}
                  >
                    {label}
                  </div>
                );
              } else {
                return (
                  <div
                    className="nav-menu-link no-dropdown"
                    key={label}
                    id={label}
                    onClick={handleNavClick}
                  >
                    {label}
                  </div>
                );
              }
            })}
          </div>
          <div id="nav-menu-footer">
            <div id="nav-menu-auth">
              {/* <button className="nav-auth-btn nav-auth-btn--primary" onClick={signupHandler}>Sign Up</button> */}
              <button className="nav-auth-btn nav-auth-btn--secondary" onClick={loginHandler}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
      <div id="navbar-links">
        <div id="navbar-links-links">
          {NAV_LINKS.map((label, index) => {
            const shouldHavePopup = DROPDOWN_LINKS.includes(label);

            return (
              <div
                key={label + index}
                id={label}
                className={
                  "nav-link" +
                  (activeLink == label || (isPopupOpen && selectedLink == label)
                    ? " nav-link-active"
                    : "")
                }
                onClick={handleNavClick}
                onMouseEnter={(event) => {
                  if (label == "Pricing") closePopup();
                  if (shouldHavePopup) handleNavPopupClick(event);
                }}
                onMouseLeave={() => {
                  if (label == "Pricing") closePopup();
                }}
              // onMouseLeave={shouldHavePopup ? closePopup : undefined}
              >
                {label}
              </div>
            );
          })}
          <div id="navbar-search">
            <Search
              className="navbar-search-icon"
              onClick={() => handleSearchIcon()}
            />
          </div>

          <div
            className="navbar-tryItFree"
            onClick={() => appNavigate("/signup")}
          >
            <div className="navbar-requestDemo-text">Begin Your Journey</div>
          </div>

          <div
            className="navbar-requestDemo"
            onClick={() => appNavigate("/book-a-demo")}
          >
            <div className="navbar-requestDemo-text">Book a Demo</div>
          </div>

          {/* <button id="navbar-login" onClick={signupHandler}>
          <img loading="lazy"
            src={signupImage}
            alt="navbar-profile-icon"
            id="navbar-profile-icon"
          />{" "}
          Sign Up
        </button> */}
          {/* <button id="navbar-login" onClick={loginHandler}>
          <img loading="lazy"
            src={profile}
            alt="navbar-profile-icon"
            id="navbar-profile-icon"
          />{" "}
          Sign In
        </button> */}
          {/* <img loading="lazy"
          src={profile}
          alt="navbar-profile-icon"
          id="navbar-profile-icon"
          onMouseEnter={(event) => handleNavPopupClick(event)}
        /> */}
          {/* <img loading="lazy"
          src={australia}
          alt="navbar-country-icon"
          id="navbar-country-icon"
        /> */}
        </div>
        <div id="navbar-links-logins">
          <div className="nav-link-logins" onClick={loginHandler}>
            Sign in
          </div>
          {/* <div className="nav-link-logins" onClick={signupHandler}>
            Sign up
          </div> */}
        </div>
      </div>

      <div id="nav-icons-container"></div>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        containerRef={portalContainerRef}
        position={popupPosition}
        onMouseLeave={closePopup}
        currentLink={selectedLink}
      >
        <div id="popup-nav-container">
          {selectedLink &&
            selectedLink != "Solutions" &&
            selectedLink != "Capabilities" &&
            Object.prototype.hasOwnProperty.call(
              navBarDummyData,
              selectedLink
            ) &&
            Array.isArray(
              navBarDummyData[selectedLink as keyof typeof navBarDummyData]
            ) &&
            (
              navBarDummyData[selectedLink as keyof typeof navBarDummyData] as {
                title: string;
                subTitle: string;
                href?: string;
              }[]
            ).map((value, index) => (
              <div
                key={value.title + index}
                className="nav-inner-container"
                onClick={() => {
                  if (value.href) {
                    appNavigate(value.href);
                    closePopup();
                  } else {
                    popupLinkClickHandler(value.title);
                  }
                }}
              >
                <div className="nav-title">{value.title}</div>
                <div className="nav-sub-title">{value.subTitle}</div>
              </div>
            ))}
          {selectedLink && selectedLink == "Capabilities" && (
            <div id="popup-nav-products-container">
              {capNavGroups.map((value, index) => (
                <div key={value.heading + index} className="nav-product-group">
                  <div className="nav-inner-heading">{value.heading}</div>
                  {value.links.filter(link => link.title).map((link, innerIndex) => (
                    <div
                      key={link.title + innerIndex}
                      className="nav-inner-container"
                      onClick={() => {
                        if (link.href) {
                          appNavigate(link.href);
                          closePopup();
                        } else {
                          popupLinkClickHandler(link.title);
                        }
                      }}
                    >
                      <div className="nav-title">{link.title}</div>
                      {link.subTitle && <div className="nav-sub-title">{link.subTitle}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {selectedLink && selectedLink == "Solutions" && (
            <div id="popup-nav-services-container">
              {(["BY CARE TYPE", "BY ROLE", "BY STAGE"] as const).map((cat) => (
                <div key={cat}>
                  <div className="services-heading">{cat}</div>
                  {Array.isArray(solNavCategories[cat]) &&
                    solNavCategories[cat].map((value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => {
                          if (value.href) {
                            appNavigate(value.href);
                            closePopup();
                          } else {
                            popupLinkClickHandler(value.title);
                          }
                        }}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}
          {selectedLink == "navbar-profile-icon" && (
            <div>
              <div className="nav-inner-container" onClick={signupHandler}>
                <div className="nav-title">Sign Up</div>
              </div>
              <div className="nav-inner-container" onClick={loginHandler}>
                <div className="nav-title">Sign In</div>
              </div>
            </div>
          )}
        </div>
      </Popup>
      <Popup
        isOpen={showSearch}
        onClose={handleSearchIcon}
        containerRef={portalContainerRef}
        position={{ top: 68, left: window.innerWidth / 2 }}
        showTriangle={false}
      >
        <div id="search-popup-container">
          {/* Header */}
          <div id="search-popup-header">
            <div id="search-popup-input-wrap">
              <svg id="search-popup-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                id="search-popup-input"
                type="text"
                placeholder="Search capabilities, solutions, features…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm.length > 0 && (
                <button id="search-popup-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              )}
            </div>
            <button id="search-popup-close" onClick={() => handleSearchIcon(false)} aria-label="Close search">
              Cancel
            </button>
          </div>

          {/* Body */}
          <div id="search-popup-body">
            {searchTerm.length === 0 ? (
              <>
                {/* Popular */}
                <div className="search-popup-section">
                  <div className="search-popup-section-label">Popular searches</div>
                  <div id="search-popup-popular-list">
                    {["Rostering & Scheduling", "NDIS Claiming & Invoicing", "Participant Management", "Accounting & Financial Reporting", "Dashboards & Reporting"].map((term) => (
                      <button
                        key={term}
                        className="search-popup-chip"
                        onClick={() => {
                          const item = dynamicSearchItems.find((s) => s.label === term);
                          if (item) { handleSearchIcon(false); setSearchTerm(""); addSearch(term); navigate(item.path); }
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent */}
                {searchHistory.length > 0 && (
                  <div className="search-popup-section">
                    <div className="search-popup-section-label">Recent</div>
                    <div id="search-popup-recent-list">
                      {[...searchHistory].reverse().map((item, index) => (
                        <button
                          key={item + index}
                          className="search-popup-recent-item"
                          onClick={() => setSearchTerm(item)}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div id="search-popup-results-container">
                {(() => {
                  const q = searchTerm.toLowerCase();
                  const results = dynamicSearchItems
                    .filter((item) => item.label.toLowerCase().includes(q))
                    .sort((a, b) => {
                      const ai = a.label.toLowerCase().indexOf(q);
                      const bi = b.label.toLowerCase().indexOf(q);
                      return ai === bi ? a.label.localeCompare(b.label) : ai - bi;
                    });
                  if (results.length === 0) {
                    return (
                      <div id="search-popup-empty">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                        <div id="search-popup-empty-text">No results for "<strong>{searchTerm}</strong>"</div>
                        <div id="search-popup-empty-sub">Try a different keyword</div>
                      </div>
                    );
                  }
                  return results.map((item, index) => {
                    const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    const splitRe = new RegExp(`(${escaped})`, "ig");
                    const parts = item.label.split(splitRe);
                    return (
                      <button
                        className="search-popup-result"
                        key={item.path + index}
                        onClick={() => {
                          handleSearchIcon(false);
                          setSearchTerm("");
                          addSearch(item.label);
                          setToggleDrawer(false);
                          navigate(item.path);
                        }}
                      >
                        <svg className="search-result-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                        </svg>
                        <span className="search-result-label">
                          {parts.map((part, i) =>
                            part.toLowerCase() === searchTerm.toLowerCase()
                              ? <mark key={i} className="search-highlight">{part}</mark>
                              : part
                          )}
                        </span>
                        <span className="search-result-category">{item.category}</span>
                        <svg className="search-result-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        </div>
      </Popup>
    </nav>
  );
};
export default NavBarComponent;
