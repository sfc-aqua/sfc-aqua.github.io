<!-- $lib/components/publications/FeaturedBanner.svelte -->
<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { type TMember } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import { Star, Award, Quote } from 'lucide-svelte'

	type Props = {
		publications: TPublication[]
		memberMap: Map<string, TMember>
		show?: boolean
	}

	let { publications, memberMap, show = true }: Props = $props()

	const featuredPubs = $derived(publications.filter((p) => p.featured).slice(0, 3))
</script>

{#if show && featuredPubs.length > 0}
	<div
		class="relative mb-6 overflow-hidden rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-5"
	>
		<div class="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
		<div class="relative">
			<div class="mb-4 flex items-center gap-2">
				<Star class="h-5 w-5 fill-primary text-primary" />
				<h3 class="text-lg font-bold">Featured Publications</h3>
			</div>
			<div class="space-y-3">
				{#each featuredPubs as pub}
					<div
						class="flex items-start gap-3 rounded-lg bg-background/50 p-3 transition-colors hover:bg-background"
					>
						<Award class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
						<div class="min-w-0 flex-1">
							<div class="mb-1 text-sm font-medium">
								{#if pub.title}
									{pub.title}
								{:else}
									{@html pub.content}
								{/if}
							</div>
							{#if pub.venue}
								<p class="text-xs text-muted-foreground">{pub.venue}</p>
							{/if}
						</div>
						{#if pub.citations}
							<Badge variant="secondary" class="shrink-0">
								<Quote class="mr-1 h-3 w-3" />
								{pub.citations}
							</Badge>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
