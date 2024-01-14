/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "3rem",
        lg: "10rem",
      },
    }
  },
  plugins: [],
}