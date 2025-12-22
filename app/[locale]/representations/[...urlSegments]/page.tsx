import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientRepresentation from '@/app/representations/[...urlSegments]/client-page';
import { locales, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export async function generateStaticParams() {
  // Cette fonction devrait être complétée avec les vraies représentations
  // Pour l'instant, on génère juste les locales
  return locales.map((locale) => ({ locale, urlSegments: [] }));
}

export default async function LocalizedRepresentationPage({
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

  // Essayer d'abord avec la locale dans le nom de fichier
  let data: any;
  try {
    data = await client.queries.representation({ relativePath: `${filepath}.${locale}.mdx` });
  } catch (e) {
    // Fallback sur le fichier sans locale
    try {
      data = await client.queries.representation({ relativePath: `${filepath}.mdx` });
    } catch (e2) {
      notFound();
    }
  }

  return (
    <Layout rawPageData={data}>
      <ClientRepresentation {...(data as any)} />
    </Layout>
  );
}

