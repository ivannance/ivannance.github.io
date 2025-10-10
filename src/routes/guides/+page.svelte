<script lang="ts">
	import { guides, platformData } from '$lib/data/guides';

	const sanitizeForUrl = (input: string) =>
		input
			.replace(/\s+/g, '-')
			.replace(/[^a-zA-Z0-9-]/g, '')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '')
			.toLowerCase();
</script>

<svelte:head>
	<title>Ivan's Guides</title>
</svelte:head>

<h1>What would you like to learn?</h1>
<h2>DISCLAIMER: THIS IS FOR EDUCATIONAL PURPOSES ONLY</h2>

<div class="flex justify-center">
	<div class="grid w-full grid-cols-4 gap-8">
		{#each guides as guide}
			{(guide.slug = sanitizeForUrl(guide.title))}

			<a
				href={`/guides/${guide.slug}`}
				class="card flex aspect-square flex-col justify-between p-4 transition hover:shadow-lg"
			>
				<p class="font-bold text-white">{guide.title}</p>

				{#await Promise.resolve(platformData.filter((_, i) => guide.platforms[i])) then supported}
					<div class="flex w-full justify-between">
						{#each Array(4) as _, i}
							<div class="flex aspect-square w-1/4 items-center justify-center">
								{#if supported[i]}
									<img src={supported[i].src} alt={supported[i].alt} width={supported[i].width} />
								{/if}
							</div>
						{/each}
					</div>
				{/await}
			</a>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	h2 {
		text-align: center;
		color: red;
		font-weight: bold;
		padding-bottom: 5vh;
		font-size: x-large;
	}
</style>
