<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { type TMember } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import * as Avatar from '$lib/components/ui/avatar'
	import { Sparkles, Users, Hash, Calendar, BarChart3, Tag, BookOpen } from 'lucide-svelte'
	import { resolve } from '$app/paths'

	type Props = {
		publications: TPublication[]
		memberMap: Map<string, TMember>
		selectedCategory: string
		categories: string[]
		groupedPubs: Record<string, TPublication[]>
		onCategorySelect: (category: string) => void
	}

	let {
		publications,
		memberMap,
		selectedCategory,
		categories,
		groupedPubs,
		onCategorySelect,
	}: Props = $props()

	const topContributors = $derived(
		(() => {
			const stats = new Map<string, number>()
			publications.forEach((pub) => {
				pub.logins.forEach((login: string) => {
					stats.set(login, (stats.get(login) || 0) + 1)
				})
			})
			return Array.from(stats.entries())
				.sort((a, b) => b[1] - a[1])
				.slice(0, 5)
				.map(([login, count]) => ({ member: memberMap.get(login), count, login }))
		})()
	)

	const recentPubs = $derived(
		[...publications]
			.filter((pub) => pub.year != null)
			.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
			.slice(0, 5)
	)

	const topKeywords = $derived(
		(() => {
			const keywordCount = new Map<string, number>()
			publications.forEach((pub) => {
				pub.keywords.forEach((keyword: string) => {
					keywordCount.set(keyword, (keywordCount.get(keyword) || 0) + 1)
				})
			})
			return Array.from(keywordCount.entries())
				.sort((a, b) => b[1] - a[1])
				.slice(0, 12)
		})()
	)

	const publicationsByYear = $derived(
		(() => {
			const byYear = new Map<number, number>()
			publications.forEach((pub) => {
				if (pub.year != null) {
					byYear.set(pub.year, (byYear.get(pub.year) || 0) + 1)
				}
			})
			return Array.from(byYear.entries())
				.sort((a, b) => b[0] - a[0])
				.slice(0, 6)
		})()
	)

	const categoryBreakdown = $derived(
		selectedCategory === 'all'
			? Object.entries(groupedPubs)
					.map(([cat, pubs]) => ({ category: cat, count: pubs.length }))
					.sort((a, b) => b.count - a.count)
					.slice(0, 5)
			: []
	)

	const uniqueAuthors = $derived(
		(() => {
			const authors = new Set<string>()
			publications.forEach((pub) => {
				pub.logins.forEach((login: string) => authors.add(login))
			})
			return authors.size
		})()
	)

	const maxYearCount = $derived(
		publicationsByYear.length > 0 ? Math.max(...publicationsByYear.map(([_, c]) => c)) : 1
	)

	function formatCategory(category: string): string {
		return category
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}
</script>

