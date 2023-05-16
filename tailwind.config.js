// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	// 1. Apply the dark mode class setting:
// 	content: [
// 		'./src/**/*.{html,js,svelte,ts}',
// 		'./public/index.html',
// 		// 2. Append the path for the Skeleton NPM package and files:
// 		require('path').join(require.resolve(
// 			'@skeletonlabs/skeleton'),
// 			'../**/*.{html,js,svelte,ts}'
// 		)
// 	],
// 	darkMode: 'class',
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [
// 		// 3. Append the Skeleton plugin to the end of this list
// 		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
// 	]
// }

const production = !process.env.ROLLUP_WATCH;

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./public/index.html',
		'./src/**/*.svelte',
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	],
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
};
