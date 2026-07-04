import { type SchemaTypeDefinition } from 'sanity';

type Rule = {
  required: () => Rule;
  min: (n: number) => Rule;
  max: (n: number) => Rule;
};

const workExperience = {
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'company', title: 'Company', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'position', title: 'Position', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'positionNo', title: 'Position (Norwegian)', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date', validation: (R: Rule) => R.required() },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if this is your current role',
    },
    { name: 'isCurrent', title: 'Current Position', type: 'boolean', initialValue: false },
    {
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'Optional status badge, e.g. "Incoming" or "Part-time"',
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text' },
    { name: 'technologies', title: 'Technologies', type: 'array', of: [{ type: 'string' }] },
    { name: 'learnings', title: 'Key Learnings', type: 'array', of: [{ type: 'string' }] },
    { name: 'learningsNo', title: 'Key Learnings (Norwegian)', type: 'array', of: [{ type: 'string' }] },
    { name: 'picture', title: 'Picture', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'position', subtitle: 'company' },
  },
};

const relevantClasses = {
  name: 'relevantClasses',
  title: 'Class',
  type: 'document',
  fields: [
    {
      name: 'education',
      title: 'Education',
      type: 'reference',
      to: [{ type: 'education' }],
      description: 'The education entry this class belongs to',
    },
    { name: 'courseCode', title: 'Code', type: 'string' },
    { name: 'courseName', title: 'Name', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'courseNameNo', title: 'Name (Norwegian)', type: 'string' },
    {
      name: 'grade',
      title: 'Grade',
      type: 'string',
      options: { list: ['A', 'B', 'C', 'D', 'E', 'F', 'Pass'] },
    },
    { name: 'year', title: 'Year', type: 'number' },
  ],
  preview: {
    select: { title: 'courseName', subtitle: 'grade' },
  },
};

const education = {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    { name: 'institution', title: 'Institution', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'degree', title: 'Degree', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'degreeNo', title: 'Degree (Norwegian)', type: 'string' },
    { name: 'fieldOfStudy', title: 'Field of Study', type: 'string' },
    { name: 'fieldOfStudyNo', title: 'Field of Study (Norwegian)', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'date' },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently studying',
    },
    { name: 'isCurrent', title: 'Currently Studying', type: 'boolean', initialValue: false },
    {
      name: 'gpa',
      title: 'GPA / Average Grade',
      type: 'string',
      description: 'Shown on the site, e.g. "B" or "4.2"',
    },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'institutionLogo', title: 'Institution Logo', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'degree', subtitle: 'institution' },
  },
};

const resume = {
  name: 'resume',
  title: 'Résumé / CV',
  type: 'document',
  fields: [
    {
      name: 'file',
      title: 'Résumé File (PDF)',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
      validation: (R: Rule) => R.required(),
    },
    {
      name: 'label',
      title: 'Download Label',
      type: 'string',
      description: 'Text shown on the download button (e.g. "Résumé" or "CV")',
      initialValue: 'Résumé',
    },
    {
      name: 'fileNo',
      title: 'Résumé File — Norwegian (PDF)',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
    },
    {
      name: 'labelNo',
      title: 'Norwegian Download Label',
      type: 'string',
      initialValue: 'CV (norsk)',
    },
  ],
};

const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R: Rule) => R.required() },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'descriptionNo', title: 'Description (Norwegian)', type: 'text' },
    { name: 'stack', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'image', title: 'Screenshot', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'Project URL', type: 'url' },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'year' },
  },
};

