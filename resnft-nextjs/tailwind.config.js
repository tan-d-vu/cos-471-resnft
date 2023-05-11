/** @type {import('tailwindcss').Config} */
const ratio = {
  "10": "10%",
  "15": "15%",
  "20": "20%",
  "25": "25%",
  "30": "30%",
  "35": "35%",
  "40": "40%",
  "45": "45%",
  "50": "50%",
  "75": "75%",
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "purple": "#b4a8d7",
        "green": "#9ea54b",
        "light-green": "#9da54baf",
        "dark-green": "rgb(69, 76, 31) a;",
      },
      maxWidth: ratio,
      maxWidth: ratio,
      maxHeight: ratio,
      minHeight: ratio,
    },
  },
  plugins: [],
};