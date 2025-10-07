/**
 * svgo.config.js
 * @see https://github.com/svg/svgo
 * @see {@link ./node_modules/svgo/lib/svgo.d.ts}
 */

module.exports = {
	multipass: true, // boolean. false by default
	// datauri: 'enc', // 'base64' (default), 'enc' or 'unenc'.
	js2svg: {
		// indent: 2, // string with spaces or number of spaces. 4 by default
		pretty: true, // boolean, false by default
	},
	convertColors: false,
	plugins: [
		// set of built-in plugins enabled by default
		"preset-default",

		//   // enable built-in plugins by name
		//   'prefixIds',

		//   // or by expanded notation which allows to configure plugin
		//   {
		//     name: 'sortAttrs',
		//     params: {
		//       xmlnsOrder: 'alphabetical',
		//     },
		//   },
	],
};
