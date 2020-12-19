module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  },
  theme: {
    themeVariants: ['dark'],
    extend: {
      fontFamily: {
        display: ['Dancing Script', 'ui-serif'],
        sans: ['Source Sans Pro'],
      },
      borderRadius: {
        xl: '18px',
      },
      maxHeight: {
        '85vh': '85vh'
      }
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'disabled', 'focus', 'dark', 'dark:hover', 'dark:focus'],
    cursor: ['responsive', 'hover', 'disabled', 'focus', 'dark', 'dark:hover', 'dark:focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
    textColor: ['responsive', 'hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
  },
  corePlugins: {
    float: false,
  },
  plugins: [require('tailwindcss-multi-theme')],
};
