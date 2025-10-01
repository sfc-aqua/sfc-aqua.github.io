<script lang="ts">
	import Fuse from 'fuse.js'
	// import * as Command from '$lib/components/ui/command'
	// import { Command } from "bits-ui";
	import * as Command from '$lib/components/ui/command/index.js'
	import { Badge } from '$lib/components/ui/badge'
	import { resolve } from '$app/paths'
	import { goto } from '$app/navigation'
	import { FileText, Link as LinkIcon } from 'lucide-svelte'
	import type { MemberWithTag } from '../../members/data'
	import type { TPublication } from '../../publications/data'
	import { createPublicationId, scrollToPublication } from '$lib/utils'
	import { page } from '$app/state'

	type Props = {
		data: {
			members: MemberWithTag[]
			publications: TPublication[]
		}
		open?: boolean
		onMemberSelect?: (member: MemberWithTag) => void
	}

	let { data, open = $bindable(), onMemberSelect }: Props = $props()

	// function handlePublicationClick(pub: TPublication) {
	// 	open = false

	// 	// Create a URL-safe ID from the title
	// 	const publicationId = createPublicationId(pub)

	// 	// Navigate to research page with hash
	// 	goto(`/research#${publicationId}`, {
	// 		replaceState: false,
	// 		noScroll: false // Let the browser handle initial scroll
	// 	})
	// }
	function handlePublicationClick(pub: TPublication) {
		open = false
		const publicationId = createPublicationId(pub)

		// Check if we're already on the research page
		const currentPath = page.url.pathname
		const targetPath = '/research'

		if (currentPath === targetPath) {
			// Same page - just scroll
			setTimeout(() => scrollToPublication(publicationId), 100)
			// Update URL without navigation
			window.history.pushState({}, '', `${targetPath}#${publicationId}`)
		} else {
			// Different page - navigate with hash
			goto(`${targetPath}#${publicationId}`)
		}
	}

	type PossiblePaths =
		| '/about'
		| '/access'
		| '/for-students'
		| '/research'
		| '/useful-links'
		| '/members'

	type PageInfo = {
		slug: PossiblePaths
		title: string
		summary: string
	}

	const pages: PageInfo[] = [
		{
			slug: '/about',
			title: 'About',
			summary: 'Information about us 😉',
		},
		{
			slug: '/members',
			title: 'Members',
			summary: 'Meet our team members',
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
	]

	// Setup Fuse instances
	const pageFuse = new Fuse(pages, {
		includeScore: true,
		threshold: 0.3,
		keys: ['title', 'summary'],
	})

	const memberFuse = new Fuse(data.members, {
		includeScore: true,
		threshold: 0.3,
		keys: ['name', 'login', 'role', 'description'],
	})

	const publicationFuse = new Fuse(data.publications, {
		includeScore: true,
		threshold: 0.3,
		keys: ['title', 'content', 'keywords', 'venue', 'logins'],
	})

	let query = $state('')

	// Search results
	const searchResults = $derived.by(() => {
		if (!query) {
			return {
				pages: pages.slice(0, 3),
				members: data.members.slice(0, 4),
				publications: data.publications.slice(0, 3),
			}
		}

		const pageResults = pageFuse.search(query).map(({ item }) => item)
		const memberResults = memberFuse.search(query).map(({ item }) => item)
		const publicationResults = publicationFuse.search(query).map(({ item }) => item)

		return {
			pages: pageResults.slice(0, 5),
			members: memberResults.slice(0, 5),
			publications: publicationResults.slice(0, 5),
		}
	})

	function handleMemberClick(member: MemberWithTag) {
		open = false
		onMemberSelect?.(member)
	}

	// function handlePublicationClick() {
	// 	open = false
	// 	goto('/research')
	// }

	function getPublicationTitle(pub: TPublication): string {
		return pub.title || pub.content.slice(0, 60) + '...'
	}

	function getPublicationAuthors(pub: TPublication): string {
		return pub.logins.slice(0, 3).join(', ') + (pub.logins.length > 3 ? '...' : '')
	}
</script>

<Command.Dialog shouldFilter={false} bind:open>
	<div class="flex h-[500px] flex-col">
		<Command.Input placeholder="Search pages, members, publications..." bind:value={query} />
		<Command.List class="max-h-full">
			{#if !query}
				<Command.Empty>Start typing to search...</Command.Empty>
			{:else if searchResults.pages.length === 0 && searchResults.members.length === 0 && searchResults.publications.length === 0}
				<Command.Empty>No results found.</Command.Empty>
			{/if}

			<!-- Pages Group -->
			{#if searchResults.pages.length > 0}
				<Command.Group heading="Pages">
					{#each searchResults.pages as page}
						<Command.LinkItem
							value={`page-${page.slug}`}
							href={resolve(`${page.slug}/`)}
							class="flex cursor-pointer justify-between gap-1 aria-selected:bg-accent"
							onclick={() => {
								open = false
							}}
						>
							<div class="flex items-start gap-2">
								<LinkIcon class="h-4 w-4 text-muted-foreground" />
								<span class="font-medium">{page.title}</span>
							</div>
							<span class="pl-6 text-xs text-muted-foreground">{page.summary}</span>
						</Command.LinkItem>
					{/each}
				</Command.Group>
			{/if}

			<!-- Members Group -->
			{#if searchResults.members.length > 0}
				<Command.Separator />
				<Command.Group heading="Members">
					{#each searchResults.members as member}
						<Command.Item
							value={`member-${member.login}`}
							class="flex cursor-pointer items-center gap-3 px-3 py-2.5 aria-selected:bg-accent"
							onSelect={() => handleMemberClick(member)}
						>
							<!-- Avatar -->
							<img
								src={member.imagePath}
								alt={member.name}
								class="h-8 w-8 rounded-full border-2 border-border object-cover"
							/>

							<!-- Info -->
							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<span class="truncate font-medium">{member.name}</span>
									{#if member.role && member.role.length > 0}
										<Badge variant="secondary" class="px-1.5 py-0 text-xs">
											{member.role[0]}
										</Badge>
									{/if}
								</div>
								<span class="text-xs text-muted-foreground">@{member.login}</span>
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			{/if}

			<!-- Publications Group -->
			{#if searchResults.publications.length > 0}
				<Command.Separator />
				<Command.Group heading="Publications">
					{#each searchResults.publications as pub}
						<Command.Item
							value={`pub-${pub.content.slice(0, 50)}`}
							class="flex cursor-pointer items-start gap-3 px-3 py-2.5 aria-selected:bg-accent"
							onSelect={() => handlePublicationClick(pub)}
						>
							<FileText class="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />

							<div class="min-w-0 flex-1 space-y-1">
								<p class="line-clamp-2 text-sm leading-tight font-medium">
									{getPublicationTitle(pub)}
								</p>

								<div class="flex flex-wrap items-center gap-2">
									{#if pub.year}
										<Badge variant="outline" class="px-1.5 py-0 text-xs">
											{pub.year}
										</Badge>
									{/if}
									{#if pub.category}
										<Badge variant="secondary" class="px-1.5 py-0 text-xs">
											{pub.category}
										</Badge>
									{/if}
								</div>

								{#if pub.logins.length > 0}
									<p class="truncate text-xs text-muted-foreground">
										{getPublicationAuthors(pub)}
									</p>
								{/if}
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			{/if}
		</Command.List>
	</div>
</Command.Dialog>
