import "./SitemapPageStyles.css";
import { Link } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import { useSanityCapabilityNav } from "../../../hooks/useSanityCapabilityNav";
import { useSanitySolutionNav } from "../../../hooks/useSanitySolutionNav";
import { useSanityBlogList } from "../../../hooks/useSanityBlogList";

const STATIC_SECTIONS = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Platform Overview", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-a-demo" },
      { label: "Sign Up", href: "/signup" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "NDIS Industry", href: "/ndis-industry" },
      { label: "Disability Support & NDIS", href: "/disability-support-ndis" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Whitepapers", href: "/whitepapers" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Webinars", href: "/webinars" },
      { label: "NDIS Glossary", href: "/ndis-glossary" },
      { label: "Help Centre / FAQ", href: "/help-center" },
      { label: "Release Notes", href: "/changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/our-story" },
      { label: "Our Mission & Vision", href: "/our-mission-and-vision" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

const SitemapPage = () => {
  const { links: capLinks } = useSanityCapabilityNav();
  const { links: solLinks } = useSanitySolutionNav();
  const { data: blogPosts } = useSanityBlogList({ from: 0, to: 100 });

  return (
    <div id="smp-page">
      <SEO
        title="Site Map | TesseractApps"
        description="A full index of all pages on TesseractApps — capabilities, solutions, blog posts, resources, and company pages."
        canonical="https://tesseractapps.com.au/sitemap"
        noIndex={false}
      />

      <section id="smp-hero">
        <div id="smp-hero-inner">
          <h1 id="smp-heading">Site Map</h1>
          <p id="smp-sub">Every page on TesseractApps, organised by section.</p>
        </div>
      </section>

      <main id="smp-main">
        <div id="smp-inner">

          {/* Static sections */}
          {STATIC_SECTIONS.map((section) => (
            <section key={section.heading} className="smp-section">
              <h2 className="smp-section-heading">{section.heading}</h2>
              <ul className="smp-list">
                {section.links.map((link) => (
                  <li key={link.href} className="smp-item">
                    <Link to={link.href} className="smp-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Capabilities — from Sanity */}
          {capLinks.length > 0 && (
            <section className="smp-section">
              <h2 className="smp-section-heading">Capabilities</h2>
              <ul className="smp-list">
                <li className="smp-item">
                  <Link to="/capabilities" className="smp-link">All Capabilities</Link>
                </li>
                {capLinks.map((cap) => (
                  <li key={cap._id} className="smp-item">
                    <Link to={`/capabilities/${cap.slug.current}`} className="smp-link">
                      {cap.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Solutions — from Sanity */}
          {solLinks.length > 0 && (
            <section className="smp-section">
              <h2 className="smp-section-heading">Solutions</h2>
              <ul className="smp-list">
                <li className="smp-item">
                  <Link to="/solutions" className="smp-link">All Solutions</Link>
                </li>
                {solLinks.map((sol) => (
                  <li key={sol._id} className="smp-item">
                    <Link to={`/solutions/${sol.slug.current}`} className="smp-link">
                      {sol.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Blog posts — from Sanity */}
          {blogPosts.length > 0 && (
            <section className="smp-section smp-section--full">
              <h2 className="smp-section-heading">Blog Posts</h2>
              <ul className="smp-list smp-list--blog">
                {blogPosts
                  .filter((p) => p.slug?.current)
                  .map((post) => (
                    <li key={post._id} className="smp-item">
                      <Link to={`/blog/${post.slug!.current}`} className="smp-link">
                        {post.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {/* XML sitemap reference */}
          <div id="smp-xml-ref">
            <span>Looking for the machine-readable sitemap?</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" id="smp-xml-link">
              sitemap.xml ↗
            </a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SitemapPage;
