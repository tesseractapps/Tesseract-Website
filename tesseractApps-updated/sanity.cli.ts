import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID ?? '',
    dataset: process.env.VITE_SANITY_DATASET ?? 'production',
  },
  deployment: {
    appId: 'jda2djt81ij5frup67olb8g1',
  },
})
