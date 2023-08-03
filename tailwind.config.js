/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "light-cyan": "hsl(180, 66%, 65%)",
          cyan: "hsl(180, 66%, 49%)",
          "dark-violet": "hsl(257, 27%, 26%)",
        },
        secondary: {
          red: "hsl(0, 87%, 67%)",
        },
        neutral: {
          gray: "hsl(0, 0%, 75%)",
          "grayish-violet": "hsl(257, 7%, 63%)",
          "very-dark-blue": "hsl(255, 11%, 22%)",
          "very-dark-violet": "hsl(260, 8%, 14%)",
        },
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
      },
      // screens: {
      //   mobile: "375px",
      //   desktop: "1440px",
      // },
    },
  },
  plugins: [],
};
