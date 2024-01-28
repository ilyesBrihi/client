/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'xs' : '400px',
        'aa' : '500px',
        '2xl' : '1200px',
        '3xl' : '1400px',
      },
      colors : {
        primary : '#27272A'
      }
    },
  },
  plugins: [],
}