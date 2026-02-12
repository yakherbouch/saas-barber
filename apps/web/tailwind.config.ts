import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7ff',
          100: '#e6ecff',
          500: '#3557ff',
          700: '#1f3899',
          900: '#131f52'
        },
        accent: '#d97706'
      }
    }
  },
  plugins: []
} satisfies Config;
