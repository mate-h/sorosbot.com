import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === "development") {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	dotenv.config();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node()
	}
};

export default config;
