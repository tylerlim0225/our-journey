'use client';

import { motion } from 'framer-motion';
import { notes } from '@/lib/data';
import { fadeIn, blurUp, staggerParent } from '@/lib/motion';

export default function NotesSection() {
  return (
    <section
      id="notes"
      className="relative w-full bg-ivory text-ink-900 overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 ink-grain opacity-[0.04]" aria-hidden />
      <div className="max-w-4xl mx-auto px-6 md:px-10 relative">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <motion.p
            variants={fadeIn}
            className="text-[10px] tracking-widest3 uppercase text-gold-700 mb-4"
          >
            V · Notes
          </motion.p>
          <motion.h2
            variants={blurUp}
            className="font-display text-4xl md:text-6xl leading-tight text-balance"
          >
            여행이 아니어도
            <br />
            <span className="italic text-gold-700">남겨두고 싶은 것들</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative pl-8 md:pl-12 border-l border-ink-900/15 space-y-12 md:space-y-14"
        >
          {notes.map((n) => (
            <motion.article
              key={n.id}
              variants={blurUp}
              className="relative"
            >
              <span className="absolute -left-[34px] md:-left-[50px] top-2 w-2.5 h-2.5 rounded-full bg-gold-500 ring-4 ring-ivory" />
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <span className="text-[10px] tracking-widest2 uppercase text-ink-400">
                  {n.date}
                </span>
                {n.mood && (
                  <span className="text-[10px] tracking-widest2 uppercase text-gold-700">
                    #{n.mood}
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight">
                {n.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-ink-500 leading-relaxed whitespace-pre-line max-w-2xl text-balance">
                {n.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
