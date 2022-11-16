const path = require("path");
module.exports = {
  mode:'jit',
  purge: [
    "./index.html",
    "./src/**/*.{vue,js}",
    path.resolve(__dirname, "./node_modules/litepie-datepicker/**/*.js"),
  ],
  theme: {
    screens: {
      xs: "512px",
      // => @media (min-width: 512px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      body: ["Roboto"],
      diplay: ["Roboto"],
      sans: ["Roboto"],
      serif: ["Roboto"],
    },

    extend: {
      backgroundImage: {
       
      },
      fontSize: {
        md: ["1.125rem", "1.5rem"],
      },
      maxWidth: {
        six: "102rem",
      },
      height: {
        nav: "5.25rem",
      },

      flex: {
        six: "1 0 16.6%",
      },
      colors: {
        "primary": "#009688",
        "primary-lite": "#6ec8c0;",
        "primary-dark":"#007166",
        "secondary": "#444f60",
        "secondary-2": "#868686",
        "secondary-3": "#F8F8F8",
        "secondary-4": "#E5E5E5",
        "secondary-dark": "#313131",
        "litepie-primary": {
          50: "#009688",
          100: "#009688",
          200: "#009688",
          300: "#009688",
          400: "#009688",
          500: "#009688",
          600: "#009688",
          700: "#009688",
          800: "#009688",
        }, // color system for light mode
        "litepie-secondary": {
          50: "#444F60",
          100: "#009688",
          200: "#444F60",
          300: "#565656",
          400: "#444F60",
          500: "#444F60",
          600: "#444F60",
          700: "#444F60",
          800: "#444F60",
        }
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["disabled"],
      cursor: ["disabled"],
      borderWidth: ["last", "focus-within", "first"],
      borderRadius: ["hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