const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity & Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'skills', title: 'Skills & Marquee' },
    { name: 'contact', title: 'Contact & Footer' },
    { name: 'sections', title: 'Sections' },
  ],
  fields: [
    // ── Identity & Hero ──
    {
      name: 'name',
      title: 'Display Name',
      type: 'string',
      group: 'identity',
      initialValue: 'Nahom Berhane',
    },
    {
      name: 'roleLabel',
      title: 'Role Label',
      type: 'string',
      group: 'identity',
      description: 'Small label in the hero/footer, e.g. "Programmer · Developer"',
    },
    {
      name: 'roleLabelNo',
      title: 'Role Label (Norwegian)',
      type: 'string',
      group: 'identity',
    },
    {
      name: 'birthDate',
      title: 'Birth Date',
      type: 'date',
      group: 'identity',
      description: 'Used to show your age — updates automatically every year',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'identity',
      description: 'Where you live, e.g. "Oslo, Norway"',
    },
    {
      name: 'locationNo',
      title: 'Location (Norwegian)',
      type: 'string',
      group: 'identity',
      description: 'e.g. "Oslo, Norge"',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      group: 'identity',
      description: 'The large serif sentence in the hero',
    },
    {
      name: 'taglineNo',
      title: 'Tagline (Norwegian)',
      type: 'text',
      group: 'identity',
    },
    {
      name: 'heroHighlights',
      title: 'Hero Highlights',
      type: 'array',
      group: 'identity',
      description: 'The Now / Prev / Stack list in the hero',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Now", "Prev", "Stack"' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    },
    // ── About ──
    {
      name: 'aboutText',
      title: 'About — Paragraphs',
      type: 'array',
      group: 'about',
      of: [{ type: 'text' }],
      description: 'Each item becomes one paragraph in the About section',
    },
    {
      name: 'aboutTextNo',
      title: 'About — Paragraphs (Norwegian)',
      type: 'array',
      group: 'about',
      of: [{ type: 'text' }],
    },
    {
      name: 'portrait',
      title: 'Portrait Photo',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
    },
    {
      name: 'languages',
      title: 'Spoken Languages',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Language', type: 'string' },
            {
              name: 'level',
              title: 'Level',
              type: 'string',
              options: { list: ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic'] },
            },
          ],
          preview: { select: { title: 'name', subtitle: 'level' } },
        },
      ],
    },
    // ── Skills & Marquee ──
    {
      name: 'toolkitHeading',
      title: 'Toolkit — Heading',
      type: 'string',
      group: 'skills',
      description: 'The big section title, e.g. "Tools" or "Toolkit"',
    },
    {
      name: 'toolkitSubtitle',
      title: 'Toolkit — Subtitle',
      type: 'string',
      group: 'skills',
      description: 'Small line under the heading, e.g. "Languages, frameworks & methods I\'ve used or am familiar with"',
    },
    {
      name: 'toolkitHeadingNo',
      title: 'Toolkit — Heading (Norwegian)',
      type: 'string',
      group: 'skills',
    },
    {
      name: 'toolkitSubtitleNo',
      title: 'Toolkit — Subtitle (Norwegian)',
      type: 'string',
      group: 'skills',
    },
    {
      name: 'skillGroups',
      title: 'Skill Groups',
      type: 'array',
      group: 'skills',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'skills', title: 'Skills', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: { select: { title: 'category' } },
        },
      ],
    },
    {
      name: 'marqueeWords',
      title: 'Marquee Strip Words',
      type: 'array',
      group: 'skills',
      of: [{ type: 'string' }],
      description: 'Words that scroll across the strip below the hero',
    },
    // ── Contact & Footer ──
    { name: 'email', title: 'Email', type: 'string', group: 'contact' },
    { name: 'githubUrl', title: 'GitHub URL', type: 'url', group: 'contact' },
    { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'contact' },
    { name: 'websiteUrl', title: 'Website URL', type: 'url', group: 'contact' },
    { name: 'phone', title: 'Phone', type: 'string', group: 'contact' },
    {
      name: 'contactKicker',
      title: 'Contact — Kicker',
      type: 'string',
      group: 'contact',
      description: 'Small line above the big "Say hello", e.g. "Open to graduate roles"',
    },
    {
      name: 'contactHeading',
      title: 'Contact — Heading',
      type: 'string',
      group: 'contact',
      description: 'The big call-to-action, e.g. "Say hello"',
    },
    {
      name: 'contactKickerNo',
      title: 'Contact — Kicker (Norwegian)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'contactHeadingNo',
      title: 'Contact — Heading (Norwegian)',
      type: 'string',
      group: 'contact',
      description: 'e.g. "Si hei"',
    },
    {
      name: 'footerNote',
      title: 'Footer Note',
      type: 'string',
      group: 'contact',
      description: 'Middle text in the footer',
    },
    // ── Sections ──
    {
      name: 'offClockEnabled',
      title: 'Show "Off the clock" section',
      type: 'boolean',
      group: 'sections',
      initialValue: true,
      description: 'The now-playing (Spotify) + recently-watched (Letterboxd) section',
    },
    {
      name: 'offClockKicker',
      title: 'Off the clock — Subtitle',
      type: 'string',
      group: 'sections',
      description: 'e.g. "Now playing & recently watched"',
    },
    {
      name: 'offClockKickerNo',
      title: 'Off the clock — Subtitle (Norwegian)',
      type: 'string',
      group: 'sections',
    },
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, project, workExperience, education, relevantClasses, resume],
};
