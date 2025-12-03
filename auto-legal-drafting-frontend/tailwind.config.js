/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#208091',
                    hover: '#1a6b7a',
                    active: '#0e5162',
                },
            },
        },
    },
    plugins: [],
}
