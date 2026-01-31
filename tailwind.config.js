/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                meadow: {
                    50: '#F5F1E8',
                    700: '#203b14',
                },
                pebble: {
                    100: '#E5E1D8',
                    400: '#B0A090',
                },
            },
            fontFamily: {
                sans: ["var(--font-akkurat)", "var(--font-geist-sans)", "sans-serif"],
                mono: ["var(--font-geist-mono)"],
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                marquee: "marquee 30s linear infinite",
            },
        },
    },
    plugins: [],
};
