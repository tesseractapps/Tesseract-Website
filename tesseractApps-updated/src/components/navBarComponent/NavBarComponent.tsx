// import logo_small from "../../assets/tesseract_logo_small.webp";
// import search from "../../assets/search.svg";
// import plus from "../../assets/plus.svg";
// import profile from "../../assets/person.svg";
// import australia from "../../assets/australia.webp";
import { PhoneCall, Search } from 'lucide-react';
import Popup from "../popupComponent/PopupComponent";
import "./NavBarStyles.css";
import { useEffect, useState } from "react";
import { RefObject } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { navBarDummyData } from "../../utils/NavData";
interface PopupPosition {
  top: number;
  left: number;
}
import ArrowDown from "../../assets/arrow_down.svg";
// import { AppNavigate } from "../../routes/AppNavigate";
import ArrowUp from "../arrows/ArrowUp";
// import signupImage from "../../assets/signup.webp";
import useAppNavigate from "../../hooks/useAppNavigate";
import AppLogo from "../appLogo/AppLogo";

const NavBarComponent = ({
  portalContainerRef,
}: {
  portalContainerRef: RefObject<HTMLDivElement | null>;
}) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  const appNavigate = useAppNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<
    "About" | "Product" | "Solutions" | "Pricing" | "Resources" | ""
  >("");
  const DROPDOWN_LINKS = ["Product", "Solutions", "Resources"];
  const NAV_LINKS = ["Product", "Pricing", "About", "Solutions", "Resources"];
  // const [showHeader, setShowHeader] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);

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
    // console.log("Current Path:", currentPath);
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
    if (
      currentPath == "product" ||
      currentPath == "roster-management" ||
      currentPath == "clock-in-and-clock-out" ||
      currentPath == "forms" ||
      currentPath == "timesheet" ||
      currentPath == "participant-management" ||
      currentPath == "accounting" ||
      currentPath == "admin-console" ||
      currentPath == "incident-management" ||
      currentPath == "t-learning-hub" ||
      currentPath == "access-control-panel" ||
      currentPath == "incident-management" ||
      currentPath == "chat" ||
      currentPath == "hr-operations" ||
      currentPath == "role-based-dashboard" ||
      currentPath == "t-sign" ||
      currentPath == "salesforce-integration" ||
      currentPath == "xero" ||
      currentPath == "wyzed" ||
      currentPath == "my-profile"
    ) {
      setActiveLink("Product");
    }
    if (
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
      currentPath == "help-center"
    ) {
      setActiveLink("Resources");
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
  // useEffect(() => {}, [showSearch]);
  const handleNavClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const name = event.currentTarget.id;
    setToggleDrawer(false);
    if (name) {
      appNavigate(name);
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
    console.log("Name:", name);
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
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const popularSearchClickHandler = (value: string) => {
    setSearchTerm(value);
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
      {showScroll && (
        <div
          className="arrow-container"
          id="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp />
        </div>
      )}
      {/* <div id="navbar-logo" onClick={() => navigate("/")}>
        <img loading="lazy" src={logo_small} alt="tesseract logo" />
        TesseractApps
      </div> */}
      <AppLogo />
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
            <AppLogo />
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
                <PhoneCall className="navbar-requestDemo-icon" />
              </div>
            </div>
        <div id="nav-menu-links">
            {NAV_LINKS.map((label, index) => {
              if (label != "Pricing" && label != "About") {
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
                        {expanded == 0 &&
                          Array.isArray(navBarDummyData["Product"]) && (
                            <>
                              <div
                                key="Product"
                                id="Product"
                                className="nav-inner-container"
                                onClick={handleNavClick}
                              >
                                <div className="nav-title">
                                  Products Overview
                                </div>
                                <div className="nav-sub-title">Learn More</div>
                              </div>
                              {navBarDummyData["Product"].map(
                                (value, index) => (
                                  <div key={value.heading + index}>
                                    <div className="nav-accordion-group-heading">{value.heading}</div>
                                    {value.links.map((link, innerIndex) => (
                                      <div
                                        key={link.title + innerIndex}
                                        className="nav-inner-container"
                                        onClick={() =>
                                          popupLinkClickHandler(link.title)
                                        }
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
                        {expanded == 4 &&
                          Array.isArray(navBarDummyData["Resources"]) &&
                          navBarDummyData["Resources"].map((value, index) => (
                            <div
                              key={value.title + index}
                              className="nav-inner-container"
                              onClick={() => popupLinkClickHandler(value.title)}
                            >
                              <div className="nav-title">{value.title}</div>
                              <div className="nav-sub-title">
                                {value.subTitle}
                              </div>
                            </div>
                          ))}
                        {expanded == 3 && (
                          <div id="nav-menu-solutions">
                            <div>
                              <div className="services-heading">
                                BY INDUSTRY
                              </div>
                              {Array.isArray(
                                navBarDummyData["Solutions"]["BY INDUSTRY"]
                              ) &&
                                navBarDummyData["Solutions"]["BY INDUSTRY"].map(
                                  (value, index) => (
                                    <div
                                      key={value.title + index}
                                      className="nav-inner-container"
                                      onClick={() =>
                                        popupLinkClickHandler(value.title)
                                      }
                                    >
                                      <div className="nav-title">
                                        {value.title}
                                      </div>
                                      <div className="nav-sub-title">
                                        {value.subTitle}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                            <div>
                              <div className="services-heading">BY CARE</div>
                              {Array.isArray(
                                navBarDummyData["Solutions"]["BY CARE"]
                              ) &&
                                navBarDummyData["Solutions"]["BY CARE"].map(
                                  (value, index) => (
                                    <div
                                      key={value.title + index}
                                      className="nav-inner-container"
                                      onClick={() =>
                                        popupLinkClickHandler(value.title)
                                      }
                                    >
                                      <div className="nav-title">
                                        {value.title}
                                      </div>
                                      <div className="nav-sub-title">
                                        {value.subTitle}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                            <div>
                              <div className="services-heading">BY ROLE</div>
                              {Array.isArray(
                                navBarDummyData["Solutions"]["BY ROLE"]
                              ) &&
                                navBarDummyData["Solutions"]["BY ROLE"].map(
                                  (value, index) => (
                                    <div
                                      key={value.title + index}
                                      className="nav-inner-container"
                                      onClick={() =>
                                        popupLinkClickHandler(value.title)
                                      }
                                    >
                                      <div className="nav-title">
                                        {value.title}
                                      </div>
                                      <div className="nav-sub-title">
                                        {value.subTitle}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                            <div>
                              <div className="services-heading">
                                BY BUSINESS TYPE
                              </div>
                              {Array.isArray(
                                navBarDummyData["Solutions"]["BY BUSINESS TYPE"]
                              ) &&
                                navBarDummyData["Solutions"][
                                  "BY BUSINESS TYPE"
                                ].map((value, index) => (
                                  <div
                                    key={value.title + index}
                                    className="nav-inner-container"
                                    onClick={() =>
                                      popupLinkClickHandler(value.title)
                                    }
                                  >
                                    <div className="nav-title">
                                      {value.title}
                                    </div>
                                    <div className="nav-sub-title">
                                      {value.subTitle}
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <div>
                              <div className="services-heading">
                                BY BUSINESS PROBLEM
                              </div>
                              {Array.isArray(
                                navBarDummyData["Solutions"][
                                "BY BUSINESS PROBLEM"
                                ]
                              ) &&
                                navBarDummyData["Solutions"][
                                  "BY BUSINESS PROBLEM"
                                ].map((value, index) => (
                                  <div
                                    key={value.title + index}
                                    className="nav-inner-container"
                                    onClick={() =>
                                      popupLinkClickHandler(value.title)
                                    }
                                  >
                                    <div className="nav-title">
                                      {value.title}
                                    </div>
                                    <div className="nav-sub-title">
                                      {value.subTitle}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
              <PhoneCall className="navbar-requestDemo-icon" />
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
        backgroundColor="white"
        currentLink={selectedLink}
      >
        <div id="popup-nav-container">
          {selectedLink &&
            selectedLink != "Solutions" &&
            selectedLink != "Product" &&
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
              }[]
            ).map((value, index) => (
              <div
                key={value.title + index}
                className="nav-inner-container"
                onClick={() => popupLinkClickHandler(value.title)}
              >
                <div className="nav-title">{value.title}</div>
                <div className="nav-sub-title">{value.subTitle}</div>
              </div>
            ))}
          {selectedLink && selectedLink == "Product" && (
            <div id="popup-nav-products-container">
              {navBarDummyData["Product"].map((value, index) => (
                <>
                  <div
                    className="nav-inner-heading"
                    key={value.heading + index}
                  >
                    {value.heading}
                  </div>
                  {value.links.map((link, innerIndex) => (
                    <div
                      key={link.title + innerIndex}
                      className="nav-inner-container"
                      onClick={() => popupLinkClickHandler(link.title)}
                    >
                      <div className="nav-title">{link.title}</div>
                      <div className="nav-sub-title">{link.subTitle}</div>
                    </div>
                  ))}
                </>
              ))}
              {/* {Array.isArray(navBarDummyData[selectedLink][1]) &&
                navBarDummyData[selectedLink][1].map((value) => (
                  <div
                    key={value.title}
                    className="nav-inner-container"
                    onClick={() => popupLinkClickHandler(value.title)}
                  >
                    <div className="nav-title">{value.title}</div>
                    <div className="nav-sub-title">{value.subTitle}</div>
                  </div>
                ))}
              {Array.isArray(navBarDummyData[selectedLink][2]) &&
                navBarDummyData[selectedLink][2].map((value) => (
                  <div
                    key={value.title}
                    className="nav-inner-container"
                    onClick={() => popupLinkClickHandler(value.title)}
                  >
                    <div className="nav-title">{value.title}</div>
                    <div className="nav-sub-title">{value.subTitle}</div>
                  </div>
                ))} */}
            </div>
          )}

          {selectedLink && selectedLink == "Solutions" && (
            <div id="popup-nav-services-container">
              <div>
                <div className="services-heading">BY INDUSTRY</div>
                {Array.isArray(navBarDummyData[selectedLink]["BY INDUSTRY"]) &&
                  navBarDummyData[selectedLink]["BY INDUSTRY"].map(
                    (value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => popupLinkClickHandler(value.title)}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    )
                  )}
              </div>
              <div>
                <div className="services-heading">BY CARE</div>
                {Array.isArray(navBarDummyData[selectedLink]["BY CARE"]) &&
                  navBarDummyData[selectedLink]["BY CARE"].map(
                    (value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => popupLinkClickHandler(value.title)}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    )
                  )}
              </div>
              <div>
                <div className="services-heading">BY ROLE</div>
                {Array.isArray(navBarDummyData[selectedLink]["BY ROLE"]) &&
                  navBarDummyData[selectedLink]["BY ROLE"].map(
                    (value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => popupLinkClickHandler(value.title)}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    )
                  )}
              </div>
              <div>
                <div className="services-heading">BY BUSINESS TYPE</div>
                {Array.isArray(
                  navBarDummyData[selectedLink]["BY BUSINESS TYPE"]
                ) &&
                  navBarDummyData[selectedLink]["BY BUSINESS TYPE"].map(
                    (value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => popupLinkClickHandler(value.title)}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    )
                  )}
              </div>
              <div>
                <div className="services-heading">BY BUSINESS PROBLEM</div>
                {Array.isArray(
                  navBarDummyData[selectedLink]["BY BUSINESS PROBLEM"]
                ) &&
                  navBarDummyData[selectedLink]["BY BUSINESS PROBLEM"].map(
                    (value, index) => (
                      <div
                        key={value.title + index}
                        className="nav-inner-container"
                        onClick={() => popupLinkClickHandler(value.title)}
                      >
                        <div className="nav-title">{value.title}</div>
                        <div className="nav-sub-title">{value.subTitle}</div>
                      </div>
                    )
                  )}
              </div>
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
        position={{ top: 78, left: window.innerWidth / 2 }}
        showTriangle={false}
        backgroundColor="white"
      >
        <div id="search-popup-container">
          <header id="search-popup-header">
            <div id="search-popup-header-text">Search at Tesseract</div>
            <div
              id="search-popup-close"
              onClick={() => handleSearchIcon(false)}
            >
              &times;
            </div>
          </header>
          <input
            id="search-popup-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.length == 0 ? (
            <div>
              <div id="search-popup-popular">
                <div className="search-popup-title">Popular Searches</div>
                <div id="search-popup-popular-list">
                  <div
                    className="search-popup-popular-item"
                    onClick={() => popularSearchClickHandler("Accounting")}
                  >
                    Accounting
                  </div>
                  <div
                    className="search-popup-popular-item"
                    onClick={() =>
                      popularSearchClickHandler("Roster Management")
                    }
                  >
                    Roster Management
                  </div>
                  <div
                    className="search-popup-popular-item"
                    onClick={() => popularSearchClickHandler("HR")}
                  >
                    HR
                  </div>
                </div>
              </div>
              <div id="search-popup-recent">
                <div className="search-popup-title">Recent</div>
                <div id="search-popup-recent-list">
                  {searchHistory.map((item, index) => (
                    <div
                      key={item + index}
                      className="search-popup-recent-item"
                      onClick={() => popularSearchClickHandler(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div id="search-popup-results-container">
              {searchTerm.length > 0 &&
                searchKeywords
                  .filter((keyword) =>
                    keyword.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const aIndex = a
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase());
                    const bIndex = b
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase());

                    if (aIndex === bIndex) {
                      return a.localeCompare(b);
                    }
                    return aIndex - bIndex;
                  })
                  .map((keyword, index) => {
                    const regex = new RegExp(`(${searchTerm})`, "ig");
                    const parts = keyword.split(regex);

                    return (
                      <div
                        className="search-popup-result"
                        key={keyword + index}
                        onClick={() => popupLinkClickHandler(keyword)}
                      >
                        {parts.map((part, index) =>
                          regex.test(part) ? (
                            <b key={part + index}>{part}</b> // preserves original case
                          ) : (
                            <span key={index}>{part}</span>
                          )
                        )}
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </Popup>
    </nav>
  );
};
const searchKeywords = [
  "Our Story",
  "Product",
  "Roster Management",
  "Timesheet",
  "Admin Console",
  "Access Control Panel",
  "HR Operations",
  "T-Sign",
  "Clock In & Clock Out",
  "Participant Management",
  "Incident Management",
  "Documents",
  "Role based Dashboard",
  "My Profile",
  "Forms",
  "Accounting",
  "T Learning Hub",
  "ChaT",
  "Administrator",
  "Roster Manager",
  "NDIS Staff",
  "Accountant",
  "Participant",
  "NDIS Industry",
  "ICT Industry",
];
export default NavBarComponent;
