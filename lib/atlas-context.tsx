'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface AtlasState {
  selectedId: string | null;
  select: (id: string | null) => void;
  scrollToSection: (anchor: string) => void;
}

const AtlasContext = createContext<AtlasState | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const scrollToSection = useCallback((anchor: string) => {
    const el = document.getElementById(anchor);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <AtlasContext.Provider value={{ selectedId, select, scrollToSection }}>
      {children}
    </AtlasContext.Provider>
  );
}

export function useAtlas() {
  const ctx = useContext(AtlasContext);
  if (!ctx) throw new Error('AtlasProvider missing');
  return ctx;
}
