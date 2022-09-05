const theme = require('./theme.json');
module.exports = {
   mode: 'jit',
   purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class', // or 'media' or 'class'
   theme: {
      extend: {
         colors: theme
      }
   },
   variants: {
      extend: {}
   },
   plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')]
};
