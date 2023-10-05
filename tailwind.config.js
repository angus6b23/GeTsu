/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'anon': 'Anonymous Pro',
        'ibm': 'IBM Plex Mono',
        'indie': 'Indie Flower',
        'notoSans': 'Noto Sans',
        'notoMono': 'Noto Sans Mono',
        'space': 'Space Mono',
        'ubuntu': 'Ubuntu',
        'ubuntuMono': 'Ubuntu Mono'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes: ["bumblebee", "forest"]
  }
}
