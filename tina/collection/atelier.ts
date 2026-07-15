import type { Collection } from 'tinacms';
import { LangBannerField } from '../fields/lang-banner';

const Atelier: Collection = {
  label: 'Ateliers',
  name: 'atelier',
  path: 'content/ateliers',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      const localeFromFilename = filepath.match(/\.(fr|de|en|sr)$/)?.[1];
      const locale = localeFromFilename ?? (document as any).lang ?? 'fr';
      const basePath = locale === 'fr' ? '' : `/${locale}`;
      const cleanPath = filepath.replace(/\.(fr|de|en|sr)$/, '');
      return `${basePath}/ateliers/${cleanPath}`;
    },
  },
  fields: [
    {
      type: 'string',
      name: 'lang',
      label: 'Langue',
      required: false,
      ui: {
        defaultValue: 'fr',
        // @ts-ignore – wrapFieldsWithMeta type incompatible avec ui.component
        component: LangBannerField,
      },
    },
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
    { type: 'string', name: 'helloassoUrl', label: 'Lien HelloAsso (inscription / paiement)' },
    { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
    {
      type: 'object',
      name: 'lieux',
      label: 'Lieux',
      list: true,
      ui: {
        itemProps: (item: any) => ({ label: item?.nom || 'Nouveau lieu' }),
        defaultItem: { nom: '', city: '', venue: '' },
      },
      fields: [
        { type: 'string', name: 'nom', label: 'Nom du lieu' },
        { type: 'string', name: 'city', label: 'Ville' },
        { type: 'string', name: 'venue', label: 'Lieu/Salle' },
        { type: 'string', name: 'address', label: 'Adresse' },
        { type: 'string', name: 'dayTime', label: 'Jour/Horaire' },
        { type: 'string', name: 'duration', label: 'Durée' },
        { type: 'string', name: 'capacity', label: 'Capacité' },
        { type: 'string', name: 'priceInfo', label: 'Infos tarif' },
        { type: 'string', name: 'email', label: 'Email de contact' },
        { type: 'string', name: 'phone', label: 'Téléphone de contact' },
        { type: 'string', name: 'note', label: 'Note/Information complémentaire', ui: { component: 'textarea' } },
        {
          type: 'object',
          name: 'sessions',
          label: 'Sessions',
          list: true,
          fields: [
            { type: 'datetime', name: 'start', label: 'Début' },
            { type: 'datetime', name: 'end', label: 'Fin' },
          ],
        },
        { type: 'string', name: 'registerUrl', label: 'URL d\'inscription' },
      ],
    },
    { type: 'string', list: true, name: 'objectives', label: 'Objectives' },
    { type: 'string', list: true, name: 'program', label: 'Program' },
    { type: 'string', list: true, name: 'prerequisites', label: 'Prerequisites' },
    { type: 'string', list: true, name: 'materials', label: 'Materials' },
    {
      type: 'object',
      name: 'instructors',
      label: 'Instructors',
      list: true,
      ui: {
        itemProps: (item: any) => ({ label: item?.name || 'Intervenant' }),
        defaultItem: { name: '', role: '' },
      },
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
      ui: {
        itemProps: (item: any) => ({ label: item?.city || item?.venue || 'Session' }),
        defaultItem: { city: '', venue: '', address: '' },
      },
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


