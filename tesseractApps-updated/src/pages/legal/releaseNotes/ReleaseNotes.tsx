import "./ReleaseNotesStyles.css";
import SEO from "../../../components/common/SEO";
import { useSanityReleaseNotes } from "../../../hooks/useSanityReleaseNotes";
import PortableText from "../../../components/sanity/portable-text";
import { useState, useMemo } from "react";
import { Zap, Bug, Wrench, Smartphone, Calculator, Plug, Grid2X2 } from "lucide-react";
import type { ReleaseNoteChange } from "../../../../sanity.types";

type Category =
  | "All"
  | "New Feature"
  | "Enhancement"
  | "Bug Fix"
  | "Mobile"
  | "Accounting"
  | "Integration";

const CATEGORIES: Category[] = [
  "All",
  "New Feature",
  "Enhancement",
  "Bug Fix",
  "Mobile",
  "Accounting",
  "Integration",
];

const CATEGORY_META: Record<Category, { icon: React.ReactNode; className: string }> = {
  All: { icon: <Grid2X2 size={13} strokeWidth={2.5} />, className: "cl-chip--all" },
  "New Feature": { icon: <Zap size={13} strokeWidth={2.5} />, className: "cl-chip--feature" },
  Enhancement: { icon: <Wrench size={13} strokeWidth={2.5} />, className: "cl-chip--enhancement" },
  "Bug Fix": { icon: <Bug size={13} strokeWidth={2.5} />, className: "cl-chip--bugfix" },
  Mobile: { icon: <Smartphone size={13} strokeWidth={2.5} />, className: "cl-chip--mobile" },
  Accounting: { icon: <Calculator size={13} strokeWidth={2.5} />, className: "cl-chip--accounting" },
  Integration: { icon: <Plug size={13} strokeWidth={2.5} />, className: "cl-chip--integration" },
};

const BADGE_META: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  "New Feature": { label: "New", className: "cl-badge--feature", icon: <Zap size={11} strokeWidth={2.5} /> },
  Enhancement: { label: "Enhancement", className: "cl-badge--enhancement", icon: <Wrench size={11} strokeWidth={2.5} /> },
  "Bug Fix": { label: "Bug Fix", className: "cl-badge--bugfix", icon: <Bug size={11} strokeWidth={2.5} /> },
  Mobile: { label: "Mobile", className: "cl-badge--mobile", icon: <Smartphone size={11} strokeWidth={2.5} /> },
  Accounting: { label: "Accounting", className: "cl-badge--accounting", icon: <Calculator size={11} strokeWidth={2.5} /> },
  Integration: { label: "Integration", className: "cl-badge--integration", icon: <Plug size={11} strokeWidth={2.5} /> },
};

const RELEASE_TYPE_LABELS: Record<string, string> = {
  major: "Major Release",
  minor: "Minor Release",
  patch: "Patch",
};

function formatReleaseDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
}

const ReleaseNotes = () => {
  const { data: notes, loading } = useSanityReleaseNotes();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredNotes = useMemo(() => {
    if (activeCategory === "All") return notes;
    return notes
      .map((note) => ({
        ...note,
        changes: note.changes.filter(
          (c: ReleaseNoteChange) => c.category === activeCategory
        ),
      }))
      .filter((note) => note.changes.length > 0);
  }, [notes, activeCategory]);

  const totalChanges = useMemo(() => {
    const counts: Record<string, number> = {};
    notes.forEach((note) =>
      note.changes.forEach((c: ReleaseNoteChange) => {
        if (c.category) counts[c.category] = (counts[c.category] ?? 0) + 1;
      })
    );
    return counts;
  }, [notes]);

  return (
    <div id="cl-page">
      <SEO
        title="Release Notes | Product Updates & New Features | TesseractApps"
        description="Stay updated with TesseractApps latest features and improvements. Browse the full changelog for all platform updates, bug fixes, and new functionality."
      />

      {/* ── Hero ── */}
      <section id="cl-hero">
        <div id="cl-hero-inner">
          <div id="cl-hero-label">Release Notes</div>
          <h1 id="cl-hero-heading">Latest Product Updates in TesseractApps</h1>
          <p id="cl-hero-sub">
            Every update, improvement, and fix, documented in one place. Stay up to date with everything we ship.
          </p>
        </div>
      </section>

      <div id="cl-outer">
        {/* ── Filter Bar ── */}
        <div id="cl-filter-bar">
          <span id="cl-filter-label">Filter by</span>
          <div id="cl-chips">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const count =
                cat === "All"
                  ? notes.reduce((s, n) => s + n.changes.length, 0)
                  : (totalChanges[cat] ?? 0);
              return (
                <button
                  key={cat}
                  type="button"
                  className={`cl-chip ${meta.className}${activeCategory === cat ? " cl-chip--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {meta.icon}
                  {cat}
                  <span className="cl-chip-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div id="cl-timeline">
          {loading &&
            [0, 1, 2].map((i) => (
              <div key={i} className="cl-entry cl-entry--skeleton">
                <div className="cl-entry-aside">
                  <div className="cl-skeleton-version" />
                  <div className="cl-skeleton-date" />
                </div>
                <div className="cl-dot" />
                <div className="cl-entry-body">
                  <div className="cl-card">
                    {[0, 1, 2, 3].map((j) => (
                      <div key={j} className="cl-skeleton-item" />
                    ))}
                  </div>
                </div>
              </div>
            ))}

          {!loading && filteredNotes.length === 0 && (
            <div id="cl-empty">
              <div id="cl-empty-icon">
                <Grid2X2 size={28} strokeWidth={1.5} />
              </div>
              <p id="cl-empty-text">No updates found for this category yet.</p>
            </div>
          )}

          {!loading &&
            filteredNotes.map((note, noteIndex) => (
              <div
                key={note._id}
                className={`cl-entry${noteIndex === 0 && activeCategory === "All" ? " cl-entry--latest" : ""}`}
              >
                {/* Left aside, version + date */}
                <div className="cl-entry-aside">
                  <div className="cl-version-badge">
                    v{note.version}
                    {noteIndex === 0 && activeCategory === "All" && (
                      <span className="cl-latest-pill">Latest</span>
                    )}
                  </div>
                  {note.releaseDate && (
                    <div className="cl-entry-date">{formatReleaseDate(note.releaseDate)}</div>
                  )}
                  {note.releaseType && (
                    <div className={`cl-release-type cl-release-type--${note.releaseType}`}>
                      {RELEASE_TYPE_LABELS[note.releaseType] ?? note.releaseType}
                    </div>
                  )}
                </div>

                {/* Timeline dot */}
                <div className={`cl-dot${noteIndex === 0 && activeCategory === "All" ? " cl-dot--latest" : ""}`} />

                {/* Right body — changes */}
                <div className="cl-entry-body">
                  <div className="cl-card">
                    <ul className="cl-changes-list">
                      {note.changes.map((change: ReleaseNoteChange) => {
                        const badge = change.category ? BADGE_META[change.category] : null;
                        return (
                          <li key={change._key} className="cl-change-item">
                            <div className="cl-change-header">
                              {badge && (
                                <span className={`cl-badge ${badge.className}`}>
                                  {badge.icon}
                                  {badge.label}
                                </span>
                              )}
                              <span className="cl-change-title">{change.title}</span>
                            </div>
                            {change.description && (
                              <div className="cl-change-desc">
                                <PortableText value={change.description} />
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReleaseNotes;
