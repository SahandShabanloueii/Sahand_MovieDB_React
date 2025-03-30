/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121212',
        'dark': '#2a2a2a',
        'darker': '#1a1a1a',
        'netflix': {
          'red': '#e50914',
          'red-hover': '#f40612',
        }
      },
      textColor: {
        'netflix-red': '#e50914',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        spin: {
          'to': { transform: 'rotate(360deg)' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.5s ease forwards',
        'spin': 'spin 1s ease-in-out infinite',
        'pulse': 'pulse 1s ease-in-out',
        'gradientFlow': 'gradientFlow 3s ease infinite'
      },
      backdropBlur: {
        'glass': '10px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-text': 'linear-gradient(45deg, #e50914, #ff4d4d)'
      }
    },
  },
}

