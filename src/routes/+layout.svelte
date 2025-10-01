<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Navbar from '../lib/components/navbar.svelte'
	import { ModeWatcher } from 'mode-watcher'

	let { children, data } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col">
	<Navbar {data} />

	<main class="grow basis-full">
		{@render children?.()}
	</main>

	<footer>
		<div class="mx-auto mt-4 flex w-full justify-center bg-background py-4 font-mono text-sm">
			AQUA @ Shonan Fujisawa Campus, Keio University, Japan
		</div>
	</footer>
</div>
