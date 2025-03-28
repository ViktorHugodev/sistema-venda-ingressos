import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #f95602 0%, #ff8a50 100%)',
        'pink-gradient': 'linear-gradient(135deg, #ff5bae 0%, #ef3f96 100%)',
      },
      colors: {
        sympla: {
          blue: '#00B1E4',
          orange: '#F95602',
          coral: '#F95602',
          purple: '#6236FF',
          pink: '#ff5bae',
          background: '#FFFFFF',
          'background-alt': '#F5F5F5',
          dark: '#333333',
          'dark-gray': '#4A4A4A',
          'light-gray': '#E0E0E0',
          text: '#333333',
          'text-light': '#666666',
          'text-muted': '#999999',
          white: '#FFFFFF',
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'nav': '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
        'full': '9999px',
      },
      fontSize: {
        'xxs': '0.625rem',
      },
    },
  },
  plugins: [],
}
export default config
