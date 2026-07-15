import type { Collection } from 'tinacms';
import { LangBannerField } from '../fields/lang-banner';
import { sectionBlockSchemaField } from '@/components/layout/section';

const Team: Collection = {
  label: 'Équipe',
  name: 'team',
  path: 'content/team',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      const localeFromFilename = filepath.match(/\.(fr|de|en|sr)$/)?.[1];
      const locale = localeFromFilename ?? (document as any).lang ?? 'fr';
      const basePath = locale === 'fr' ? '' : `/${locale}`;
      const cleanPath = filepath.replace(/\.(fr|de|en|sr)$/, '');
      return `${basePath}/equipe/${cleanPath}`;
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
    sectionBlockSchemaField as any,
    { type: 'string', name: 'name', label: 'Nom', isTitle: true, required: true },
    { type: 'string', name: 'role', label: 'Rôle' },
    { type: 'image', name: 'portrait', label: 'Portrait' },
    { type: 'string', list: true, name: 'article', label: 'Article' },
    {
      type: 'object',
      list: true,
      name: 'facts',
      label: 'Informations',
      ui: {
        itemProps: (item: any) => ({ label: item?.label || 'Info' }),
        defaultItem: { label: '', value: '' },
      },
      fields: [
        { type: 'string', name: 'label', label: 'Label' },
        { type: 'string', name: 'value', label: 'Valeur' },
      ],
    },
    {
      type: 'object',
      name: 'socials',
      label: 'Réseaux sociaux',
      fields: [
        { type: 'string', name: 'website', label: 'Site web' },
        { type: 'string', name: 'instagram', label: 'Instagram' },
        { type: 'string', name: 'linkedin', label: 'LinkedIn' },
        { type: 'string', name: 'x', label: 'X (Twitter)' },
        { type: 'string', name: 'email', label: 'Email' },
      ],
    },
    {
      type: 'object',
      list: true,
      name: 'gallery',
      label: 'Galerie',
      ui: {
        itemProps: (item: any) => ({ label: item?.alt || 'Photo' }),
        defaultItem: { alt: '', ratio: 'portrait' },
      },
      fields: [
        { type: 'image', name: 'src', label: 'Image' },
        { type: 'string', name: 'alt', label: 'Texte alternatif' },
        {
          type: 'string',
          name: 'ratio',
          label: 'Ratio',
          options: [
            { value: 'portrait', label: 'Portrait' },
            { value: 'square', label: 'Carré' },
            { value: 'landscape', label: 'Paysage' },
          ]
        },
      ],
    },
  ],
};

export default Team;
