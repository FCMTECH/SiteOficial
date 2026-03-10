import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode - Tons claros sofisticados
        bg: {
          primary: '#FAFAFA',
          secondary: '#FFFFFF',
          tertiary: '#F5F5F5',
          elevated: '#FFFFFF',
        },
        // Accent - Dourado da marca FCM TECH
        accent: {
          gold: '#BFA76F',
          'gold-light': '#D4C495',
          'gold-dark': '#9A8656',
          blue: '#2563EB',
          teal: '#0D9488',
        },
        // Texto escuro para contraste
        text: {
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#7A7A7A',
        },
        // Bordas
        border: {
          light: '#E5E5E5',
          medium: '#D4D4D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Montserrat', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 20px rgba(191, 167, 111, 0.25)',
        'gold-lg': '0 8px 40px rgba(191, 167, 111, 0.35)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
export default config;
