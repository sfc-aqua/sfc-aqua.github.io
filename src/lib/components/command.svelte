<script lang="ts">
	import Fuse from 'fuse.js'
	import * as Command from '$lib/components/ui/command/index.js'
	import { z } from 'zod'
	import { resolve } from '$app/paths'

	let { data, open = $bindable() } = $props()

	type PossiblePaths = '/about' | '/access' | '/for-students' | '/research' | '/useful-links'

	type PageInfo = {
		slug: PossiblePaths
		title: string
		summary: string
	}
	let pages: PageInfo[] = $state([
		{
			slug: '/about',
			title: 'About',
			summary: 'Information about us 😉',
		},
		{
			slug: '/access',
			title: 'Access',
			summary: 'How to find us?',
		},
		{
			slug: '/for-students',
			title: 'For students',
			summary: 'Useful information for students',
		},
		{
			slug: '/research',
			title: 'Research',
			summary: 'What we do in AQUA 🔬',
		},
		{
			slug: '/useful-links',
			title: 'Links',
			summary: 'Links that might be useful!',
		},
	])

	const fuse = new Fuse(pages, {
		includeScore: true,
		threshold: 0.2,
		keys: ['title'],
	})
	let query = $state('')

	let results: PageInfo[] = $state([])

	$effect(() => {
		const r = fuse.search(query)
		results = r.map(({ item }) =>
			z
				.object({
					slug: z.enum(['/about', '/access', '/for-students', '/research', '/useful-links']),
					title: z.string(),
					summary: z.string(),
				})
				.parse(item)
		)
	})

	function getRandomUniqueElements(array: PageInfo[], count: number) {
		const shuffled = [...array].sort(() => 0.5 - Math.random())
		return shuffled.slice(0, count)
	}
</script>

{#snippet item({ title, slug, summary }: { title: string; slug: PossiblePaths; summary: string })}
	<Command.LinkItem
		href={resolve(`${slug}/`)}
		onclick={() => {
			open = false
		}}
	>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">{title}</h3>
			<p class="italic">{summary}</p>
		</div>
	</Command.LinkItem>
{/snippet}

<Command.Dialog shouldFilter={false} bind:open>
	<Command.Input placeholder="Type a command or search..." bind:value={query} />
	<Command.List>
		{#if query === ''}
			<Command.Group heading="Suggestions">
				{#each getRandomUniqueElements(pages, 2) as page}
					{@render item({ title: page.title, slug: page.slug, summary: page.summary })}
				{/each}
			</Command.Group>
		{:else if results.length > 0}
			<Command.Group heading="Results">
				{#each results as page}
					{@render item({ title: page.title, slug: page.slug, summary: page.summary })}
				{/each}
			</Command.Group>
		{:else}
			<Command.Empty>No results found.</Command.Empty>
		{/if}
	</Command.List>
</Command.Dialog>
