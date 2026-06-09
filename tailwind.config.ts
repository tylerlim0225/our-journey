import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0E0B08',
          800: '#171310',
          700: '#221C18',
          600: '#2D2620',
          500: '#3D352E',
          400: '#5A4F46',
          300: '#857B71',
          200: '#B8AFA5',
          100: '#E8E2DA',
          50:  '#F7F3EE',
        },
        ivory: '#F4EEE3',
        cream: '#FAF5EC',
        gold: {
          900: '#5C4416',
          700: '#8B6A20',
          600: '#A88431',
          500: '#C4A661',
          400: '#D6BD81',
          300: '#E4D2A6',
          100: '#F2E7C9',
        },
        burgundy: '#5C2A2A',
        emerald800: '#1F3A2E',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Noto Serif KR"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif KR"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
        widest2: '0.32em',
        widest3: '0.5em',
      },
      animation: {
        shake: 'shake 0.4s',
        'pulse-soft': 'pulseSoft 3.2s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pin-pop': 'pinPop 0.7s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pinPop: {
          '0%': { transform: 'scale(0) translateY(8px)', opacity: '0' },
          '70%': { transform: 'scale(1.12) translateY(0)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
