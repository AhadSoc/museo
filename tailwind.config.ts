import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0806",
        ink: "#15100C",
        umber: "#211812",
        parchment: "#E9DFCE",
        ash: "#9C9181",
        gilt: "#A88954",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        editorial: ["var(--font-editorial)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.35em",
        widest3: "0.5em",
      },
      fontSize: {
        "clamp-hero": "clamp(3.5rem, 12vw, 11rem)",
        "clamp-h1": "clamp(2.5rem, 7vw, 6rem)",
        "clamp-h2": "clamp(2rem, 5vw, 3.75rem)",
      },
      transitionTimingFunction: {
        "museo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "museo-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      zIndex: {
        cursor: "9999",
        overlay: "9000",
        nav: "8000",
      },
    },
  },
  plugins: [],
};
export default config;
