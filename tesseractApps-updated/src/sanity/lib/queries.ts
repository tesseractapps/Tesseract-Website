// Reusable fragments — interpolated at the string level into full queries
const mainImageFragment = `
  mainImage {
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt,
    caption,
    hotspot,
    crop
  }
`

const authorFragment = `
  author->{
    _id,
    name,
    slug,
    bio,
    avatar {
      asset->{ _id, url, metadata { lqip } },
      alt
    },
    twitterHandle,
    linkedInUrl
  }
`

const categoryFragment = `
  category->{
    _id,
    title,
    slug,
    description
  }
`

// All published posts — ordered featured desc then publishedAt desc
// Accepts optional $from (default 0) and $to (default 100) for pagination
export const BLOG_LIST_QUERY = `
  *[_type == "blogPost" && status == "published"]
  | order(featured desc, publishedAt desc)
  [$from...$to] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    ${categoryFragment},
    tags,
    readingTime,
    featured,
    ${mainImageFragment},
    ${authorFragment}
  }
`

// Single post by slug — all fields including body and SEO
export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    status,
    ${authorFragment},
    ${categoryFragment},
    tags,
    excerpt,
    publishedAt,
    ${mainImageFragment},
    body,
    seo {
      metaTitle,
      metaDescription,
      openGraphTitle,
      openGraphDescription,
      openGraphImage {
        asset->{ url }
      },
      canonicalUrl,
      noIndex,
      schemaMarkup
    },
    readingTime,
    featured,
    relatedPosts[]-> {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt,
        caption,
        hotspot,
        crop
      }
    }
  }
`

// Posts filtered by category title (case-insensitive, matches UI display values like "NDIS")
export const BLOG_CATEGORY_QUERY = `
  *[_type == "blogPost" && status == "published" && lower(category->title) == lower($category)]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    ${categoryFragment},
    tags,
    readingTime,
    featured,
    ${mainImageFragment},
    ${authorFragment}
  }
`

// Distinct categories that have at least one published post
export const BLOG_CATEGORIES_QUERY = `
  *[_type == "category" && count(*[_type == "blogPost" && status == "published" && references(^._id)]) > 0] {
    _id,
    title
  } | order(title asc)
`
