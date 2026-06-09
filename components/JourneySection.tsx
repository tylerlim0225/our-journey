'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { chapters, getPlace } from '@/lib/data';
import { useAtlas } from '@/lib/atlas-context';
import { fadeIn, blurUp, staggerParent } from '@/lib/motion';

export default function JourneySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  const { select, scrollToSection } = useAtlas();

  return (
    <section
      id="journey"
      ref={ref}
      className="relative w-full bg-cream text-ink-900 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Header */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-20"
        >
          <motion.p
            variants={fadeIn}
            className="text-[10px] tracking-widest3 uppercase text-gold-700 mb-4"
          >
            III · Journey
          </motion.p>
          <motion.h2
            variants={blurUp}
            className="font-display text-4xl md:text-6xl leading-tight text-ink-900 text-balance"
          >
            기억의 흐름,
            <br />
            <span className="italic text-gold-700">하루씩 다시 걷기</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mt-5 text-sm md:text-base text-ink-500 max-w-md text-balance"
          >
            가장 인상 깊었던 날들을, 챕터처럼 차례로.
          </motion.p>
        </motion.div>

        {/* Timeline + chapters */}
        <div className="relative">
          {/* Static guide line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-ink-900/10 md:-translate-x-px" />
          {/* Scroll-linked progress line */}
          <motion.div
            style={{ height: lineProgress }}
            className="absolute left-[18px] md:left-1/2 top-0 w-px bg-gradient-to-b from-gold-600 via-gold-500 to-gold-600 md:-translate-x-px shadow-[0_0_10px_rgba(196,166,97,0.5)]"
          />

          <div className="space-y-20 md:space-y-28">
            {chapters.map((ch, idx) => {
              const placesInChapter = ch.placeIds.map(id => getPlace(id)).filter(Boolean);
              const sideRight = idx % 2 === 1;
              return (
                <motion.div
                  key={ch.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={staggerParent}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-10 ${
                    sideRight ? '' : ''
                  }`}
                >
                  {/* Pill on timeline */}
                  <div className="absolute left-[18px] md:left-1/2 top-2 -translate-x-1/2 z-10">
                    <motion.div
                      variants={fadeIn}
                      className="grid place-items-center w-9 h-9 rounded-full bg-cream border border-gold-600/40 shadow-md font-display text-xs text-gold-700"
                    >
                      {String(ch.number).padStart(2, '0')}
                    </motion.div>
                  </div>

                  {/* Chapter content */}
                  <motion.article
                    variants={blurUp}
                    className={`
                      pl-14 md:pl-0
                      ${sideRight ? 'md:col-start-2 md:pl-12' : 'md:pr-12 md:text-right'}
                    `}
                  >
                    <p className="text-[10px] tracking-widest2 uppercase text-ink-400">
                      {ch.date} · {ch.theme}
                    </p>
                    <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight">
                      {ch.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-ink-500 leading-relaxed text-balance">
                      {ch.summary}
                    </p>

                    {placesInChapter.length > 0 && (
                      <div
                        className={`mt-5 flex flex-wrap gap-2 ${
                          sideRight ? '' : 'md:justify-end'
                        }`}
                      >
                        {placesInChapter.map(p =>
                          p ? (
                            <button
                              key={p.id}
                              onClick={() => {
                                scrollToSection('map');
                                setTimeout(() => select(p.id), 600);
                              }}
                              className="group inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-ink-900 text-ivory hover:bg-gold-700 transition"
                            >
                              <span>{p.name}</span>
                              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </button>
                          ) : null
                        )}
                      </div>
                    )}
                  </motion.article>

                  {/* Visual placeholder card on opposite side */}
                  <motion.div
                    variants={fadeIn}
                    className={`hidden md:block ${
                      sideRight ? 'md:col-start-1 md:row-start-1' : ''
                    }`}
                  >
                    <div
                      className={`aspect-[5/3] rounded-xl bg-gradient-to-br ${
                        ch.color ?? 'from-ink-100 to-ink-200'
                      } border border-ink-900/8 relative overflow-hidden ${
                        sideRight ? 'mr-12' : 'ml-12'
                      }`}
                    >
                      <div className="absolute inset-0 ink-grain opacity-30" />
                      <div className="absolute bottom-4 left-4 right-4 font-display italic text-lg text-ink-700/80">
                        “{ch.theme}”
                      </div>
                      <div className="absolute top-4 right-4 text-[10px] tracking-widest2 uppercase text-ink-500">
                        Ch. {String(ch.number).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] tracking-widest3 uppercase text-ink-400">
            — to be continued —
          </p>
        </motion.div>
      </div>
    </section>
  );
}
