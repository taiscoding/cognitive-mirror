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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        medical: {
          light: '#f8fafc',
          gray: '#64748b',
          dark: '#0f172a',
          accent: '#06b6d4',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        },
        // Professional radiology dark theme
        pacs: {
          bg: '#0a0e14',           // Deep dark background (like PACS workstations)
          surface: '#141922',      // Card/surface background
          elevated: '#1c222e',     // Elevated elements
          border: '#2d3748',       // Subtle borders
          text: '#e2e8f0',         // Primary text
          'text-muted': '#94a3b8', // Secondary text
          accent: '#3b82f6',       // Blue accent (clinical standard)
          success: '#10b981',      // Success green
          warning: '#f59e0b',      // Warning amber
          error: '#ef4444',        // Error red
          highlight: '#1e40af'     // Highlighted elements
        }
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
