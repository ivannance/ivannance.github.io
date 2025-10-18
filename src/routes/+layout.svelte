<script lang="ts">
	import '../app.css';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<nav>
	<div class="nav-content">
		<div class="logo">Ivan's World</div>
		
		<!-- Hamburger menu button for mobile -->
		<button class="menu-toggle" onclick={toggleMenu} aria-label="Toggle menu">
			<span class:open={mobileMenuOpen}></span>
			<span class:open={mobileMenuOpen}></span>
			<span class:open={mobileMenuOpen}></span>
		</button>

		<div class="nav-links" class:open={mobileMenuOpen}>
			<a href="/" onclick={closeMenu}>Home</a>
			<a href="/guides" onclick={closeMenu}>Guides</a>
			<a href="/fun" onclick={closeMenu}>Fun</a>
			<a href="/other" onclick={closeMenu}>Other</a>
		</div>
	</div>
</nav>

<!-- Overlay for mobile menu -->
{#if mobileMenuOpen}
	<div class="overlay" onclick={closeMenu}></div>
{/if}

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
		z-index: 1001;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1005;
	}

	.menu-toggle span {
		width: 25px;
		height: 3px;
		background: var(--color-text);
		border-radius: 3px;
		transition: all 0.3s ease;
	}

	.menu-toggle span.open:nth-child(1) {
		transform: rotate(45deg) translateY(8px);
	}

	.menu-toggle span.open:nth-child(2) {
		opacity: 0;
	}

	.menu-toggle span.open:nth-child(3) {
		transform: rotate(-45deg) translateY(-8px);
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

	.overlay {
		display: none;
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

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.nav-content {
			padding: 0 var(--spacing-md);
		}

		.logo {
			font-size: 1.25rem;
		}

		.menu-toggle {
			display: flex;
		}

		.nav-links {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: 60%;
			max-width: 300px;
			background: var(--color-surface);
			border-left: 1px solid var(--color-border);
			flex-direction: column;
			gap: 0;
			padding: 5rem var(--spacing-lg) var(--spacing-lg);
			transition: right 0.3s ease;
			box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
			z-index: 1002;
		}

		.nav-links.open {
			right: 0;
		}

		.nav-links a {
			padding: var(--spacing-md);
			width: 100%;
			text-align: left;
			font-size: 1.125rem;
			border-radius: var(--radius-sm);
		}

		.nav-links a::after {
			display: none;
		}

		.nav-links a:hover {
			background: var(--color-surface-elevated);
		}

		.overlay {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
			animation: fadeIn 0.3s ease;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}

		main {
			padding: var(--spacing-lg) var(--spacing-md);
			min-height: calc(100vh - 150px);
		}

		footer {
			padding: var(--spacing-md);
			font-size: 0.875rem;
			margin-top: var(--spacing-lg);
		}
	}

	/* Tablet adjustments */
	@media only screen and (min-width: 768px) and (max-width: 1024px) {
		.nav-content {
			padding: 0 var(--spacing-md);
		}

		.nav-links {
			gap: var(--spacing-sm);
		}

		.nav-links a {
			padding: var(--spacing-sm);
			font-size: 0.9375rem;
		}

		main {
			padding: var(--spacing-lg) var(--spacing-md);
		}
	}
</style>