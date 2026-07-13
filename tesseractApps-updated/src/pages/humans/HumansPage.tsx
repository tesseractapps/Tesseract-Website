import './HumansPageStyles.css'
import { Link } from 'react-router-dom'
import { useSanityAllHumans } from '../../hooks/useSanityAllHumans'
import SEO from '../../components/common/SEO'
import { urlFor } from '../../sanity/lib/image'
import { buildBreadcrumbSchema, buildGraphSchema } from '../../utils/schemaHelpers'
import type { HumanDocument } from '../../types/sanityQueries'

const SITE_URL = 'https://tesseractapps.com.au'

// Department display order
const DEPT_ORDER = [
  'Leadership',
  'Engineering',
  'Product',
  'Design',
  'Sales',
  'Marketing',
  'Operations',
  'Customer Success',
]

function groupByDepartment(humans: HumanDocument[]): [string, HumanDocument[]][] {
  const map = new Map<string, HumanDocument[]>()

  for (const h of humans) {
    const dept = h.department ?? 'Team'
    if (!map.has(dept)) map.set(dept, [])
    map.get(dept)!.push(h)
  }

  // Sort departments by predefined order, then alphabetically for unknowns
  return [...map.entries()].sort(([a], [b]) => {
    const ai = DEPT_ORDER.indexOf(a)
    const bi = DEPT_ORDER.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

function HumanCard({ human }: { human: HumanDocument }) {
  const initials = (human.name ?? '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const card = (
    <>
      <div className="hmp-card-avatar-wrap">
        {human.photo?.asset ? (
          <img
            src={urlFor(human.photo).width(120).height(120).fit('crop').auto('format').url()}
            alt={human.photo.alt ?? human.name}
            className="hmp-card-avatar"
            width={120}
            height={120}
            loading="lazy"
          />
        ) : (
          <div className="hmp-card-avatar hmp-card-avatar--initials" aria-hidden="true">
            {initials}
          </div>
        )}
      </div>
      <div className="hmp-card-info">
        <span className="hmp-card-name">{human.name}</span>
        <span className="hmp-card-role">{human.role}</span>
      </div>
    </>
  )

  if (human.slug?.current) {
    return (
      <Link to={`/humans/${human.slug.current}/`} className="hmp-card">
        {card}
      </Link>
    )
  }

  return <div className="hmp-card hmp-card--static">{card}</div>
}

function HumanCardSkeleton() {
  return (
    <div className="hmp-card hmp-card--skeleton">
      <div className="hmp-card-avatar-wrap">
        <div className="hmp-card-avatar hmp-skeleton" />
      </div>
      <div className="hmp-card-info">
        <div className="hmp-skeleton hmp-skeleton--name" />
        <div className="hmp-skeleton hmp-skeleton--role" />
      </div>
    </div>
  )
}

export default function HumansPage() {
  const { data: humans, loading } = useSanityAllHumans()

  const structuredData = buildGraphSchema(
    buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Humans', url: `${SITE_URL}/humans` },
    ])
  )

  const groups = groupByDepartment(humans)

  return (
    <div className="hmp-page">
      <SEO
        title="Humans — The people behind TesseractApps"
        description="Meet the team building TesseractApps — NDIS workforce management software for Australian care providers. Real people, real mission."
        url={`${SITE_URL}/humans`}
        structuredData={structuredData}
      />

      {/* ── Hero ── */}
      <section className="hmp-hero">
        <div className="hmp-hero-inner">
          <h1 className="hmp-hero-heading">
            Humans behind<br />TesseractApps
          </h1>
          <p className="hmp-hero-sub">
            We're a team building software for the people who care for people.
          </p>
          <Link to="/careers/" className="hmp-hero-cta">
            Join the team →
          </Link>
        </div>
      </section>

      {/* ── Grid ── */}
      <div className="hmp-outer">
        {loading ? (
          <div className="hmp-group">
            <div className="hmp-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <HumanCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          groups.map(([dept, members]) => (
            <div key={dept} className="hmp-group">
              <h2 className="hmp-group-label">{dept}</h2>
              <div className="hmp-grid">
                {members.map(h => (
                  <HumanCard key={h._id} human={h} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hmp-join">
        <div className="hmp-join-inner">
          <p className="hmp-join-text">Want to work with this team?</p>
          <Link to="/careers/" className="hmp-join-link">View open roles →</Link>
        </div>
      </div>
    </div>
  )
}
