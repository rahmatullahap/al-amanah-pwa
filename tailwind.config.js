const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        'blue-marine': '#2D405C',
        'blue-lapis': '#2B50CB',
        'blue-sky': '#5DA2F2',
        'black-100': '#27282E',
        'black-300': '#5F6368',
        'black-500': '#DADADA',
        'black-700': '#EFEFF0',
        yellow: '#FFCF31',
        orange: '#F3A336',
        red: '#ED2643',
      },
      screens: { xl: { min: '1280px', max: '1537px' }, '2xl': '1538px' },
      fontSize: {
        h1: '48px',
        h2: '36px',
        h3: '24px',
        h4: '16px',
        b1: '14px',
        b2: '12px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
