import { error } from '@sveltejs/kit';
import { getGuides } from '$lib/data/guides';

export async function load({ params, setHeaders }) {
	setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	const guides = await getGuides();
	const guide = guides.find((g) => g.slug === params.slug);

	if (!guide) throw error(404, 'Guide not found');

	return { guide };
}
