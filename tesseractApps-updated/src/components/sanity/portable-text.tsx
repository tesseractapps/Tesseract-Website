import { lazy, Suspense } from 'react'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import { Link } from 'react-router-dom'
import SanityImage from './sanity-image'
import type { BlockContentType } from '../../../sanity.types'
import './portable-text.css'

const LazyCodeBlock = lazy(() => import('./CodeBlock'))

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="pt-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="pt-h4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="pt-blockquote">{children}</blockquote>,
    normal: ({ children }) => <p className="pt-paragraph">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="pt-underline">{children}</span>,
    'strike-through': ({ children }) => <s>{children}</s>,
    code: ({ children }) => <code className="pt-code-inline">{children}</code>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? ''
      const blank: boolean = value?.blank ?? false
      const isExternal = href.startsWith('http') || href.startsWith('//')
      if (isExternal || blank) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="pt-link">
            {children}
          </a>
        )
      }
      return (
        <Link to={href} className="pt-link">
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="pt-image-figure">
          <SanityImage
            src={value}
            alt={value.alt ?? ''}
            className="pt-image"
            width={800}
            height={450}
          />
          {value.caption && (
            <figcaption className="pt-image-caption">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }) => {
      const language: string = value?.language ?? 'text'
      const filename: string | undefined = value?.filename
      const code: string = value?.code ?? ''
      return (
        <div className="pt-code-block">
          {(filename ?? language) && (
            <div className="pt-code-header">
              {filename ? (
                <span className="pt-code-filename">{filename}</span>
              ) : (
                <span className="pt-code-language">{language}</span>
              )}
            </div>
          )}
          <Suspense
            fallback={
              <pre
                style={{
                  background: '#1d1f21',
                  color: '#ccc',
                  padding: '1em',
                  borderRadius: filename ?? language ? '0 0 6px 6px' : '6px',
                  overflowX: 'auto',
                  fontSize: '0.875em',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                <code>{code}</code>
              </pre>
            }
          >
            <LazyCodeBlock
              language={language}
              code={code}
              customStyle={{ margin: 0, borderRadius: filename ?? language ? '0 0 6px 6px' : '6px' }}
              showLineNumbers
            />
          </Suspense>
        </div>
      )
    },
    callout: ({ value }) => {
      const type: 'info' | 'warning' | 'tip' = value?.type ?? 'info'
      return (
        <div className={`pt-callout pt-callout--${type}`}>
          {/* <span className="pt-callout-icon" aria-hidden="true">{icons[type]}</span> */}
          <p className="pt-callout-text">{value?.text}</p>
        </div>
      )
    },
    table: ({ value }) => {
      const rows: Array<{ cells?: string[] }> = value?.rows ?? []
      if (rows.length === 0) return null
      const [headerRow, ...bodyRows] = rows
      return (
        <div className="pt-table-wrapper">
          <table className="pt-table">
            <thead>
              <tr>
                {headerRow?.cells?.map((cell: string, i: number) => (
                  <th key={i} className="pt-table-th">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i}>
                  {row.cells?.map((cell: string, j: number) => (
                    <td key={j} className="pt-table-td">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
}

type PortableTextRendererProps = {
  value: BlockContentType
  className?: string
}

export default function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  return (
    <div className={`pt-root${className ? ` ${className}` : ''}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
