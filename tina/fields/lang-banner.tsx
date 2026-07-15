'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

const LANG_META: Record<string, { flag: string; label: string; bg: string; border: string; text: string }> = {
  fr: { flag: '🇫🇷', label: 'Français', bg: '#EBF5FB', border: '#0055A4', text: '#0055A4' },
  de: { flag: '🇩🇪', label: 'Deutsch', bg: '#FDFBE8', border: '#B8860B', text: '#7A5700' },
  en: { flag: '🇬🇧', label: 'English', bg: '#EBF5F0', border: '#1A5276', text: '#1A5276' },
  sr: { flag: '🇷🇸', label: 'Српски', bg: '#FDEDEC', border: '#C0392B', text: '#922B21' },
};

export const LangBannerField = wrapFieldsWithMeta(({ input }: { input: any }) => {
  const lang = (input.value || 'fr') as string;
  const meta = LANG_META[lang] ?? LANG_META.fr;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: meta.bg,
          border: `2px solid ${meta.border}`,
          color: meta.text,
          padding: '10px 14px',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '16px',
          marginBottom: '10px',
          letterSpacing: '0.5px',
        }}
      >
        <span style={{ fontSize: '24px' }}>{meta.flag}</span>
        <span>{meta.label.toUpperCase()}</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px', opacity: 0.7, fontWeight: 400 }}>
          langue de la prévisualisation
        </span>
      </div>
      <select
        {...input}
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          fontSize: '14px',
          background: '#fff',
          color: '#334155',
        }}
      >
        <option value="fr">🇫🇷 Français</option>
        <option value="de">🇩🇪 Deutsch</option>
        <option value="en">🇬🇧 English</option>
        <option value="sr">🇷🇸 Српски</option>
      </select>
    </div>
  );
});
