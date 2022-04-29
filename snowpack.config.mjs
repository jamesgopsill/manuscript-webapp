export default {
	mount: {
		public: {url: "/", static: true},
		src: {url: "/dist"},
	},
	plugins: [
		"./plugins/svelte-check.js",
		"@snowpack/plugin-typescript",
		"@snowpack/plugin-svelte",
	],
	routes: [],
	optimize: {
		// TODO
		// "bundle": true,
	},
	packageOptions: {
	},
	devOptions: {},
	buildOptions: {
		"out": "docs"
	},
}