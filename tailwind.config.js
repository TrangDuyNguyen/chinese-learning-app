/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        china: {
          red: '#de2910',
          darkred: '#991b1b',
          gold: '#ffde00',
          jade: '#059669',
          ink: '#1e293b'
        }
      },
      fontFamily: {
        chinese: ['"PingFang SC"', '"Microsoft YaHei"', '"Noto Sans SC"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
