import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'gradient-home': 'linear-gradient(119deg, #FF8158 -2.11%, #4B65A6 63.58%)',
      },
      spacing: {
        "571": "571px",
      },
      fontSize: {
        "24": "24px",
        "13": "13px",
      },
      colors: {
        initial: "#F9EBE9",
        myBrown: "#AC736D",
        "custom-orange": "#D47151",
        "custom-admin": "#70B891",
        "custom-green": "#4e8171",
        "custom-blue": "#455273",
        "custom-lightorange ": "#F9EBE9",
        profileName: "#505050",
        "custom-brown": "#D7CFC7",
        eventBrown: "#764C35",
        navWhite: "#D7CFC7",
        "custom-gray": "#F8F8F8",
        dashboard: "#E9E9E9",
        new: "#906953",
        dashBtnBlue: "#394855",
        "home-blue":"#003585",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        khand: ["Khand", "sans-serif"],
        IBM: ["IBM Plex Mono", "monospace"],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'monoton': ['Monoton', 'cursive'],
        manrope: ['Manrope', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'bai-jamjuree': ['"Bai Jamjuree"', 'sans-serif'],
        'abhaya-libre': ['Abhaya Libre', 'serif'],
      },
      height: {
        "394": "394px",
        "22": "22px",
      },
      width: {
        "63": "63px",
        "761": "761px",
      },
      boxShadow: {
        "3xl": " 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
        normalComponent:
          "0px 4px 4px 0px rgba(255, 255, 255, 222) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
