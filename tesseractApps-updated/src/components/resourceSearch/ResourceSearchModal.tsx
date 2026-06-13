import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ResourceSearchModal.css'

export interface ResourceSearchEntry {
  id: string
  title: string
  subtitle?: string
  /** ISO date string */
  date?: string
  /** 'post' | 'whitepaper' | 'brochure' | 'faq' etc. */
  type: string
  /** URL to navigate to on click */
  href: string
  /** URL to open in new tab (e.g. PDF). If set, href is ignored. */
  externalUrl?: string
}

interface ResourceSearchModalProps {
  isOpen: boolean
  onClose: () => void
  entries: ResourceSearchEntry[]
  placeholder?: string
  /** Label shown above the default list (before typing) */
  latestLabel?: string
}

function formatRelativeDate(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const days = Math.floor(ms / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  const years = Math.floor(months / 12)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

export default function ResourceSearchModal({
  isOpen,
  onClose,
  entries,
  placeholder = 'Search…',
  latestLabel: _latestLabel = 'Latest',
}: ResourceSearchModalProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)

  // Focus input when opened; reset state when closed
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setHighlightIndex(-1)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const q = query.trim().toLowerCase()
  const results: ResourceSearchEntry[] = q
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.subtitle ?? '').toLowerCase().includes(q)
      )
    : entries.slice(0, 8)

  const handleSelect = (entry: ResourceSearchEntry) => {
    onClose()
    if (entry.externalUrl) {
      window.open(entry.externalUrl, '_blank', 'noopener,noreferrer')
    } else {
      navigate(entry.href)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((p) => Math.min(p + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((p) => Math.max(p - 1, -1))
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      handleSelect(results[highlightIndex])
    }
  }

  if (!isOpen) return null

  const highlightText = (text: string) => {
    if (!q) return text
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'ig'))
    return parts.map((part, i) =>
      part.toLowerCase() === q
        ? <mark key={i} className="rsm-highlight">{part}</mark>
        : part
    )
  }

  return (
    <div className="rsm-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="rsm-panel" onClick={(e) => e.stopPropagation()}>
        {/* Search input row */}
        <div className="rsm-input-row">
          <button className="rsm-back-btn" onClick={onClose} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <input
            ref={inputRef}
            className="rsm-input"
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setHighlightIndex(-1) }}
            onKeyDown={handleKeyDown}
            aria-label="Search"
          />
          {query && (
            <button className="rsm-clear-btn" onClick={() => setQuery('')} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
          <span className="rsm-esc-hint">Esc</span>
        </div>

        {/* Results */}
        <div className="rsm-results">
          {/* {results.length > 0 && (
            <div className="rsm-section-label">
              {q ? `${results.length} result${results.length !== 1 ? 's' : ''}` : latestLabel}
            </div>
          )} */}

          {results.length === 0 && q && (
            <div className="rsm-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c4cdd6" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>No results for "<strong>{query}</strong>"</p>
            </div>
          )}

          {results.map((entry, i) => (
            <button
              key={entry.id}
              className={`rsm-entry${highlightIndex === i ? ' rsm-entry--active' : ''}`}
              onClick={() => handleSelect(entry)}
              onMouseEnter={() => setHighlightIndex(i)}
            >
              {/* <svg className="rsm-entry-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg> */}
              <span className="rsm-entry-text">
                <span className="rsm-entry-title">{highlightText(entry.title)}</span>
                {/* {entry.subtitle && (
                  <span className="rsm-entry-sub">{highlightText(entry.subtitle)}</span>
                )} */}
              </span>
              <span className="rsm-entry-right">
                {entry.date && (
                  <span className="rsm-entry-date">{formatRelativeDate(entry.date)}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
