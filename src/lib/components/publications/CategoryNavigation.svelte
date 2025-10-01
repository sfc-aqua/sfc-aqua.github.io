<!-- $lib/components/publications/CategoryNavigation.svelte -->
<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { Button } from '$lib/components/ui/button'
	import { Badge } from '$lib/components/ui/badge'
	import { BookOpen } from 'lucide-svelte'

	type Props = {
		categories: string[]
		groupedPubs: Record<string, TPublication[]>
		formatCategory: (category: string) => string
		scrollToSection: (sectionId: string) => void
		show?: boolean
	}

	let { categories, groupedPubs, formatCategory, scrollToSection, show = true }: Props = $props()
</script>

{#if show}
	<div id="categories-nav" class="my-6 rounded-xl border bg-card/50 p-4">
		<h3 class="mb-3 flex items-center gap-2 text-sm font-semibold">
			<BookOpen class="h-4 w-4" />
			Quick Jump
		</h3>
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<Button
					variant="outline"
					size="sm"
					onclick={() => scrollToSection(`category-${category}`)}
					class="text-xs"
				>
					{formatCategory(category)}
					<Badge variant="secondary" class="ml-2 text-xs">
						{groupedPubs[category].length}
					</Badge>
				</Button>
			{/each}
		</div>
	</div>
{/if}
