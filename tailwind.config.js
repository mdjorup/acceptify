const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#570df8',
      secondary: '#f000b8',
      accent: '#1dcdbc',
      neutral: '#2b3440',
      'base-100': '#ffffff',
      info: '#3abff8',
      success: '#36d399',
      warning: '#fbbd23',
      error: '#f87272',
    },
  },
  darkMode: 'class',
  plugins: [nextui(), require('daisyui')],
};
