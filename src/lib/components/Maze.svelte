<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Types
	type Position = { row: number; col: number };
	type Direction = { dr: number; dc: number; wr: number; wc: number; name: string };

	// Game state
	let mazeLevel: number = 5;
	let currentLevel: number = 1;
	let mazeRows: number = mazeLevel;
	let mazeCols: number = mazeLevel;
	let mazeCellSize: number = 320 / mazeRows;
	let mazeStatus: string = 'made';
	let isMobile: boolean = false;
	let boardSize: number = 320;

	// Touch controls
	let touchStartX: number = 0;
	let touchStartY: number = 0;

	// Colors
	const COLORS = {
		background: 'rgb(0, 0, 0)',
		wall: 'rgb(255, 255, 255)',
		path: 'rgb(57, 255, 20)',
		player: 'rgb(255, 49, 49)',
		solution: 'rgb(30, 144, 255)',
		exit: 'rgb(255, 215, 0)'
	};

	// Maze data
	let grid: string[][] = [];
	let playerPos: Position = { row: 1, col: 0 };
	let shortestPath: number[][] = [];
	let showingSolution: boolean = false;
	let exitPos: Position = { row: 0, col: 0 };

	// Movement state
	let currentDirection: { dr: number; dc: number } | null = null;
	let moveInterval: ReturnType<typeof setInterval> | null = null;
	const MOVE_SPEED = 75; // ms per step — lower = faster

	function saveProgress() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem('mazeLevel', String(mazeLevel));
		localStorage.setItem('currentLevel', String(currentLevel));
	}

	function loadProgress() {
		if (typeof localStorage === 'undefined') return;

		const savedMaze = localStorage.getItem('mazeLevel');
		const savedLevel = localStorage.getItem('currentLevel');

		if (savedMaze) mazeLevel = parseInt(savedMaze);
		if (savedLevel) currentLevel = parseInt(savedLevel);

		mazeRows = mazeLevel;
		mazeCols = mazeLevel;
	}

	// Helper functions
	function createEmptyGrid(): string[][] {
		return Array(mazeRows)
			.fill(null)
			.map(() => Array(mazeCols).fill(COLORS.background));
	}

	function isValidCell(row: number, col: number): boolean {
		return row >= 0 && row < mazeRows && col >= 0 && col < mazeCols;
	}

	function handleButtonPress(dr: number, dc: number) {
		startMoving(dr, dc);
	}

	function generateMaze(): void {
		grid = createEmptyGrid();
		showingSolution = false;

		let visited = new Set<string>();
		let stack: Position[] = [];
		let currentRow: number = 1;
		let currentCol: number = 1;
		let path: number[][] = [
			[1, 0],
			[1, 1]
		];
		let recordingPath: boolean = true;

		visited.add(`${currentRow},${currentCol}`);
		grid[currentRow][currentCol] = COLORS.wall;
		grid[1][0] = COLORS.player;

		const directions: Direction[] = [
			{ dr: -2, dc: 0, wr: -1, wc: 0, name: 'u' },
			{ dr: 0, dc: 2, wr: 0, wc: 1, name: 'r' },
			{ dr: 2, dc: 0, wr: 1, wc: 0, name: 'd' },
			{ dr: 0, dc: -2, wr: 0, wc: -1, name: 'l' }
		];

		while (true) {
			const validDirs = directions.filter((dir) => {
				const newRow = currentRow + dir.dr;
				const newCol = currentCol + dir.dc;
				return (
					isValidCell(newRow, newCol) &&
					newRow > 0 &&
					newRow < mazeRows - 1 &&
					newCol > 0 &&
					newCol < mazeCols - 1 &&
					!visited.has(`${newRow},${newCol}`)
				);
			});

			if (validDirs.length > 0) {
				const dir = validDirs[Math.floor(Math.random() * validDirs.length)];
				const newRow = currentRow + dir.dr;
				const newCol = currentCol + dir.dc;
				const wallRow = currentRow + dir.wr;
				const wallCol = currentCol + dir.wc;

				grid[wallRow][wallCol] = COLORS.wall;
				grid[newRow][newCol] = COLORS.wall;
				visited.add(`${newRow},${newCol}`);

				stack.push({ row: currentRow, col: currentCol });
				currentRow = newRow;
				currentCol = newCol;

				if (recordingPath) {
					path.push([wallRow, wallCol], [newRow, newCol]);
					if (newRow === mazeRows - 2 && newCol === mazeCols - 2) {
						path.push([mazeRows - 2, mazeCols - 1]);
						recordingPath = false;
					}
				}
			} else if (stack.length > 0) {
				const prev = stack.pop()!;
				currentRow = prev.row;
				currentCol = prev.col;
				if (recordingPath) {
					path.pop();
					path.pop();
				}
			} else {
				break;
			}
		}

		exitPos = { row: mazeRows - 2, col: mazeCols - 1 };
		grid[exitPos.row][exitPos.col] = COLORS.exit;

		shortestPath = path;
		playerPos = { row: 1, col: 0 };
		mazeStatus = 'made';

		grid = grid;
		stopMoving();
	}

	function movePlayer(dr: number, dc: number): void {
		const newRow = playerPos.row + dr;
		const newCol = playerPos.col + dc;

		// Hit wall → stop moving
		if (!isValidCell(newRow, newCol) || grid[newRow][newCol] === COLORS.background) {
			stopMoving();
			return;
		}

		// Move player
		if (!(playerPos.row === 1 && playerPos.col === 0)) {
			grid[playerPos.row][playerPos.col] = COLORS.path;
		}

		playerPos = { row: newRow, col: newCol };
		grid[newRow][newCol] = COLORS.player;

		// Check for win
		if (newRow === exitPos.row && newCol === exitPos.col) {
			stopMoving();
			mazeStatus = 'finished';
			setTimeout(() => {
				mazeLevel += 6;
				currentLevel++;
				saveProgress();
				mazeRows = mazeLevel;
				mazeCols = mazeLevel;
				updateBoardSize();
				generateMaze();
			}, 300);
		}

		grid = grid;
	}

	function startMoving(dr: number, dc: number) {
		if (mazeStatus !== 'made' || showingSolution) return;

		currentDirection = { dr, dc };

		// Clear any existing loop
		if (moveInterval) clearInterval(moveInterval);

		// Continuous movement
		moveInterval = setInterval(() => {
			if (currentDirection) movePlayer(currentDirection.dr, currentDirection.dc);
		}, MOVE_SPEED);
	}

	function stopMoving() {
		if (moveInterval) {
			clearInterval(moveInterval);
			moveInterval = null;
		}
		currentDirection = null;
	}

	function handleKeyDown(event: KeyboardEvent): void {
		const keyMap: Record<string, { dr: number; dc: number }> = {
			ArrowUp: { dr: -1, dc: 0 },
			ArrowDown: { dr: 1, dc: 0 },
			ArrowLeft: { dr: 0, dc: -1 },
			ArrowRight: { dr: 0, dc: 1 },
			w: { dr: -1, dc: 0 },
			s: { dr: 1, dc: 0 },
			a: { dr: 0, dc: -1 },
			d: { dr: 0, dc: 1 }
		};

		const move = keyMap[event.key];
		if (!move) return;

		event.preventDefault();
		startMoving(move.dr, move.dc);
	}

	function handleTouchStart(e: TouchEvent): void {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent): void {
		const touchEndX = e.changedTouches[0].clientX;
		const touchEndY = e.changedTouches[0].clientY;

		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;
		const minSwipeDistance = 20;

		if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) return;

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			startMoving(0, deltaX > 0 ? 1 : -1);
		} else {
			startMoving(deltaY > 0 ? 1 : -1, 0);
		}
	}

	function displaySolution(): void {
		if (mazeStatus !== 'made') return;
		showingSolution = true;

		for (let r = 0; r < mazeRows; r++) {
			for (let c = 0; c < mazeCols; c++) {
				if (grid[r][c] === COLORS.path) {
					grid[r][c] = COLORS.wall;
				}
			}
		}

		shortestPath.forEach(([row, col]) => {
			if (grid[row][col] !== COLORS.player && grid[row][col] !== COLORS.exit) {
				grid[row][col] = COLORS.solution;
			}
		});

		grid = grid;
	}

	function resetGame(): void {
		mazeLevel = 5;
		currentLevel = 1;
		saveProgress();
		mazeRows = mazeLevel;
		mazeCols = mazeLevel;
		updateBoardSize();
		generateMaze();
	}

	function updateBoardSize(): void {
		const navElement = document.querySelector('nav');
		const navHeight = navElement ? navElement.offsetHeight : 0;
		const availableHeight = window.innerHeight - navHeight - 400;
		const availableWidth = window.innerWidth - 32;
		boardSize = Math.min(Math.max(280, Math.min(availableWidth, availableHeight)), 600);
		mazeCellSize = boardSize / mazeRows;
		isMobile = window.innerWidth <= 767;
	}

	function handleResize(): void {
		updateBoardSize();
	}

	onMount(() => {
		loadProgress();
		updateBoardSize();
		generateMaze();
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('resize', handleResize);
		stopMoving();
	});
