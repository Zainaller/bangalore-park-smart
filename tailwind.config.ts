import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Dark theme base colors
        background: {
          DEFAULT: '#121212',
          secondary: '#1E1E1E',
          tertiary: '#2C2C2C',
        },
        foreground: {
          DEFAULT: '#E0E0E0',
          muted: '#A0A0A0',
        },
        primary: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#4B5563',
          foreground: '#F3F4F6',
        },
        accent: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        // Parking specific dark colors
        'park-dark': {
          50: '#1A202C',
          100: '#2D3748',
          200: '#4A5568',
          300: '#718096',
          400: '#A0AEC0',
          500: '#CBD5E0',
          600: '#E2E8F0',
          700: '#EDF2F7',
          800: '#F7FAFC',
        },
        'park-blue': {
          50: '#0A2540',
          100: '#1A365D',
          200: '#2C5282',
          300: '#2B6CB0',
          400: '#3182CE',
          500: '#4299E1',
          600: '#63B3ED',
          700: '#90CDF4',
          800: '#BEE3F8',
          900: '#EBF8FF',
        },
        'park-teal': {
          300: '#285E61',
          400: '#2C7A7B',
          500: '#319795',
          600: '#38B2AC',
          700: '#4FD1C5',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
