/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

module.exports = {
  purge: {
    content: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
    options: {
      safelist: ['theme-dark'],
    },
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
        '85vh': '85vh',
      },
      spacing: {
        56: '185px',
      },
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
