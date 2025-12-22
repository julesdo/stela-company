// Configuration i18n pour le site multilingue
export const locales = ['fr', 'de', 'en', 'sr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  de: 'Deutsch',
  en: 'English',
  sr: 'Српски',
};

export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  de: '🇩🇪',
  en: '🇬🇧',
  sr: '🇷🇸',
};

// Fonction pour obtenir la locale depuis les paramètres
export function getLocale(params: { locale?: string }): Locale {
  const locale = params.locale as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

// Fonction pour obtenir le chemin de fichier avec la locale
export function getLocalizedPath(filename: string, locale: Locale): string {
  // Si c'est la langue par défaut, on garde le nom original
  if (locale === defaultLocale) {
    return filename;
  }
  // Sinon, on ajoute la locale : home.fr.mdx -> home.de.mdx
  const parts = filename.split('.');
  if (parts.length >= 2) {
    const extension = parts.pop();
    const name = parts.join('.');
    return `${name}.${locale}.${extension}`;
  }
  return `${filename}.${locale}`;
}

// Fonction pour obtenir le nom de fichier sans locale
export function getBaseFilename(filename: string): string {
  const parts = filename.split('.');
  // Enlève la locale si présente (ex: home.de.mdx -> home.mdx)
  if (parts.length >= 3 && locales.includes(parts[parts.length - 2] as Locale)) {
    parts.splice(parts.length - 2, 1);
  }
  return parts.join('.');
}

