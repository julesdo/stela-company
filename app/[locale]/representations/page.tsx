import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import RepresentationsClientPage from '@/app/representations/client-page';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedRepresentationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale = resolved.locale as Locale;
  
  if (!locales.includes(locale)) {
    notFound();
  }
  
  let data;
  try {
    data = await client.queries.representationConnection();
  } catch (error) {
    return <div>Erreur lors du chargement des représentations</div>;
  }

  return (
    <Layout rawPageData={data}>
      <RepresentationsClientPage {...data} />
    </Layout>
  );
}



