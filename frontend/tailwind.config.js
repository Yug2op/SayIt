/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'var(--border-color, #e5e7eb)',
        dark: 'var(--dark-border, #2E2E2E)',
      },
      colors: {
        // Dark Mode Colors
        'dark-bg': '#0A0A0A',
        'dark-card': '#18181B',
        'dark-text': '#FFFFFF',
        'dark-muted': '#D1A5BB',
        'dark-border': '#2E2E2E',

        // Light Mode Colors
        'light-bg': '#FFFFFF',
        'light-card': '#FFEAF4',
        'light-text': '#1A1A1A',
        'light-muted': '#555555',
        'light-border': '#e5e7eb',

        // Accent Colors (same for both modes)
        'primary': '#FF2E88',
        'secondary': '#FF6FB5',

        // Border color for both themes
        'border': {
          light: '#e5e7eb',
          dark: '#2E2E2E',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'neo-hover': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'neo-pressed': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'neo-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'neo-xl': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}