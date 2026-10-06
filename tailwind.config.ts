import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  extend: {
    fontFamily: {
      heading: ['Playfair Display', 'serif'],
      body: ['Inter', 'sans-serif'],
      tamil: ['Noto Sans Tamil', 'sans-serif']
    },
    colors: {
      primary: '#7A1F3D',
      accent: '#E0527A',
      gold: '#C9A24B',
      ivory: '#FFF9F3',
      success: '#2E8B57',
      danger: '#D64545',
      text: '#2A1A1F',
      background: '#FFF9F3'
    },
    borderRadius: {
      lg: '16px',
      DEFAULT: '12px',
      md: '10px',
      sm: '8px'
    },
    animation: {
      'bounce-slow': 'bounce 2s infinite',
      'pulse-custom': 'pulse 3s ease-in-out infinite'
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config