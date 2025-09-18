"use client";
import { useTina } from "tinacms/dist/react";
import RepresentationDetail from "@/components/blocks/representation-detail";

export interface ClientRepresentationProps {
  data: any;
  variables: { relativePath: string };
  query: string;
}

export default function ClientRepresentation(props: ClientRepresentationProps) {
  const { data } = useTina({ ...props });
  // Graph returns data.representation
  // Fallback to data.page if misconfigured
  const payload = (data as any).representation || (data as any).page;
  return <RepresentationDetail data={payload} />;
}


