import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './src/lib/sanity';
import { schema } from './sanity/schema';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [deskTool(), visionTool()],
  title: 'Nahom.no Studio',
});
