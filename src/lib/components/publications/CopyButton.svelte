<!-- $lib/components/publications/CopyButton.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Copy, Check } from 'lucide-svelte'

	type Props = {
		text: string
		label?: string
		variant?: 'default' | 'outline' | 'ghost' | 'secondary'
		size?: 'default' | 'sm' | 'lg' | 'icon'
		class?: string
	}

	let {
		text,
		label = 'Copy',
		variant = 'outline',
		size = 'sm',
		class: className = '',
	}: Props = $props()

	let copied = $state(false)

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(text)
			copied = true
			setTimeout(() => {
				copied = false
			}, 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}
</script>

<Button {variant} {size} onclick={handleCopy} class={className}>
	{#if copied}
		<Check class="mr-1.5 h-3 w-3 text-green-600" />
		Copied
	{:else}
		<Copy class="mr-1.5 h-3 w-3" />
		{label}
	{/if}
</Button>
