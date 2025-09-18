"use client";
import { useTina } from "tinacms/dist/react";
import AtelierDetail from "@/components/blocks/atelier-detail";

export interface ClientAtelierProps {
  data: any;
  variables: { relativePath: string };
  query: string;
}

export default function ClientAtelier(props: ClientAtelierProps) {
  const { data } = useTina({ ...props });
  return <AtelierDetail data={(data as any).atelier} />;
}


