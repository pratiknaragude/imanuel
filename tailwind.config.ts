import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F5F3",
        surface: "#FFFFFF",
        hairline: "#E6E6E2",
        yellow: {
          DEFAULT: "#FFD600",
          hover: "#F5C700",
        },
        obsidian: "#0D0D0D",
        charcoal: "#181818",
        ink: "#0D0D0D",
        muted: "#525252",
        "muted-dark": "#A3A3A3",
        status: {
          ready: "#16A34A",
          rendering: "#FFD600",
          draft: "#0D0D0D",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "neu-light":
          "5px 5px 10px #DFDFDB, -5px -5px 10px #FFFFFF, inset 0 1px 0 rgba(255,255,255,0.8)",
        "neu-light-pressed":
          "inset 3px 3px 6px #D6D6D2, inset -3px -3px 6px #FFFFFF",
        "neu-yellow":
          "4px 4px 10px rgba(212, 175, 0, 0.35), -4px -4px 10px rgba(255, 255, 255, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.65)",
        "neu-yellow-pressed":
          "inset 2px 2px 6px rgba(180, 150, 0, 0.4), inset -2px -2px 6px rgba(255, 255, 255, 0.5)",
        "neu-dark":
          "0 6px 14px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
        glass: "0 8px 30px rgba(0,0,0,0.06)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
