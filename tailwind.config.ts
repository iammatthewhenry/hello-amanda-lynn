import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--page-bg)',
        green: 'var(--green)',
        foreground: 'var(--foreground)',
        secondary: 'var(--secondary)',
      },
      boxShadow: {
        soft: 'var(--shadow-sm)',
        card: 'var(--shadow-md)',
      },
      maxWidth: {
        page: 'var(--container-max)',
      },
    },
  },
  plugins: [],
};

export default config;
