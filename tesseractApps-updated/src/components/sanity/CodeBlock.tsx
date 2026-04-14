import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface CodeBlockProps {
  language: string
  code: string
  customStyle?: React.CSSProperties
  showLineNumbers?: boolean
}

export default function CodeBlock({ language, code, customStyle, showLineNumbers }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language || 'typescript'}
      style={atomDark}
      customStyle={customStyle}
      showLineNumbers={showLineNumbers}
    >
      {code}
    </SyntaxHighlighter>
  )
}
