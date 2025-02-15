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
                'pwsi-done': '#12BC84', /** emerald-600 #059669 */ /** #07B279 */
                'pwsi-in-progress': '#E8BB37', /** yellow-500 #eab308 */
                'pwsi-on-hold': '#CB9DF9', /** purple-400 #c084fc */
                'pwsi-first-look': '#0891b2', /** cyan-600 #0891b2 */
                'pwsi-dropped': '#F9687E', /** rose-500 #f43f5e */
                'pwsi-link': '#ffffff', /** white */
                'pwsi-shadow': '#374151', /** gray-700 #374151 */
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
