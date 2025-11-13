import { getGuides } from '$lib/data/guides';

export async function load() {
	const guides = await getGuides();
	return { guides };
}
