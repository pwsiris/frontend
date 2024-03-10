/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['"Montserrat"', "sans-serif"]
            },
            colors: {
                'pwsi-1': '#374151', /** gray-700 */
                'pwsi-2': '#1f2937', /** gray-800 */
                'pwsi-text': '#cbd5e1', /** slate-300 */
                'pwsi-done': '#059669', /** emerald-600 */
                'pwsi-in-progress': '#eab308', /** yellow-500 */
                'pwsi-on-hold': '#c084fc', /** purple-400 */
                'pwsi-first-look': '#0891b2', /** cyan-600 */
                'pwsi-dropped': '#e11d48', /** rose-600 */
                'pwsi-link': '#ffffff', /** white */
                'pwsi-shadow': '#111827', /** gray-900 */
            },
        },
    },
    plugins: [],
}
