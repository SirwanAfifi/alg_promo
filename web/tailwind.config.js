const colors = {
  black: "#1B1D29",
  gray: "#E5E5E5",
  bgGray: "#F5F7FA",
  darkGray: "#888991",
  lightGray: "#CFD2D9",
  textGray: "#7D7D7D",
  blue: "#0085FF",
  white: "#FFFFFF",
  red: "#E74C3C",
};

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: { ...colors },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
