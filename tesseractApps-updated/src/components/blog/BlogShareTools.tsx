import { useState, useCallback } from 'react'
import { Copy, Check, AlertCircle, ExternalLink } from 'lucide-react'
import './BlogShareTools.css'
import { portableTextToMarkdown } from '../../utils/portableTextToMarkdown'
import type { BlockContentType } from '../../../sanity.types'
import claudeLogoUrl from '../../assets/claude-color.svg'
import chatgptLogoUrl from '../../assets/ChatGPT-Logo.svg'

type CopyState = 'idle' | 'copied' | 'error'

type Props = {
  title: string
  url: string
  body: BlockContentType
  author?: string
  publishedAt?: string
}

const AI_TOOLS = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    url: (postUrl: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(`Summarise this article and answer any questions I have about it: ${postUrl}`)}`,
  },
  {
    id: 'claude',
    label: 'Claude',
    url: (postUrl: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(`Summarise this article and answer any questions I have about it: ${postUrl}`)}`,
  },
]

export default function BlogShareTools({ title, url, body, author, publishedAt }: Props) {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const handleCopyMarkdown = useCallback(async () => {
    const md = portableTextToMarkdown(body, { title, author, publishedAt, url })
    try {
      await navigator.clipboard.writeText(md)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2200)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2200)
    }
  }, [body, title, author, publishedAt, url])

  return (
    <div className="bst-card">
      <p className="bst-title">Read with AI</p>

      <button
        className="bst-copy-btn"
        onClick={handleCopyMarkdown}
        aria-label={
          copyState === 'copied'
            ? 'Markdown copied to clipboard'
            : copyState === 'error'
            ? 'Copy failed — try again'
            : 'Copy article as Markdown'
        }
        aria-live="polite"
        disabled={copyState !== 'idle'}
      >
        <span className="bst-copy-icon" aria-hidden="true">
          {copyState === 'copied' ? (
            <Check size={15} strokeWidth={2.5} />
          ) : copyState === 'error' ? (
            <AlertCircle size={15} strokeWidth={2.5} />
          ) : (
            <Copy size={15} strokeWidth={1.8} />
          )}
        </span>
        <span className="bst-copy-label">
          {copyState === 'copied'
            ? 'Copied!'
            : copyState === 'error'
            ? 'Copy failed'
            : 'Copy as Markdown'}
        </span>
      </button>

      <p className="bst-divider-label">Open directly in</p>

      <div className="bst-ai-list" role="list">
        {AI_TOOLS.map((tool) => (
          <a
            key={tool.id}
            href={tool.url(url)}
            target="_blank"
            rel="noopener noreferrer"
            className={`bst-ai-btn bst-ai-btn--${tool.id}`}
            role="listitem"
            aria-label={`Open this article in ${tool.label}`}
          >
            <img
              src={tool.id === 'chatgpt' ? chatgptLogoUrl : claudeLogoUrl}
              alt=""
              className="bst-ai-logo bst-ai-logo--white"
              width={16}
              height={16}
              aria-hidden="true"
            />
            <span>{tool.label}</span>
            <ExternalLink size={11} strokeWidth={1.8} className="bst-external-icon" aria-hidden="true" />
          </a>
        ))}
      </div>

      <p className="bst-hint">
        Copy Markdown to paste the full article text into any AI chat.
      </p>
    </div>
  )
}

