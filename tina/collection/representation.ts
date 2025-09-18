import type { Collection } from 'tinacms';

const Representation: Collection = {
  label: 'Représentations',
  name: 'representation',
  path: 'content/representations',
  format: 'mdx',
  ui: {
    router: ({ document }) => `/representations/${document._sys.breadcrumbs.join('/')}`,
  },
  fields: [
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    { type: 'string', name: 'subtitle', label: 'Subtitle' },
    { type: 'image', name: 'hero', label: 'Hero Image' },
    { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
    { type: 'datetime', name: 'date', label: 'Date' },
    { type: 'datetime', name: 'endDate', label: 'End Date' },
    { type: 'string', name: 'city', label: 'City' },
    { type: 'string', name: 'venue', label: 'Venue' },
    { type: 'string', name: 'address', label: 'Address' },
    { type: 'string', name: 'duration', label: 'Duration' },
    { type: 'string', name: 'languages', label: 'Languages' },
    { type: 'string', name: 'age', label: 'Age' },
    { type: 'string', name: 'accessibility', label: 'Accessibility' },
    { type: 'string', name: 'bookingUrl', label: 'Booking URL' },
    { type: 'string', list: true, name: 'article', label: 'Article Paragraphs', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'credits',
      label: 'Credits',
      list: true,
      fields: [
        { type: 'string', name: 'role', label: 'Role' },
        { type: 'string', name: 'name', label: 'Name' },
      ],
    },
    {
      type: 'object',
      name: 'gallery',
      label: 'Gallery',
      list: true,
      fields: [
        { type: 'image', name: 'src', label: 'Image' },
        { type: 'string', name: 'alt', label: 'Alt' },
      ],
    },
    {
      type: 'object',
      name: 'partners',
      label: 'Partners',
      list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Name' },
        { type: 'image', name: 'logo', label: 'Logo' },
        { type: 'string', name: 'url', label: 'URL' },
      ],
    },
  ],
};

export default Representation;


