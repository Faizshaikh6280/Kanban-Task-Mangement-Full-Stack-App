/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-bg-main': 'rgb(var(--custom-bg-main))',
        'custom-bg-secondary': 'rgb(var(--custom-bg-secondary))',
        'custom-text-1': 'var(--custom-text-1)',
        'custom-text-2': 'var(--custom-text-2)',
        primary: 'rgb(100 95 198)',
      },
    },
  },
  plugins: [],
};
