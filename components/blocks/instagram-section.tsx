// components/InstagramEmbedSection.tsx
'use client';

import React, { useEffect } from 'react';

const INSTAGRAM_POSTS = [
  'https://www.instagram.com/p/DL2Qy8xIls8/',
  'https://www.instagram.com/reel/DLnL52HocXU/',
  'https://www.instagram.com/reel/DMFzjH1o4cx/',
];

export default function InstagramEmbedSection() {
  useEffect(() => {
    // Inject Instagram embed script once
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If already loaded, reprocess embeds
      // @ts-ignore
      window.instgrm?.Embeds?.process();
    }
  }, []);

  return (
    <section className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-heading font-bold text-primary text-center mb-12">
          Suivez-nous sur Instagram
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSTAGRAM_POSTS.map((url, idx) => (
            <div key={idx} className="w-full">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px rgba(0,0,0,0.5),0 1px 10px rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  width: '100%',
                  padding: 0,
                }}
                dangerouslySetInnerHTML={{
                  __html: `
                    <a href="${url}?utm_source=ig_embed&utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0; text-align:center; text-decoration:none; width:100%;" target="_blank"></a>
                  `,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
