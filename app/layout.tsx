import './globals.css';
import type { Metadata, Viewport } from 'next';
import { AtlasProvider } from '@/lib/atlas-context';

export const metadata: Metadata = {
  title: '태윤💛지은 여행 일지',
  description: 'Our Travel Atlas — 우리가 머문 자리, 우리에게 남은 풍경.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E0B08',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+KR:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-900 text-ivory">
        <AtlasProvider>{children}</AtlasProvider>
      </body>
    </html>
  );
}
