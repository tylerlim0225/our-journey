'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { atlas } from '@/lib/data';
import { useAtlas } from '@/lib/atlas-context';
import { blurUp, staggerParent, fadeIn } from '@/lib/motion';

export default function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ['0px', '6px']);

  const { scrollToSection } = useAtlas();

  return (
    <section
      ref={ref}
      id="intro"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic abstract backdrop */}
      <motion.div
        style={{ y, opacity, filter: blur }}
        className="absolute inset-0 ink-grain"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(196,166,97,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(92,42,42,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(14,11,8,0.85)_100%)]" />
        {/* Faint topographic line texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M -50 ${60 + i * 38} Q 200 ${30 + i * 38}, 400 ${70 + i * 38} T 850 ${50 + i * 38}`}
              fill="none"
              stroke="#F4EEE3"
              strokeWidth="0.6"
            />
          ))}
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 text-center max-w-3xl"
      >
        <motion.p
          variants={fadeIn}
          className="text-[10px] md:text-xs tracking-widest3 text-gold-400 uppercase mb-8"
        >
          {atlas.period.from} — {atlas.period.to} · Volume I
        </motion.p>

        <motion.h1
          variants={blurUp}
          className="font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.04] text-ivory font-medium"
        >
          {atlas.title}
        </motion.h1>

        <motion.div
          variants={fadeIn}
          className="mt-2 mb-10 flex items-center justify-center gap-3 text-ivory/60 text-xs tracking-widest2 uppercase"
        >
          <span className="h-px w-10 bg-gold-500/40" />
          <span>{atlas.titleKo}</span>
          <span className="h-px w-10 bg-gold-500/40" />
        </motion.div>

        <motion.p
          variants={blurUp}
          className="font-display italic text-xl md:text-2xl text-ivory/85 mb-3 text-balance"
        >
          “{atlas.tagline}”
        </motion.p>
        <motion.p
          variants={fadeIn}
          className="text-sm md:text-base text-ivory/55 mb-16 text-balance"
        >
          {atlas.taglineKo}
        </motion.p>

        <motion.button
          variants={fadeIn}
          onClick={() => scrollToSection('map')}
          className="group inline-flex flex-col items-center gap-2 text-ivory/60 hover:text-ivory transition"
        >
          <span className="text-[10px] tracking-widest2 uppercase">
            Scroll to begin · 시작하기
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            className="block"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Edge frame lines */}
      <div className="absolute top-6 left-6 right-6 flex justify-between text-[10px] tracking-widest3 uppercase text-ivory/35 pointer-events-none">
        <span>N · 37°</span>
        <span>· {atlas.authors.join(' & ')} ·</span>
        <span>E · 127°</span>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] tracking-widest3 uppercase text-ivory/35 pointer-events-none">
        <span>SHEET 01</span>
        <span>OUR ATLAS</span>
        <span>SCALE · ∞</span>
      </div>
    </section>
  );
}
