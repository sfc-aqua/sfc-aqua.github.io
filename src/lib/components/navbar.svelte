<script lang="ts">
	import { Menu, Sun, Moon } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Sheet from '$lib/components/ui/sheet/index.js'
	import { resolve } from '$app/paths'
	import { toggleMode } from 'mode-watcher'
	import Command from '$lib/components/command.svelte'

	let { data } = $props()

	let opensearch = $state(false)

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault()
			opensearch = !opensearch
		}
	}

	// Define your navigation links here
	const navItems = [
		{ href: resolve('/about'), label: 'About' },
		{ href: resolve('/research'), label: 'Research' },
		{ href: resolve('/members'), label: 'Members' },
		{ href: resolve('/for-students'), label: 'For Students' },
		{ href: resolve('/useful-links'), label: 'Links' },
		{ href: resolve('/access'), label: 'Access' },
	]

	let open = $state(false)
</script>

<svelte:document onkeydown={handleKeydown} />
<Command {data} bind:open={opensearch} />
{#snippet qwantaicon()}
	<div class="w-30 text-2xl font-bold">
		<a href={resolve('/')}> 🌊 AQUA </a>
	</div>
{/snippet}

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto flex h-14 px-4">
		<!-- Desktop Nav -->
		<div class="hidden md:flex">
			<nav class="flex items-center gap-6 text-sm">
				{@render qwantaicon()}
				{#each navItems as { href, label }}
					<Button {href} variant="link" class="text-foreground">
						{label}
					</Button>
				{/each}
			</nav>
		</div>

		<!-- Mobile Nav (Popover) -->
		<div class="m-2 flex items-center gap-2 md:hidden">
			<Sheet.Root bind:open>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon">
							<Menu size="64" />
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<Sheet.Header>
						<Sheet.Title>
							{@render qwantaicon()}
						</Sheet.Title>
					</Sheet.Header>
					<div class="flex flex-col justify-items-start gap-2">
						{#each navItems as { href, label }}
							<Button {href} variant="link" onclick={() => (open = false)}>
								{label}
							</Button>
						{/each}
					</div>
				</Sheet.Content>
			</Sheet.Root>
			{@render qwantaicon()}
		</div>

		<!-- Right side Actions (Desktop) -->
		<div class="mr-4 flex flex-1 items-center justify-end gap-2">
			<Button
				variant="outline"
				class="border-primary text-sm text-muted-foreground"
				onclick={() => {
					opensearch = !opensearch
				}}
			>
				Search...
				<kbd
					class="pointer-events-none inline-flex h-5 items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none"
				>
					<span class="text-xs">⌘</span>K
				</kbd>
			</Button>
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</div>
</header>
