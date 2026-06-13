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

// Array of authors — each resolves through the `human` type.
// Photo field uses coalesce(photo, avatar) to stay compatible with any legacy docs.
const authorsFragment = `
  authors[]->{
    _id,
    _type,
    name,
    slug,
    bio,
    role,
    linkedInUrl,
    twitterHandle,
    githubHandle,
    websiteUrl,
    "photo": coalesce(photo, avatar) {
      asset->{ _id, url, metadata { lqip } },
      alt
    }
  }
`

// Fetch up to 3 authors for card display (avatars + first names)
const authorFragment = `
  "author": authors[0]->{
    _id,
    name,
    slug,
    "photo": coalesce(photo, avatar) {
      asset->{ _id, url, metadata { lqip } },
      alt
    }
  },
  "authors": authors[]->{
    _id,
    name,
    slug,
    "photo": coalesce(photo, avatar) {
      asset->{ _id, url, metadata { lqip } },
      alt
    }
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

// All published posts — newest first
// Accepts optional $from (default 0) and $to (default 100) for pagination
export const BLOG_LIST_QUERY = `
  *[_type == "blogPost" && status == "published"]
  | order(publishedAt desc)
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
    ${authorsFragment},
    ${categoryFragment},
    tags,
    excerpt,
    publishedAt,
    _updatedAt,
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
    cta {
      variant,
      heading,
      body,
      primaryLabel,
      primaryUrl,
      secondaryLabel,
      secondaryUrl
    },
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
      },
      ${authorFragment}
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

// All humans — for /humans index page
export const ALL_HUMANS_QUERY = `
  *[_type == "human"] | order(order asc) {
    _id, name, slug, role, department,
    photo {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, hotspot, crop
    }
  }
`

// Single human by slug — for /humans/:slug profile page
export const HUMAN_BY_SLUG_QUERY = `
  *[_type == "human" && slug.current == $slug][0] {
    _id, name, slug, role, department, bio, order,
    showInTeam, isBlogAuthor,
    linkedInUrl, twitterHandle, githubHandle, websiteUrl,
    photo {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, hotspot, crop
    }
  }
`

// Humans shown in the team grid on the About page
export const TEAM_MEMBERS_QUERY = `
  *[_type == "human" && showInTeam == true]
  | order(order asc) {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    order,
    linkedInUrl,
    twitterHandle,
    githubHandle,
    websiteUrl,
    photo {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt,
      hotspot,
      crop
    }
  }
`

// Release Notes — all, newest first
export const RELEASE_NOTES_QUERY = `
  *[_type == "releaseNote"]
  | order(releaseDate desc) {
    _id,
    version,
    releaseDate,
    releaseType,
    changes[] {
      _key,
      title,
      category,
      description
    }
  }
`

// Job Listings — open only, ordered by display order
export const JOB_LISTINGS_QUERY = `
  *[_type == "jobListing" && isOpen == true]
  | order(order asc) {
    _id,
    title,
    isOpen,
    order,
    tags,
    summary,
    sections,
    contactEmail,
    contactName
  }
`

// Capability Pages — single page by slug (full content for page render)
export const CAPABILITY_PAGE_BY_SLUG_QUERY = `
  *[_type == "capabilityPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    navGroup,
    order,
    heroHeading,
    heroSubtitle,
    problemStatement,
    whatMattersMost,
    howWeSolveThis,
    whatYouGet,
    isThisRightForYou,
    relatedCapabilities[]-> {
      _id,
      title,
      slug,
      navGroup,
      heroSubtitle
    },
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
    }
  }
`

// Capability Pages — nav index (lightweight, for mega-menu population)
export const CAPABILITY_NAV_QUERY = `
  *[_type == "capabilityPage"]
  | order(navGroup asc, order asc) {
    _id,
    title,
    slug,
    navGroup,
    order,
    navSubtitle,
    heroSubtitle
  }
`

