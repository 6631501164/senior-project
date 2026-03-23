/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // <--- ต้องมี {vue,js...} แบบนี้เป๊ะๆ
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}