import { error } from '@sveltejs/kit';
import { guides } from '$lib/data/guides';

const sanitizeForUrl = (input: string) =>
	input
		.replace(/\s+/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase();

export function load({ params }) {
	const guide = guides.find((g) => sanitizeForUrl(g.title) === params.slug);
	if (!guide) throw error(404, 'Guide not found');
	return { guide };
}