// Solution Pages — full document by slug
export const SOLUTION_PAGE_BY_SLUG_QUERY = `
  *[_type == "solutionPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    navCategory,
    order,
    heroHeading,
    heroSubtitle,
    whoIsThisFor,
    keyBenefits,
    howWeSupport,
    whatYouGet,
    isThisRightForYou,
    relatedSolutions[]-> {
      _id,
      title,
      slug,
      navCategory,
      heroSubtitle
    },
    seo {
      metaTitle,
      metaDescription,
      openGraphTitle,
      openGraphDescription,
      openGraphImage { asset->{ url } },
      canonicalUrl,
      noIndex,
      schemaMarkup
    }
  }
`

// Solution Pages — nav index (lightweight, for mega-menu population)
export const SOLUTION_PAGE_NAV_QUERY = `
  *[_type == "solutionPage"]
  | order(navCategory asc, order asc) {
    _id,
    title,
    slug,
    navCategory,
    order,
    navSubtitle,
    heroSubtitle
  }
`

// Competitor Pages — full document by slug (for /compare/:slug page render)
export const COMPETITOR_PAGE_BY_SLUG_QUERY = `
  *[_type == "competitorPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    competitorName,
    order,
    heroHeading,
    heroSubtitle,
    aboutHeading,
    aboutBody,
    aboutTrustBadges,
    awardBadges[] { label, sub },
    comparisonCategories[] {
      title,
      rows[] { feature, us, them }
    },
    switchSteps[] { title, body },
    rightChoiceHeading,
    rightChoiceItems,
    ctaHeading,
    ctaDescription,
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
    }
  }
`

// Client Logos — visible only, ordered by display order
export const CLIENT_LOGOS_QUERY = `
  *[_type == "clientLogo" && isVisible == true]
  | order(order asc) {
    _id,
    name,
    order,
    logo {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    }
  }
`

// Brochures — published and coming_soon, featured first then newest
export const BROCHURES_QUERY = `
  *[_type == "brochure" && status in ["published", "coming_soon"]]
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    status,
    description,
    publishedAt,
    featured,
    pdfFile {
      asset->{ _id, url }
    },
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    seo { metaTitle, metaDescription }
  }
`

// Single whitepaper by slug — full fields for individual page
export const WHITEPAPER_BY_SLUG_QUERY = `
  *[_type == "whitepaper" && slug.current == $slug && status in ["published", "coming_soon"]][0] {
    _id,
    title,
    slug,
    status,
    excerpt,
    abstract,
    audience,
    publishedAt,
    gated,
    tags,
    featured,
    authors[]->{
      _id,
      name,
      slug,
      role,
      linkedInUrl,
      "photo": coalesce(photo, avatar) {
        asset->{ _id, url, metadata { lqip } },
        alt
      }
    },
    pdfFile {
      asset->{ _id, url }
    },
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    seo { metaTitle, metaDescription, canonicalUrl, noIndex }
  }
`

// Whitepapers — published and coming_soon, featured first then newest
export const WHITEPAPERS_QUERY = `
  *[_type == "whitepaper" && status in ["published", "coming_soon"]]
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    status,
    excerpt,
    audience,
    publishedAt,
    gated,
    tags,
    featured,
    pdfFile {
      asset->{ _id, url }
    },
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    authors[]->{
      _id,
      name,
      slug,
      "photo": coalesce(photo, avatar) {
        asset->{ _id, url, metadata { lqip } },
        alt
      }
    },
    seo { metaTitle, metaDescription }
  }
`

// Guides — published and coming_soon, featured first then newest
// Note: pdfFile intentionally excluded — only fetched on the individual page after form submission
export const GUIDES_QUERY = `
  *[_type == "guide" && status in ["published", "coming_soon"]]
  | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    status,
    topic,
    excerpt,
    audience,
    publishedAt,
    featured,
    tags,
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    seo { metaTitle, metaDescription }
  }
`

// Single guide by slug — includes pdfFile for gated download
export const GUIDE_BY_SLUG_QUERY = `
  *[_type == "guide" && slug.current == $slug && status in ["published", "coming_soon"]][0] {
    _id,
    title,
    slug,
    status,
    topic,
    heroHeadline,
    heroSubheadline,
    excerpt,
    body,
    audience,
    publishedAt,
    featured,
    tags,
    pdfFile {
      asset->{ _id, url }
    },
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    formConfig {
      submitButtonText,
      confirmationMessage,
      trustIndicators
    },
    seo { metaTitle, metaDescription, canonicalUrl, noIndex }
  }
`
