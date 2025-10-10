import { error } from '@sveltejs/kit';
import { guides } from '$lib/data/guides';

export function load({ params }) {
	const guide = guides.find((g) => g.slug === params.slug);

	if (!guide) throw error(404, 'Guide not found');

	return { guide };
}
