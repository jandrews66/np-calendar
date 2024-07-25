/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'layout': '1fr 1fr auto auto auto', // The last two columns are set to auto to fit their content
      },
    },
  },
  plugins: [],
}