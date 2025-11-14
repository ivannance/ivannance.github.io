<svelte:head>
	<title>Ivan's World</title>
</svelte:head>

<div class="hero">
	<h1 class="hero-title">Welcome to my site!</h1>
	<h2 class="subtitle">"Apple" - Imaad</h2>
</div>

<div class="content-wrapper">
	<div class="todo-card card">
		<div class="card-header">
			<h2 class="card-title">TO DO LIST</h2>
		</div>

		<ol class="todo-list">
			<li class="todo-item priority">Complete guides</li>
			<li class="todo-item">Add more games</li>
			<li class="todo-item">Game leaderboard</li>
		</ol>

		<div class="card-footer">
			<h3 class="suggestion-text">Got a suggestion for the site?</h3>
			<button
				type="button"
				class="button-primary contact-btn"
				onclick={() => {
					window.open('https://instagram.com/ivanluvswaffles', '_blank');
				}}
			>
				DM @ivanluvswaffles
			</button>
		</div>
	</div>
</div>

<style>
	.hero {
		text-align: center;
		margin-bottom: var(--spacing-sm);
		padding: var(--spacing-lg) 0;
	}

	.hero-title {
		font-size: 3rem;
		margin-bottom: var(--spacing-md);
		animation: fadeInUp 0.6s ease;
	}

	.subtitle {
		color: var(--color-text-secondary);
		font-size: 1.25rem;
		font-weight: 400;
		font-style: italic;
		animation: fadeInUp 0.6s ease 0.2s both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.content-wrapper {
		display: flex;
		justify-content: center;
		padding: 0 var(--spacing-md);
	}

	.todo-card {
		width: 100%;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		animation: fadeIn 0.8s ease 0.4s both;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.card-header {
		text-align: center;
		border-bottom: 2px solid var(--color-border-light);
		padding-bottom: var(--spacing-md);
	}

	.card-title {
		font-size: 1.75rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.todo-list {
		list-style: none;
		counter-reset: todo-counter;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.todo-item {
		counter-increment: todo-counter;
		padding: var(--spacing-md);
		padding-left: 3rem;
		background: var(--color-surface-elevated);
		border-radius: var(--radius-md);
		border-left: 3px solid var(--color-primary);
		position: relative;
		transition: all 0.3s ease;
		font-size: 1.125rem;
		line-height: 1.6;
	}

	.todo-item::before {
		content: counter(todo-counter);
		position: absolute;
		left: var(--spacing-md);
		top: 50%;
		transform: translateY(-50%);
		width: 28px;
		height: 28px;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
	}

	.todo-item.priority {
		border-left-color: var(--color-warning);
		background: linear-gradient(90deg, rgba(245, 158, 11, 0.1), transparent);
	}

	.todo-item.priority::before {
		background: var(--color-warning);
	}

	.todo-item:hover {
		transform: translateX(5px);
		box-shadow: var(--shadow-md);
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-border);
	}

	.suggestion-text {
		font-size: 1.125rem;
		text-align: center;
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.contact-btn {
		width: 100%;
		height: 48px;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		transition: all 0.3s ease;
	}

	.contact-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
	}

	.contact-btn:active {
		transform: scale(0.98);
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.hero {
			margin-bottom: var(--spacing-lg);
			padding: var(--spacing-md) 0;
		}

		.hero-title {
			font-size: 2rem;
			margin-bottom: var(--spacing-sm);
		}

		.subtitle {
			font-size: 1rem;
		}

		.content-wrapper {
			padding: 0;
		}

		.todo-card {
			gap: var(--spacing-md);
		}

		.card-header {
			padding-bottom: var(--spacing-sm);
		}

		.card-title {
			font-size: 1.5rem;
		}

		.todo-list {
			gap: var(--spacing-sm);
		}

		.todo-item {
			padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 2.5rem;
			font-size: 1rem;
		}

		.todo-item::before {
			width: 24px;
			height: 24px;
			font-size: 0.75rem;
			left: var(--spacing-sm);
		}

		.todo-item:hover {
			transform: none;
		}

		.card-footer {
			gap: var(--spacing-sm);
			padding-top: var(--spacing-sm);
		}

		.suggestion-text {
			font-size: 1rem;
		}

		.contact-btn {
			height: 44px;
			font-size: 0.9375rem;
		}

		.contact-btn:hover {
			transform: none;
		}

		.contact-btn:active {
			transform: scale(0.98);
		}
	}

	/* Tablet Styles */
	@media only screen and (min-width: 768px) and (max-width: 1024px) {
		.hero-title {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1.125rem;
		}

		.todo-card {
			max-width: 600px;
		}

		.card-title {
			font-size: 1.625rem;
		}

		.todo-item {
			font-size: 1.0625rem;
		}
	}

	/* Small mobile devices */
	@media only screen and (max-width: 480px) {
		.hero-title {
			font-size: 1.75rem;
		}

		.subtitle {
			font-size: 0.9375rem;
		}

		.card-title {
			font-size: 1.375rem;
		}

		.todo-item {
			font-size: 0.9375rem;
			padding-left: 2.25rem;
		}

		.todo-item::before {
			width: 22px;
			height: 22px;
			font-size: 0.6875rem;
		}

		.suggestion-text {
			font-size: 0.9375rem;
		}
	}
</style>
