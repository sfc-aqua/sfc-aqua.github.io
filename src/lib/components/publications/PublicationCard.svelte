<!-- $lib/components/publications/PublicationCard.svelte -->
<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { type MemberWithTag } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import * as Collapsible from '$lib/components/ui/collapsible'
	import * as Avatar from '$lib/components/ui/avatar'
	import {
		Star,
		BookOpen,
		Quote,
		Eye,
		ChevronDown,
		ExternalLink,
		FileText,
		Share2,
	} from 'lucide-svelte'
	import CopyButton from './CopyButton.svelte'
	import { searchState } from '$lib/stores/search.svelte'
	import { createPublicationId } from '$lib/utils'

	type Props = {
		publication: TPublication
		memberMap: Map<string, MemberWithTag>
		citationThreshold?: number
		layout?: 'list' | 'grid'
	}

	let { publication, memberMap, citationThreshold = 0, layout = 'list' }: Props = $props()

	let isOpen = $state(false)

	const citationBadge = $derived(
		publication.citations && publication.citations >= citationThreshold && citationThreshold > 0
			? { label: 'Highly Cited', variant: 'default' as const }
			: null
	)

	function generateCitation(format: 'apa' | 'mla' = 'apa') {
		const authors = publication.logins
			.map((login) => memberMap.get(login)?.name || login)
			.join(', ')
		const year = publication.year || 'n.d.'
		const title = publication.title || 'Untitled'

		if (format === 'apa') {
			return `${authors} (${year}). ${title}. ${publication.venue || ''}`
		}
		return `${authors}. "${title}." ${publication.venue || ''}, ${year}.`
	}

	function shareTwitter() {
		const text = `Check out: ${publication.title || 'this publication'}`
		const url =
			publication.url ||
			(publication.doi ? `https://doi.org/${publication.doi}` : window.location.href)
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
			'_blank'
		)
	}

	function shareLinkedIn() {
		const url =
			publication.url ||
			(publication.doi ? `https://doi.org/${publication.doi}` : window.location.href)
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
			'_blank'
		)
	}

	function shareEmail() {
		const subject = publication.title || 'Publication'
		const body = `${publication.title || 'Check out this publication'}\n\n${publication.url || (publication.doi ? `https://doi.org/${publication.doi}` : '')}`
		window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
	}
</script>

<Collapsible.Root
	bind:open={isOpen}
	class="h-full rounded-lg border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md"
	id={createPublicationId(publication)}
