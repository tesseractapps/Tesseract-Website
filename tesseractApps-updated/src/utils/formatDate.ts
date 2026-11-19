/**
 * Formats an ISO date string to a human-readable Australian date.
 * e.g. "2025-06-01" -> "1 June 2025" (Sydney time)
 */
/**
 * Returns the formatted update date only when it is meaningfully later than the
 * publish date (more than a day), so readers can see when content was revised.
 */
export function formatUpdatedDate(publishedAt?: string | null, updatedAt?: string | null): string {
  if (!updatedAt) return ''
  const updated = Date.parse(updatedAt)
  const published = publishedAt ? Date.parse(publishedAt) : NaN
  if (Number.isNaN(updated)) return ''
  if (!Number.isNaN(published) && updated - published < 24 * 60 * 60 * 1000) return ''
  return formatDate(updatedAt)
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  // Fixed timezone so pre-rendered HTML and the browser agree (no hydration
  // mismatch when the visitor is in a different timezone to the build server).
  return new Date(dateStr).toLocaleDateString('en-AU', {
    timeZone: 'Australia/Sydney',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
