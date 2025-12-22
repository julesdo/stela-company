"use client";
import { useTina } from "tinacms/dist/react";
import { usePathname } from "next/navigation";
import ErrorBoundary from "@/components/error-boundary";
import TimelineStraight, { RepresentationItem } from "@/components/blocks/timeline-straight";
import { RepresentationConnectionQuery } from "@/tina/__generated__/types";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

export interface ClientRepresentationsPageProps {
  data: RepresentationConnectionQuery;
  variables: {};
  query: string;
}

export default function RepresentationsClientPage(props: ClientRepresentationsPageProps) {
  const { data } = useTina({ ...props });
  const pathname = usePathname();
  
  // Détecter la locale depuis l'URL
  const pathSegments = pathname.split('/').filter(Boolean);
  const detectedLocale = pathSegments[0] as Locale;
  const currentLocale = locales.includes(detectedLocale) ? detectedLocale : defaultLocale;
  
  // Traductions
  const translations = {
    fr: {
      title: "Nos représentations",
      description: "Découvrez nos créations et performances à venir, ainsi que notre parcours artistique.",
      noRepresentations: "Aucune représentation programmée pour le moment.",
      notFound: "Aucune représentation trouvée",
    },
    de: {
      title: "Unsere Aufführungen",
      description: "Entdecken Sie unsere kommenden Kreationen und Aufführungen sowie unseren künstlerischen Werdegang.",
      noRepresentations: "Derzeit sind keine Aufführungen geplant.",
      notFound: "Keine Aufführungen gefunden",
    },
    en: {
      title: "Our Performances",
      description: "Discover our upcoming creations and performances, as well as our artistic journey.",
      noRepresentations: "No performances scheduled at the moment.",
      notFound: "No performances found",
    },
    sr: {
      title: "Наше извођење",
      description: "Откријте наше предстојеће креације и наступе, као и наш уметнички пут.",
      noRepresentations: "Тренутно нема заказаних наступа.",
      notFound: "Није пронађено извођење",
    },
  };
  
  const t = translations[currentLocale];
  
  if (!data?.representationConnection?.edges) {
    return <div>{t.notFound}</div>;
  }

  // Transformer les données pour le composant TimelineStraight et filtrer par langue
  const timelineItems: RepresentationItem[] = data.representationConnection.edges
    ?.filter(edge => {
      if (!edge?.node) return false;
      const memberLang = (edge.node as any).lang || 'fr';
      return memberLang === currentLocale;
    })
    .map(edge => {
      const slug = edge!.node!._sys.breadcrumbs.join('/');
      const cleanSlug = slug.replace(/\.(fr|de|en|sr)$/, '');
      const basePath = currentLocale === defaultLocale ? '' : `/${currentLocale}`;
      return {
        slug: `${basePath}/representations/${cleanSlug}`,
        title: edge!.node!.title,
        excerpt: edge!.node!.subtitle || '',
        image: edge!.node!.hero || '',
        date: edge!.node!.date || '',
        city: edge!.node!.city || '',
        venue: edge!.node!.venue || '',
      };
    }) || [];

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
              {t.title}
            </h1>
            <p className="text-lg text-black/70 max-w-3xl">
              {t.description}
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 md:px-12 lg:pr-20 pb-24">
          <div className="max-w-7xl mx-auto">
            {sortedItems.length > 0 ? (
              <TimelineStraight items={sortedItems} locale={currentLocale} />
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-black/60">
                  {t.noRepresentations}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}
