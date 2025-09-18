import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { videoBlockSchema } from '@/components/blocks/video';
import { calloutBlockSchema } from '@/components/blocks/callout';
import { statsBlockSchema } from '@/components/blocks/stats';
import { ctaBlockSchema } from '@/components/blocks/call-to-action';
import { aboutHeroBlockSchema } from '@/components/blocks/about-hero';
import { teamSectionBlockSchema } from '@/components/blocks/team-section';
import { representationsSectionBlockSchema } from '@/components/blocks/representations-section';
import { aboutTriptychBlockSchema } from '@/components/blocks/about-triptych';
import { representationsGridSectionBlockSchema } from '@/components/blocks/representations-grid-section';
import { heroPrincipalBlockSchema } from '@/components/blocks/hero-principal';
import { universSectionBlockSchema } from '@/components/blocks/univers-section';
import { aboutRapideSectionBlockSchema } from '@/components/blocks/about-rapide-section';
import { ateliersListBlockSchema } from '@/components/blocks/ateliers-list';
import { contactHeroBlockSchema } from '@/components/blocks/contact-hero';
import { contactInfoBlockSchema } from '@/components/blocks/contact-info';
import { contactFormBlockSchema } from '@/components/blocks/contact-form';
import { partnersCarouselBlockSchema } from '@/components/blocks/partners-carousel';
import { atelierDetailBlockSchema } from '@/components/blocks/atelier-detail';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') {
        return '/';
      }
      return `/${filepath}`;
    },
  },
  fields: [
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        aboutHeroBlockSchema,
        teamSectionBlockSchema,
        representationsSectionBlockSchema,
        aboutTriptychBlockSchema,
        representationsGridSectionBlockSchema,
        heroPrincipalBlockSchema,
        universSectionBlockSchema,
        aboutRapideSectionBlockSchema,
        ateliersListBlockSchema,
        contactHeroBlockSchema,
        contactInfoBlockSchema,
        contactFormBlockSchema,
        partnersCarouselBlockSchema,
        atelierDetailBlockSchema,
      ],
    },
  ],
};

export default Page;
