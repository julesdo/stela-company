"use client";
import { useTina } from "tinacms/dist/react";
import Link from "next/link";
import Image from "next/image";
import ErrorBoundary from "@/components/error-boundary";
import { TeamConnectionQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";

export interface ClientTeamPageProps {
  data: TeamConnectionQuery;
  variables: {};
  query: string;
}

export default function TeamClientPage(props: ClientTeamPageProps) {
  const { data } = useTina({ ...props });
  const { globalSettings } = useLayout();
  const orderedSlugs: string[] = ((globalSettings as any)?.ordering?.equipe ?? '').split(',').filter(Boolean);

  if (!data?.teamConnection?.edges) {
    return <div>Aucun membre d'équipe trouvé</div>;
  }

  const teamMembers = data.teamConnection.edges
    ?.filter(edge => edge?.node)
    .map(edge => edge!.node) || [];

  const sortedTeamMembers = [...teamMembers].sort((a, b) => {
    const aSlug = (a?._sys?.filename ?? '').replace(/\.(fr|de|en|sr)$/, '');
    const bSlug = (b?._sys?.filename ?? '').replace(/\.(fr|de|en|sr)$/, '');
    const aIdx = orderedSlugs.indexOf(aSlug);
    const bIdx = orderedSlugs.indexOf(bSlug);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  return (
    <ErrorBoundary>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-black mb-8">
              Notre équipe
            </h1>
            <p className="text-lg text-black/70 max-w-3xl">
              Une équipe d'artistes passionnés, unis par la vision de créer un art vivant et accessible. 
              Chaque membre apporte sa sensibilité et son expertise pour nourrir nos créations.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTeamMembers.map((member) => {
                if (!member) return null;
                return (
                  <Link
                    key={member.id}
                    href={`/equipe/${member._sys.breadcrumbs.join('/')}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-4">
                      <Image
                        src={member.portrait ?? ''}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-black mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-black/60">
                        {member.role}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}
