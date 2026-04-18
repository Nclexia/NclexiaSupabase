/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // ← required for next-themes to work!
  content: [
    // './src/app/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx,css}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./components/**/*.{js,ts,jsx,tsx}", // For your components
    "./src/styles/**/*.{css}"          
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