</script>

<div class="maze-game-container">
	<header class="game-header">
		<h1 class="game-title">Maze Game</h1>
		<div class="level-badge card">
			<span class="level-label">Level</span>
			<span class="level-value">{currentLevel}</span>
		</div>
	</header>

	<div class="hint-text">
		<span class="hint-icon">🎯</span>
		Reach the <span class="exit-text">golden exit</span> on the right!
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="maze-board-wrapper" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
		<div
			class="maze-board"
			tabindex="0"
			on:keydown={handleKeyDown}
			role="application"
			aria-label="Maze game board"
			style="width: {boardSize}px; height: {boardSize}px;"
		>
			{#each grid as row, r}
				{#each row as cellColor, c}
					<div
						class="maze-cell"
						class:is-exit={r === exitPos.row && c === exitPos.col}
						class:is-player={cellColor === COLORS.player}
						style="
							left: {c * mazeCellSize}px;
							top: {r * mazeCellSize}px;
							width: {mazeCellSize}px;
							height: {mazeCellSize}px;
							background-color: {cellColor};
						"
					></div>
				{/each}
			{/each}
		</div>
	</div>
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<div class="controls-section">
		{#if isMobile}
			<div class="touch-controls">
				<div class="d-pad">
					<button class="d-pad-btn up" on:click={() => handleButtonPress(-1, 0)}>
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
						<button class="d-pad-btn left" on:click={() => handleButtonPress(0, -1)}>
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="3"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button class="d-pad-btn right" on:click={() => handleButtonPress(0, 1)}>
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
					<button class="d-pad-btn down" on:click={() => handleButtonPress(1, 0)}>
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
			<p class="controls-hint">Swipe or use buttons to navigate</p>
		{:else}
			<p class="controls-hint">
				Use arrow keys or WASD to navigate • Click maze to focus if controls don't respond
			</p>
		{/if}

		<div class="instructions">
			Start from the <span class="player-text">red block</span> and reach the
			<span class="exit-text">golden exit</span>!
		</div>

		<div class="button-group">
			<button on:click={resetGame} class="button-primary game-btn">
				<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
				Start Over
			</button>
			<button on:click={displaySolution} class="button-accent game-btn" disabled={showingSolution}>
				<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
				Show Solution
			</button>
		</div>
	</div>
</div>

<style>
	.maze-game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg) var(--spacing-md);
		max-width: 800px;
		margin: 0 auto;
		min-height: calc(100vh - 200px);
	}

	.game-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
	}

	.game-title {
		font-size: 2.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.level-badge {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-lg);
		background: linear-gradient(135deg, var(--color-surface), var(--color-surface-elevated));
		border: 2px solid var(--color-primary);
		box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
	}

	.level-label {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.level-value {
		font-size: 1.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hint-text {
		text-align: center;
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex-wrap: wrap;
		justify-content: center;
	}

	.hint-icon {
		font-size: 1.5rem;
	}

	.exit-text {
		color: #ffd700;
		font-weight: 700;
	}

	.player-text {
		color: #ff3131;
		font-weight: 700;
	}

	.maze-board-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		touch-action: none;
		padding: var(--spacing-md);
	}

	.maze-board {
		position: relative;
		background-color: #000;
		outline: none;
		border: 3px solid var(--color-primary);
		border-radius: var(--radius-md);
		box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
		overflow: hidden;
	}

	.maze-board:focus {
		box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
	}

	.maze-cell {
		position: absolute;
		box-sizing: border-box;
		transition: background-color 0.15s ease;
	}

	.maze-cell.is-exit {
		animation: pulse-gold 1.5s ease-in-out infinite;
	}

	.maze-cell.is-player {
		animation: pulse-red 0.8s ease-in-out infinite;
	}

	@keyframes pulse-gold {
		0%,
		100% {
			box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
		}
		50% {
			box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
		}
	}

	@keyframes pulse-red {
		0%,
		100% {
			box-shadow: 0 0 5px rgba(255, 49, 49, 0.5);
		}
		50% {
			box-shadow: 0 0 12px rgba(255, 49, 49, 0.8);
		}
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
		padding: var(--spacing-sm);
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
		font-size: 0.9375rem;
		margin: 0;
	}

	.instructions {
		text-align: center;
		font-size: 1rem;
		color: var(--color-text);
		padding: var(--spacing-sm);
		background: var(--color-surface-elevated);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.button-group {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		justify-content: center;
		width: 100%;
		max-width: 500px;
	}

	.game-btn {
		flex: 1;
		min-width: 160px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		font-size: 1rem;
		font-weight: 600;
	}

	.game-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-icon {
		width: 20px;
		height: 20px;
	}

	/* Mobile Styles */
	@media only screen and (max-width: 767px) {
		.maze-game-container {
			gap: var(--spacing-md);
			padding: var(--spacing-md) var(--spacing-sm);
		}

		.game-title {
			font-size: 2rem;
		}

		.level-badge {
			gap: var(--spacing-sm);
			padding: var(--spacing-xs) var(--spacing-md);
		}

		.level-label {
			font-size: 1rem;
		}

		.level-value {
			font-size: 1.25rem;
		}

		.hint-text {
			font-size: 1rem;
		}

		.hint-icon {
			font-size: 1.25rem;
		}

		.maze-board-wrapper {
			padding: var(--spacing-sm);
		}

		.maze-board {
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
			font-size: 0.875rem;
		}

		.instructions {
			font-size: 0.9375rem;
		}

		.button-group {
			gap: var(--spacing-sm);
			max-width: 100%;
		}

		.game-btn {
			min-width: 140px;
			padding: var(--spacing-sm) var(--spacing-md);
			font-size: 0.9375rem;
		}

		.btn-icon {
			width: 18px;
			height: 18px;
		}
	}

	/* Small Mobile */
	@media only screen and (max-width: 480px) {
		.game-title {
			font-size: 1.75rem;
		}

		.hint-text {
			font-size: 0.9375rem;
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

		.instructions {
			font-size: 0.875rem;
		}

		.button-group {
			flex-direction: column;
			width: 100%;
		}

		.game-btn {
			width: 100%;
			min-width: unset;
		}
	}
</style>
