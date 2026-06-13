/** Extracts h2/h3 headings from a Portable Text body for the jump-link TOC. */

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractHeadings(body: any[]): TocItem[] {
  if (!Array.isArray(body)) return []

  return body
    .filter(
      (block) =>
        block._type === 'block' &&
        (block.style === 'h2' || block.style === 'h3')
    )
    .map((block) => {
      const text: string = (block.children ?? [])
        .map((c: { text?: string }) => c.text ?? '')
        .join('')
      return {
        id: toAnchorId(text),
        text,
        level: block.style === 'h2' ? 2 : 3,
      } as TocItem
    })
    .filter((item) => item.text.length > 0)
}
