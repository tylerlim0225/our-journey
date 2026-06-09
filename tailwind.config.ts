import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A2540',
          800: '#11304F',
          700: '#1A3A60',
        },
        gold: {
          700: '#8C6D32',
          600: '#B8924B',
          500: '#C9A668',
          400: '#D4B26A',
          200: '#E8D5A0',
          100: '#F0E6CC',
          50:  '#F8F2E0',
        },
        cream: '#FAF7F0',
        ink: '#1F1F1F',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
        widest2: '0.3em',
      },
      animation: {
        shake: 'shake 0.4s',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
