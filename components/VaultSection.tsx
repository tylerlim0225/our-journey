'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Unlock, KeyRound, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { vaultEntries, VAULT_PASSWORD } from '@/lib/data';
import { fadeIn, blurUp, staggerParent, scaleSoft } from '@/lib/motion';

// Playful frontend-only "lock". Not security — the password and
// contents are bundled in the public JS.
export default function VaultSection() {
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window !== 'undefined' && sessionStorage.getItem('vault-unlocked') === '1') {
      setUnlocked(true);
    }
  }, []);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === VAULT_PASSWORD) {
      setUnlocked(true);
      sessionStorage.setItem('vault-unlocked', '1');
    } else {
      setError(true);
      setTimeout(() => setError(false), 1400);
    }
  };

  const lock = () => {
    setUnlocked(false);
    setPw('');
    sessionStorage.removeItem('vault-unlocked');
  };

  return (
    <section
      id="vault"
      className="relative w-full min-h-screen overflow-hidden bg-ink-900 text-ivory py-24 md:py-32"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 ink-grain" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(92,42,42,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(14,11,8,0.85)_100%)]" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeIn}
            className="text-[10px] tracking-widest3 uppercase text-gold-400 mb-4"
          >
            VI · Vault
          </motion.p>
          <motion.h2
            variants={blurUp}
            className="font-display text-4xl md:text-6xl leading-tight text-balance"
          >
            우리만 아는
            <br />
            <span className="italic text-gold-400">비밀의 좌표</span>
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mt-5 text-sm text-ivory/55 italic font-display"
          >
            “Open this on the last night of the trip.”
          </motion.p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={scaleSoft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative glass rounded-3xl p-8 md:p-12 border border-gold-500/20"
        >
          <AnimatePresence mode="wait">
            {!hydrated ? (
              <div key="hyd" className="h-72" />
            ) : !unlocked ? (
              <motion.form
                key="lock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={tryUnlock}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto w-20 h-20 grid place-items-center rounded-full bg-ink-800/80 border border-gold-500/30 mb-6 shadow-[0_0_30px_rgba(196,166,97,0.18)]"
                >
                  <Lock className="w-8 h-8 text-gold-400" />
                </motion.div>

                <p className="text-xs tracking-widest2 uppercase text-ivory/55 mb-3">
                  Encrypted by us
                </p>
                <h3 className="font-display text-2xl md:text-3xl mb-8">
                  우리만 아는 비밀번호
                </h3>

                <div className="flex justify-center">
                  <div className="relative w-full max-w-xs">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/50" />
                    <input
                      type="password"
                      value={pw}
                      onChange={e => setPw(e.target.value)}
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={20}
                      placeholder="••••"
                      className={`w-full pl-11 pr-4 py-3 text-center tracking-widest2 text-lg rounded-xl bg-ink-800/80 border focus:outline-none focus:ring-2 focus:ring-gold-500/40 transition ${
                        error
                          ? 'border-burgundy animate-shake'
                          : 'border-ivory/15'
                      } text-ivory placeholder:text-ivory/30`}
                    />
                  </div>
                </div>

                <p className="mt-3 text-[10px] tracking-widest2 uppercase text-ivory/45">
                  힌트 · 처음 만난 날 (MMDD)
                </p>

                <button
                  type="submit"
                  className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 text-ink-900 text-xs tracking-widest2 uppercase font-semibold hover:bg-gold-400 transition"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Open the vault
                </button>

                <div className="h-6 mt-3">
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-burgundy text-xs"
                    >
                      아니야, 다시 한번 ☺
                    </motion.p>
                  )}
                </div>

                <p className="mt-8 text-[10px] text-ivory/40 italic leading-relaxed">
                  ※ 이 자물쇠는 재미용입니다 — 실제 보안이 아니며, 브라우저에서 코드를 열면 내용이 보입니다.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-8 text-xs">
                  <span className="inline-flex items-center gap-2 text-gold-400 tracking-widest2 uppercase">
                    <Unlock className="w-3.5 h-3.5" />
                    Vault open
                  </span>
                  <button
                    onClick={lock}
                    className="text-ivory/55 hover:text-ivory underline-offset-4 hover:underline tracking-wider"
                  >
                    다시 잠그기
                  </button>
                </div>

                <motion.div
                  variants={staggerParent}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {vaultEntries.map((v, i) => (
                    <motion.article
                      key={i}
                      variants={blurUp}
                      className="relative pl-6 md:pl-8 border-l-2 border-gold-500/35"
                    >
                      <span className="absolute -left-2 top-1 w-3 h-3 rounded-full bg-gold-500" />
                      <div className="flex items-baseline gap-3 mb-2 text-[10px] tracking-widest2 uppercase text-ivory/55">
                        <span>{v.date}</span>
                      </div>
                      <h4 className="font-display text-2xl md:text-3xl text-ivory">
                        {v.title}
                      </h4>
                      <p className="mt-3 text-sm md:text-base text-ivory/80 leading-relaxed whitespace-pre-line font-display italic">
                        {v.body}
                      </p>
                      {v.meta && (
                        <p className="mt-3 text-[11px] text-gold-400 italic flex items-center gap-2">
                          <ArrowDown className="w-3 h-3" />
                          {v.meta}
                        </p>
                      )}
                    </motion.article>
                  ))}
                </motion.div>

                <p className="mt-12 text-center text-[10px] text-ivory/35 italic">
                  Sealed for the two of us · {vaultEntries.length} entries
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <p className="mt-12 text-center text-[10px] tracking-widest3 uppercase text-ivory/30">
          End of sheet · made with 💛
        </p>
      </div>
    </section>
  );
}
