/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gh-bg': '#0d1117',
        'gh-border': '#30363d',
        'gh-text': '#c9d1d9',
        'gh-text-secondary': '#8b949e',
        'gh-green-0': '#161b22',
        'gh-green-1': '#0e4429',
        'gh-green-2': '#006d32',
        'gh-green-3': '#26a641',
        'gh-green-4': '#39d353',
      },
    },
  },
  plugins: [],
}
