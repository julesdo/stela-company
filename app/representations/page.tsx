import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import RepresentationsClientPage from './client-page';

export const revalidate = 300;

export default async function RepresentationsPage() {
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
