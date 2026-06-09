'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Lock } from 'lucide-react';
import { places, visiblePlaces } from '@/lib/data';
import { fadeIn, blurUp, staggerParent } from '@/lib/motion';

const AtlasMap = dynamic(() => import('./AtlasMap'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-ink-900 text-ivory/35 text-xs tracking-widest2 uppercase">
      Drawing the map...
    </div>
  ),
});

export default function MapSection() {
  const completed = places.filter(p => p.status === 'completed').length;
  const planned = places.filter(p => p.status === 'planned').length;
  const favorites = places.filter(p => p.favorite).length;

  return (
    <section
      id="map"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-ink-900"
    >
      <AtlasMap />

      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-900 via-ink-900/60 to-transparent z-10" />
      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent z-10" />

      {/* Section label — top-left */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-6 left-6 md:top-10 md:left-10 z-20 max-w-sm"
      >
        <motion.p
          variants={fadeIn}
          className="text-[10px] tracking-widest3 uppercase text-gold-400 mb-3"
        >
          II · Atlas
        </motion.p>
        <motion.h2
          variants={blurUp}
          className="font-display text-3xl md:text-5xl text-ivory leading-tight"
        >
          기억의 좌표들
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="mt-3 text-xs md:text-sm text-ivory/55 max-w-xs text-balance"
        >
          핀을 누르면, 그날의 한 줄과 풍경이 열립니다.
        </motion.p>
      </motion.div>

      {/* Floating stats — top-right (desktop only) */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="hidden md:flex absolute top-10 right-24 z-20 gap-3"
      >
        {[
          { Icon: MapPin, label: 'Visited', value: completed },
          { Icon: Sparkles, label: 'Favorites', value: favorites },
          { Icon: Lock, label: 'Planned', value: planned },
        ].map(({ Icon, label, value }) => (
          <motion.div
            key={label}
            variants={blurUp}
            className="glass rounded-xl px-4 py-3 min-w-[100px]"
          >
            <div className="flex items-center gap-2 text-[10px] tracking-widest2 uppercase text-ivory/55">
              <Icon className="w-3 h-3" /> {label}
            </div>
            <div className="font-display text-2xl text-ivory mt-1 tabular-nums">
              {value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legend — bottom-left */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="absolute bottom-20 md:bottom-10 left-6 md:left-10 z-20 glass rounded-xl p-4 max-w-[280px]"
      >
        <motion.p
          variants={fadeIn}
          className="text-[10px] tracking-widest2 uppercase text-ivory/55 mb-3"
        >
          Legend · 범례
        </motion.p>
        <motion.ul variants={staggerParent} className="space-y-2 text-xs text-ivory/80">
          <motion.li variants={fadeIn} className="flex items-center gap-3">
            <span className="atlas-pin-favorite inline-block">
              <span className="atlas-pin-dot inline-block" />
            </span>
            <span>Favorite · 인상 깊었던 순간</span>
          </motion.li>
          <motion.li variants={fadeIn} className="flex items-center gap-3">
            <span className="atlas-pin inline-block">
              <span className="atlas-pin-dot inline-block" />
            </span>
            <span>Visited · 다녀온 곳</span>
          </motion.li>
          <motion.li variants={fadeIn} className="flex items-center gap-3">
            <span className="atlas-pin-planned inline-block">
              <span className="atlas-pin-dot inline-block" />
            </span>
            <span>Planned · 계획중</span>
          </motion.li>
          <motion.li variants={fadeIn} className="flex items-center gap-3">
            <span className="atlas-pin-secret inline-block">
              <span className="atlas-pin-dot inline-block" />
            </span>
            <span>Secret · 비밀의 좌표</span>
          </motion.li>
        </motion.ul>
        <motion.p
          variants={fadeIn}
          className="mt-3 text-[10px] text-ivory/40 italic"
        >
          {visiblePlaces.length} pins · across {new Set(places.map(p => p.trip)).size} chapters
        </motion.p>
      </motion.div>
    </section>
  );
}
