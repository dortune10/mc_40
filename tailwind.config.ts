import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Gilded Softness Design System
                rose: {
                    50: '#FFF1F2',
                    100: '#FFE4E6',
                    200: '#FECDD3',
                    300: '#FDA4AF',
                    400: '#FB7185',
                    500: '#F43F5E',
                    600: '#E11D48',
                },
                purple: {
                    50: '#FAF5FF',
                    100: '#F3E8FF',
                    200: '#E9D5FF',
                    300: '#D8B4FE',
                    400: '#C084FC',
                    500: '#A855F7',
                    600: '#9333EA',
                    700: '#7E22CE',
                    800: '#6B21A8',
                    900: '#581C87',
                },
                fuchsia: {
                    50: '#FDF4FF',
                    100: '#FAE8FF',
                    200: '#F5D0FE',
                    300: '#F0ABFC',
                    400: '#E879F9',
                    500: '#D946EF',
                    600: '#C026D3',
                    700: '#A21CAF',
                },
                amber: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                },
            },
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gold-shimmer': 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #D97706 100%)',
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(88, 28, 135, 0.15)',
                'glass': '0 8px 32px 0 rgba(88, 28, 135, 0.1)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(88, 28, 135, 0.06)',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
export default config;
