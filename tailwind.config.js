/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontSize: {
      sm: '12px',
      md: '14px',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        background: '#191D37',
        primary: '#32CCF6',
        danger: '#FF2060',
        'active-danger': '#C2043B',
        secondary: '#CDCDCD',
        card: 'rgba(50, 55, 85, 0.50);',
      },
      fontSize: {
        'heading-1': '28px',
        'heading-2': '24px',
        paragraph: '20px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
