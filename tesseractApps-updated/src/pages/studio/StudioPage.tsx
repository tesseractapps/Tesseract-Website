import { Studio } from 'sanity'
import { useEffect } from 'react'
import config from '../../../sanity.config'
import './StudioPage.css'

export default function StudioPage() {
  useEffect(() => {
    document.title = 'Studio | TesseractApps'
    const head = document.head
    let robots = head.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <>
      <div id="sanity-studio-root">
        <Studio config={config} />
      </div>
    </>
  )
}
