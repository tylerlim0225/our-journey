import { notes } from '@/lib/data';

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="text-xs tracking-widest2 text-gold-600 uppercase mb-2">
          NOTES · 우리의 기록
        </p>
        <h1 className="text-4xl font-bold text-navy-900">소소한 기록들</h1>
        <p className="mt-2 text-sm text-navy-900/60">
          여행이 아니어도 기억하고 싶은 순간들.
        </p>
      </header>

      <div className="relative pl-6 border-l border-navy-900/15 space-y-8">
        {notes.map(n => (
          <article key={n.id} className="relative">
            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-gold-500 ring-4 ring-cream" />
            <div className="bg-white rounded-md border border-navy-900/10 p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-bold text-navy-900">{n.title}</h2>
                <span className="text-xs font-mono text-gold-600">{n.date}</span>
              </div>
              <p className="mt-3 text-navy-900/80 leading-relaxed whitespace-pre-line">
                {n.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
