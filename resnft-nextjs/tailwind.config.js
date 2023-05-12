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
  "55": "55%",
  "60": "60%",
  "65": "65%",
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
        "dark-green": "#8e9443",
      },
      maxWidth: ratio,
      maxWidth: ratio,
      maxHeight: ratio,
      minHeight: ratio,
      width: ratio,
      height: ratio,
    },
  },
  plugins: [],
};
