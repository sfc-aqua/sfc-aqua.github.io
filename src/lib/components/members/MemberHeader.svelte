<script lang="ts">
	import { Sparkles } from 'lucide-svelte'

	type Props = {
		title?: string
		subtitle?: string
	}

	let { title = 'Team Members', subtitle = 'Click any card to explore' }: Props = $props()
</script>

<div class="mb-12 space-y-4 text-center">
	<h1
		class="animate-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-5xl font-black text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400"
	>
		{title}
	</h1>
	<p class="flex items-center justify-center gap-2 text-muted-foreground">
		<Sparkles class="h-4 w-4" />
		{subtitle}
		<Sparkles class="h-4 w-4" />
	</p>
</div>

<style>
	@keyframes gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(.animate-gradient) {
		background-size: 200% 200%;
		animation: gradient 3s ease infinite;
	}
</style>
