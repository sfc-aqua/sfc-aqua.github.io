<!-- $lib/components/publications/PublicationsList.svelte -->
<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { type TMember } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import { Separator } from '$lib/components/ui/separator'
	import PublicationCard from './PublicationCard.svelte'

	type Props = {
		publications: TPublication[]
		groupedPubs: Record<string, TPublication[]>
		memberMap: Map<string, TMember>
		selectedCategory: string
		searchQuery: string
		formatCategory: (category: string) => string
		onCategorySelect: (category: string) => void
		layout?: 'list' | 'grid'
	}

	let {
		publications,
		groupedPubs,
		memberMap,
		selectedCategory,
		searchQuery,
		formatCategory,
		onCategorySelect,
		layout = 'list',
	}: Props = $props()

	const filteredGrouped = $derived(
		publications.reduce(
			(acc, pub) => {
				const cat = pub.category || 'uncategorized'
				if (!acc[cat]) acc[cat] = []
				acc[cat].push(pub)
				return acc
			},
			{} as Record<string, TPublication[]>
		)
	)

	const citationThreshold = $derived(
		(() => {
			const withCitations = publications.filter((p) => p.citations && p.citations > 0)
			if (withCitations.length === 0) return 0
			const sorted = [...withCitations].sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0))
			const topIndex = Math.floor(sorted.length * 0.1)
			return sorted[topIndex]?.citations ?? 0
		})()
	)
</script>

<div class="max-w-4xl space-y-8">
	{#if selectedCategory === 'all' && !searchQuery}
		{#each Object.entries(filteredGrouped) as [category, pubs]}
			<div id="category-{category}">
				<div class="mb-4 flex items-center gap-3">
					<h2 class="text-xl font-bold">{formatCategory(category)}</h2>
					<Separator class="flex-1" />
					<Badge variant="secondary" class="text-xs">{pubs.length}</Badge>
				</div>

				<!-- Dynamic layout based on grid/list -->
				<div
					class={layout === 'grid'
						? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
						: 'space-y-2'}
				>
					{#each pubs.slice(0, 5) as publication, idx}
						<PublicationCard
							{publication}
							{memberMap}
							pubId={`${category}-${idx}`}
							{citationThreshold}
							{layout}
						/>
					{/each}
				</div>

				{#if pubs.length > 5}
					<Button
						variant="outline"
						size="sm"
						class="mt-4 w-full transition-colors hover:bg-primary hover:text-primary-foreground"
						onclick={() => onCategorySelect(category)}
					>
						View all {pubs.length} in {formatCategory(category)}
					</Button>
				{/if}
			</div>
		{/each}
	{:else}
		<!-- Dynamic layout for filtered results -->
		<div
			class={layout === 'grid'
				? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
				: 'space-y-2'}
		>
			{#each publications as publication, idx}
				<PublicationCard
					{publication}
					{memberMap}
					pubId={`filtered-${idx}`}
					{citationThreshold}
					{layout}
				/>
			{/each}
		</div>
	{/if}

	{#if publications.length === 0}
		<div class="flex flex-col items-center justify-center py-12 text-center">
			<p class="mb-2 text-muted-foreground">No publications found</p>
			<p class="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
		</div>
	{/if}
</div>
