/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: "Montserrat, sans-serif",
      Julius: "Julius Sans One, sans-serif",
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
