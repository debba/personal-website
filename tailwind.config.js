const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  // "dark" applies to an explicit dark choice, or to "auto" when the device prefers dark.
  darkMode: ['variant', [
    '&:is([data-theme="dark"] *)',
    '@media (prefers-color-scheme: dark) { &:is([data-theme="auto"] *) }',
  ]],
  content: [
    "./src/data/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        fg: token('fg'),
        muted: token('muted'),
        line: 'var(--line)',
        teal: token('teal'),
        accent: token('accent'),
        'accent-strong': token('accent-strong'),
        'on-accent': token('on-accent'),
        danger: token('danger'),
        success: token('success'),
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
