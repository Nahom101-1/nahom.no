import { type SchemaTypeDefinition } from 'sanity';

const workExperience = {
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'learnings',
      title: 'Key Learnings',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

const education = {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
    },
    {
      name: 'degree',
      title: 'Degree',
      type: 'string',
    },
    {
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'isCurrent',
      title: 'Current Education',
      type: 'boolean',
    },
    {
      name: 'gpa',
      title: 'GPA',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'institutionLogo',
      title: 'Institution Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

const backGroundPoster = {
  name: 'backGroundPoster',
  title: 'Background Poster',
  type: 'document',
  fields: [
    {
      name: 'poster',
      title: 'Poster Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

const asset = {
  name: 'picture',
  title: 'Pictures Assets',
  type: 'document',
  description: 'Pictures assets for the website',
  fields: [
    {
      name: 'url',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Alternative text for accessibility',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption for the image',
    },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [workExperience, education, backGroundPoster, asset],
};
