<script>
	import Snake from '$lib/components/Snake.svelte';
</script>

<svelte:head>
	<title>Snake - Ivan's Playground</title>
</svelte:head>

<h1 class="text-center">Snake Game</h1>
<div class="flex flex-col items-center gap-2">
	<Snake />
	<h2>
		Use WASD or arrow keys to start game and control the snake and space to reset
	</h2>
</div>
