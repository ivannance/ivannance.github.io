<script>
	// Add your content items here when ready
	// Example structure:
	// const items = [
	//   { title: 'Item 1', description: 'Description', link: '/other/item1', icon: '📝' },
	//   { title: 'Item 2', description: 'Description', link: '/other/item2', icon: '🎨' },
	// ];
	const items = [];
</script>

<svelte:head>
	<title>Ivan's Junk Drawer</title>
</svelte:head>

<div class="other-page">
	<header class="page-header">
		<h1 class="page-title">Random stuff that doesn't fit anywhere else...</h1>
		<p class="page-subtitle">The miscellaneous collection</p>
	</header>

	{#if items.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📦</div>
			<h2 class="empty-title">Coming Soon!</h2>
			<p class="empty-description">
				This space is reserved for all the cool random stuff that doesn't quite fit in the other categories.
				Check back later!
			</p>
			<div class="decoration-dots">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
		</div>
	{:else}
		<div class="items-grid">
			{#each items as item}
				<a href={item.link} class="item-card card">
					<div class="item-icon">{item.icon}</div>
					<div class="item-content">
						<h3 class="item-title">{item.title}</h3>
						<p class="item-description">{item.description}</p>
					</div>
					<div class="item-arrow">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.other-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-md);
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

	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
		animation: slideDown 0.8s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: var(--spacing-sm);
		line-height: 1.3;
	}

	.page-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		font-style: italic;
		margin: 0;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--spacing-xl);
		min-height: 400px;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.empty-icon {
		font-size: 6rem;
		margin-bottom: var(--spacing-lg);
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	.empty-title {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: var(--spacing-md);
	}

	.empty-description {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		max-width: 600px;
		line-height: 1.8;
		margin: 0;
	}

	.decoration-dots {
		display: flex;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-lg);
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--color-primary);
		animation: pulse 1.5s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}

	/* Grid for when content exists */
	.items-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.item-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.item-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		transform: scaleY(0);
		transition: transform 0.3s ease;
	}

	.item-card:hover::before {
		transform: scaleY(1);
	}

	.item-card:hover {
		transform: translateX(8px);
		border-color: var(--color-primary);
	}

	.item-icon {
		font-size: 3rem;
		flex-shrink: 0;
		transition: transform 0.3s ease;
	}

	.item-card:hover .item-icon {
		transform: scale(1.1) rotate(5deg);
	}

	.item-content {
		flex: 1;
	}

	.item-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 var(--spacing-xs) 0;
		line-height: 1.3;
	}

	.item-description {
		font-size: 1rem;
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	.item-arrow {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		color: var(--color-text-muted);
		transition: all 0.3s ease;
	}

	.item-card:hover .item-arrow {
		color: var(--color-primary);
		transform: translateX(4px);
	}

	/* Tablet Styles */
	@media only screen and (max-width: 1024px) {
		.page-title {
			font-size: 2rem;
		}

		.page-subtitle {
			font-size: 1.125rem;
		}

		.empty-icon {
			font-size: 5rem;
		}

		.empty-title {
			font-size: 2rem;
		}

		.empty-description {
			font-size: 1.125rem;
		}

		.items-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: var(--spacing-md);
		}
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.other-page {
			padding: 0;
		}

		.page-header {
			margin-bottom: var(--spacing-lg);
			padding: 0 var(--spacing-sm);
		}

		.page-title {
			font-size: 1.75rem;
		}

		.page-subtitle {
			font-size: 1rem;
		}

		.empty-state {
			padding: var(--spacing-lg) var(--spacing-md);
			min-height: 350px;
		}

		.empty-icon {
			font-size: 4rem;
			margin-bottom: var(--spacing-md);
		}

		.empty-title {
			font-size: 1.75rem;
		}

		.empty-description {
			font-size: 1rem;
			line-height: 1.6;
		}

		.decoration-dots {
			margin-top: var(--spacing-md);
		}

		.dot {
			width: 10px;
			height: 10px;
		}

		.items-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}

		.item-card {
			padding: var(--spacing-md);
		}

		.item-card:hover {
			transform: none;
		}

		.item-card:active {
			transform: scale(0.98);
		}

		.item-icon {
			font-size: 2.5rem;
		}

		.item-title {
			font-size: 1.25rem;
		}

		.item-description {
			font-size: 0.9375rem;
		}
	}

	/* Small Mobile Styles */
	@media only screen and (max-width: 480px) {
		.page-title {
			font-size: 1.5rem;
		}

		.page-subtitle {
			font-size: 0.9375rem;
		}

		.empty-icon {
			font-size: 3.5rem;
		}

		.empty-title {
			font-size: 1.5rem;
		}

		.empty-description {
			font-size: 0.9375rem;
		}

		.item-icon {
			font-size: 2rem;
		}

		.item-title {
			font-size: 1.125rem;
		}

		.item-description {
			font-size: 0.875rem;
		}
	}
</style>