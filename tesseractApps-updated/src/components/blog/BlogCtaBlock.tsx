import './BlogCtaBlock.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendTextEmail } from '../../services/appService'
import { newsletterSubscriptionEmailTemplate } from '../../utils/emailTemplates'

export interface BlogCta {
  variant?: 'buttons' | 'subscribe'
  heading?: string
  body?: string
  primaryLabel?: string
  primaryUrl?: string
  secondaryLabel?: string
  secondaryUrl?: string
}

function isExternal(url: string) {
  return url.startsWith('http') || url.startsWith('//')
}

// ── Subscribe form ───────────────────────────────────────────────────────────
type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'error'

function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('submitting')
    try {
      await sendTextEmail(
        newsletterSubscriptionEmailTemplate.email,
        newsletterSubscriptionEmailTemplate.subject,
        newsletterSubscriptionEmailTemplate.body(email),
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bcta-sub-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
        </svg>
        <span>You&apos;re subscribed. We&apos;ll keep you updated as standards evolve.</span>
      </div>
    )
  }

  return (
    <form className="bcta-sub-form" onSubmit={handleSubmit} noValidate>
      <div className="bcta-sub-row">
        <input
          type="email"
          className={`bcta-sub-input${error ? ' bcta-sub-input--error' : ''}`}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          disabled={status === 'submitting'}
          aria-label="Email address"
          autoComplete="email"
        />
        <button
          type="submit"
          className="bcta-sub-btn"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting' ? 'true' : 'false'}
        >
          {status === 'submitting' ? (
            <><span className="bcta-spinner" aria-hidden="true" /> Subscribing…</>
          ) : 'Subscribe'}
        </button>
      </div>
      {error && <p className="bcta-sub-error" role="alert">{error}</p>}
      {status === 'error' && (
        <p className="bcta-sub-error" role="alert">
          Something went wrong. Email us at{' '}
          <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a>.
        </p>
      )}
      <p className="bcta-sub-privacy">No spam. Unsubscribe any time.</p>
    </form>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogCtaBlock({ cta }: { cta: BlogCta }) {
  const { variant = 'buttons', heading, body, primaryLabel, primaryUrl, secondaryLabel, secondaryUrl } = cta

  if (!heading && !primaryLabel && !secondaryLabel) return null

  return (
    <aside className="bcta-block" aria-label="Call to action">
      {heading && <p className="bcta-heading">{heading}</p>}
      {body && <p className="bcta-body">{body}</p>}

      {variant === 'subscribe' ? (
        <SubscribeForm />
      ) : (
        (primaryLabel || secondaryLabel) && (
          <div className="bcta-actions">
            {primaryLabel && primaryUrl && (
              isExternal(primaryUrl) ? (
                <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="bcta-btn bcta-btn--primary">
                  {primaryLabel}
                </a>
              ) : (
                <Link to={primaryUrl} className="bcta-btn bcta-btn--primary">{primaryLabel}</Link>
              )
            )}
            {secondaryLabel && secondaryUrl && (
              isExternal(secondaryUrl) ? (
                <a href={secondaryUrl} target="_blank" rel="noopener noreferrer" className="bcta-btn bcta-btn--secondary">
                  {secondaryLabel}
                </a>
              ) : (
                <Link to={secondaryUrl} className="bcta-btn bcta-btn--secondary">{secondaryLabel}</Link>
              )
            )}
          </div>
        )
      )}
    </aside>
  )
}
