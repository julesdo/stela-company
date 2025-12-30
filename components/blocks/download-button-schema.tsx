import type { Template } from "tinacms";

export const downloadButtonBlockSchema: Template = {
  name: "DownloadButton",
  label: "Bouton de téléchargement",
  ui: {
    defaultItem: {
      href: "/Projet_EAC_STANKOVIC_Stela.pdf",
      label: "Télécharger le dossier EAC complet",
    },
  },
  fields: [
    {
      name: "href",
      label: "URL du fichier",
      type: "string",
      description: "Chemin vers le fichier à télécharger (ex: /Projet_EAC_STANKOVIC_Stela.pdf)",
    },
    {
      name: "label",
      label: "Texte du bouton",
      type: "string",
      description: "Texte affiché sur le bouton",
    },
  ],
};



