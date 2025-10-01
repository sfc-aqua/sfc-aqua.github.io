<script lang="ts">
	import { Menu, Sun, Moon } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Sheet from '$lib/components/ui/sheet/index.js'
	import { resolve } from '$app/paths'
	import { toggleMode } from 'mode-watcher'
	import Command from '$lib/components/command2.svelte'
	import { goto } from '$app/navigation'
	import type { MemberWithTag } from '../../members/data'
	import MemberModal from './members/MemberModal.svelte'
	import { searchState } from '$lib/stores/search.svelte'
	import { page } from '$app/state'

	let { data } = $props()

	// let opensearch = $state(false)
	// let selectedMember: MemberWithTag | null = $state(null)
	// let modalOpen = $state(false)

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault()
			// opensearch = !opensearch
			searchState.toggleOpen()
		}
	}

	function handleMemberSelect(member: MemberWithTag) {
		// selectedMember = member
		// modalOpen = true
		searchState.selectMember(member)
		// Also update URL if needed
		const url = new URL(window.location.href)
		url.searchParams.set('member', member.login)
		goto(url, { replaceState: false, noScroll: true, keepFocus: true })
	}

	function handleModalClose() {
		// modalOpen = false
		searchState.closeModal()
		const url = new URL(window.location.href)
		url.searchParams.delete('member')
		goto(url, { replaceState: false, noScroll: true, keepFocus: true })
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

	// Sync URL with modal state on load
	$effect(() => {
		const memberLogin = page.url.searchParams.get('member')
		if (memberLogin && data.members) {
			const member = data.members.find((m: any) => m.login === memberLogin)
			if (member) {
				searchState.selectMember(member)
			}
		}
	})
</script>

<svelte:document onkeydown={handleKeydown} />
<Command {data} bind:open={searchState.commandOpen} onMemberSelect={handleMemberSelect} />
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
					// opensearch = !opensearch
					searchState.toggleOpen()
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

{#if searchState.selectedMember}
	<MemberModal
		member={searchState.selectedMember}
		open={searchState.modalOpen}
		onOpenChange={(open) => !open && handleModalClose()}
	/>
{/if}
