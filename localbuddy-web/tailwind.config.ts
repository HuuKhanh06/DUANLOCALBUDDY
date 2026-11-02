import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#15803D',
          dark: '#14532D',
          soft: '#DCFCE7',
        },
        secondary: '#86EFAC',
        bg: '#F6FAF6',
        surface: '#FFFFFF',
        'text-main': '#14231A',
        'text-muted': '#4B5B50',
        border: '#D6E2D9',
        success: {
          DEFAULT: '#166534',
          bg: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#92400E',
          bg: '#FEF3C7',
        },
        error: {
          DEFAULT: '#B91C1C',
          bg: '#FEE2E2',
        },
        info: {
          DEFAULT: '#1E40AF',
          bg: '#DBEAFE',
        },
        neutral: {
          DEFAULT: '#374151',
          bg: '#E5E7EB',
        },
        // BookingStatus badge colors
        'bs-pending': { DEFAULT: '#92400E', bg: '#FEF3C7' },
        'bs-waiting': { DEFAULT: '#9A3412', bg: '#FFEDD5' },
        'bs-confirmed': { DEFAULT: '#1E40AF', bg: '#DBEAFE' },
        'bs-completed': { DEFAULT: '#166534', bg: '#DCFCE7' },
        'bs-disputed': { DEFAULT: '#B91C1C', bg: '#FEE2E2' },
        'bs-cancelled': { DEFAULT: '#374151', bg: '#E5E7EB' },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h3: ['18px', { lineHeight: '26px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
        modal: '16px',
        badge: '999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        modal: '0 8px 24px rgba(0,0,0,0.12)',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
      },
    },
  },
  plugins: [],
}

export default config

