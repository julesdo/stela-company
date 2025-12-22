import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientRepresentation from './client-page';

export const revalidate = 300;

export async function generateStaticParams() {
  // Cette fonction devrait être complétée avec les vraies représentations
  // Pour l'instant, on retourne un tableau vide
  return [];
}

export default async function RepresentationPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolved = await params;
  const filepath = resolved.urlSegments.join('/');

  let data: any;
  try {
    data = await client.queries.representation({ relativePath: `${filepath}.mdx` });
  } catch (e) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientRepresentation {...(data as any)} />
    </Layout>
  );
}


