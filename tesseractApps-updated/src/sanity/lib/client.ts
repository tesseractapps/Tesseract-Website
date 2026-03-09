import { createClient } from '@sanity/client'
import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null
