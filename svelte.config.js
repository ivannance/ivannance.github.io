import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { prerenderGuides } from './src/lib/data/guides-prerender.js';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ fallback: null }),
		prerender: {
			entries: ['*', ...prerenderGuides.map((g) => `/guides/${g.slug}`)]
		}
	}
};

export default config;
