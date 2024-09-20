/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '360px',
      },
      colors: {
        // Neutral
        black: '#262625',
        white: '#FEFEFE',
        beige: '#F3F3F1',
        // Colors
        blue: {
          dark: '#6B93C0',
          mid: '#A8C1E8',
          light: '#BADAFF',
        },
        green: {
          dark: '#95AE6D',
          mid: '#A2B87E',
          light: '#ECFFCE',
        },
        mustard: {
          dark: '#C2BB82',
          mid: '#CAC48E',
          light: '#FFFAC2',
        },
        orange: {
          dark: '#D46F55',
          mid: '#F28164',
          light: '#FFBCAB',
        },
        pink: {
          dark: '#D6699A',
          mid: '#F588B9',
          light: '#FFEDF5',
        },
        purple: {
          dark: '#8A92E3',
          mid: '#9FA8FE',
          light: '#EBEDFF',
        },
      },
    },
  },
  plugins: [],
};
