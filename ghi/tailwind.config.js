/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                teal: '#00C1C3',
                orange: '#FEB439',
                'dark-blue': '#00202A',
                'off-white': '#FEEEC7',
                'dark-orange': '#E44D0A',
                'dark-teal': '#00868F',
            },
            fontFamily: {
              rammetto : ["rammetto"]
            }
        },
    },
    plugins: [],
}
