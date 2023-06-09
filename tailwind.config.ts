import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#152C34",
          50: "#4A9AB6",
          100: "#448EA8",
          200: "#38768B",
          300: "#2C5D6E",
          400: "#214551",
          500: "#152C34",
        },
        pink: {
          20: "#F2DBD5",
          500: "#EEB1A0",
        },
        yellow: {
          50: "#fef9ec",
          100: "#fbefca",
          200: "#f7db86",
        },
        lightblue: {
          50: "#eff3fe",
          100: "#e1e9fe",
          200: "#c9d5fc",
          300: "#96abf8",
        },
        grey: {
          500: "#5c737b",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
