import type { BlockContentType } from '../../sanity.types'

type PTBlock = {
  _type: string
  style?: string
  children?: Array<{ _type: string; text?: string; marks?: string[] }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  level?: number
  listItem?: string
}

type PTImage = {
  _type: 'image'
  alt?: string
  caption?: string
}

type PTCodeBlock = {
  _type: 'codeBlock'
  language?: string
  filename?: string
  code?: string
}

type PTCallout = {
  _type: 'callout'
  type?: string
  text?: string
}

type PTTable = {
  _type: 'table'
  rows?: Array<{ cells?: string[] }>
}

type AnyBlock = PTBlock | PTImage | PTCodeBlock | PTCallout | PTTable

function resolveMarks(
  child: { text?: string; marks?: string[] },
  markDefs: Array<{ _key: string; _type: string; href?: string }>,
): string {
  let text = child.text ?? ''
  if (!child.marks?.length) return text

  for (const mark of child.marks) {
    const def = markDefs.find((d) => d._key === mark)
    if (def) {
      if (def._type === 'link') text = `[${text}](${def.href ?? ''})`
    } else {
      switch (mark) {
        case 'strong': text = `**${text}**`; break
        case 'em': text = `_${text}_`; break
        case 'code': text = `\`${text}\``; break
        case 'strike-through': text = `~~${text}~~`; break
      }
    }
  }
  return text
}

function blockToMarkdown(block: PTBlock): string {
  const markDefs = block.markDefs ?? []
  const inline = (block.children ?? [])
    .map((child) => resolveMarks(child, markDefs))
    .join('')

  if (block.listItem === 'bullet') return `- ${inline}`
  if (block.listItem === 'number') return `1. ${inline}`

  switch (block.style) {
    case 'h2': return `## ${inline}`
    case 'h3': return `### ${inline}`
    case 'h4': return `#### ${inline}`
    case 'blockquote': return `> ${inline}`
    default: return inline
  }
}

export function portableTextToMarkdown(
  blocks: BlockContentType,
  meta?: { title?: string; author?: string; publishedAt?: string; url?: string },
): string {
  const lines: string[] = []

  if (meta?.title) lines.push(`# ${meta.title}`, '')
  if (meta?.author || meta?.publishedAt) {
    const parts: string[] = []
    if (meta.author) parts.push(`By ${meta.author}`)
    if (meta.publishedAt) parts.push(new Date(meta.publishedAt).toLocaleDateString('en-AU', { dateStyle: 'long' }))
    lines.push(parts.join(' · '), '')
  }
  if (meta?.url) lines.push(`Source: ${meta.url}`, '')
  if (meta?.title || meta?.author || meta?.url) lines.push('---', '')

  for (const block of blocks as AnyBlock[]) {
    if (block._type === 'block') {
      lines.push(blockToMarkdown(block as PTBlock))
    } else if (block._type === 'image') {
      const img = block as PTImage
      lines.push(`![${img.alt ?? ''}](image)`)
      if (img.caption) lines.push(`*${img.caption}*`)
    } else if (block._type === 'codeBlock') {
      const cb = block as PTCodeBlock
      const lang = cb.language ?? ''
      lines.push(`\`\`\`${lang}`)
      if (cb.code) lines.push(cb.code)
      lines.push('```')
    } else if (block._type === 'callout') {
      const cl = block as PTCallout
      lines.push(`> **${(cl.type ?? 'note').toUpperCase()}:** ${cl.text ?? ''}`)
    } else if (block._type === 'table') {
      const tbl = block as PTTable
      const rows = tbl.rows ?? []
      if (rows.length > 0) {
        const [header, ...body] = rows
        const cells = header?.cells ?? []
        lines.push(`| ${cells.join(' | ')} |`)
        lines.push(`| ${cells.map(() => '---').join(' | ')} |`)
        for (const row of body) {
          lines.push(`| ${(row.cells ?? []).join(' | ')} |`)
        }
      }
    }

    lines.push('')
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}
