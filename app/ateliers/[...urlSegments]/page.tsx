import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientAtelier from './client-page';

export const revalidate = 300;

export default async function AtelierPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolved = await params;
  const filepath = resolved.urlSegments.join('/');

  let data: any;
  try {
    data = await client.queries.atelier({ relativePath: `${filepath}.mdx` });
  } catch (e) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientAtelier {...(data as any)} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let ateliers = await client.queries.atelierConnection();
  const all = ateliers;
  if (!all.data.atelierConnection.edges) return [];
  while (ateliers.data.atelierConnection.pageInfo.hasNextPage) {
    ateliers = await client.queries.atelierConnection({ after: ateliers.data.atelierConnection.pageInfo.endCursor });
    if (!ateliers.data.atelierConnection.edges) break;
    all.data.atelierConnection.edges.push(...ateliers.data.atelierConnection.edges);
  }
  const params = all.data.atelierConnection.edges
    ?.map((edge) => ({ urlSegments: edge?.node?._sys.breadcrumbs || [] }))
    .filter((x) => x.urlSegments.length >= 1);
  return params || [];
}


