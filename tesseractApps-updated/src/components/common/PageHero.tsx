import './PageHero.css'

interface PageHeroProps {
  label: string
  heading: string
  sub: string
  /** Optional search trigger or any extra content rendered below the subtitle */
  children?: React.ReactNode
}

export default function PageHero({ label, heading, sub, children }: PageHeroProps) {
  return (
    <section className="ph-hero">
      <div className="ph-inner">
        <div className="ph-label">{label}</div>
        <h1 className="ph-heading">{heading}</h1>
        <p className="ph-sub">{sub}</p>
        {children}
      </div>
    </section>
  )
}
