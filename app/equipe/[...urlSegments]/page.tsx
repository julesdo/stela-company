import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TeamClientPage from './client-page';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export default async function TeamPage({
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
    // Le premier segment est une locale (ex: /equipe/de/stela-elena-stankovic)
    locale = firstSegment as Locale;
    filepath = segments.slice(1).join('/');
  } else {
    // Pas de préfixe de locale (ex: /equipe/stela-elena-stankovic)
    filepath = segments.join('/');
  }

  // Charger le fichier selon la langue
  const filename = locale === defaultLocale 
    ? `${filepath}.mdx` 
    : `${filepath}.${locale}.mdx`;

  let data;
  try {
    data = await client.queries.team({
      relativePath: filename,
    });
  } catch (error) {
    // Fallback vers la version française si la traduction n'existe pas
    if (locale !== defaultLocale) {
      try {
        data = await client.queries.team({
          relativePath: `${filepath}.mdx`,
        });
      } catch (fallbackError) {
        notFound();
      }
    } else {
      notFound();
    }
  }

  return (
    <Layout rawPageData={data}>
      <TeamClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const params: { urlSegments: string[] }[] = [];
  
  let teams = await client.queries.teamConnection();
  const allTeams = teams;

  if (!allTeams.data.teamConnection.edges) {
    return [];
  }

  while (teams.data?.teamConnection.pageInfo.hasNextPage) {
    teams = await client.queries.teamConnection({
      after: teams.data.teamConnection.pageInfo.endCursor,
    });

    if (!teams.data.teamConnection.edges) {
      break;
    }

    allTeams.data.teamConnection.edges.push(...teams.data.teamConnection.edges);
  }

  // Générer les routes pour toutes les langues
  for (const locale of locales) {
    const teamParams = allTeams.data?.teamConnection.edges
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
    
    if (teamParams) {
      params.push(...teamParams);
    }
  }

  return params;
}
