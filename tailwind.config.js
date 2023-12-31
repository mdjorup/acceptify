const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [nextui()],
};
