<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

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

	function update() {
		if (gameOver) return false;

		let [headX, headY] = snakeCoords[0].split('_').map(Number);
		headX += dirX;
		headY += dirY;

		if (dieFromWalls) {
			if (headX < 0 || headX >= cols || headY < 0 || headY >= rows) {
				gameOver = true;
				return false;
			}
		} else {
			headX = (headX + cols) % cols;
			headY = (headY + rows) % rows;
		}

		const newHead = `${headX}_${headY}`;
		if (snakeCoords.includes(newHead) && snakeCoords.length > 1) {
			gameOver = true;
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
		placeApple();
		setCellColor(appleCoords, 'red');
		setCellColor('5_5', 'lime');
		lastTime = 0;
		requestAnimationFrame(loop);
	}

	function handleKey(e: KeyboardEvent) {
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
			if (snakeCoords.length === 1 || (dirX !== -x && dirY !== -y)) {
				dirX = x;
				dirY = y;
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
			// Horizontal swipe
			newDirX = deltaX > 0 ? 1 : -1;
			newDirY = 0;
		} else {
			// Vertical swipe
			newDirX = 0;
			newDirY = deltaY > 0 ? 1 : -1;
		}

		// Don't allow reversing direction
		if (snakeCoords.length === 1 || (dirX !== -newDirX && dirY !== -newDirY)) {
			dirX = newDirX;
			dirY = newDirY;
		}
	}

	function handleButtonPress(x: number, y: number) {
		if (snakeCoords.length === 1 || (dirX !== -x && dirY !== -y)) {
			dirX = x;
			dirY = y;
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

		const availableHeight = window.innerHeight - navHeight - 250; // Space for controls
		const availableWidth = window.innerWidth - 32; // 16px padding each side
		const size = Math.min(availableWidth, availableHeight);
		containerSize = Math.max(280, size); // Minimum 280px

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

	<div class="controls-section">
		{#if isMobile}
			<div class="touch-controls">
				<div class="d-pad">
					<button class="d-pad-btn up" on:click={() => handleButtonPress(0, -1)}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 15l7-7 7 7"
							/>
						</svg>
					</button>
					<div class="d-pad-middle">
						<button class="d-pad-btn left" on:click={() => handleButtonPress(-1, 0)}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button class="d-pad-btn right" on:click={() => handleButtonPress(1, 0)}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
					<button class="d-pad-btn down" on:click={() => handleButtonPress(0, 1)}>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
				</div>
			</div>
			<p class="controls-hint">Swipe or use buttons to control</p>
		{:else}
			<p class="controls-hint">Use WASD or arrow keys to control the snake</p>
		{/if}

		<button class="button-primary reset-btn" on:click={reset}>
			{gameOver ? 'Play Again' : 'Reset Game'}
		</button>
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

	.d-pad {
		display: grid;
		grid-template-rows: auto auto auto;
		gap: 4px;
		width: 180px;
	}

	.d-pad-middle {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 4px;
	}

	.d-pad-btn {
		width: 100%;
		height: 56px;
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		border: 2px solid var(--color-border-light);
		border-radius: var(--radius-md);
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		touch-action: manipulation;
	}

	.d-pad-btn:active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		transform: scale(0.95);
		box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
	}

	.d-pad-btn svg {
		width: 32px;
		height: 32px;
	}

	.d-pad-btn.up {
		grid-column: 2;
	}

	.d-pad-btn.down {
		grid-column: 2;
	}

	.d-pad-btn.left {
		grid-column: 1;
	}

	.d-pad-btn.right {
		grid-column: 3;
	}

	.controls-hint {
		text-align: center;
		color: var(--color-text-secondary);
		font-size: 1rem;
		margin: 0;
	}

	.reset-btn {
		min-width: 200px;
		font-size: 1.125rem;
		padding: var(--spacing-md) var(--spacing-xl);
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

		.d-pad {
			width: 160px;
		}

		.d-pad-btn {
			height: 50px;
		}

		.d-pad-btn svg {
			width: 28px;
			height: 28px;
		}

		.controls-hint {
			font-size: 0.9375rem;
		}

		.reset-btn {
			min-width: 160px;
			font-size: 1rem;
			padding: var(--spacing-sm) var(--spacing-lg);
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

		.d-pad {
			width: 140px;
		}

		.d-pad-btn {
			height: 44px;
		}

		.d-pad-btn svg {
			width: 24px;
			height: 24px;
		}
	}
</style>
