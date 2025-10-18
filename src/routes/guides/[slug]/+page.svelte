<script lang="ts">
	import { platformData } from '$lib/data/guides';
	export let data;
	const guide = data.guide;
</script>

<svelte:head>
	<title>{guide.title} - Ivan's Guides</title>
</svelte:head>

<main class="guide-page">
	<header class="guide-header">
		<div class="title-section">
			<h1 class="guide-main-title">{guide.title}</h1>
			<div class="platform-badges">
				{#each guide.platforms as supported, i}
					{#if supported}
						<div class="platform-badge">
							<img 
								src={platformData[i].src} 
								alt={platformData[i].alt} 
								width={platformData[i].width}
								class="platform-badge-img"
							/>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		
		<div class="card description-card">
			<h2 class="description-title">Description</h2>
			<div class="description-text">{@html guide.description}</div>
		</div>
	</header>

	<div class="guides-section">
		{#if guide.platforms[0]}
			<div class="card guide-card">
				{#if guide.platforms[1] || guide.platforms[2] || guide.platforms[3]}
					<h2 class="platform-title">Windows Guide</h2>
				{/if}
				<ol class="steps-list">
					{#each guide.windowsSteps as step, index}
						<li class="step-item">
							<div class="step-content">
								<span class="step-number">{index + 1}</span>
								<div class="step-text">{@html step}</div>
							</div>
						</li>
						{#if index < guide.windowsSteps.length - 1}
							<hr class="step-divider" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[1]}
			<div class="card guide-card">
				{#if guide.platforms[0] || guide.platforms[2] || guide.platforms[3]}
					<h2 class="platform-title">iPhone Guide</h2>
				{/if}
				<ol class="steps-list">
					{#each guide.appleSteps as step, index}
						<li class="step-item">
							<div class="step-content">
								<span class="step-number">{index + 1}</span>
								<div class="step-text">{@html step}</div>
							</div>
						</li>
						{#if index < guide.appleSteps.length - 1}
							<hr class="step-divider" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[2]}
			<div class="card guide-card">
				{#if guide.platforms[0] || guide.platforms[1] || guide.platforms[3]}
					<h2 class="platform-title">Android Guide</h2>
				{/if}
				<ol class="steps-list">
					{#each guide.androidSteps as step, index}
						<li class="step-item">
							<div class="step-content">
								<span class="step-number">{index + 1}</span>
								<div class="step-text">{@html step}</div>
							</div>
						</li>
						{#if index < guide.androidSteps.length - 1}
							<hr class="step-divider" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}

		{#if guide.platforms[3]}
			<div class="card guide-card">
				{#if guide.platforms[0] || guide.platforms[1] || guide.platforms[2]}
					<h2 class="platform-title">Fire TV Guide</h2>
				{/if}
				<ol class="steps-list">
					{#each guide.fireTVSteps as step, index}
						<li class="step-item">
							<div class="step-content">
								<span class="step-number">{index + 1}</span>
								<div class="step-text">{@html step}</div>
							</div>
						</li>
						{#if index < guide.fireTVSteps.length - 1}
							<hr class="step-divider" />
						{/if}
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</main>

<style>
	.guide-page {
		max-width: 900px;
		margin: 0 auto;
		animation: fadeIn 0.6s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.guide-header {
		margin-bottom: var(--spacing-xl);
	}

	.title-section {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.guide-main-title {
		font-size: 3rem;
		font-weight: 700;
		line-height: 1.2;
		flex: 1 1 auto;
		min-width: 300px;
	}

	.platform-badges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.platform-badge {
		padding: var(--spacing-sm);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		transition: all 0.2s ease;
		box-shadow: var(--shadow-sm);
	}

	.platform-badge:hover {
		transform: scale(1.05);
		border-color: var(--color-primary);
	}

	.platform-badge-img {
		display: block;
		opacity: 0.9;
	}

	.description-card {
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		border-left: 4px solid var(--color-primary);
	}

	.description-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--spacing-md);
	}

	.description-text {
		line-height: 1.8;
		color: var(--color-text-secondary);
		font-size: 1.0625rem;
	}

	.guides-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.guide-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
	}

	.platform-title {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 2px solid var(--color-border-light);
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.steps-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.step-item {
		margin: 0;
	}

	.step-content {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		padding: var(--spacing-md) 0;
	}

	.step-number {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		color: white;
		font-weight: 700;
		font-size: 1rem;
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
	}

	.step-text {
		flex: 1;
		line-height: 1.8;
		color: var(--color-text);
		padding-top: 0.375rem;
	}

	.step-text :global(a) {
		color: var(--color-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.step-text :global(a:hover) {
		color: var(--color-secondary);
	}

	.step-text :global(code) {
		background: var(--color-surface-elevated);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
		color: var(--color-accent);
	}

	.step-divider {
		border: none;
		border-top: 1px solid var(--color-border);
		margin: var(--spacing-sm) 0;
		opacity: 0.5;
	}

	/* Tablet Styles */
	@media only screen and (max-width: 1024px) {
		.guide-main-title {
			font-size: 2.5rem;
		}

		.platform-title {
			font-size: 1.75rem;
		}

		.description-text {
			font-size: 1rem;
		}
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.guide-header {
			margin-bottom: var(--spacing-lg);
		}

		.title-section {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.guide-main-title {
			font-size: 1.875rem;
			min-width: unset;
			width: 100%;
		}

		.platform-badges {
			gap: var(--spacing-xs);
			width: 100%;
		}

		.platform-badge {
			padding: var(--spacing-xs);
		}

		.platform-badge:hover {
			transform: none;
		}

		.description-card {
			border-left-width: 3px;
		}

		.description-title {
			font-size: 1.25rem;
			margin-bottom: var(--spacing-sm);
		}

		.description-text {
			font-size: 0.9375rem;
			line-height: 1.6;
		}

		.guides-section {
			gap: var(--spacing-lg);
		}

		.platform-title {
			font-size: 1.5rem;
			margin-bottom: var(--spacing-md);
			padding-bottom: var(--spacing-sm);
		}

		.step-content {
			gap: var(--spacing-sm);
			padding: var(--spacing-sm) 0;
		}

		.step-number {
			width: 32px;
			height: 32px;
			font-size: 0.9375rem;
		}

		.step-text {
			font-size: 0.9375rem;
			line-height: 1.6;
			padding-top: 0.25rem;
		}

		.step-divider {
			margin: var(--spacing-xs) 0;
		}
	}

	/* Small Mobile Styles */
	@media only screen and (max-width: 480px) {
		.guide-main-title {
			font-size: 1.625rem;
		}

		.platform-title {
			font-size: 1.375rem;
		}

		.description-title {
			font-size: 1.125rem;
		}

		.description-text {
			font-size: 0.875rem;
		}

		.step-content {
			gap: var(--spacing-xs);
		}

		.step-number {
			width: 28px;
			height: 28px;
			font-size: 0.875rem;
		}

		.step-text {
			font-size: 0.875rem;
		}

		.step-text :global(code) {
			font-size: 0.8125rem;
		}
	}

	/* Large Desktop */
	@media only screen and (min-width: 1200px) {
		.guide-page {
			max-width: 1000px;
		}

		.guide-main-title {
			font-size: 3.5rem;
		}

		.platform-title {
			font-size: 2.25rem;
		}
	}
</style>