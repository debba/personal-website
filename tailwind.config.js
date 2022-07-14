module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'extra-dark': '#000101',
        'semi-dark': '#040f0c',
        'secondary-color': '#28549e',
        'light-grey': '#838887'
      },
      fontFamily: {
        'roboto': ['Roboto Mono', 'monospace']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ]
}
