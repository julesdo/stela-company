import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientAtelier from '@/app/ateliers/[...urlSegments]/client-page';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export default async function LocalizedAtelierPage({
  params,
}: {
  params: Promise<{ locale: string; urlSegments: string[] }>;
}) {
  const resolved = await params;
  const locale = resolved.locale as Locale;
  const filepath = resolved.urlSegments.join('/');

  if (!locales.includes(locale)) {
    notFound();
  }

  // Charger le fichier selon la langue
  const filename = `${filepath}.${locale}.mdx`;

  let data: any;
  try {
    data = await client.queries.atelier({ relativePath: filename });
  } catch (e) {
    // Fallback vers la version française si la traduction n'existe pas
    try {
      data = await client.queries.atelier({ relativePath: `${filepath}.mdx` });
    } catch (fallbackError) {
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
  const params: { locale: string; urlSegments: string[] }[] = [];
  
  let ateliers = await client.queries.atelierConnection();
  const all = ateliers;
  if (!all.data.atelierConnection.edges) return [];
  
  while (ateliers.data.atelierConnection.pageInfo.hasNextPage) {
    ateliers = await client.queries.atelierConnection({ after: ateliers.data.atelierConnection.pageInfo.endCursor });
    if (!ateliers.data.atelierConnection.edges) break;
    all.data.atelierConnection.edges.push(...ateliers.data.atelierConnection.edges);
  }

  // Générer les routes pour toutes les langues (sauf la langue par défaut)
  for (const locale of locales) {
    if (locale === defaultLocale) continue; // Géré par app/ateliers/[...urlSegments]/page.tsx
    
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
        
        return {
          locale,
          urlSegments: cleanPath.split('/'),
        };
      })
      .filter((x): x is { locale: string; urlSegments: string[] } => x !== null);
    
    if (atelierParams) {
      params.push(...atelierParams);
    }
  }

  return params;
}



