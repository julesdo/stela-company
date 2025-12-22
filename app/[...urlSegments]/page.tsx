import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';
import ClientAtelier from '@/app/ateliers/[...urlSegments]/client-page';
import TeamClientPage from '@/app/equipe/[...urlSegments]/client-page';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const segments = resolvedParams.urlSegments;
  
  // Si aucun segment, c'est la page d'accueil (gérée par app/page.tsx)
  if (segments.length === 0) {
    notFound();
  }
  
  // Vérifier si le premier segment est une locale
  const firstSegment = segments[0];
  const isLocale = firstSegment && locales.includes(firstSegment as Locale);
  
  let locale: Locale = defaultLocale;
  let filepath: string;
  
  if (isLocale) {
    // Le premier segment est une locale (ex: /de/engagements ou /de)
    locale = firstSegment as Locale;
    
    if (segments.length === 1) {
      // C'est juste /de, /en, /sr - charger la page d'accueil traduite
      filepath = 'home';
    } else {
      // C'est /de/engagements - charger la page traduite
      filepath = segments.slice(1).join('/');
    }
  } else {
    // Pas de préfixe de locale, utiliser le français par défaut (ex: /engagements)
    filepath = segments.join('/');
  }
  
  // Détecter le type de contenu en fonction du chemin
  const pathParts = filepath.split('/');
  const contentType = pathParts[0]; // 'ateliers', 'equipe', ou autre (page)
  
  // Charger le fichier selon la langue
  const filename = locale === defaultLocale 
    ? `${filepath}.mdx` 
    : `${filepath}.${locale}.mdx`;

  // Essayer de charger selon le type de contenu détecté
  if (contentType === 'ateliers' && pathParts.length > 1) {
    // C'est un atelier : /ateliers/nom-atelier ou /de/ateliers/nom-atelier
    const atelierPath = pathParts.slice(1).join('/');
    const atelierFilename = locale === defaultLocale 
      ? `${atelierPath}.mdx` 
      : `${atelierPath}.${locale}.mdx`;
    
    try {
      const data = await client.queries.atelier({ relativePath: atelierFilename });
      return (
        <Layout rawPageData={data}>
          <ClientAtelier {...(data as any)} />
        </Layout>
      );
    } catch (error) {
      // Fallback vers la version française
      if (locale !== defaultLocale) {
        try {
          const data = await client.queries.atelier({ relativePath: `${atelierPath}.mdx` });
          return (
            <Layout rawPageData={data}>
              <ClientAtelier {...(data as any)} />
            </Layout>
          );
        } catch (fallbackError) {
          notFound();
        }
      } else {
        notFound();
      }
    }
  } else if (contentType === 'equipe' && pathParts.length > 1) {
    // C'est un membre d'équipe : /equipe/nom-membre ou /de/equipe/nom-membre
    const teamPath = pathParts.slice(1).join('/');
    const teamFilename = locale === defaultLocale 
      ? `${teamPath}.mdx` 
      : `${teamPath}.${locale}.mdx`;
    
    try {
      const data = await client.queries.team({ relativePath: teamFilename });
      return (
        <Layout rawPageData={data}>
          <TeamClientPage {...data} />
        </Layout>
      );
    } catch (error) {
      // Fallback vers la version française
      if (locale !== defaultLocale) {
        try {
          const data = await client.queries.team({ relativePath: `${teamPath}.mdx` });
          return (
            <Layout rawPageData={data}>
              <TeamClientPage {...data} />
            </Layout>
          );
        } catch (fallbackError) {
          notFound();
        }
      } else {
        notFound();
      }
    }
  } else {
    // C'est une page normale
    let data;
    try {
      data = await client.queries.page({
        relativePath: filename,
      });
    } catch (error) {
      // Fallback vers la version française si la traduction n'existe pas
      if (locale !== defaultLocale) {
        try {
          data = await client.queries.page({
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
        <Section>
          <ClientPage {...data} />
        </Section>
      </Layout>
    );
  }
}

export async function generateStaticParams() {
  const params: { urlSegments: string[] }[] = [];
  
  try {
    // Générer les routes pour les pages
    let pages = await client.queries.pageConnection();
    const allPages = pages;

    if (allPages.data.pageConnection.edges) {
      while (pages.data.pageConnection.pageInfo.hasNextPage) {
        pages = await client.queries.pageConnection({
          after: pages.data.pageConnection.pageInfo.endCursor,
        });

        if (!pages.data.pageConnection.edges) {
          break;
        }

        allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
      }

      // Générer les routes pour toutes les langues
      for (const locale of locales) {
        const pageParams = allPages.data?.pageConnection.edges
          ?.map((edge) => {
            const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
            const filepath = breadcrumbs.join('/');
            
            // Ignorer les fichiers avec extensions de langue dans les breadcrumbs
            if (filepath.match(/\.(fr|de|en|sr)$/)) {
              return null;
            }
            
            // Pour la langue par défaut (fr), pas de préfixe
            if (locale === defaultLocale) {
              if (filepath === 'home') {
                return null; // home est géré par app/page.tsx
              }
              return {
                urlSegments: filepath.split('/'),
              };
            } else {
              // Pour les autres langues, ajouter le préfixe de locale
              if (filepath === 'home') {
                return {
                  urlSegments: [locale],
                };
              }
              return {
                urlSegments: [locale, ...filepath.split('/')],
              };
            }
          })
          .filter((x): x is { urlSegments: string[] } => x !== null);
        
        if (pageParams) {
          params.push(...pageParams);
        }
      }
    }

    // Générer les routes pour les ateliers
    let ateliers = await client.queries.atelierConnection();
    const allAteliers = ateliers;

    if (allAteliers.data.atelierConnection.edges) {
      while (ateliers.data.atelierConnection.pageInfo.hasNextPage) {
        ateliers = await client.queries.atelierConnection({
          after: ateliers.data.atelierConnection.pageInfo.endCursor,
        });

        if (!ateliers.data.atelierConnection.edges) {
          break;
        }

        allAteliers.data.atelierConnection.edges.push(...ateliers.data.atelierConnection.edges);
      }

      for (const locale of locales) {
        const atelierParams = allAteliers.data?.atelierConnection.edges
          ?.map((edge) => {
            const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
            const filepath = breadcrumbs.join('/');
            
            if (filepath.match(/\.(fr|de|en|sr)$/)) {
              return null;
            }
            
            const cleanPath = filepath.replace(/\.(fr|de|en|sr)$/, '');
            
            if (locale === defaultLocale) {
              return {
                urlSegments: ['ateliers', ...cleanPath.split('/')],
              };
            } else {
              return {
                urlSegments: [locale, 'ateliers', ...cleanPath.split('/')],
              };
            }
          })
          .filter((x): x is { urlSegments: string[] } => x !== null);
        
        if (atelierParams) {
          params.push(...atelierParams);
        }
      }
    }

    // Générer les routes pour les membres d'équipe
    let teams = await client.queries.teamConnection();
    const allTeams = teams;

    if (allTeams.data.teamConnection.edges) {
      while (teams.data?.teamConnection.pageInfo.hasNextPage) {
        teams = await client.queries.teamConnection({
          after: teams.data.teamConnection.pageInfo.endCursor,
        });

        if (!teams.data.teamConnection.edges) {
          break;
        }

        allTeams.data.teamConnection.edges.push(...teams.data.teamConnection.edges);
      }

      for (const locale of locales) {
        const teamParams = allTeams.data?.teamConnection.edges
          ?.map((edge) => {
            const breadcrumbs = edge?.node?._sys.breadcrumbs || [];
            const filepath = breadcrumbs.join('/');
            
            if (filepath.match(/\.(fr|de|en|sr)$/)) {
              return null;
            }
            
            const cleanPath = filepath.replace(/\.(fr|de|en|sr)$/, '');
            
            if (locale === defaultLocale) {
              return {
                urlSegments: ['equipe', ...cleanPath.split('/')],
              };
            } else {
              return {
                urlSegments: [locale, 'equipe', ...cleanPath.split('/')],
              };
            }
          })
          .filter((x): x is { urlSegments: string[] } => x !== null);
        
        if (teamParams) {
          params.push(...teamParams);
        }
      }
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }

  return params;
}