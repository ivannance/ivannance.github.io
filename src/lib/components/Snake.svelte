<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabase';

	let playerName = '';
	let leaderboard: any[] = [];
	let showNamePrompt = false;
	let isSubmitting = false;
	let hasSubmittedScore = false;

	async function loadLeaderboard() {
		const { data, error } = await supabase
			.from('snake_leaderboard')
			.select('*')
			.order('score', { ascending: false })
			.limit(20);

		if (error) {
			console.error('Error loading leaderboard:', error);
		} else {
			leaderboard = data || [];
		}
	}

	async function submitScore() {
		if (!playerName.trim() || score <= 0 || isSubmitting) return;

		isSubmitting = true;
		const trimmedName = playerName.trim();

		try {
			try {
				localStorage.setItem('snakePlayerName', trimmedName);
			} catch (err) {
				console.warn('Could not save to localStorage:', err);
			}

			const { error } = await supabase.from('snake_leaderboard').insert({
				player_name: trimmedName,
				score: score
			});

			if (error) {
				console.error('Error submitting score:', error);
				alert('Failed to submit score. Please try again.');
			} else {
				hasSubmittedScore = true;
				showNamePrompt = false;
				await loadLeaderboard();
			}
		} catch (err) {
			console.error('Unexpected error:', err);
			alert('Failed to submit score. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}

	function handleGameOver() {
		if (score > 0 && !hasSubmittedScore) {
			// Check if this score would make the leaderboard
			const wouldMakeLeaderboard =
				leaderboard.length < 20 || score > leaderboard[leaderboard.length - 1]?.score;

			if (wouldMakeLeaderboard) {
				try {
					const savedName = localStorage.getItem('snakePlayerName');
					if (savedName) {
						playerName = savedName;
					}
				} catch (err) {
					console.warn('Could not read from localStorage:', err);
				}
				showNamePrompt = true;
			}
		}
	}

	const rows = 12;
	const cols = 12;
	let snakeCoords: string[] = ['5_5'];
	let appleCoords = '';
	let dirX = 0;
	let dirY = 0;
	let speed = 70;
	let lastTime = 0;
	let dieFromWalls = true;
	let grid: string[][] = [];
	let containerSize = 0;
	let score = 0;
	let gameOver = false;
	let isMobile = false;
	let inputQueue: [number, number][] = [];

	let navElement: HTMLElement | null = null;
	let navHeight = 0;

	// Touch controls
	let touchStartX = 0;
	let touchStartY = 0;

	for (let r = 0; r < rows; r++) {
		grid[r] = [];
		for (let c = 0; c < cols; c++) {
			grid[r][c] = '';
		}
	}

	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function placeApple() {
		let newApple: string;
		do {
			newApple = `${getRandomInt(0, cols - 1)}_${getRandomInt(0, rows - 1)}`;
		} while (snakeCoords.includes(newApple));
		appleCoords = newApple;
	}

	function setCellColor(coord: string, color: string) {
		const [x, y] = coord.split('_').map(Number);
		grid[y][x] = color;
	}

	function isReversing(newDirX: number, newDirY: number): boolean {
		if (snakeCoords.length <= 1) return false;

		const [headX, headY] = snakeCoords[0].split('_').map(Number);
		const newHeadX = headX + newDirX;
		const newHeadY = headY + newDirY;
		const [secondX, secondY] = snakeCoords[1].split('_').map(Number);

		return newHeadX === secondX && newHeadY === secondY;
	}

	function update() {
		if (gameOver) return false;

		// Process queued input
		if (inputQueue.length > 0) {
			const [x, y] = inputQueue.shift()!;
			dirX = x;
			dirY = y;
		}

		let [headX, headY] = snakeCoords[0].split('_').map(Number);
		headX += dirX;
		headY += dirY;

		if (dieFromWalls) {
			if (headX < 0 || headX >= cols || headY < 0 || headY >= rows) {
				gameOver = true;
				handleGameOver();
				return false;
			}
		} else {
			headX = (headX + cols) % cols;
			headY = (headY + rows) % rows;
		}

		const newHead = `${headX}_${headY}`;
		if (snakeCoords.includes(newHead) && snakeCoords.length > 1) {
			gameOver = true;
			handleGameOver();
			return false;
		}

		snakeCoords.unshift(newHead);

		if (newHead === appleCoords) {
			score++;
			placeApple();
		} else {
			setCellColor(snakeCoords.pop()!, '');
		}

		setCellColor(newHead, 'lime');
		setCellColor(appleCoords, 'red');

		return true;
	}

	function reset() {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				grid[row][col] = '';
			}
		}
		snakeCoords = ['5_5'];
		appleCoords = '';
		dirX = dirY = 0;
		score = 0;
		gameOver = false;
		hasSubmittedScore = false;
		showNamePrompt = false;
		inputQueue = [];
		placeApple();
		setCellColor(appleCoords, 'red');
		setCellColor('5_5', 'lime');
		lastTime = 0;
		requestAnimationFrame(loop);
	}

	function handleKey(e: KeyboardEvent) {
		// Don't handle game controls if user is typing in an input field
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
			return;
		}

		const keyMap: Record<string, [number, number]> = {
			w: [0, -1],
			ArrowUp: [0, -1],
			a: [-1, 0],
			ArrowLeft: [-1, 0],
			s: [0, 1],
			ArrowDown: [0, 1],
			d: [1, 0],
			ArrowRight: [1, 0]
		};

		if (e.key === ' ') {
			e.preventDefault();
			reset();
			return;
		}

		if (keyMap[e.key]) {
			e.preventDefault();
			const [x, y] = keyMap[e.key];

			if (isReversing(x, y)) {
				return;
			}

			// Add to queue instead of immediately setting (max 2 inputs queued)
			if (inputQueue.length < 2) {
				inputQueue.push([x, y]);
			}
		}
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		const touchEndX = e.changedTouches[0].clientX;
		const touchEndY = e.changedTouches[0].clientY;

		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;

		const minSwipeDistance = 30;

		if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
			return;
		}

		let newDirX = dirX;
		let newDirY = dirY;

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			newDirX = deltaX > 0 ? 1 : -1;
			newDirY = 0;
		} else {
			newDirX = 0;
			newDirY = deltaY > 0 ? 1 : -1;
		}

		if (isReversing(newDirX, newDirY)) {
			return;
		}

		// Add to queue for touch controls too
		if (inputQueue.length < 2) {
			inputQueue.push([newDirX, newDirY]);
		}
	}

	function loop(timestamp: number) {
		if (timestamp - lastTime >= speed) {
			lastTime = timestamp;
			if (!update()) return;
		}
		requestAnimationFrame(loop);
	}

	function resizeGrid() {
		const foundNav = document.querySelector('nav');
		if (foundNav) {
			navElement = foundNav as HTMLElement;
			navHeight = navElement.offsetHeight;
		} else {
			navHeight = 0;
		}

		const availableHeight = window.innerHeight - navHeight - 250;
		const availableWidth = window.innerWidth - 32;
		const size = Math.min(availableWidth, availableHeight);
		containerSize = Math.max(280, size);

		isMobile = window.innerWidth <= 767;
	}

	onMount(() => {
		placeApple();
		setCellColor(appleCoords, 'red');
		setCellColor('5_5', 'lime');
		window.addEventListener('keydown', handleKey);
		window.addEventListener('resize', resizeGrid);
		resizeGrid();
		requestAnimationFrame(loop);
		loadLeaderboard();
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKey);
		window.removeEventListener('resize', resizeGrid);
	});
