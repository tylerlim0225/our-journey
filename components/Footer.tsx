export default function Footer() {
  return (
    <footer className="border-t border-navy-900/10 bg-cream/50 py-8 mt-16">
      <div className="mx-auto max-w-5xl px-6 flex flex-wrap items-center justify-between gap-2 text-xs text-navy-900/55">
        <div>
          © {new Date().getFullYear()} Our Journey Together
          <span className="mx-2">·</span>
          made with 💗
        </div>
        <div className="italic">
          map tiles © OpenStreetMap contributors
        </div>
      </div>
    </footer>
  );
}
