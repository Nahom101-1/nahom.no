import { defineField, defineType } from 'sanity';

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'picture',
      title: 'Company Logo or Picture',
      type: 'image',
      options: { hotspot: true },
      description: 'Logo or image representing the company',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City/Country',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently working',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Currently Working',
      type: 'boolean',
      description: 'Check if you are currently working at this company',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of your role, achievements, or projects',
      rows: 3,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. React, TypeScript, Go, PostgreSQL',
      validation: rule => rule.unique().max(50),
    }),
    defineField({
      name: 'learnings',
      title: 'Things I Learned / Experienced',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description:
        'e.g., Teamwork, Collaboration, Agile, Communication, Leadership',
      validation: rule => rule.unique().max(50),
    }),
  ],
});
