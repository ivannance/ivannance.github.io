<script lang="ts">
	import { platformData } from '$lib/data/guides';
	export let data;
	const guide = data.guide;
</script>

<svelte:head>
	<title>{guide.title} - Ivan's Guides</title>
</svelte:head>

<main>
	<header>
		<div class="mb-4 flex flex-wrap items-center gap-4">
			<h1 class="text-4xl font-bold md:text-5xl">{guide.title}</h1>
			<div class="flex flex-wrap gap-3">
				{#each guide.platforms as supported, i}
					{#if supported}
						<div class="p-2 shadow-sm transition-transform hover:scale-105">
							<img 
								src={platformData[i].src} 
								alt={platformData[i].alt} 
								width={platformData[i].width}
								class="opacity-90"
							/>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		
		<div class="card">
			<h2 class="mb-3 text-xl font-semibold text-[var(--color-primary)]">Description</h2>
			<p class="leading-relaxed text-[var(--color-text-secondary)]">{@html guide.description}</p>
		</div>
	</header>

	<div class="space-y-8">
		{#if guide.platforms[0]}
			<div class="card">
				{#if guide.platforms[1] || guide.platforms[2] || guide.platforms[3]}
					<h1>Windows Guide</h1>
				{/if}
				<ol class="ml-5 space-y-2">
					{#each guide.windowsSteps as step, index}
						<li>
							<div class="flex items-center gap-2">
								<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
									{index + 1}
								</span>
								{@html step}
							</div>
						</li>
						{#if index < guide.windowsSteps.length - 1}
							<hr class="text-gray-400" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[1]}
			<div class="card">
				{#if guide.platforms[0] || guide.platforms[2] || guide.platforms[3]}
					<h1>iPhone Guide</h1>
				{/if}
				<ol class="ml-5 space-y-2">
					{#each guide.appleSteps as step, index}
						<li>
							<div class="flex items-center gap-2">
								<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
									{index + 1}
								</span>
								{@html step}
							</div>
						</li>
						{#if index < guide.appleSteps.length - 1}
							<hr class="text-gray-400" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[2]}
			<div class="card">
				{#if guide.platforms[0] || guide.platforms[1] || guide.platforms[3]}
					<h1>Android Guide</h1>
				{/if}
				<ol class="ml-5 space-y-2">
					{#each guide.androidSteps as step, index}
						<li>
							<div class="flex items-center">
								<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
									{index + 1}
								</span>
								{@html step}
							</div>
						</li>
						{#if index < guide.androidSteps.length - 1}
							<hr class="text-gray-400" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[3]}
			<div class="card">
				{#if guide.platforms[0] || guide.platforms[1] || guide.platforms[2]}
					<h1>Fire TV Guide</h1>
				{/if}
				<ol class="ml-5 space-y-2">
					{#each guide.fireTVSteps as step, index}
						<li>
							<div class="flex items-center gap-2">
								<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
									{index + 1}
								</span>
								{@html step}
							</div>
						</li>
						{#if index < guide.fireTVSteps.length - 1}
							<hr class="text-gray-400" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</main>

<style>
	:global(.card) {
		margin-bottom: 3vh;
	}

	:global(li) {
		margin: 1vh 0 1vh 0;
	}

	:global(span) {
		margin-right: 0.5vw;
	}
</style>