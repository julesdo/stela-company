import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientAtelier from './client-page';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolved = await params;
  const segments = resolved.urlSegments;
  
  // Vérifier si le premier segment est une locale
  const firstSegment = segments[0];
  const isLocale = firstSegment && locales.includes(firstSegment as Locale);
  
  let locale: Locale = defaultLocale;
  let filepath: string;
  
  if (isLocale) {
    // Le premier segment est une locale (ex: /ateliers/de/adultes-barre-asymetrique)
    locale = firstSegment as Locale;
    filepath = segments.slice(1).join('/');
  } else {
    // Pas de préfixe de locale (ex: /ateliers/adultes-barre-asymetrique)
    filepath = segments.join('/');
  }

  // Charger le fichier selon la langue
  const filename = locale === defaultLocale 
    ? `${filepath}.mdx` 
    : `${filepath}.${locale}.mdx`;

  let data: any;
  try {
    data = await client.queries.atelier({ relativePath: filename });
  } catch (e) {
    // Fallback vers la version française si la traduction n'existe pas
    if (locale !== defaultLocale) {
      try {
        data = await client.queries.atelier({ relativePath: `${filepath}.mdx` });
      } catch (fallbackError) {
        notFound();
      }
    } else {
      notFound();
    }
  }

  return (
    <Layout rawPageData={data}>
      <ClientAtelier {...(data as any)} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const params: { urlSegments: string[] }[] = [];
  
  let ateliers = await client.queries.atelierConnection();
  const all = ateliers;
  if (!all.data.atelierConnection.edges) return [];
  
  while (ateliers.data.atelierConnection.pageInfo.hasNextPage) {
    ateliers = await client.queries.atelierConnection({ after: ateliers.data.atelierConnection.pageInfo.endCursor });
    if (!ateliers.data.atelierConnection.edges) break;
    all.data.atelierConnection.edges.push(...ateliers.data.atelierConnection.edges);
  }

  // Générer les routes pour toutes les langues
  for (const locale of locales) {
    const atelierParams = all.data.atelierConnection.edges
      ?.map((edge) => {
        const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
        const filepath = breadcrumbs.join('/');
        
        // Ignorer les fichiers avec extensions de langue dans les breadcrumbs
        if (filepath.match(/\.(fr|de|en|sr)$/)) {
          return null;
        }
        
        // Nettoyer le chemin
        const cleanPath = filepath.replace(/\.(fr|de|en|sr)$/, '');
        
        // Pour la langue par défaut (fr), pas de préfixe
        if (locale === defaultLocale) {
          return {
            urlSegments: cleanPath.split('/'),
          };
        } else {
          // Pour les autres langues, ajouter le préfixe de locale
          return {
            urlSegments: [locale, ...cleanPath.split('/')],
          };
        }
      })
      .filter((x): x is { urlSegments: string[] } => x !== null);
    
    if (atelierParams) {
      params.push(...atelierParams);
    }
  }

  return params;
}


