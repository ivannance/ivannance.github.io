<script lang="ts">
	import { platformData } from '$lib/data/guides';

	export let data;
	const guides = data.guides;

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

<div class="page-header">
	<h1 class="page-title">What would you like to learn?</h1>
	<div class="disclaimer">
		<span class="disclaimer-icon">⚠️</span>
		<h2 class="disclaimer-text">THIS IS FOR EDUCATIONAL PURPOSES ONLY</h2>
	</div>
</div>

<div class="guides-container">
	<div class="guides-grid">
		{#each guides as guide}
			{(guide.slug = sanitizeForUrl(guide.title))}

			<a href={`/guides/${guide.slug}`} class="guide-card card">
				<div class="guide-content">
					<div class="guide-title-container">
						<h3 class="guide-title">{guide.title}</h3>
					</div>

					{#await Promise.resolve(platformData.filter((_, i) => guide.platforms[i])) then supported}
						<div class="platforms">
							{#each Array(4) as _, i}
								<div class="platform-icon">
									{#if supported[i]}
										<img
											src={supported[i].src}
											alt={supported[i].alt}
											width={supported[i].width}
											class="platform-img"
										/>
									{/if}
								</div>
							{/each}
						</div>
					{/await}
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
		animation: fadeInDown 0.6s ease;
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.page-title {
		margin-bottom: var(--spacing-lg);
		font-size: 2.5rem;
	}

	.disclaimer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: rgba(239, 68, 68, 0.1);
		border: 2px solid var(--color-error);
		border-radius: var(--radius-lg);
		max-width: 800px;
		margin: 0 auto;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
		}
	}

	.disclaimer-icon {
		font-size: 1.5rem;
		animation: bounce 1s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
	}

	.disclaimer-text {
		color: var(--color-error);
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.guides-container {
		display: flex;
		justify-content: center;
		padding: 0 var(--spacing-md);
	}

	.guides-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 1400px;
	}

	.guide-card {
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		padding: var(--spacing-lg);
		transition: all 0.3s ease;
		cursor: pointer;
		text-decoration: none;
		position: relative;
		overflow: hidden;
	}

	.guide-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.guide-card:hover::before {
		transform: scaleX(1);
	}

	.guide-card:hover {
		transform: translateY(-5px);
		border-color: var(--color-primary);
	}

	.guide-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.guide-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
		line-height: 1.4;
	}

	.platforms {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-xs);
		margin-top: auto;
	}

	.platform-icon {
		flex: 1;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xs);
		border-radius: var(--radius-sm);
		background: var(--color-surface-elevated);
		transition: all 0.2s ease;
	}

	.guide-card:hover .platform-icon {
		background: var(--color-background);
	}

	.platform-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		filter: brightness(0.9);
		transition: filter 0.2s ease;
	}

	.guide-card:hover .platform-img {
		filter: brightness(1.1);
	}

	/* Tablet Styles */
	@media only screen and (max-width: 1024px) {
		.guides-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-md);
		}

		.page-title {
			font-size: 2rem;
		}

		.disclaimer-text {
			font-size: 1.125rem;
		}

		.guide-title {
			font-size: 1.125rem;
		}
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.guide-title-container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.page-header {
			margin-bottom: var(--spacing-lg);
		}

		.page-title {
			font-size: 1.75rem;
			margin-bottom: var(--spacing-md);
			padding: 0 var(--spacing-sm);
		}

		.disclaimer {
			flex-direction: column;
			gap: var(--spacing-xs);
			padding: var(--spacing-sm);
			margin: 0 var(--spacing-sm);
		}

		.disclaimer-icon {
			font-size: 1.25rem;
		}

		.disclaimer-text {
			font-size: 0.875rem;
			text-align: center;
			line-height: 1.4;
		}

		.guides-container {
			padding: 0;
		}

		.guides-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-sm);
		}

		.guide-card {
			padding: var(--spacing-md);
		}

		.guide-card:hover {
			transform: none;
		}

		.guide-card:active {
			transform: scale(0.98);
		}

		.guide-title {
			font-size: 1rem;
			line-height: 1.3;
		}

		.platforms {
			gap: 2px;
		}

		.platform-icon {
			padding: 2px;
			border-radius: 4px;
		}
	}

	/* Small Mobile Styles */
	@media only screen and (max-width: 480px) {
		.page-title {
			font-size: 1.5rem;
		}

		.disclaimer-text {
			font-size: 0.75rem;
		}

		.guides-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}

		.guide-card {
			max-width: 400px;
			margin: 0 auto;
			width: 100%;
		}

		.guide-title {
			font-size: 1.125rem;
		}

		.platform-icon {
			padding: var(--spacing-xs);
		}
	}

	/* Large Desktop */
	@media only screen and (min-width: 1400px) {
		.guides-grid {
			gap: var(--spacing-xl);
		}

		.guide-card {
			padding: var(--spacing-xl);
		}

		.guide-title {
			font-size: 1.5rem;
		}
	}
</style>
