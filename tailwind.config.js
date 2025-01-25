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
                'pwsi-1': '#705081', /** gray-700 */ /** B190C1 */
                'pwsi-2': '#422851', /** gray-800 */ /** 603A74 */
                'pwsi-3': '#866399',
                'pwsi-4': '#291933',
                'pwsi-text': '#cbd5e1', /** slate-300 #cbd5e1 */ /** slate-100 #f1f5f9 */ /** slate-200 #e2e8f0 */
                'pwsi-done': '#07B279', /** emerald-600 #059669 */ /** #07B279 */
                'pwsi-in-progress': '#eab308', /** yellow-500 */
                'pwsi-on-hold': '#c084fc', /** purple-400 */
                'pwsi-first-look': '#0891b2', /** cyan-600 */
                'pwsi-dropped': '#f43f5e', /** rose-500 */
                'pwsi-link': '#ffffff', /** white */
                'pwsi-shadow': '#374151', /** gray-900 */
            },
            // width: {
            //     '32/100': '32%',
            //     '48/100': '48%',
            //     '49/100': '49%',
            // }
        },
    },
    plugins: [],
}
