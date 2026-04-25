import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemaTypes'
const studioProjectId = 'gtnor2fs'
const studioDataset = 'production'
const apiVersion = '2024-01-01'

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
