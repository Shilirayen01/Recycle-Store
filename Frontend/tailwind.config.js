/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#1A1A19',
        'light-green': '#859F3D',
        'g-green': '#31511E',
        'green-light': '#F6FCDF',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/images/bg.jpg')",
      },
      boxShadow: {
        'text': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },

      
      
    },
  },
  plugins: [],
}

