<script lang="ts">
	import type { TPublication } from '../../../publications/data'
	import type { TMember } from '../../../members/data'
	import * as Card from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import { BookOpen, Users, Calendar, Sparkles, BarChart3 } from 'lucide-svelte'
	import { cn } from '$lib/utils'

	type Props = {
		publications: TPublication[]
		memberMap: Map<string, TMember>
		selectedCategory: string
		categories: string[]
		groupedPubs: Record<string, TPublication[]>
		onCategorySelect: (cat: string) => void
	}

	let {
		publications,
		memberMap,
		selectedCategory,
		categories,
		groupedPubs,
		onCategorySelect,
	}: Props = $props()

	// Calculate statistics
	const stats = $derived.by(() => {
		const totalPubs = publications.length
		const featuredCount = publications.filter((pub) => pub.featured).length

		// Unique authors
		const uniqueAuthors = new Set(publications.flatMap((pub) => pub.logins))

		// Publications by year (last 6 years)
		const n = 6
		const currentYear = new Date().getFullYear()
		const recentYears = Array.from({ length: n }, (_, index) => currentYear - index)
		const byYear = publications.reduce(
			(acc, pub) => {
				if (pub.year && recentYears.includes(pub.year)) {
					acc[pub.year] = (acc[pub.year] || 0) + 1
				}
				return acc
			},
			{} as Record<number, number>
		)

		// Most active authors (top 6)
		const authorCounts = publications.reduce(
			(acc, pub) => {
				pub.logins.forEach((login) => {
					acc[login] = (acc[login] || 0) + 1
				})
				return acc
			},
			{} as Record<string, number>
		)

		const topAuthors = Object.entries(authorCounts)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 6)
			.map(([login, count]) => ({
				member: memberMap.get(login),
				count,
			}))
			.filter(({ member }) => member)

		return {
			totalPubs,
			featuredCount,
			uniqueAuthors: uniqueAuthors.size,
			byYear,
			recentYears,
			topAuthors,
		}
	})
</script>

<div class="space-y-4 rounded-lg bg-muted/30 p-4">
	<!-- Compact Overview Row -->
	<div class="grid grid-cols-3 gap-3">
		<!-- Total Publications -->
		<div class="flex items-center gap-3 rounded-lg bg-background p-3">
			<div class="rounded bg-blue-500/10 p-1.5">
				<BookOpen class="h-4 w-4 text-blue-600 dark:text-blue-400" />
			</div>
			<div>
				<p class="text-xl leading-none font-bold">{stats.totalPubs}</p>
				<p class="text-xs text-muted-foreground">Publications</p>
			</div>
		</div>

		<!-- Unique Authors -->
		<div class="flex items-center gap-3 rounded-lg bg-background p-3">
			<div class="rounded bg-green-500/10 p-1.5">
				<Users class="h-4 w-4 text-green-600 dark:text-green-400" />
			</div>
			<div>
				<p class="text-xl leading-none font-bold">{stats.uniqueAuthors}</p>
				<p class="text-xs text-muted-foreground">Authors</p>
			</div>
		</div>

		<!-- Featured Papers -->
		<div class="flex items-center gap-3 rounded-lg bg-background p-3">
			<div class="rounded bg-orange-500/10 p-1.5">
				<Sparkles class="h-4 w-4 text-orange-600 dark:text-orange-400" />
			</div>
			<div>
				<p class="text-xl leading-none font-bold">{stats.featuredCount}</p>
				<p class="text-xs text-muted-foreground">Featured</p>
			</div>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-3">
		<!-- Recent Years -->
		<div class="rounded-lg bg-background p-3">
			<div class="mb-2 flex items-center gap-2">
				<Calendar class="h-4 w-4 text-muted-foreground" />
				<h3 class="text-sm font-semibold">Recent Activity</h3>
			</div>
			<div class="space-y-1.5">
				{#each stats.recentYears as year}
					{@const count = stats.byYear[year] || 0}
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium">{year}</span>
						<Badge variant="secondary" class="h-5 px-1.5 text-xs">
							{count}
						</Badge>
					</div>
				{/each}
			</div>
		</div>

		<!-- Categories (Compact) -->
		<div class="rounded-lg bg-background p-3">
			<div class="mb-2 flex items-center gap-2">
				<BarChart3 class="h-4 w-4 text-muted-foreground" />
				<h3 class="text-sm font-semibold">Categories</h3>
			</div>
			<div class="h-[200px] space-y-1 overflow-y-scroll">
				{#each categories as category}
					{@const count = groupedPubs[category]?.length || 0}

					<button
						class={cn(
							'flex w-full items-center justify-between rounded px-1.5 py-1 text-xs transition-colors hover:bg-muted',
							selectedCategory === category && 'bg-muted'
						)}
						onclick={() => onCategorySelect(category)}
					>
						<span class="truncate font-medium">
							{category
								.split('-')
								.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
								.join(' ')}
						</span>
						<Badge
							variant={selectedCategory === category ? 'default' : 'secondary'}
							class="h-4 px-1 text-xs"
						>
							{count}
						</Badge>
					</button>
				{/each}
			</div>
		</div>

		<!-- Top Authors (Compact) -->
		<div class="rounded-lg bg-background p-3">
			<div class="mb-2 flex items-center gap-2">
				<Users class="h-4 w-4 text-muted-foreground" />
				<h3 class="text-sm font-semibold">Top Authors</h3>
			</div>
			<div class="space-y-1.5">
				{#each stats.topAuthors as { member, count }}
					<div class="flex items-center gap-2">
						<img
							src={member?.imagePath}
							alt={member?.name}
							class="h-6 w-6 rounded-full object-cover"
						/>
						<span class="flex-1 truncate text-xs font-medium">
							{member?.name}
						</span>
						<Badge variant="secondary" class="h-4 px-1 text-xs">
							{count}
						</Badge>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
