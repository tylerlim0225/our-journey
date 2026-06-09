'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Quote, MapPin, Calendar, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPlace } from '@/lib/data';
import { useAtlas } from '@/lib/atlas-context';
import { slideRight, slideUpSheet, fadeIn } from '@/lib/motion';

export default function PlaceCard() {
  const { selectedId, select } = useAtlas();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') select(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [select]);

  const place = selectedId ? getPlace(selectedId) : null;

  return (
    <AnimatePresence mode="wait">
      {place && (
        <>
          {/* Backdrop — soft dim */}
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => select(null)}
            className="fixed inset-0 z-40 bg-ink-900/55 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            variants={isMobile ? slideUpSheet : slideRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={
              isMobile
                ? 'fixed bottom-0 inset-x-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl glass-cream text-ink-900'
                : 'fixed right-6 top-6 bottom-6 w-[420px] z-50 overflow-y-auto rounded-2xl glass-cream text-ink-900 shadow-[0_20px_60px_-15px_rgba(14,11,8,0.5)]'
            }
          >
            {/* Drag handle on mobile */}
            {isMobile && (
              <div className="sticky top-0 pt-3 pb-2 grid place-items-center bg-cream/95 z-10 rounded-t-3xl">
                <span className="block w-10 h-1 rounded-full bg-ink-900/15" />
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => select(null)}
              className="absolute top-3 right-3 z-20 grid place-items-center w-9 h-9 rounded-full bg-ink-900/8 hover:bg-ink-900/15 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-ink-700" />
            </button>

            {/* Photo placeholder area — soft gradient */}
            <div
              className={`relative w-full h-56 md:h-52 bg-gradient-to-br ${
                place.photoColor ?? 'from-ivory to-ink-100'
              } overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
              <div className="absolute inset-0 ink-grain opacity-50" />

              {/* Region tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-900/40 text-ivory text-[10px] tracking-widest2 uppercase">
                <MapPin className="w-3 h-3" /> {place.region}
              </div>

              {place.favorite && (
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/85 text-ivory text-[10px] tracking-widest2 uppercase">
                  <Heart className="w-3 h-3 fill-current" /> Favorite
                </div>
              )}
            </div>

            {/* Body */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="px-6 md:px-7 py-7"
            >
              <motion.div
                variants={fadeIn}
                className="flex items-center gap-2 text-[10px] tracking-widest2 uppercase text-ink-400"
              >
                <Calendar className="w-3 h-3" />
                <span>{place.date}</span>
                {place.day && <span>· Day {place.day}</span>}
              </motion.div>

              <motion.h3
                variants={fadeIn}
                className="font-display text-3xl md:text-4xl mt-2 leading-tight"
              >
                {place.name}
              </motion.h3>
              {place.nameEn && (
                <motion.p
                  variants={fadeIn}
                  className="text-xs text-ink-400 italic mt-1"
                >
                  {place.nameEn}
                </motion.p>
              )}

              {place.theme && (
                <motion.p
                  variants={fadeIn}
                  className="mt-3 text-xs tracking-widest2 uppercase text-gold-700"
                >
                  Chapter · {place.theme}
                </motion.p>
              )}

              {place.quote && (
                <motion.figure
                  variants={fadeIn}
                  className="mt-5 relative pl-6 border-l-2 border-gold-500/40"
                >
                  <Quote className="absolute -left-2 top-0 w-4 h-4 text-gold-600 bg-cream rounded-full p-0.5" />
                  <blockquote className="font-display italic text-lg leading-relaxed text-ink-700">
                    “{place.quote}”
                  </blockquote>
                </motion.figure>
              )}

              {place.emotion.length > 0 && (
                <motion.div variants={fadeIn} className="mt-6">
                  <p className="text-[10px] tracking-widest2 uppercase text-ink-400 mb-2">
                    Emotion · 감정
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {place.emotion.map(e => (
                      <span
                        key={e}
                        className="px-3 py-1 text-xs rounded-full bg-ink-900/8 text-ink-700"
                      >
                        # {e}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {place.memories.length > 0 && (
                <motion.div variants={fadeIn} className="mt-6">
                  <p className="text-[10px] tracking-widest2 uppercase text-ink-400 mb-2">
                    Memories · 기억
                  </p>
                  <ul className="space-y-2">
                    {place.memories.map((m, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-ink-600 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-gold-500"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div
                variants={fadeIn}
                className="mt-8 pt-5 border-t border-ink-900/10 flex items-center justify-between text-[10px] tracking-widest2 uppercase text-ink-400"
              >
                <span>
                  {place.lat.toFixed(3)}° N · {place.lng.toFixed(3)}° E
                </span>
                <span>Sheet · {place.trip ?? 'unbound'}</span>
              </motion.div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
