import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './src/sanity/env'

const studioProjectId = projectId
if (!studioProjectId) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID for Sanity Studio config')
}

const studioDataset = dataset
if (!studioDataset) {
  throw new Error('Missing VITE_SANITY_DATASET for Sanity Studio config')
}

export default defineConfig({
  name: 'tesseract-studio',
  title: 'TesseractApps Studio',
  projectId: studioProjectId,
  dataset: studioDataset,
  apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
