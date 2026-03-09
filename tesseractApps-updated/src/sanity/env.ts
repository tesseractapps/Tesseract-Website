export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
export const dataset = import.meta.env.VITE_SANITY_DATASET as string | undefined
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01'

const missingVars = [
  !projectId ? 'VITE_SANITY_PROJECT_ID' : null,
  !dataset ? 'VITE_SANITY_DATASET' : null,
].filter(Boolean) as string[]

export const isSanityConfigured = missingVars.length === 0

export const sanityConfigError = isSanityConfigured
  ? null
  : `Sanity environment is missing: ${missingVars.join(', ')}`
