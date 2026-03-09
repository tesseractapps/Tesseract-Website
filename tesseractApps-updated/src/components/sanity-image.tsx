import type React from 'react'
import { useState } from 'react'
import { urlFor } from '../sanity/lib/image'
import type { SanityImageObject } from '../../sanity.types'

type SanityImageProps = {
  src: SanityImageObject
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  style?: React.CSSProperties
}

export default function SanityImage({
  src,
  alt,
  className,
  width = 800,
  height = 450,
  loading = 'lazy',
  style,
}: SanityImageProps) {
  const [imgError, setImgError] = useState(false)

  if (!src?.asset || imgError) return null

  const imageUrl = urlFor(src)
    .width(width)
    .height(height)
    .fit('crop')
    .crop('focalpoint')
    .auto('format')
    .url()

  const lqip = src.asset?.metadata?.lqip

  const containerStyle: React.CSSProperties = lqip
    ? {
        backgroundImage: `url(${lqip})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
      }
    : style ?? {}

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      style={containerStyle}
      decoding="async"
      onError={() => setImgError(true)}
    />
  )
}
