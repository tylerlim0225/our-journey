'use client';

import dynamic from 'next/dynamic';
import { trips } from '@/lib/data';

const TravelMap = dynamic(() => import('@/components/TravelMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] w-full flex items-center justify-center bg-cream text-navy-900/40 text-sm">
      지도를 불러오는 중...
    </div>
  ),
});

const statusLabel: Record<string, { ko: string; cls: string }> = {
  planned: { ko: '계획중', cls: 'bg-gold-50 text-gold-700' },
  'in-progress': { ko: '진행중', cls: 'bg-blue-50 text-blue-700' },
  completed: { ko: '완료', cls: 'bg-emerald-50 text-emerald-700' },
};

export default function TravelsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs tracking-widest2 text-gold-600 uppercase mb-2">
          TRAVELS · 여행 지도
        </p>
        <h1 className="text-4xl font-bold text-navy-900">다녀온 곳들</h1>
        <p className="mt-2 text-sm text-navy-900/60">
          핀을 눌러 자세히 확인하거나, 아래 목록을 둘러보세요.
        </p>
      </header>

      <div className="rounded-md overflow-hidden border border-navy-900/15 shadow-sm mb-10">
        <TravelMap trips={trips} />
      </div>

      <div className="space-y-3">
        {trips.map(t => {
          const st = statusLabel[t.status];
          return (
            <article
              key={t.id}
              className="bg-white p-5 rounded-md border border-navy-900/10 hover:border-gold-400/40 transition grid md:grid-cols-[110px_1fr_auto] gap-4 items-center"
            >
              <div>
                <div className="text-xs font-mono text-gold-600">{t.date}</div>
                <div className="text-xs text-navy-900/60 mt-0.5">{t.days}일</div>
              </div>
              <div>
                <div className="font-bold text-navy-900">{t.title}</div>
                <div className="text-sm text-navy-900/60 mt-0.5">{t.location}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {t.highlights.map(h => (
                    <span key={h} className="text-xs px-2 py-0.5 bg-cream rounded text-navy-900/80">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] tracking-wider px-2 py-1 rounded ${st.cls}`}>
                  {st.ko.toUpperCase()}
                </span>
                <span className="text-sm">{'⭐'.repeat(t.rating)}</span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-navy-900/40 italic">
        지도 타일: © OpenStreetMap contributors · 무료 공개 데이터
      </p>
    </div>
  );
}
