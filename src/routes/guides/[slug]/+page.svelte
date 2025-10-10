<script lang="ts">
	import { platformData } from '$lib/data/guides.js';
	export let data;
	const guide = data.guide;
</script>

<svelte:head>
	<title>{guide.title} - Ivan's Guides</title>
</svelte:head>

<main class="p-8">
	<div class="flex h-16 items-center gap-6">
		<h1 class="text-3xl font-bold">{guide.title}</h1>
		<div class="flex gap-2">
			{#each guide.platforms as supported, i}
				{#if supported}
					<img src={platformData[i].src} alt={platformData[i].alt} width={platformData[i].width} />
				{/if}
			{/each}
		</div>
	</div>

	<h1>Demonstration</h1>

	<h1>Video Tutorial</h1>

	{#if guide.platforms[0]}
		<h1>Windows Guide</h1>
		<ol class="ml-5 list-none space-y-2">
			{#each guide.windowsSteps as step}
				<p>{@html step}</p>
			{/each}
		</ol>
	{/if}

	{#if guide.platforms[1]}
		<h1>iPhone Guide</h1>
		<ol class="ml-5 list-none space-y-2">
			{#each guide.iPhoneSteps as step}
				<li>{@html step}</li>
			{/each}
		</ol>
	{/if}

	{#if guide.platforms[2]}
		<h1>Android Guide</h1>
		<ol class="ml-5 list-none space-y-2">
			{#each guide.androidSteps as step}
				<li>{@html step}</li>
			{/each}
		</ol>
	{/if}

	{#if guide.platforms[3]}
		<h1>Fire TV Guide</h1>
		<ol class="ml-5 list-none space-y-2">
			{#each guide.fireTVSteps as step}
				<li>{@html step}</li>
			{/each}
		</ol>
	{/if}
</main>
