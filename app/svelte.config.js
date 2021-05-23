import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
// import os from 'os';

// console.log(os.networkInterfaces());

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node(),
		vite: {
			server: {
				hmr: {
					host: 'localhost',
					port: '24678'
				}
			}
		}
	}
};

export default config;