$lib/components/publications/PublicationStats.svelte
<div class="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
	<!-- Total Publications -->
	<div
		class="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 transition-all duration-300 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20"
		></div>
		<div class="relative">
			<Sparkles
				class="mb-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400"
			/>
			<div class="mb-1 text-5xl font-bold transition-colors group-hover:text-foreground">
				{publications.length}
			</div>
			<p class="mb-3 text-sm text-muted-foreground">
				{selectedCategory === 'all'
					? `${categories.length} categories`
					: formatCategory(selectedCategory)}
			</p>
			<Badge variant="secondary" class="text-xs">{uniqueAuthors} authors</Badge>
		</div>
	</div>

	<!-- Top Contributors -->
	<div
		class="group relative col-span-2 row-span-3 overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 transition-all duration-300 group-hover:from-blue-500/10 group-hover:to-cyan-500/10"
		></div>
		<div class="relative">
			<div class="mb-3 flex items-center gap-2">
				<Users
					class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
				/>
				<h3 class="text-sm font-semibold">Top Contributors</h3>
			</div>
			<div class="max-h-[260px] space-y-2 overflow-y-auto pr-1">
				{#each topContributors as { member, count, login }}
					{@const memberLink = resolve('/members') + '/?member=' + login}
					<a
						href={memberLink}
						class="flex items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-[1.02] hover:bg-primary/10"
					>
						{#if member}
							<Avatar.Root
								class="h-8 w-8 shrink-0 ring-2 ring-transparent transition-all hover:ring-primary"
							>
								<Avatar.Image src={member.imagePath} alt={member.name} />
								<Avatar.Fallback class="text-xs">
									{member.name
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="min-w-0 flex-1">
								<div class="truncate text-xs font-medium">{member.name}</div>
								<div class="text-xs text-muted-foreground">{count}</div>
							</div>
						{:else}
							<Avatar.Root class="h-8 w-8 shrink-0">
								<Avatar.Fallback class="text-xs">
									{login.slice(0, 2).toUpperCase()}
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="min-w-0 flex-1">
								<div class="truncate text-xs font-medium">{login}</div>
								<div class="text-xs text-muted-foreground">{count}</div>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Authors Count -->
	<div
		class="group relative col-span-1 overflow-hidden rounded-xl border bg-card p-3 transition-all duration-300 hover:scale-105 hover:shadow-md"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 transition-all duration-300 group-hover:from-emerald-500/20 group-hover:to-teal-500/20"
		></div>
		<div class="relative">
			<Users
				class="mb-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
			/>
			<div class="text-2xl font-bold transition-colors group-hover:text-foreground">
				{uniqueAuthors}
			</div>
			<p class="text-xs text-muted-foreground">Authors</p>
		</div>
	</div>

	<!-- Categories Count -->
	<div
		class="group relative col-span-1 overflow-hidden rounded-xl border bg-card p-3 transition-all duration-300 hover:scale-105 hover:shadow-md"
	>
		<div
			class="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 transition-all duration-300 group-hover:from-amber-500/20 group-hover:to-orange-500/20"
		></div>
		<div class="relative">
			<Hash
				class="mb-2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400"
			/>
			<div class="text-2xl font-bold transition-colors group-hover:text-foreground">
				{selectedCategory === 'all' ? categories.length : '1'}
			</div>
			<p class="text-xs text-muted-foreground">
				{selectedCategory === 'all' ? 'Categories' : 'Category'}
			</p>
		</div>
	</div>

	<!-- Recent Publications -->
	{#if recentPubs.length > 0}
		<div
			class="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-500/0 transition-all duration-300 group-hover:from-pink-500/10 group-hover:to-rose-500/10"
			></div>
			<div class="relative">
				<div class="mb-3 flex items-center gap-2">
					<Calendar
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-pink-600 dark:group-hover:text-pink-400"
					/>
					<h3 class="text-sm font-semibold">Recent</h3>
				</div>
				<div class="max-h-[160px] space-y-2 overflow-y-auto pr-1">
					{#each recentPubs as pub}
						<div
							class="flex items-start gap-2 transition-transform duration-200 hover:translate-x-1"
						>
							<Badge
								variant="outline"
								class="mt-0.5 shrink-0 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
								>{pub.year}</Badge
							>
							<span class="line-clamp-2 text-xs leading-relaxed">
								{@html pub.content}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Timeline -->
	{#if publicationsByYear.length > 0}
		<div
			class="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-indigo-500/10 group-hover:to-blue-500/10"
			></div>
			<div class="relative">
				<div class="mb-3 flex items-center gap-2">
					<BarChart3
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
					/>
					<h3 class="text-sm font-semibold">Timeline</h3>
				</div>
				<div class="space-y-2">
					{#each publicationsByYear as [year, count]}
						<div class="group/item">
							<div class="mb-1 flex items-center justify-between">
								<span class="text-sm font-medium transition-colors group-hover/item:text-primary"
									>{year}</span
								>
								<span class="text-xs text-muted-foreground">{count}</span>
							</div>
							<div class="h-1.5 overflow-hidden rounded-full bg-secondary">
								<div
									class="h-full origin-left transform rounded-full bg-muted-foreground transition-all duration-500 ease-out group-hover/item:scale-x-105 group-hover/item:bg-primary"
									style="width: {(count / maxYearCount) * 100}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Top Keywords -->
	{#if topKeywords.length > 0}
		<div
			class="group relative col-span-2 overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md md:col-span-4 lg:col-span-4"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-green-500/0 to-lime-500/0 transition-all duration-300 group-hover:from-green-500/10 group-hover:to-lime-500/10"
			></div>
			<div class="relative">
				<div class="mb-3 flex items-center gap-2">
					<Tag
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-green-600 dark:group-hover:text-green-400"
					/>
					<h3 class="text-sm font-semibold">Keywords</h3>
				</div>
				<div class="flex flex-wrap gap-1.5">
					{#each topKeywords as [keyword, count]}
						{@const maxCount = topKeywords[0][1]}
						{@const size = 0.65 + (count / maxCount) * 0.25}
						<Badge
							variant="secondary"
							class="cursor-default transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
							style="font-size: {size}rem"
						>
							{keyword}
						</Badge>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Category Breakdown -->
	{#if selectedCategory === 'all' && categoryBreakdown.length > 0}
		<div
			class="group relative col-span-2 row-span-2 overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-md"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 transition-all duration-300 group-hover:from-purple-500/10 group-hover:to-violet-500/10"
			></div>
			<div class="relative">
				<div class="mb-3 flex items-center gap-2">
					<BookOpen
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
					/>
					<h3 class="text-sm font-semibold">By Category</h3>
				</div>
				<div class="space-y-2">
					{#each categoryBreakdown as { category, count }}
						<button onclick={() => onCategorySelect(category)} class="group/item w-full text-left">
							<div
								class="mb-1 flex items-center justify-between transition-colors group-hover/item:text-primary"
							>
								<span class="truncate text-sm font-medium">{formatCategory(category)}</span>
								<span class="ml-2 shrink-0 text-xs text-muted-foreground">{count}</span>
							</div>
							<div class="h-1.5 overflow-hidden rounded-full bg-secondary">
								<div
									class="h-full origin-left transform rounded-full bg-muted-foreground transition-all duration-500 ease-out group-hover/item:scale-x-105 group-hover/item:bg-primary"
									style="width: {(count / publications.length) * 100}%"
								></div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
