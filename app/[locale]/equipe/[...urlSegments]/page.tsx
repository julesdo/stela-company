import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TeamClientPage from '@/app/equipe/[...urlSegments]/client-page';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export default async function LocalizedTeamPage({
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
    data = await client.queries.team({ relativePath: filename });
  } catch (e) {
    // Fallback vers la version française si la traduction n'existe pas
    try {
      data = await client.queries.team({ relativePath: `${filepath}.mdx` });
    } catch (fallbackError) {
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
  const params: { locale: string; urlSegments: string[] }[] = [];
  
  let teams = await client.queries.teamConnection();
  const allTeams = teams;
  if (!allTeams.data.teamConnection.edges) return [];
  
  while (teams.data?.teamConnection.pageInfo.hasNextPage) {
    teams = await client.queries.teamConnection({
      after: teams.data.teamConnection.pageInfo.endCursor,
    });
    if (!teams.data.teamConnection.edges) break;
    allTeams.data.teamConnection.edges.push(...teams.data.teamConnection.edges);
  }

  // Générer les routes pour toutes les langues (sauf la langue par défaut)
  for (const locale of locales) {
    if (locale === defaultLocale) continue; // Géré par app/equipe/[...urlSegments]/page.tsx
    
    const teamParams = allTeams.data.teamConnection.edges
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
    
    if (teamParams) {
      params.push(...teamParams);
    }
  }

  return params;
}

