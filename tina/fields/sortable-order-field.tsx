'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';
import client from '../../tina/__generated__/client';

type Item = { slug: string; title: string };

async function fetchAteliersFR(): Promise<Item[]> {
  try {
    const res: any = await client.queries.atelierConnection({ first: 100 });
    return (res?.data?.atelierConnection?.edges ?? [])
      .map((e: any) => e?.node)
      .filter((n: any) => n && ((n.lang ?? 'fr') === 'fr'))
      .map((n: any) => ({
        slug: (n._sys?.filename ?? '').replace(/\.(fr|de|en|sr)$/, ''),
        title: n.title ?? n._sys?.filename ?? '?',
      }));
  } catch {
    return [];
  }
}

async function fetchRepresentationsFR(): Promise<Item[]> {
  try {
    const res: any = await client.queries.representationConnection({ first: 100 });
    return (res?.data?.representationConnection?.edges ?? [])
      .map((e: any) => e?.node)
      .filter((n: any) => n && ((n.lang ?? 'fr') === 'fr'))
      .map((n: any) => ({
        slug: (n._sys?.filename ?? '').replace(/\.(fr|de|en|sr)$/, ''),
        title: n.title ?? n._sys?.filename ?? '?',
      }));
  } catch {
    return [];
  }
}

async function fetchTeamFR(): Promise<Item[]> {
  try {
    const res: any = await client.queries.teamConnection({ first: 100 });
    return (res?.data?.teamConnection?.edges ?? [])
      .map((e: any) => e?.node)
      .filter((n: any) => n && ((n.lang ?? 'fr') === 'fr'))
      .map((n: any) => ({
        slug: (n._sys?.filename ?? '').replace(/\.(fr|de|en|sr)$/, ''),
        title: n.name ?? n.title ?? n._sys?.filename ?? '?',
      }));
  } catch {
    return [];
  }
}

function makeSortableField(fetcher: () => Promise<Item[]>) {
  // @ts-ignore – wrapFieldsWithMeta type incompatible avec ui.component
  return wrapFieldsWithMeta(({ input }: { input: any }) => {
    const [allItems, setAllItems] = React.useState<Item[]>([]);
    const [displayItems, setDisplayItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [dragActive, setDragActive] = React.useState<number | null>(null);
    const [dragTarget, setDragTarget] = React.useState<number | null>(null);
    const mounted = React.useRef(true);

    React.useEffect(() => {
      mounted.current = true;
      fetcher()
        .then(items => { if (mounted.current) { setAllItems(items); setLoading(false); } })
        .catch(() => { if (mounted.current) setLoading(false); });
      return () => { mounted.current = false; };
    }, []);

    // Merge saved CSV order with all items — new items auto-appended at end
    React.useEffect(() => {
      if (loading) return;
      const saved: string[] = (input.value ?? '').split(',').filter(Boolean);
      const ordered: Item[] = saved
        .map(s => allItems.find(i => i.slug === s))
        .filter((i): i is Item => !!i);
      const newItems: Item[] = allItems.filter(i => !saved.includes(i.slug));
      const merged = [...ordered, ...newItems];
      setDisplayItems(merged);
      if (newItems.length > 0) {
        input.onChange(merged.map(i => i.slug).join(','));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allItems, loading]);

    const commit = (items: Item[]) => {
      setDisplayItems(items);
      input.onChange(items.map(i => i.slug).join(','));
    };

    const handleDrop = (toIdx: number) => {
      const fromIdx = dragActive;
      setDragActive(null);
      setDragTarget(null);
      if (fromIdx === null || fromIdx === toIdx) return;
      const arr = [...displayItems];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      commit(arr);
    };

    if (loading) {
      return (
        <p style={{ color: '#94a3b8', fontSize: 13, padding: '6px 0', margin: 0 }}>
          Chargement…
        </p>
      );
    }

    if (!displayItems.length) {
      return (
        <p style={{ color: '#94a3b8', fontSize: 13, padding: '6px 0', margin: 0 }}>
          Aucun item trouvé. Créez d'abord du contenu.
        </p>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {displayItems.map((item, idx) => {
          const isActive = dragActive === idx;
          const isTarget = dragTarget === idx && dragActive !== null && dragActive !== idx;
          return (
            <div
              key={item.slug}
              draggable
              onDragStart={() => { setDragActive(idx); setDragTarget(null); }}
              onDragEnter={() => setDragTarget(idx)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(idx)}
              onDragEnd={() => { setDragActive(null); setDragTarget(null); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: isTarget ? '#EEF2FF' : isActive ? '#F1F5F9' : '#F8FAFC',
                border: `1.5px solid ${isTarget ? '#818CF8' : isActive ? '#CBD5E1' : '#E2E8F0'}`,
                borderRadius: 6,
                cursor: 'grab',
                userSelect: 'none',
                fontSize: 14,
                opacity: isActive ? 0.5 : 1,
                transition: 'background 0.1s, border-color 0.1s, opacity 0.1s',
              }}
            >
              <span style={{ color: '#94A3B8', fontSize: 18, flexShrink: 0, lineHeight: 1 }}>⠿</span>
              <span style={{ flex: 1, fontWeight: 500, color: '#1E293B' }}>{item.title}</span>
              <span style={{ color: '#CBD5E1', fontSize: 11, flexShrink: 0 }}>#{idx + 1}</span>
            </div>
          );
        })}
        <p style={{ color: '#94A3B8', fontSize: 11, margin: '6px 0 0', lineHeight: 1.4 }}>
          ↕ Glissez pour réordonner. Les nouveaux items s'ajoutent automatiquement en dernier.
          Valable pour toutes les langues.
        </p>
      </div>
    );
  });
}

export const AtelierOrderField = makeSortableField(fetchAteliersFR);
export const RepresentationOrderField = makeSortableField(fetchRepresentationsFR);
export const TeamOrderField = makeSortableField(fetchTeamFR);
