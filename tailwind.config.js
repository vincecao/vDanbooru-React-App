module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Dancing Script', 'ui-serif'],
        sans: ['Source Sans Pro'],
      },
      borderRadius: {
        xl: '18px',
      },
      maxHeight: {
        '85vh': '85vh',
      },
      spacing: {
        56: '185px',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'disabled', 'focus'],
    cursor: ['responsive', 'hover', 'disabled', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus'],
  },
  corePlugins: {
    float: false,
  },
};
