/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/client/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        'austen-cream': '#f5f0e6',
        'austen-gold': '#b8860b',
        'austen-charcoal': '#36454f',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
