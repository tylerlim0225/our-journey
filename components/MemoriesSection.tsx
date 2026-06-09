'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowUpRight } from 'lucide-react';
import { visiblePlaces } from '@/lib/data';
import { useAtlas } from '@/lib/atlas-context';
import { fadeIn, blurUp, staggerParent } from '@/lib/motion';

export default function MemoriesSection() {
  const { select, scrollToSection } = useAtlas();
  const memories = visiblePlaces.filter(p => p.memories.length > 0);

  return (
    <section
      id="memories"
      className="relative w-full bg-ink-900 text-ivory overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-16 md:mb-20"
        >
          <motion.p
            variants={fadeIn}
            className="text-[10px] tracking-widest3 uppercase text-gold-400 mb-4"
          >
            IV · Memories
          </motion.p>
          <motion.h2
            variants={blurUp}
            className="font-display text-4xl md:text-6xl leading-tight text-balance"
          >
            기록의 조각들,
            <br />
            <span className="italic text-gold-400">우리만의 디테일</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mt-5 text-sm md:text-base text-ivory/55 max-w-md text-balance"
          >
            한 줄, 또는 한 장면. 카드를 누르면 지도 위에서 그 좌표를 다시 비춥니다.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {memories.map(p => (
            <motion.button
              key={p.id}
              variants={blurUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onClick={() => {
                scrollToSection('map');
                setTimeout(() => select(p.id), 600);
              }}
              className={`group relative text-left overflow-hidden rounded-2xl border border-ivory/8 hover:border-gold-500/40 transition`}
            >
              {/* Photo placeholder gradient */}
              <div
                className={`relative h-44 bg-gradient-to-br ${
                  p.photoColor ?? 'from-ink-700 to-ink-800'
                } overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
                <div className="absolute inset-0 ink-grain opacity-40" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-ink-900/55 text-ivory text-[9px] tracking-widest2 uppercase">
                  <MapPin className="w-2.5 h-2.5" /> {p.region}
                </div>
                {p.favorite && (
                  <div className="absolute top-3 right-3 grid place-items-center w-7 h-7 rounded-full bg-burgundy/85">
                    <Heart className="w-3 h-3 text-ivory fill-current" />
                  </div>
                )}
                <ArrowUpRight className="absolute bottom-3 right-3 w-4 h-4 text-ivory/0 group-hover:text-ivory transition" />
              </div>

              {/* Body */}
              <div className="p-5 bg-ink-800/85 backdrop-blur">
                <p className="text-[10px] tracking-widest2 uppercase text-gold-400">
                  {p.date} {p.theme && `· ${p.theme}`}
                </p>
                <h3 className="mt-1 font-display text-xl leading-snug text-ivory">
                  {p.name}
                </h3>
                {p.quote && (
                  <p className="mt-2 text-xs italic text-ivory/65 line-clamp-2 font-display">
                    “{p.quote}”
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.emotion.slice(0, 3).map(e => (
                    <span
                      key={e}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-ivory/8 text-ivory/70"
                    >
                      # {e}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
