import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

interface CodeBlockProps {
  language: string
  code: string
  customStyle?: React.CSSProperties
  showLineNumbers?: boolean
}

export default function CodeBlock({ language, code, customStyle, showLineNumbers }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (preRef.current && customStyle) {
      Object.assign(preRef.current.style, customStyle)
    }
  }, [customStyle])

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute('data-highlighted')
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <pre ref={preRef}>
      <code
        ref={codeRef}
        className={`language-${language || 'typescript'}${showLineNumbers ? ' hljs-line-numbers' : ''}`}
      >
        {code}
      </code>
    </pre>
  )
}
