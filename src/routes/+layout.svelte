<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<div class="nav-content">
		<div class="logo">Ivan's World</div>
		<div class="nav-links">
			<a href="/">Home</a>
			<a href="/guides">Guides</a>
			<a href="/fun">Fun</a>
			<a href="/other">Other</a>
		</div>
	</div>
</nav>

<main>
	{@render children?.()}
</main>

<footer>
	<p>&copy; 2025 Ivan Nance. All rights reserved.</p>
</footer>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 1000;
		background: rgba(22, 33, 62, 0.8);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
		padding: var(--spacing-md) 0;
		transition: all 0.3s ease;
	}

	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.nav-links {
		display: flex;
		gap: var(--spacing-md);
	}

	.nav-links a {
		color: var(--color-text);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-md);
		transition: all 0.2s;
		position: relative;
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		transition: width 0.3s;
	}

	.nav-links a:hover {
		background: var(--color-surface);
		color: var(--color-primary);
	}

	.nav-links a:hover::after {
		width: 80%;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-xl) var(--spacing-lg);
		min-height: calc(100vh - 200px);
	}

	footer {
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		color: var(--color-text-secondary);
		text-align: center;
		padding: var(--spacing-lg);
		margin-top: var(--spacing-xl);
	}
</style>
