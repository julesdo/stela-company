import type { Collection } from 'tinacms';

const Atelier: Collection = {
  label: 'Ateliers',
  name: 'atelier',
  path: 'content/ateliers',
  format: 'mdx',
  ui: {
    router: ({ document }) => `/ateliers/${document._sys.breadcrumbs.join('/')}`,
  },
  fields: [
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    { type: 'image', name: 'coverImage', label: 'Cover Image' },
    { type: 'string', name: 'discipline', label: 'Discipline' },
    { type: 'string', name: 'level', label: 'Level' },
    { type: 'string', name: 'duration', label: 'Duration' },
    { type: 'string', name: 'cadence', label: 'Cadence' },
    { type: 'string', name: 'dayTime', label: 'Day/Time' },
    { type: 'string', name: 'language', label: 'Language' },
    { type: 'string', name: 'capacity', label: 'Capacity' },
    { type: 'string', name: 'priceInfo', label: 'Price Info' },
    { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
    { type: 'string', name: 'registerUrl', label: 'Register URL' },
    { type: 'string', list: true, name: 'objectives', label: 'Objectives' },
    { type: 'string', list: true, name: 'program', label: 'Program' },
    { type: 'string', list: true, name: 'prerequisites', label: 'Prerequisites' },
    { type: 'string', list: true, name: 'materials', label: 'Materials' },
    {
      type: 'object',
      name: 'instructors',
      label: 'Instructors',
      list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Name' },
        { type: 'string', name: 'role', label: 'Role' },
        { type: 'image', name: 'photo', label: 'Photo' },
      ],
    },
    {
      type: 'object',
      name: 'sessions',
      label: 'Sessions',
      list: true,
      fields: [
        { type: 'datetime', name: 'start', label: 'Start' },
        { type: 'datetime', name: 'end', label: 'End' },
        { type: 'string', name: 'city', label: 'City' },
        { type: 'string', name: 'venue', label: 'Venue' },
        { type: 'string', name: 'address', label: 'Address' },
      ],
    },
  ],
};

export default Atelier;


