<script>
	const games = [{ name: 'Snake', path: '/fun/snake', color: 'green' }];
</script>

<svelte:head>
	<title>Ivan's Playground</title>
</svelte:head>

<div class="arcade-page">
	<header class="arcade-header">
		<h1 class="arcade-title">Game Arcade!</h1>
		<p class="arcade-subtitle">Choose your adventure</p>
	</header>

	<div class="games-grid">
		{#each games as game}
			<a href={game.path} class="game-card card">
				<div class="game-icon" style="--game-color: {game.color}">
					<svg 
						class="icon-svg" 
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							stroke-width="2" 
							d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
						/>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							stroke-width="2" 
							d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 class="game-name">{game.name}</h2>
				<p class="game-cta">Click to play!</p>
				<div class="game-shine"></div>
			</a>
		{/each}
	</div>
</div>

<style>
	.arcade-page {
		max-width: 1400px;
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

	.arcade-header {
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

	.arcade-title {
		font-size: 3.5rem;
		font-weight: 800;
		margin-bottom: var(--spacing-sm);
		background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradientShift 3s ease infinite;
		letter-spacing: -0.02em;
	}

	@keyframes gradientShift {
		0%, 100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}

	.arcade-subtitle {
		font-size: 1.25rem;
		color: var(--color-text-secondary);
		font-weight: 500;
		animation: fadeIn 1s ease 0.3s both;
	}

	.games-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-xl);
	}

	.game-card {
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		cursor: pointer;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
	}

	.game-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 0;
	}

	.game-card:hover::before {
		opacity: 0.1;
	}

	.game-card:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.3);
		border-color: var(--color-primary);
	}

	.game-shine {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			45deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			transparent
		);
		transform: rotate(45deg);
		transition: all 0.6s ease;
		pointer-events: none;
	}

	.game-card:hover .game-shine {
		left: 100%;
	}

	.game-icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		position: relative;
		z-index: 1;
	}

	.game-card:hover .game-icon {
		transform: scale(1.15) rotate(10deg);
		box-shadow: 0 15px 40px rgba(99, 102, 241, 0.6);
	}

	.icon-svg {
		width: 48px;
		height: 48px;
		color: white;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.game-name {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0;
		position: relative;
		z-index: 1;
		transition: color 0.3s ease;
	}

	.game-card:hover .game-name {
		color: var(--color-primary);
	}

	.game-cta {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin: 0;
		position: relative;
		z-index: 1;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.game-card:hover .game-cta {
		color: var(--color-text);
		transform: translateY(-2px);
	}

	/* Desktop - 4 columns for many games */
	@media only screen and (min-width: 1200px) {
		.games-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	/* Tablet - 3 columns */
	@media only screen and (min-width: 768px) and (max-width: 1199px) {
		.games-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-lg);
		}

		.arcade-title {
			font-size: 2.75rem;
		}

		.arcade-subtitle {
			font-size: 1.125rem;
		}

		.game-icon {
			width: 70px;
			height: 70px;
		}

		.icon-svg {
			width: 42px;
			height: 42px;
		}

		.game-name {
			font-size: 1.75rem;
		}
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.arcade-page {
			padding: 0;
		}

		.arcade-header {
			margin-bottom: var(--spacing-lg);
			padding: 0 var(--spacing-sm);
		}

		.arcade-title {
			font-size: 2.25rem;
		}

		.arcade-subtitle {
			font-size: 1rem;
		}

		.games-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-sm);
		}

		.game-card {
			gap: var(--spacing-sm);
		}

		.game-card:hover {
			transform: none;
		}

		.game-card:active {
			transform: scale(0.95);
		}

		.game-card:hover .game-icon {
			transform: scale(1.05);
		}

		.game-icon {
			width: 60px;
			height: 60px;
		}

		.icon-svg {
			width: 36px;
			height: 36px;
		}

		.game-name {
			font-size: 1.5rem;
		}

		.game-cta {
			font-size: 1rem;
		}

		.game-card:hover .game-cta {
			transform: none;
		}
	}

	/* Small Mobile - 1 column */
	@media only screen and (max-width: 480px) {
		.arcade-title {
			font-size: 2rem;
		}

		.arcade-subtitle {
			font-size: 0.9375rem;
		}

		.games-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin: 0 auto;
		}

		.game-card {
			max-height: 400px;
		}

		.game-icon {
			width: 70px;
			height: 70px;
		}

		.icon-svg {
			width: 42px;
			height: 42px;
		}

		.game-name {
			font-size: 1.75rem;
		}

		.game-cta {
			font-size: 1.0625rem;
		}
	}
</style>