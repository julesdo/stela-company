# Guide d'implémentation multilingue

Ce guide explique comment utiliser le système multilingue (FR, DE, EN, SR) avec Tina CMS.

## Structure des fichiers

### Option 1 : Fichiers séparés par langue (Recommandé)

Créez des fichiers séparés pour chaque langue :

```
content/pages/
  ├── home.mdx          (Français - langue par défaut)
  ├── home.de.mdx       (Allemand)
  ├── home.en.mdx       (Anglais)
  ├── home.sr.mdx       (Serbe)
  ├── about.mdx
  ├── about.de.mdx
  ├── about.en.mdx
  └── about.sr.mdx
```

### Option 2 : Champ langue dans le fichier

Ajoutez un champ `lang` dans le front matter de chaque fichier :

```yaml
---
lang: fr
blocks:
  - ...
---
```

## Configuration

### 1. Fichiers créés

- `lib/i18n.ts` : Configuration des langues
- `components/language-switcher.tsx` : Composant de sélection de langue
- `i18n.config.ts` : Configuration i18n

### 2. Modifications nécessaires

#### A. Modifier le routing Next.js

Créez une structure `app/[locale]/` pour gérer les langues :

```typescript
// app/[locale]/page.tsx
export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params);
  const filename = locale === 'fr' ? 'home.mdx' : `home.${locale}.mdx`;
  // Charger le fichier correspondant
}
```

#### B. Ajouter le sélecteur de langue

Ajoutez le composant `LanguageSwitcher` dans votre header/navigation :

```tsx
import { LanguageSwitcher } from '@/components/language-switcher';

// Dans votre composant de navigation
<LanguageSwitcher />
```

## Utilisation avec Tina CMS

### Créer une page multilingue

1. Créez d'abord la version française (ex: `home.mdx`)
2. Dans Tina CMS, dupliquez la page
3. Renommez le fichier avec la locale (ex: `home.de.mdx`)
4. Modifiez le champ `lang` dans le front matter
5. Traduisez le contenu

### Collections modifiées

Les collections suivantes ont été modifiées pour supporter les langues :
- `Page` : Ajout du champ `lang`
- `Atelier` : À modifier de la même manière
- `Representation` : À modifier de la même manière

## Exemple de fichier multilingue

### home.mdx (Français)
```yaml
---
lang: fr
blocks:
  - _template: heroPrincipal
    title: "Bienvenue"
---
```

### home.de.mdx (Allemand)
```yaml
---
lang: de
blocks:
  - _template: heroPrincipal
    title: "Willkommen"
---
```

## Prochaines étapes

1. ✅ Configuration i18n créée
2. ⏳ Modifier le routing Next.js pour supporter `[locale]`
3. ⏳ Modifier les collections Tina (Atelier, Representation, etc.)
4. ⏳ Créer les fichiers traduits
5. ⏳ Ajouter le sélecteur de langue dans la navigation

## Notes importantes

- Le français (fr) est la langue par défaut et n'a pas besoin de préfixe dans l'URL
- Les autres langues utilisent le préfixe : `/de/`, `/en/`, `/sr/`
- Les fichiers français peuvent garder leur nom original (sans `.fr`)
- Les fichiers traduits doivent avoir l'extension de langue : `.de.mdx`, `.en.mdx`, `.sr.mdx`




