'use client';

import { useState, useEffect } from 'react';
import { VAULT_PASSWORD, type VaultEntry } from '@/lib/data';

export default function VaultGate({ entries }: { entries: VaultEntry[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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
      setTimeout(() => setError(false), 1500);
    }
  };

  const lock = () => {
    setUnlocked(false);
    setPw('');
    sessionStorage.removeItem('vault-unlocked');
  };

  if (!hydrated) {
    return <div className="h-64" aria-hidden />;
  }

  if (unlocked) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-emerald-700 flex items-center gap-2">
            <span>🔓</span>
            <span>금고가 열렸습니다.</span>
          </div>
          <button
            onClick={lock}
            className="text-xs text-navy-900/60 hover:text-navy-900 underline"
          >
            다시 잠그기
          </button>
        </div>
        <div className="space-y-5">
          {entries.map((e, i) => (
            <article
              key={i}
              className="bg-gradient-to-br from-cream to-gold-50 p-6 rounded-md border border-gold-200"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-bold text-navy-900">{e.title}</h3>
                <span className="text-xs font-mono text-gold-700">{e.date}</span>
              </div>
              <p className="mt-3 text-navy-900/85 leading-relaxed whitespace-pre-line">
                {e.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-10 md:p-14 text-center border border-navy-900/10">
      <div className="text-5xl mb-4" aria-hidden>🔒</div>
      <h2 className="text-xl font-bold text-navy-900 mb-2">
        우리만 아는 비밀번호
      </h2>
      <p className="text-sm text-navy-900/60 mb-8">
        힌트: 처음 만난 날 (MMDD)
      </p>
      <form onSubmit={tryUnlock} className="flex gap-2 justify-center">
        <input
          type="password"
          value={pw}
          onChange={ev => setPw(ev.target.value)}
          inputMode="numeric"
          autoComplete="off"
          maxLength={20}
          className={`px-4 py-2 w-44 text-center tracking-widest border rounded-md bg-cream focus:outline-none focus:ring-2 focus:ring-gold-400 transition ${
            error ? 'border-red-400 animate-shake' : 'border-navy-900/20'
          }`}
          placeholder="• • • •"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-navy-900 text-cream rounded-md text-sm font-medium hover:bg-navy-700 transition"
        >
          열기
        </button>
      </form>
      <div className="h-5 mt-4">
        {error && (
          <p className="text-red-500 text-sm animate-fade-in">
            아니야, 다시 한번 ☺
          </p>
        )}
      </div>
      <p className="mt-10 text-[10px] text-navy-900/40 italic leading-relaxed">
        ※ 이 자물쇠는 재미용입니다 — 실제 보안이 아니며,
        <br />
        브라우저에서 코드를 열어보면 비밀번호와 내용이 보입니다.
      </p>
    </div>
  );
}
