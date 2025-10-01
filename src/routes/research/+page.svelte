<!-- +page.svelte -->
<script lang="ts">
	import type { PageProps } from './$types'
	import { type TPublication } from '../../publications/data'
	import { type TMember } from '../../members/data'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import * as Select from '$lib/components/ui/select'
	import { Search, ChartCandlestick, LayoutGrid, LayoutList } from 'lucide-svelte'

	import PublicationStats from '$lib/components/publications/PublicationStats2.svelte'
	import FeaturedBanner from '$lib/components/publications/FeaturedBanner.svelte'
	import CategoryNavigation from '$lib/components/publications/CategoryNavigation.svelte'
	import PublicationsList from '$lib/components/publications/PublicationsList.svelte'

	let { data }: PageProps = $props()

	const content = $derived(data.pcontent)
	const memberMap = $derived(
		new Map<string, TMember>(data.members?.map((m: TMember) => [m.login, m]) || [])
	)

	function formatCategory(category: string): string {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}

	const groupedPubs = $derived(
		data.publications.reduce(
			(acc, pub: TPublication) => {
				const cat = pub.category || 'uncategorized'
				if (!acc[cat]) acc[cat] = []
				acc[cat].push(pub)
				return acc
			},
			{} as Record<string, TPublication[]>
		)
	)

	const categories = $derived(Object.keys(groupedPubs).sort())

	let searchQuery = $state('')
	let selectedCategory = $state('all')
	let showStats = $state(true)
	let showBackToTop = $state(false)
	let layout = $state<'list' | 'grid'>('list')

	const categoryPubs = $derived(
		selectedCategory === 'all' ? data.publications : groupedPubs[selectedCategory] || []
	)

	const filteredPubs = $derived(
		categoryPubs.filter((pub: TPublication) => {
			if (!searchQuery) return true
			return (
				pub.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
				pub.logins.some((login) => {
					const member = memberMap.get(login)
					return member?.name.toLowerCase().includes(searchQuery.toLowerCase())
				}) ||
				pub.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pub.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				pub.venue?.toLowerCase().includes(searchQuery.toLowerCase())
			)
		})
	)

	function handleScroll() {
		showBackToTop = window.scrollY > 300
	}

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}
</script>

<svelte:window onscroll={handleScroll} />

<div class="container mx-auto prose px-4 dark:prose-invert">
	{@html content.content}
</div>

<div
	class="container mx-auto mt-12 flex flex-col items-center justify-center px-4 pb-16"
	id="publications-top"
>
	<div class="mb-6 flex w-full items-center justify-between">
		<h1 class="text-4xl font-bold">Our Publications</h1>
		<div class="flex items-center gap-2">
			<!-- Layout Toggle -->
			<div class="hidden items-center rounded-lg border p-1 sm:flex">
				<Button
					variant={layout === 'list' ? 'secondary' : 'ghost'}
					size="sm"
					onclick={() => (layout = 'list')}
					class="h-7 gap-2 px-3"
				>
					<LayoutList class="h-4 w-4" />
					<span class="hidden text-xs lg:inline">List</span>
				</Button>
				<Button
					variant={layout === 'grid' ? 'secondary' : 'ghost'}
					size="sm"
					onclick={() => (layout = 'grid')}
					class="h-7 gap-2 px-3"
				>
					<LayoutGrid class="h-4 w-4" />
					<span class="hidden text-xs lg:inline">Grid</span>
				</Button>
			</div>

			<Button
				variant="ghost"
				size="sm"
				onclick={() => (showStats = !showStats)}
				class="hidden md:flex"
			>
				<ChartCandlestick class="mr-2 h-4 w-4" />
				{showStats ? 'Hide' : 'Show'} Stats
			</Button>
		</div>
	</div>

	<!-- Sticky Search and Filter -->
	<div
		class="sticky top-14 z-10 -mx-4 mb-6 w-full border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80"
	>
		<div class="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row">
			<div class="relative flex-1">
				<Search class="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search publications..."
					bind:value={searchQuery}
					class="h-9 pl-9"
				/>
			</div>

			<Select.Root type="single" bind:value={selectedCategory}>
				<Select.Trigger class="h-9 w-full sm:w-[240px]">
					<span class="block truncate text-sm font-medium">
						{selectedCategory === 'all'
							? `All (${data.publications.length})`
							: `${formatCategory(selectedCategory)} (${categoryPubs.length})`}
					</span>
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="all" label="All Categories">
						All Categories ({data.publications.length})
					</Select.Item>
					{#each categories as category}
						<Select.Item value={category} label={formatCategory(category)}>
							<span class="block truncate">
								{formatCategory(category)} ({groupedPubs[category].length})
							</span>
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>

			{#if selectedCategory === 'all'}
				<Button
					variant="outline"
					size="sm"
					class="hidden h-9 lg:flex"
					onclick={() => scrollToSection('categories-nav')}
				>
					Jump to Category
				</Button>
			{/if}
		</div>
	</div>

	<FeaturedBanner publications={categoryPubs} {memberMap} show={selectedCategory === 'all'} />

	{#if showStats}
		<PublicationStats
			publications={categoryPubs}
			{memberMap}
			{selectedCategory}
			{categories}
			{groupedPubs}
			onCategorySelect={(cat) => (selectedCategory = cat)}
		/>
	{/if}

	<CategoryNavigation
		{categories}
		{groupedPubs}
		{formatCategory}
		{scrollToSection}
		show={selectedCategory === 'all' && !searchQuery}
	/>

	<PublicationsList
		publications={filteredPubs}
		{groupedPubs}
		{memberMap}
		{selectedCategory}
		{searchQuery}
		{formatCategory}
		onCategorySelect={(cat) => (selectedCategory = cat)}
		{layout}
	/>
</div>

<Button
	size="icon"
	class="fixed right-6 bottom-6 z-50 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
	onclick={() => scrollToSection('publications-top')}
>
	<Search class="h-4 w-4" />
</Button>
