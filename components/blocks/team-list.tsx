"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';
import client from '@/tina/__generated__/client';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

// Traductions
const translations: Record<Locale, { title: string; description: string }> = {
  fr: {
    title: 'Notre équipe',
    description: 'Une équipe d\'artistes passionnés, unis par la vision de créer un art vivant et accessible. Chaque membre apporte sa sensibilité et son expertise pour nourrir nos créations.',
  },
  de: {
    title: 'Unser Team',
    description: 'Ein Team leidenschaftlicher Künstler, vereint durch die Vision, lebendige und zugängliche Kunst zu schaffen. Jedes Mitglied bringt seine Sensibilität und Expertise ein, um unsere Kreationen zu bereichern.',
  },
  en: {
    title: 'Our Team',
    description: 'A team of passionate artists, united by the vision of creating living and accessible art. Each member brings their sensitivity and expertise to nourish our creations.',
  },
  sr: {
    title: 'Наш тим',
    description: 'Тим страствених уметника, уједињених визијом стварања живог и приступачног уметничког дела. Сваки члан доноси своју осетљивост и стручност да храни наше креације.',
  },
};

export const TeamList = ({ data }: { data: any }) => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const pathname = usePathname();

  // Détecter la locale actuelle
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const isValidLocale = firstSegment && locales.includes(firstSegment as Locale);
  const currentLocale: Locale = isValidLocale ? (firstSegment as Locale) : defaultLocale;

  // Fonction pour générer le lien localisé
  const getLocalizedHref = (slug: string): string => {
    if (currentLocale === defaultLocale) {
      return `/equipe/${slug}`;
    }
    return `/${currentLocale}/equipe/${slug}`;
  };

  const t = translations[currentLocale];

  useEffect(() => {
    async function loadTeamMembers() {
      try {
        const res = await client.queries.teamConnection({ first: 50 });
        const members = res?.data?.teamConnection?.edges
          ?.filter(edge => edge?.node)
          // Filtrer les membres selon la langue actuelle
          .filter((edge: any) => {
            const memberLang = edge?.node?.lang || 'fr';
            return memberLang === currentLocale;
          })
          .map(edge => edge!.node) || [];
        
        // Réorganiser : Stela en premier, Jules Camille en dernier
        const sortedMembers = [...members].sort((a, b) => {
          const aName = a?.name?.toLowerCase() || '';
          const bName = b?.name?.toLowerCase() || '';
          const aSlug = a?._sys?.breadcrumbs?.join('/')?.toLowerCase() || '';
          const bSlug = b?._sys?.breadcrumbs?.join('/')?.toLowerCase() || '';
          
          // Stela en premier
          if (aName.includes('stela') || aSlug.includes('stela-elena')) return -1;
          if (bName.includes('stela') || bSlug.includes('stela-elena')) return 1;
          
          // Jules Camille en dernier
          if (aName.includes('jules') || aSlug.includes('jules-camille')) return 1;
          if (bName.includes('jules') || bSlug.includes('jules-camille')) return -1;
          
          return 0;
        });
        
        setTeamMembers(sortedMembers);
      } catch (err) {
        console.error('Error loading team members:', err);
      }
    }
    
    loadTeamMembers();
  }, [currentLocale]);

  return (
    <Section background={data?.background} className="bg-white">
      <main className="bg-white">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:pr-20 py-16" data-tina-field={tinaField(data)}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-black mb-8" data-tina-field={tinaField(data, 'title')}>
              {data?.title || t.title}
            </h1>
            <p className="text-lg text-black/70 max-w-3xl" data-tina-field={tinaField(data, 'description')}>
              {data?.description || t.description}
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="px-6 md:px-12 lg:pr-20 pb-24">
          <div className="max-w-7xl mx-auto">
            {teamMembers.length === 0 ? (
              <div className="text-center py-12 text-black/60">Chargement des membres de l'équipe...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => {
                  if (!member) return null;
                  // Nettoyer le slug pour enlever l'extension de langue (ex: stela-elena-stankovic.de -> stela-elena-stankovic)
                  const rawSlug = member._sys?.breadcrumbs?.join('/') || '';
                  const cleanSlug = rawSlug.replace(/\.(fr|de|en|sr)$/, '');
                  return (
                    <Link
                      key={member.id}
                      href={getLocalizedHref(cleanSlug)}
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
            )}
          </div>
        </section>
      </main>
    </Section>
  );
};

export const teamListBlockSchema: Template = {
  name: 'teamList',
  label: 'Team List',
  ui: {
    previewSrc: '/blocks/features.png',
    defaultItem: {
      title: 'Notre équipe',
      description: 'Une équipe d\'artistes passionnés, unis par la vision de créer un art vivant et accessible.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    { type: 'string', name: 'title', label: 'Title' },
    { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
  ],
};

