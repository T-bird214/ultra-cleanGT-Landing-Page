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
        // Ultra-CleanGT Brand Palette
        navy:       '#001529',
        'deep-blue': '#000b14',
        silver:     '#C0C0C0',
        'silver-light': '#E8E8E8',
        'accent-blue': '#1B5FAA',
        'accent-light': '#2E80D8',
        'brand-dark': '#001020',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(135deg, rgba(0,21,41,0.92) 0%, rgba(0,21,41,0.75) 50%, rgba(0,11,20,0.85) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'card': '0 4px 24px rgba(0,21,41,0.15)',
        'cta': '0 0 30px rgba(27,95,170,0.4)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
