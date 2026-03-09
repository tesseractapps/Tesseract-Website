/**
 * Formats an ISO date string to a human-readable Australian date.
 * e.g. "2025-06-01" -> "1 June 2025"
 */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