>
	<div class="flex flex-col p-4 {layout === 'grid' ? 'h-full' : ''}">
		<!-- Clickable Header -->
		<Collapsible.Trigger class="w-full flex-1">
			{#if layout === 'list'}
				<!-- List Layout (Horizontal/Compact) -->
				<div class="group flex cursor-pointer items-start gap-3">
					{#if publication.featured}
						<Star class="mt-1 h-4 w-4 shrink-0 fill-primary text-primary" />
					{/if}

					<div
						class="flex shrink-0 -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background"
					>
						{#each publication.logins.slice(0, 3) as login}
							{@const member = memberMap.get(login)}
							{#if member}
								<Avatar.Root class="h-8 w-8 transition-transform hover:z-10 hover:scale-110">
									<Avatar.Image src={member.imagePath} alt={member.name} />
									<Avatar.Fallback class="text-xs">
										{member.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</Avatar.Fallback>
								</Avatar.Root>
							{/if}
						{/each}
					</div>

					<div class="min-w-0 flex-1 text-left">
						<div
							class="prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:first-child]:line-clamp-2"
						>
							{@html publication.content}
						</div>

						{#if publication.venue}
							<p class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
								<BookOpen class="h-3 w-3" />
								{publication.venue}
							</p>
						{/if}

						<div class="mt-2 flex flex-wrap items-center gap-1">
							{#if publication.year != null}
								<Badge variant="outline" class="text-xs">
									{publication.year}
								</Badge>
							{/if}

							{#if publication.citations}
								<Badge variant={citationBadge ? 'default' : 'secondary'} class="text-xs">
									<Quote class="mr-1 h-3 w-3" />
									{publication.citations}
								</Badge>
							{/if}

							{#if publication.views}
								<Badge variant="secondary" class="text-xs">
									<Eye class="mr-1 h-3 w-3" />
									{publication.views}
								</Badge>
							{/if}

							{#each publication.keywords.slice(0, 2) as keyword}
								<Badge variant="secondary" class="text-xs">
									{keyword}
								</Badge>
							{/each}
							{#if publication.keywords.length > 2}
								<Badge variant="secondary" class="text-xs">
									+{publication.keywords.length - 2}
								</Badge>
							{/if}
						</div>
					</div>

					<div class="shrink-0">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-md transition-colors group-hover:bg-accent"
						>
							<ChevronDown
								class="h-4 w-4 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
							/>
						</div>
					</div>
				</div>
			{:else}
				<!-- Grid Layout (Cleaner, Less Duplication) -->
				<div class="group flex h-full cursor-pointer flex-col">
					<!-- Top badges row -->
					<div class="mb-3 flex items-center justify-between gap-2">
						<div class="flex items-center gap-2">
							{#if publication.featured}
								<Star class="h-4 w-4 fill-primary text-primary" />
							{/if}
							{#if publication.year}
								<Badge variant="outline" class="text-xs">{publication.year}</Badge>
							{/if}
						</div>
						<div
							class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors group-hover:bg-accent"
						>
							<ChevronDown
								class="h-3.5 w-3.5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
							/>
						</div>
					</div>

					<!-- Title/Content - Main focus -->
					<div
						class="prose prose-sm mb-3 max-w-none flex-1 text-left dark:prose-invert [&>*:first-child]:mt-0 [&>*:first-child]:font-semibold"
					>
						{@html publication.content}
					</div>

					<!-- Venue -->
					{#if publication.venue}
						<p class="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
							<BookOpen class="h-3 w-3 shrink-0" />
							<span class="line-clamp-1">{publication.venue}</span>
						</p>
					{/if}

					<!-- Bottom section -->
					<div class="mt-auto space-y-3">
						<!-- Metrics (only if exist) -->
						{#if publication.citations || publication.views}
							<div class="flex flex-wrap items-center gap-2">
								{#if publication.citations}
									<Badge variant={citationBadge ? 'default' : 'secondary'} class="text-xs">
										<Quote class="mr-1 h-3 w-3" />
										{publication.citations}
									</Badge>
								{/if}
								{#if publication.views}
									<Badge variant="secondary" class="text-xs">
										<Eye class="mr-1 h-3 w-3" />
										{publication.views}
									</Badge>
								{/if}
							</div>
						{/if}

						<!-- Authors (avatars only) -->
						<div class="flex items-center justify-between gap-2">
							<div
								class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background"
							>
								{#each publication.logins.slice(0, 4) as login}
									{@const member = memberMap.get(login)}
									{#if member}
										<Avatar.Root class="h-7 w-7">
											<Avatar.Image src={member.imagePath} alt={member.name} />
											<Avatar.Fallback class="text-[0.6rem]">
												{member.name
													.split(' ')
													.map((n) => n[0])
													.join('')}
											</Avatar.Fallback>
										</Avatar.Root>
									{/if}
								{/each}
								{#if publication.logins.length > 4}
									<div
										class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted"
									>
										<span class="text-[0.6rem] font-medium">+{publication.logins.length - 4}</span>
									</div>
								{/if}
							</div>

							<!-- Top keywords (just 2) -->
							<div class="flex gap-1">
								{#each publication.keywords.slice(0, 2) as keyword}
									<Badge variant="secondary" class="text-xs">
										{keyword}
									</Badge>
								{/each}
								{#if publication.keywords.length > 2}
									<Badge variant="secondary" class="text-xs">
										+{publication.keywords.length - 2}
									</Badge>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</Collapsible.Trigger>

		<!-- Expanded Content (Same for both layouts) -->
		<Collapsible.Content>
			<div class="mt-4 space-y-4 border-t pt-4">
				{#if publication.abstract}
					<div class="rounded-lg bg-muted/50 p-3">
						<p class="mb-2 text-xs font-medium">Abstract:</p>
						<p class="text-xs leading-relaxed text-muted-foreground">{publication.abstract}</p>
					</div>
				{/if}

				<!-- Full publication info (only shown when expanded) -->
				{#if layout === 'grid'}
					<div class="prose prose-sm max-w-none dark:prose-invert">
						{@html publication.content}
					</div>
				{/if}

				<!-- Authors with names and links -->
				<div>
					<p class="mb-2 text-xs font-medium">Authors:</p>
					<div class="flex flex-wrap gap-2">
						{#each publication.logins as login}
							{@const member = memberMap.get(login)}
							{#if member}
								<!-- {@const memberLink = resolve('/members') + '/?member=' + member.login}
								<a
									href={memberLink}
									class="flex items-center gap-1.5 text-xs transition-colors hover:text-primary hover:underline"
								>
									<Avatar.Root class="h-5 w-5">
										<Avatar.Image src={member.imagePath} alt={member.name} />
										<Avatar.Fallback class="text-[0.6rem]">
											{member.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</Avatar.Fallback>
									</Avatar.Root>
									{member.name}
								</a> -->
								<Button
									onclick={() => {
										searchState.selectMember(member)
									}}
									variant="ghost"
								>
									<Avatar.Root class="h-5 w-5">
										<Avatar.Image src={member.imagePath} alt={member.name} />
										<Avatar.Fallback class="text-[0.6rem]">
											{member.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</Avatar.Fallback>
									</Avatar.Root>
									{member.name}
								</Button>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="flex flex-wrap gap-2">
					{#if publication.bibtex}
						<CopyButton text={publication.bibtex} label="BibTeX" variant="outline" size="sm" />
					{/if}

					<CopyButton text={generateCitation('apa')} label="Citation" variant="outline" size="sm" />

					{#if publication.doi}
						<Button
							variant="outline"
							size="sm"
							onclick={() => window.open(`https://doi.org/${publication.doi}`, '_blank')}
						>
							<ExternalLink class="mr-1.5 h-3 w-3" />
							DOI
						</Button>
					{/if}

					{#if publication.url}
						<Button
							variant="outline"
							size="sm"
							onclick={() => window.open(publication.url, '_blank')}
						>
							<FileText class="mr-1.5 h-3 w-3" />
							PDF
						</Button>
					{/if}

					<Button variant="outline" size="sm" onclick={shareTwitter}>
						<Share2 class="mr-1.5 h-3 w-3" />
						Share
					</Button>
				</div>

				<!-- All Keywords -->
				<div>
					<p class="mb-2 text-xs font-medium">Keywords:</p>
					<div class="flex flex-wrap gap-1">
						{#each publication.keywords as keyword}
							<Badge
								variant="secondary"
								class="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
							>
								{keyword}
							</Badge>
						{/each}
					</div>
				</div>
			</div>
		</Collapsible.Content>
	</div>
</Collapsible.Root>
