<script>
	const games = [{ name: 'Snake', path: '/fun/snake', color: 'green' }];
</script>

<svelte:head>
	<title>Ivan's Playground</title>
</svelte:head>

<h1 class="text-center">Game Arcade!</h1>
<div class="grid w-full grid-cols-4 gap-8">
	{#each games as game}
		<a href={game.path} class="card flex flex-col items-center justify-center">
			<h2>{game.name}</h2>
			<p>Click to play!</p>
		</a>
	{/each}
</div>
