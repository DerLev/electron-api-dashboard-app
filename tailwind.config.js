module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
      brightness: ['hover', 'focus', 'active'],
      inset: ['hover', 'group-hover'],
      visibility: ['hover', 'group-hover'],
      opacity: ['hover', 'group-hover'],
      margin: ['first', 'last'],
    },
  },
  plugins: [],
}
