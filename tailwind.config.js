/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#2DB9E3",
        accent: "#FF2854",
        muted: "#B0B0B5",
        background: "#F4F4F4",
        foreground: "#020617",
      }
    },
  },
  darkMode: "class",
  plugins: [],
}