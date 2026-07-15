import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";
import { AtelierOrderField, RepresentationOrderField, TeamOrderField } from "../fields/sortable-order-field";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Tagline",
          name: "tagline",
          ui: { description: 'Ex : "Danse · Théâtre · Langues"' },
        },
        {
          type: "string",
          label: "Email de contact",
          name: "email",
        },
        {
          type: "string",
          label: "URL Instagram",
          name: "instagramUrl",
        },
        {
          type: "string",
          label: "Handle Instagram",
          name: "instagramHandle",
          ui: { description: 'Ex : "@stelacompany"' },
        },
        {
          type: "object",
          label: "Liens sociaux (icônes)",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || 'undefined' };
            },
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Ordre d'affichage",
      name: "ordering",
      fields: [
        {
          type: "string",
          name: "ateliers",
          label: "Ateliers — ordre d'affichage",
          ui: {
            // @ts-ignore – wrapFieldsWithMeta type incompatible avec ui.component
            component: AtelierOrderField,
          },
        },
        {
          type: "string",
          name: "representations",
          label: "Représentations — ordre d'affichage",
          ui: {
            // @ts-ignore – wrapFieldsWithMeta type incompatible avec ui.component
            component: RepresentationOrderField,
          },
        },
        {
          type: "string",
          name: "equipe",
          label: "Équipe — ordre d'affichage",
          ui: {
            // @ts-ignore – wrapFieldsWithMeta type incompatible avec ui.component
            component: TeamOrderField,
          },
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
