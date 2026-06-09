import Link from 'next/link';

const links = [
  { href: '/', label: '홈' },
  { href: '/travels', label: '여행' },
  { href: '/notes', label: '기록' },
  { href: '/vault', label: '🔒 금고' },
];

export default function Nav() {
  return (
    <header className="border-b border-navy-900/10 bg-cream/90 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-sm md:text-base font-bold tracking-wide text-navy-900">
          OUR JOURNEY
          <span className="mx-2 text-gold-600">·</span>
          <span className="text-navy-900/70 font-medium">우리의 여행</span>
        </Link>
        <nav className="flex gap-1 md:gap-2 text-sm font-medium text-navy-900">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded hover:bg-navy-900/5 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
