/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "10rem",
      },
    }
  },
  plugins: [],
}