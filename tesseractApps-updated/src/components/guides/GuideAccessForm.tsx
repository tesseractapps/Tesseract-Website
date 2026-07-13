import './GuideAccessFormStyles.css'
import { useState } from 'react'
import { sendTextEmail, sendEmail } from '../../services/appService'
import { guideAccessEmailTemplate, guideAccessConfirmationEmailTemplate } from '../../utils/emailTemplates'
import { trackGuideAccess } from '../../utils/analytics'
import type { GuideFormConfig } from '../../hooks/useSanityGuides'

const PROVIDER_TYPES = [
  'SIL Provider',
  'Platform Provider',
  'Other NDIS Provider',
  'Support Coordinator',
  'Other',
] as const

interface GuideAccessFormProps {
  guideTitle: string
  pdfUrl?: string
  isComingSoon?: boolean
  formConfig?: GuideFormConfig
}

type FormState = {
  fullName: string
  email: string
  organisation: string
  role: string
  phone: string
  providerType: string
  subscribe: boolean
  privacyConsent: boolean
}

type FormErrors = {
  fullName?: string
  email?: string
  organisation?: string
  providerType?: string
  privacyConsent?: string
}

const emptyForm: FormState = {
  fullName: '',
  email: '',
  organisation: '',
  role: '',
  phone: '',
  providerType: '',
  subscribe: true,
  privacyConsent: false,
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function GuideAccessForm({ guideTitle, pdfUrl, isComingSoon, formConfig }: GuideAccessFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.organisation.trim()) e.organisation = 'Required'
    if (!form.providerType) e.providerType = 'Please select a provider type'
    if (!form.privacyConsent) e.privacyConsent = 'You must agree to continue'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const triggerDownload = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await sendTextEmail(
        guideAccessEmailTemplate.email,
        guideAccessEmailTemplate.subject(guideTitle),
        guideAccessEmailTemplate.body({ ...form, guideTitle }),
      )
      if (pdfUrl) {
        sendEmail(
          form.fullName,
          form.email,
          guideAccessConfirmationEmailTemplate.subject(guideTitle),
          guideAccessConfirmationEmailTemplate.text(form.fullName.split(' ')[0], guideTitle, pdfUrl),
          guideAccessConfirmationEmailTemplate.html(form.fullName.split(' ')[0], guideTitle, pdfUrl),
        ).catch(() => {})
      }
      trackGuideAccess(guideTitle)
      setStatus('success')
      if (pdfUrl) triggerDownload(pdfUrl)
    } catch {
      setStatus('error')
    }
  }

  const field = (
    id: keyof FormErrors,
    label: string,
    type = 'text',
    placeholder = '',
    autoComplete = '',
    required = true,
  ) => (
    <div className="gaf-field">
      <label htmlFor={id} className="gaf-label">
        {label}{required && <span className="gaf-required" aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        className={`gaf-input${errors[id] ? ' gaf-input--error' : ''}`}
        value={form[id as keyof FormState] as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => {
          setForm(p => ({ ...p, [id]: e.target.value }))
          if (errors[id]) setErrors(p => ({ ...p, [id]: undefined }))
        }}
        disabled={status === 'submitting' || status === 'success'}
      />
      {errors[id] && <span className="gaf-error" role="alert">{errors[id]}</span>}
    </div>
  )

  // ── Coming soon ─────────────────────────────────────────────────────────────
  if (isComingSoon) {
    return (
      <div className="gaf-coming-soon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0c78ba" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <p className="gaf-coming-soon-heading">Coming Soon</p>
        <p className="gaf-coming-soon-text">This guide is being finalised. Check back shortly.</p>
      </div>
    )
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (status === 'success') {
    const firstName = form.fullName.split(' ')[0]
    return (
      <div className="gaf-success">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
        </svg>
        <p className="gaf-success-heading">You&apos;re all set, {firstName}!</p>
        <p className="gaf-success-text">
          {formConfig?.confirmationMessage
            ? formConfig.confirmationMessage
            : 'Your download is starting automatically. We have also sent a copy to your email.'}
        </p>
        {pdfUrl && (
          <p className="gaf-success-fallback">
            If it didn&apos;t start,{' '}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="gaf-fallback-link">
              click here to download
            </a>.
          </p>
        )}
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  const submitLabel = formConfig?.submitButtonText ?? 'Download Free Guide'
  const trustIndicators = formConfig?.trustIndicators ?? []
  const disabled = status === 'submitting'

  return (
    <form className="gaf-form" onSubmit={handleSubmit} noValidate aria-label="Access this guide">
      <p className="gaf-form-heading">Get instant access</p>
      <p className="gaf-form-sub">Fill in your details to download for free.</p>

      {/* Full name */}
      {field('fullName', 'Full name', 'text', 'Jane Smith', 'name')}

      {/* Email */}
      {field('email', 'Work email', 'email', 'jane@organisation.com.au', 'email')}

      {/* Organisation */}
      {field('organisation', 'Organisation name', 'text', 'Acme Care Services', 'organization')}

      {/* Role — optional */}
      <div className="gaf-field">
        <label htmlFor="gaf-role" className="gaf-label">Role / Job title</label>
        <input
          id="gaf-role"
          type="text"
          className="gaf-input"
          value={form.role}
          placeholder="e.g. Compliance Manager"
          autoComplete="organization-title"
          onChange={(e) => setForm(p => ({ ...p, role: e.target.value }))}
          disabled={disabled}
        />
      </div>

      {/* Phone — optional */}
      <div className="gaf-field">
        <label htmlFor="gaf-phone" className="gaf-label">Phone number</label>
        <input
          id="gaf-phone"
          type="tel"
          className="gaf-input"
          value={form.phone}
          placeholder="e.g. 04XX XXX XXX"
          autoComplete="tel"
          onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
          disabled={disabled}
        />
      </div>

      {/* Provider type — required dropdown */}
      <div className="gaf-field">
        <label htmlFor="gaf-provider-type" className="gaf-label">
          Provider type<span className="gaf-required" aria-hidden="true"> *</span>
        </label>
        <select
          id="gaf-provider-type"
          className={`gaf-select${errors.providerType ? ' gaf-input--error' : ''}`}
          value={form.providerType}
          onChange={(e) => {
            setForm(p => ({ ...p, providerType: e.target.value }))
            if (errors.providerType) setErrors(p => ({ ...p, providerType: undefined }))
          }}
          disabled={disabled}
        >
          <option value="">Select provider type…</option>
          {PROVIDER_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.providerType && <span className="gaf-error" role="alert">{errors.providerType}</span>}
      </div>

      {/* Subscribe checkbox — pre-checked */}
      <div className="gaf-checkbox-row">
        <input
          id="gaf-subscribe"
          type="checkbox"
          className="gaf-checkbox"
          checked={form.subscribe}
          onChange={(e) => setForm(p => ({ ...p, subscribe: e.target.checked }))}
          disabled={disabled}
        />
        <label htmlFor="gaf-subscribe" className="gaf-checkbox-label">
          Keep me updated with NDIS insights and TesseractApps news
        </label>
      </div>

      {/* Privacy consent — required */}
      <div className="gaf-checkbox-row">
        <input
          id="gaf-privacy-consent"
          type="checkbox"
          className={`gaf-checkbox${errors.privacyConsent ? ' gaf-checkbox--error' : ''}`}
          checked={form.privacyConsent}
          onChange={(e) => {
            setForm(p => ({ ...p, privacyConsent: e.target.checked }))
            if (errors.privacyConsent) setErrors(p => ({ ...p, privacyConsent: undefined }))
          }}
          disabled={disabled}
        />
        <label htmlFor="gaf-privacy-consent" className="gaf-checkbox-label">
          I agree to receive the checklist and marketing emails from TesseractApps
          <span className="gaf-required" aria-hidden="true"> *</span>
        </label>
      </div>
      {errors.privacyConsent && (
        <span className="gaf-error gaf-error--consent" role="alert">{errors.privacyConsent}</span>
      )}

      {status === 'error' && (
        <p className="gaf-submit-error">
          Something went wrong. Please try again or email{' '}
          <a href="mailto:marketing@tesseractapps.com">marketing@tesseractapps.com</a>.
        </p>
      )}

      <button
        type="submit"
        className="gaf-submit"
        disabled={disabled}
        aria-busy={disabled}
      >
        {disabled ? (
          <><span className="gaf-spinner" aria-hidden="true" /> Sending…</>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {submitLabel}
          </>
        )}
      </button>

      <p className="gaf-privacy">
        Your details are safe with us. See our{' '}
        <a href="/privacy-policy/" className="gaf-privacy-link">Privacy Policy</a>.
      </p>

      {trustIndicators.length > 0 && (
        <ul className="gaf-trust-list" aria-label="Trust indicators">
          {trustIndicators.map((item, i) => (
            <li key={i} className="gaf-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
