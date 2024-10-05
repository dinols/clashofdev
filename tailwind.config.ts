/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        radient:
          "radial-gradient(50% 50% at 50% 50%, #5A5A59 0%, #262625 100%)",
        "radient-light":
          "radial-gradient(50% 50% at 50% 50%, #B3B3B4 0%, #F3F3F1 100%)",
      },
      boxShadow: {
        "inner-key": "0px -3px 4px 0px rgba(136, 136, 136, 0.48) inset",
        glow: "0px 4px 20px 0px rgba(255, 255, 255, 0.25)",
      },
      fontSize: {
        "10xl": "10rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
      colors: {
        // Neutral
        black: "#262625",
        gray: "#9B9B9B",
        white: "#FEFEFE",
        beige: "#F3F3F1",
        // Colors
        blue: {
          dark: "#6B93C0",
          mid: "#A8C1E8",
          light: "#BADAFF",
        },
        green: {
          dark: "#95AE6D",
          mid: "#A2B87E",
          light: "#ECFFCE",
        },
        mustard: {
          dark: "#C2BB82",
          mid: "#CAC48E",
          light: "#FFFAC2",
        },
        orange: {
          dark: "#D46F55",
          mid: "#F28164",
          light: "#FFBCAB",
        },
        pink: {
          dark: "#D6699A",
          mid: "#F588B9",
          light: "#FFEDF5",
        },
        purple: {
          dark: "#8A92E3",
          mid: "#9FA8FE",
          light: "#EBEDFF",
        },
      },
    },
  },
  plugins: [],
};
