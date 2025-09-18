"use client";
import { useTina } from "tinacms/dist/react";
import TeamDetail from "@/components/blocks/team-detail";
import { TeamQuery } from "@/tina/__generated__/types";
import ErrorBoundary from "@/components/error-boundary";

export interface ClientTeamProps {
  data: {
    team: TeamQuery["team"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function TeamClientPage(props: ClientTeamProps) {
  const { data } = useTina({ ...props });
  // Graph returns data.team
  // Fallback to data.page if misconfigured
  const payload = (data as any).team || (data as any).page;
  
  // Debug: log the payload to see what we're getting
  console.log('Team payload:', payload);
  console.log('Article type:', typeof payload?.article);
  console.log('Article is array:', Array.isArray(payload?.article));
  
  return (
    <ErrorBoundary>
      <TeamDetail data={payload} />
    </ErrorBoundary>
  );
}
