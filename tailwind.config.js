module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'desktop-cards': 'repeat(auto-fit, minmax(200px, 1fr))',
        'mobile-cards': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  variants: {
    extend: { transform: ['hover', 'focus'] },
  },
  plugins: [],
};