</script>

<div class="snake-game-container">
	<div class="game-header">
		<div class="score-display card">
			<span class="score-label">Score:</span>
			<span class="score-value">{score}</span>
		</div>
		{#if gameOver}
			<div class="game-over-banner">Game Over!</div>
		{/if}
	</div>

	<div class="snake-grid-wrapper" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
		<div id="snake-grid" style="width: {containerSize}px; height: {containerSize}px;">
			{#each grid as row, y}
				{#each row as color, x}
					<div class="snake-cell" style="background-color: {color};" id="{x}_{y}"></div>
				{/each}
			{/each}
		</div>
	</div>

	{#if showNamePrompt}
		<div class="name-prompt card">
			<h3>🎉 Great Score!</h3>
			<p>Enter your name for the leaderboard:</p>
			<form on:submit|preventDefault={submitScore}>
				<input
					type="text"
					bind:value={playerName}
					placeholder="Your name"
					maxlength="20"
					required
					disabled={isSubmitting}
				/>
				<div class="button-group">
					<button
						type="submit"
						class="button-primary"
						disabled={isSubmitting || !playerName.trim()}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Score'}
					</button>
					<button
						type="button"
						class="button-secondary"
						on:click={() => (showNamePrompt = false)}
						disabled={isSubmitting}
					>
						Skip
					</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="controls-section">
		{#if isMobile}
			<p class="controls-hint">Swipe to control</p>
		{:else}
			<p class="controls-hint">Use WASD or arrow keys to control the snake</p>
		{/if}

		<button class="button-primary reset-btn" on:click={reset}>
			{gameOver ? 'Play Again' : 'Reset Game'}
		</button>
	</div>

	<!-- Leaderboard Section -->
	<div class="leaderboard-section">
		<h2 class="leaderboard-title">🏆 Top Players</h2>

		{#if leaderboard.length === 0}
			<div class="empty-leaderboard card">
				<p>No scores yet. Be the first to make the leaderboard!</p>
			</div>
		{:else}
			<div class="leaderboard-list">
				{#each leaderboard as entry, index}
					<div class="leaderboard-entry card" class:top-three={index < 3}>
						<div class="rank">
							{#if index === 0}
								🥇
							{:else if index === 1}
								🥈
							{:else if index === 2}
								🥉
							{:else}
								<span class="rank-number">#{index + 1}</span>
							{/if}
						</div>
						<div class="player-name">{entry.player_name}</div>
						<div class="player-score">{entry.score}</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.snake-game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg) var(--spacing-md);
		max-width: 800px;
		margin: 0 auto;
	}

	.game-header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
	}

	.score-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		border: 2px solid var(--color-primary);
		min-width: 150px;
		justify-content: center;
	}

	.score-label {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.score-value {
		font-size: 1.75rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.game-over-banner {
		padding: var(--spacing-md) var(--spacing-xl);
		background: linear-gradient(135deg, var(--color-error), #dc2626);
		color: white;
		font-size: 1.5rem;
		font-weight: 700;
		border-radius: var(--radius-lg);
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
		animation: bounceIn 0.5s ease;
	}

	@keyframes bounceIn {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.snake-grid-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		touch-action: none;
	}

	#snake-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(12, 1fr);
		aspect-ratio: 1;
		border: 3px solid var(--color-primary);
		border-radius: var(--radius-md);
		box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
		background: var(--color-background);
		overflow: hidden;
	}

	.snake-cell {
		background-color: var(--color-surface);
		border: 0.5px solid rgba(99, 102, 241, 0.2);
		transition: background-color 0.1s ease;
	}

	/* Name Prompt Styles */
	.name-prompt {
		width: 100%;
		max-width: 400px;
		padding: var(--spacing-lg);
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		border: 2px solid var(--color-primary);
		animation: slideIn 0.3s ease;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.name-prompt h3 {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: 1.5rem;
		text-align: center;
		color: var(--color-text);
	}

	.name-prompt p {
		margin: 0 0 var(--spacing-md) 0;
		text-align: center;
		color: var(--color-text-secondary);
	}

	.name-prompt form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.name-prompt input {
		padding: var(--spacing-md);
		font-size: 1rem;
		border: 2px solid var(--color-border-light);
		border-radius: var(--radius-md);
		background: var(--color-background);
		color: var(--color-text);
		transition: border-color 0.2s ease;
	}

	.name-prompt input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.name-prompt input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.button-group {
		display: flex;
		gap: var(--spacing-sm);
	}

	.button-group button {
		flex: 1;
		padding: var(--spacing-md);
		font-size: 1rem;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s ease;
		font-weight: 600;
	}

	.button-primary {
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		color: white;
	}

	.button-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
	}

	.button-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	.button-secondary {
		background: var(--color-surface);
		color: var(--color-text);
		border: 2px solid var(--color-border-light);
	}

	.button-secondary:hover:not(:disabled) {
		background: var(--color-surface-elevated);
	}

	.controls-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
	}

	.touch-controls {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: var(--spacing-md);
	}

	.reset-btn {
		min-width: 200px;
		font-size: 1.125rem;
		padding: var(--spacing-md) var(--spacing-xl);
	}

	/* Leaderboard Styles */
	.leaderboard-section {
		width: 100%;
		max-width: 500px;
		margin-top: var(--spacing-lg);
	}

	.leaderboard-title {
		text-align: center;
		font-size: 1.75rem;
		font-weight: 700;
		margin: 0 0 var(--spacing-lg) 0;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.empty-leaderboard {
		padding: var(--spacing-xl);
		text-align: center;
		background: var(--color-surface);
		border: 2px solid var(--color-border-light);
	}

	.empty-leaderboard p {
		margin: 0;
		color: var(--color-text-secondary);
	}

	.leaderboard-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.leaderboard-entry {
		display: grid;
		grid-template-columns: 50px 1fr auto;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-surface);
		border: 2px solid var(--color-border-light);
		transition: all 0.2s ease;
	}

	.leaderboard-entry:hover {
		background: var(--color-surface-elevated);
		transform: translateX(4px);
	}

	.leaderboard-entry.top-three {
		border-color: var(--color-primary);
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
	}

	.rank {
		font-size: 1.5rem;
		text-align: center;
		font-weight: 700;
	}

	.rank-number {
		font-size: 1rem;
		color: var(--color-text-secondary);
	}

	.player-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.player-score {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		min-width: 50px;
		text-align: right;
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.snake-game-container {
			gap: var(--spacing-md);
			padding: var(--spacing-md) var(--spacing-sm);
		}

		.score-display {
			gap: var(--spacing-sm);
			padding: var(--spacing-sm) var(--spacing-md);
			min-width: 120px;
		}

		.score-label {
			font-size: 1rem;
		}

		.score-value {
			font-size: 1.5rem;
		}

		.game-over-banner {
			font-size: 1.25rem;
			padding: var(--spacing-sm) var(--spacing-lg);
		}

		#snake-grid {
			border-width: 2px;
		}

		.name-prompt {
			padding: var(--spacing-md);
		}

		.name-prompt h3 {
			font-size: 1.25rem;
		}

		.controls-hint {
			font-size: 0.9375rem;
		}

		.reset-btn {
			min-width: 160px;
			font-size: 1rem;
			padding: var(--spacing-sm) var(--spacing-lg);
		}

		.leaderboard-title {
			font-size: 1.5rem;
		}

		.leaderboard-entry {
			grid-template-columns: 40px 1fr auto;
			gap: var(--spacing-sm);
			padding: var(--spacing-sm) var(--spacing-md);
		}

		.rank {
			font-size: 1.25rem;
		}

		.player-name {
			font-size: 1rem;
		}

		.player-score {
			font-size: 1.125rem;
		}
	}

	/* Small Mobile */
	@media only screen and (max-width: 480px) {
		.score-label {
			font-size: 0.9375rem;
		}

		.score-value {
			font-size: 1.375rem;
		}

		.game-over-banner {
			font-size: 1.125rem;
		}

		.leaderboard-entry {
			padding: var(--spacing-sm);
		}

		.player-name {
			font-size: 0.9375rem;
		}

		.player-score {
			font-size: 1rem;
		}
	}
</style>
