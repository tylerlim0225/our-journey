import Link from 'next/link';
import { trips, notes } from '@/lib/data';

export default function HomePage() {
  const recentTrips = trips.slice(0, 3);
  const totalDays = trips.reduce((s, t) => s + t.days, 0);
  const completedCount = trips.filter(t => t.status === 'completed').length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <section className="text-center animate-fade-in">
        <p className="text-xs tracking-widest2 text-gold-600 uppercase mb-4">
          TAEYUN 💛 JIEUN · TRAVEL JOURNAL · FY 2026
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-navy-900 leading-tight">
          태윤<span className="text-amber-400">💛</span>지은
          <br />
          <span className="text-gold-600">여행 일지</span>
        </h1>
        <p className="mt-6 text-navy-900/70 max-w-xl mx-auto leading-relaxed">
          다녀온 곳들의 지도와 자잘한 기록,
          <br />
          그리고 우리만 아는 비밀 한 줌이 담깁니다.
        </p>
        <div className="mt-10 flex gap-3 justify-center flex-wrap">
          <Link
            href="/travels"
            className="px-7 py-3 bg-navy-900 text-cream rounded-md text-sm font-medium hover:bg-navy-700 transition"
          >
            여행 지도 보기
          </Link>
          <Link
            href="/vault"
            className="px-7 py-3 border border-navy-900/20 text-navy-900 rounded-md text-sm font-medium hover:bg-navy-900/5 transition"
          >
            🔒 비밀 금고
          </Link>
        </div>
      </section>

      {/* KPI strip */}
      <section className="mt-24 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { label: 'TRIPS · 여행', value: trips.length },
          { label: 'DAYS · 누적 일수', value: totalDays },
          { label: 'COMPLETED · 완료', value: completedCount },
        ].map(k => (
          <div key={k.label} className="bg-white border border-navy-900/10 rounded-md py-6 text-center">
            <div className="text-3xl font-bold text-navy-900">{k.value}</div>
            <div className="mt-1 text-[10px] tracking-widest2 text-navy-900/50 uppercase">{k.label}</div>
          </div>
        ))}
      </section>

      {/* Recent trips */}
      <section className="mt-24">
        <div className="flex items-baseline justify-between border-b border-navy-900/15 pb-2 mb-6">
          <h2 className="text-xs tracking-widest2 uppercase text-navy-900/60">
            RECENT · 최근 여행
          </h2>
          <Link href="/travels" className="text-xs text-gold-700 hover:text-gold-600">
            전체 보기 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {recentTrips.map(t => (
            <article
              key={t.id}
              className="bg-white rounded-md p-6 border border-navy-900/10 hover:shadow-md hover:border-gold-400/40 transition"
            >
              <div className="text-xs font-mono text-gold-600">{t.date}</div>
              <h3 className="mt-2 text-lg font-bold text-navy-900">{t.title}</h3>
              <div className="mt-1 text-sm text-navy-900/60">{t.location}</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.highlights.slice(0, 3).map(h => (
                  <span key={h} className="text-xs px-2 py-1 bg-cream rounded text-navy-900/80">
                    {h}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recent notes */}
      <section className="mt-24 mb-8">
        <div className="flex items-baseline justify-between border-b border-navy-900/15 pb-2 mb-6">
          <h2 className="text-xs tracking-widest2 uppercase text-navy-900/60">
            NOTES · 최근 기록
          </h2>
          <Link href="/notes" className="text-xs text-gold-700 hover:text-gold-600">
            전체 보기 →
          </Link>
        </div>
        <div className="space-y-3">
          {notes.slice(0, 3).map(n => (
            <div
              key={n.id}
              className="bg-white rounded-md p-5 border border-navy-900/10 flex gap-5 items-baseline"
            >
              <span className="text-xs font-mono text-gold-600 shrink-0">{n.date}</span>
              <div>
                <div className="font-bold text-navy-900">{n.title}</div>
                <div className="text-sm text-navy-900/70 mt-1 line-clamp-1">{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
