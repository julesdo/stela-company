import React from 'react';
import client from '../../tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TeamClientPage from './client-page';

export const revalidate = 300;

export default async function TeamPage() {
  let data;
  try {
    data = await client.queries.teamConnection();
  } catch (error) {
    return <div>Erreur lors du chargement de l'équipe</div>;
  }

  return (
    <Layout rawPageData={data}>
      <TeamClientPage {...data} />
    </Layout>
  );
}
