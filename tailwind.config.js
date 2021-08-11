module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      brightness: {
        85: '.85',
        115: '1.15',
      },
      inset: {
        1.5: '.375'
      }
    },
    fontFamily: {
      heading: ['Inter', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
      brightness: ['hover', 'focus', 'active'],
      inset: ['hover', 'group-hover'],
      visibility: ['hover', 'group-hover'],
      opacity: ['hover', 'group-hover'],
      margin: ['first', 'last'],
      rotate: ['group-hover'],
      width: ['hover', 'group-hover'],
      backgroundColor: ['active'],
      cursor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
}
