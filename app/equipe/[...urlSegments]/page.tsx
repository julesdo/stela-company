import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TeamClientPage from './client-page';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function TeamPage({
  params,
}: {
  params: { urlSegments: string[] };
}) {
  const filepath = params.urlSegments.join('/');
  let data;
  try {
    data = await client.queries.team({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <TeamClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
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

  const params =
    allTeams.data?.teamConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
