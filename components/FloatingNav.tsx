'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAtlas } from '@/lib/atlas-context';

const items = [
  { id: 'intro', label: 'Intro', ko: '시작' },
  { id: 'map', label: 'Atlas', ko: '지도' },
  { id: 'journey', label: 'Journey', ko: '흐름' },
  { id: 'memories', label: 'Memories', ko: '기억' },
  { id: 'notes', label: 'Notes', ko: '기록' },
  { id: 'vault', label: 'Vault', ko: '금고' },
];

export default function FloatingNav() {
  const { scrollToSection } = useAtlas();
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const sections = items
      .map(i => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop — right side rail */}
      <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-1 p-2 rounded-full glass">
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative group flex items-center gap-3 pr-4 pl-3 py-2 rounded-full transition-colors text-xs tracking-wider2 uppercase"
              aria-label={`${item.label} ${item.ko}`}
            >
              <span
                className={`block w-1.5 h-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-gold-500 scale-150 shadow-[0_0_12px_rgba(196,166,97,0.7)]'
                    : 'bg-ivory/40 group-hover:bg-ivory/80'
                }`}
              />
              <span
                className={`transition-opacity text-[10px] ${
                  isActive ? 'text-ivory opacity-100' : 'text-ivory/50 opacity-0 group-hover:opacity-100'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-gold-500/8 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile — bottom pill */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-2 py-1.5 rounded-full glass flex gap-1 max-w-[94vw] overflow-x-auto">
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 py-1.5 rounded-full text-[10px] tracking-wider2 uppercase whitespace-nowrap transition-colors ${
                isActive ? 'text-ink-900' : 'text-ivory/70'
              }`}
            >
              <span className="relative z-10">{item.ko}</span>
              {isActive && (
                <motion.span
                  layoutId="nav-active-mobile"
                  className="absolute inset-0 rounded-full bg-gold-300"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
