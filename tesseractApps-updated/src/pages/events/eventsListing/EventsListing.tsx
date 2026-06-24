import "./EventsListingStyles.css";
import { Link } from "react-router-dom";
import SEO from "../../../components/common/SEO";
import PageHero from "../../../components/common/PageHero";
import { Calendar, MapPin } from "lucide-react";

type EventItem = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateRange: string;
  venue: string;
  location: string;
  booth?: string;
  status: "upcoming" | "past" | "ongoing";
  tag: string;
};

const EVENTS: EventItem[] = [
  {
    slug: "/events/adelaide-expo-2026",
    title: "Adelaide Disability & WorkAbility Expo 2026",
    subtitle:
      "Meet the TesseractApps team, see a live platform demo, and enter our prize draw to win 12 months free.",
    date: "26–27 June 2026",
    dateRange: "Friday 26 June & Saturday 27 June 2026",
    venue: "Adelaide Showground",
    location: "Leader Street, Wayville SA 5034",
    booth: "Booth 8",
    status: "upcoming",
    tag: "Expo",
  },
];
const OFFERS: EventItem[] = [
  {
    slug: "/events/eofy-discount",
    title: "End Of Financial Year Discount",
    subtitle:
      "Sign your contract before 31 July 2026 to save 50% on your total contract value. Lock in half price before the EOFY deadline.",
    date: "until 31 July 2026",
    dateRange: "Sunday 21 June & Friday 31 July 2026",
    venue: "",
    location: "",
    booth: "",
    status: "ongoing",
    tag: "Discount",
  },
];

const upcomingEvents = EVENTS.filter((e) => e.status === "upcoming");
const pastEvents = EVENTS.filter((e) => e.status === "past");

export default function EventsListing() {
  return (
    <div id="ev-page">
      <SEO
        title="Events | TesseractApps"
        description="Meet the TesseractApps team at NDIS industry events across Australia. See live demos, enter prize draws, and connect with our team."
        canonical="https://tesseractapps.com.au/events"
        noIndex={false}
      />

      <PageHero
        label="Events"
        heading="Meet Us in the Field"
        sub="Find TesseractApps at NDIS industry events across Australia. Live demos, expert conversations, and no sales pressure."
      />

      <section id="ev-content">
        <div id="ev-outer">
          {/* ── Upcoming ── */}
          {upcomingEvents.length > 0 && (
            <>
              <div className="ev-group-label">Upcoming Events</div>
              <div className="ev-grid">
                {upcomingEvents.map((ev) => (
                  <Link key={ev.slug} to={ev.slug} className="ev-card">
                    <div className="ev-card-header">
                      <span className="ev-card-tag ev-card-tag--upcoming">
                        {ev.tag}
                      </span>
                      <span className="ev-card-status">Upcoming</span>
                    </div>
                    <h2 className="ev-card-title">{ev.title}</h2>
                    <p className="ev-card-subtitle">{ev.subtitle}</p>
                    <div className="ev-card-details">
                      <div className="ev-card-detail">
                        <Calendar size={14} />
                        <span>{ev.dateRange}</span>
                      </div>
                      <div className="ev-card-detail">
                        <MapPin size={14} />
                        <span>
                          {ev.venue}
                          {ev.booth ? ` · ${ev.booth}` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="ev-card-footer">
                      <span className="ev-card-cta">
                        Register &amp; Enter Prize Draw →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          {OFFERS.length > 0 && (
            <div style={{ marginTop: "25px" }}>
              <div className="ev-group-label">Exclusive Offers</div>
              <div className="ev-grid">
                {OFFERS.map((ev) => (
                  <Link key={ev.slug} to={ev.slug} className="ev-card">
                    <div className="ev-card-header">
                      <span className="ev-card-tag ev-card-tag--upcoming">
                        {ev.tag}
                      </span>
                      <span className="ev-card-status">Ongoing</span>
                    </div>
                    <h2 className="ev-card-title">{ev.title}</h2>
                    <p className="ev-card-subtitle">{ev.subtitle}</p>
                    <div className="ev-card-details">
                      <div className="ev-card-detail">
                        <Calendar size={14} />
                        <span>{ev.dateRange}</span>
                      </div>
                      {ev.venue && (
                        <div className="ev-card-detail">
                          <MapPin size={14} />
                          <span>
                            {ev.venue}
                            {ev.booth ? ` · ${ev.booth}` : ""}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ev-card-footer">
                      <span className="ev-card-cta">Find out more →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Past ── */}
          {pastEvents.length > 0 && (
            <>
              <div className="ev-group-label ev-group-label--past">
                Past Events
              </div>
              <div className="ev-grid ev-grid--past">
                {pastEvents.map((ev) => (
                  <div key={ev.slug} className="ev-card ev-card--past">
                    <div className="ev-card-header">
                      <span className="ev-card-tag">{ev.tag}</span>
                      <span className="ev-card-status ev-card-status--past">
                        Past
                      </span>
                    </div>
                    <h2 className="ev-card-title">{ev.title}</h2>
                    <p className="ev-card-subtitle">{ev.subtitle}</p>
                    <div className="ev-card-details">
                      <div className="ev-card-detail">
                        <Calendar size={14} />
                        <span>{ev.dateRange}</span>
                      </div>
                      <div className="ev-card-detail">
                        <MapPin size={14} />
                        <span>{ev.venue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Empty state ── */}
          {EVENTS.length === 0 && (
            <p className="ev-empty">
              No events scheduled yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
