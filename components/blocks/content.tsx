'use client';
import React from 'react';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Mermaid } from './mermaid';
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from '../magicui/script-copy-btn';
import { DownloadButton } from './download-button';
import { downloadButtonBlockSchema } from './download-button-schema';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section background={data.background!} className='py-16 md:py-20' data-tina-field={tinaField(data, 'body')}>
      <div className='max-w-4xl mx-auto'>
        <div className='prose prose-lg prose-neutral max-w-none prose-p:font-light prose-headings:font-light prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:lg:text-5xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:lg:text-4xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-tight prose-p:leading-relaxed prose-p:mb-6 prose-ul:space-y-2 prose-ul:mb-6 prose-li:leading-relaxed'>
          <TinaMarkdown
            content={data.body}
            components={{
              mermaid: (props: any) => <Mermaid {...props} />,
              scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
              DownloadButton: (props: any) => <DownloadButton {...props} />,
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      templates: [scriptCopyBlockSchema, downloadButtonBlockSchema],
    },
  ],
};
