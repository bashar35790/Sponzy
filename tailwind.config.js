/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff6026', // Vibrant Luxury Sunset Orange
          600: '#f9531e',
          700: '#e0410f',
          800: '#9a3412',
          900: '#7c2d12',
        },
        dark: {
          bg: '#0c0d11',       // Deep obsidian carbon black
          card: '#14151b',     // Elevated luxury dark card
          hover: '#1b1d25',    // Smooth hover state
          border: '#232532',   // Refined subtle border
          subtle: '#181920',
          accent: '#282a3a',
        },
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'orange-glow': '0 0 35px -5px rgba(255, 96, 38, 0.35)',
        'orange-glow-sm': '0 0 15px -3px rgba(255, 96, 38, 0.25)',
      },
    },
  },
  plugins: [],
};
