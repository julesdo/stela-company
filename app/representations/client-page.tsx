"use client";
import { useTina } from "tinacms/dist/react";
import ErrorBoundary from "@/components/error-boundary";
import TimelineStraight, { RepresentationItem } from "@/components/blocks/timeline-straight";
import { RepresentationConnectionQuery } from "../../tina/__generated__/types";

export interface ClientRepresentationsPageProps {
  data: RepresentationConnectionQuery;
  variables: {};
  query: string;
}

export default function RepresentationsClientPage(props: ClientRepresentationsPageProps) {
  const { data } = useTina({ ...props });
  
  if (!data?.representationConnection?.edges) {
    return <div>Aucune représentation trouvée</div>;
  }

  // Transformer les données pour le composant TimelineStraight
  const timelineItems: RepresentationItem[] = data.representationConnection.edges
    ?.filter(edge => edge?.node)
    .map(edge => ({
      slug: edge!.node!._sys.breadcrumbs.join('/'),
      title: edge!.node!.title,
      excerpt: edge!.node!.subtitle || '',
      image: edge!.node!.hero || '',
      date: edge!.node!.date || '',
      city: edge!.node!.city || '',
      venue: edge!.node!.venue || '',
    })) || [];

  // Trier par date (plus récent en premier)
  const sortedItems = timelineItems.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <ErrorBoundary>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:pr-20 py-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-black mb-8">
              Nos représentations
            </h1>
            <p className="text-lg text-black/70 max-w-3xl">
              Découvrez nos créations et performances à venir, ainsi que notre parcours artistique.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 md:px-12 lg:pr-20 pb-24">
          <div className="max-w-7xl mx-auto">
            {sortedItems.length > 0 ? (
              <TimelineStraight items={sortedItems} />
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-black/60">
                  Aucune représentation programmée pour le moment.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}
