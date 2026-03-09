import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

type ImageBuilderLike = {
  width: (_value: number) => ImageBuilderLike
  height: (_value: number) => ImageBuilderLike
  fit: (_value: string) => ImageBuilderLike
  crop: (_value: string) => ImageBuilderLike
  auto: (_value: string) => ImageBuilderLike
  url: () => string
}

const builder = client ? imageUrlBuilder(client) : null

function createNoopBuilder(): ImageBuilderLike {
  return {
    width: () => createNoopBuilder(),
    height: () => createNoopBuilder(),
    fit: () => createNoopBuilder(),
    crop: () => createNoopBuilder(),
    auto: () => createNoopBuilder(),
    url: () => '',
  }
}

export function urlFor(source: SanityImageSource) {
  return builder ? builder.image(source) : createNoopBuilder()
}
