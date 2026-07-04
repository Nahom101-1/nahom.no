import { defineConfig } from 'sanity';
import { deskTool, type StructureBuilder } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { dataset, projectId } from './src/lib/sanity';
import { schema } from './sanity/schema';

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('workExperience').title('Work Experience'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('education').title('Education'),
      S.documentTypeListItem('relevantClasses').title('Classes'),
      S.divider(),
      S.documentTypeListItem('resume').title('Résumé / CV'),
    ]);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [deskTool({ structure }), visionTool()],
  title: 'Nahom.no Studio',
});
