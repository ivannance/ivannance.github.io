<script>
	import Snake from '$lib/components/Snake.svelte';
</script>

<svelte:head>
	<title>Snake - Ivan's Playground</title>
</svelte:head>

<div class="snake-page">
	<header class="page-header">
		<h1 class="page-title">Snake Game</h1>
		<p class="page-description">Classic arcade action - eat apples, avoid walls!</p>
	</header>

	<Snake />
</div>

<style>
	.snake-page {
		max-width: 100%;
		padding: 0;
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-lg);
		padding: 0 var(--spacing-md);
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: var(--spacing-sm);
		background: linear-gradient(135deg, #00ff00, #00aa00);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-description {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin: 0;
	}

	@media only screen and (max-width: 767px) {
		.page-header {
			margin-bottom: var(--spacing-md);
		}

		.page-title {
			font-size: 2rem;
		}

		.page-description {
			font-size: 1rem;
		}
	}

	@media only screen and (max-width: 480px) {
		.page-title {
			font-size: 1.75rem;
		}

		.page-description {
			font-size: 0.9375rem;
		}
	}
</style>