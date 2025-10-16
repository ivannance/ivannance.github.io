<svelte:head>
	<title>Ivan's World</title>
</svelte:head>

<h1 class="text-center">Welcome to my site!</h1>
<h2>"Apple" - Imaad</h2>

<div class="flex justify-center">
	<div class="card flex aspect-square flex-col justify-between" style="width: 25vw;">
		<div>
			<h2 class="mb-2 text-center text-2xl">TO DO LIST</h2>

			<ol class="list-decimal">
				<li class="text-orange-400">Complete guides</li>
				<li>Add a couple games</li>
				<li>Make website mobile friendly</li>
			</ol>
		</div>

		<div class="flex flex-col items-center">
			<h2 style="margin-bottom: 1vh;">Got a suggestion for the site?</h2>
			<button type="button" class="button-primary w-full flex h-9 items-center justify-center" on:click={()=>{
				window.open('https://instagram.com/ivanluvswaffles', '_blank')
			}}>DM @ivanluvswaffles</button
			>
		</div>
	</div>
</div>
