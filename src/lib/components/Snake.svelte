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

	let navElement: HTMLElement | null = null;
	let navHeight = 0;

	// Initialize grid
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
		let [headX, headY] = snakeCoords[0].split('_').map(Number);
		headX += dirX;
		headY += dirY;

		if (dieFromWalls) {
			if (headX < 0 || headX >= cols || headY < 0 || headY >= rows) {
				return false;
			}
		} else {
			headX = (headX + cols) % cols;
			headY = (headY + rows) % rows;
		}

		const newHead = `${headX}_${headY}`;
		if (snakeCoords.includes(newHead) && snakeCoords.length > 1) return false;

		snakeCoords.unshift(newHead);

		if (newHead === appleCoords) {
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
			e.preventDefault(); // Stop page scroll
			reset();
			return;
		}
		if (keyMap[e.key]) {
			const [x, y] = keyMap[e.key];
			if (snakeCoords.length === 1 || (dirX !== -x && dirY !== -y)) {
				dirX = x;
				dirY = y;
			}
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
		// Detect navbar dynamically if present
		const foundNav = document.querySelector('nav');
		if (foundNav) {
			navElement = foundNav as HTMLElement;
			navHeight = navElement.offsetHeight;
		} else {
			navHeight = 0;
		}

		// Calculate available area below navbar
		const availableHeight = window.innerHeight - navHeight;
		const size = Math.min(window.innerWidth, availableHeight) * 0.85;
		containerSize = size;
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

<!-- Responsive game grid -->
<div
	id="snake-grid"
	style="width: {containerSize}px; height: {containerSize}px;"
>
	{#each grid as row, y}
		{#each row as color, x}
			<div
				class="snake-cell"
				style="background-color: {color};"
				id="{x}_{y}"
			></div>
		{/each}
	{/each}
</div>

<style>
	#snake-grid {
		margin: auto;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(12, 1fr);
		aspect-ratio: 1;
	}
	.snake-cell {
		background-color: black;
		border: thin solid white;
	}
</style>
