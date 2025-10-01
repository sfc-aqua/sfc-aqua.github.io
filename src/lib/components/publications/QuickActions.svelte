<!-- $lib/components/publications/QuickActions.svelte -->
<script lang="ts">
	import { type TPublication } from '../../../publications/data'
	import { type TMember } from '../../../members/data'
	import { Button } from '$lib/components/ui/button'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import {
		ChevronDown,
		Copy,
		Check,
		ExternalLink,
		FileText,
		Quote,
		Link as LinkIcon,
		Share2,
	} from 'lucide-svelte'

	type Props = {
		publication: TPublication
		memberMap: Map<string, TMember>
		pubId: string
	}

	let { publication, memberMap, pubId }: Props = $props()

	let copiedStates = $state<Record<string, boolean>>({})

	async function copyToClipboard(text: string, id: string) {
		try {
			await navigator.clipboard.writeText(text)
			copiedStates[id] = true
			setTimeout(() => {
				copiedStates[id] = false
			}, 2000)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	function generateCitation(pub: TPublication, format: 'apa' | 'mla' | 'chicago' = 'apa') {
		const authors = pub.logins
			.map((login: string) => memberMap.get(login)?.name || login)
			.join(', ')

		const year = pub.year || 'n.d.'
		const title = pub.title || 'Untitled'

		if (format === 'apa') {
			return `${authors} (${year}). ${title}. ${pub.venue || ''}`
		} else if (format === 'mla') {
			return `${authors}. "${title}." ${pub.venue || ''}, ${year}.`
		} else {
			return `${authors}. ${year}. "${title}." ${pub.venue || ''}.`
		}
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

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="sm" class="h-7 w-7 shrink-0 p-0">
			<ChevronDown class="h-3.5 w-3.5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-56">
		<DropdownMenu.Label>Quick Actions</DropdownMenu.Label>
		<DropdownMenu.Separator />

		{#if publication.doi}
			<DropdownMenu.Item
				onclick={() => window.open(`https://doi.org/${publication.doi}`, '_blank')}
			>
				<ExternalLink class="mr-2 h-4 w-4" />
				View DOI
			</DropdownMenu.Item>
		{/if}

		{#if publication.url}
			<DropdownMenu.Item onclick={() => window.open(publication.url, '_blank')}>
				<FileText class="mr-2 h-4 w-4" />
				View Paper
			</DropdownMenu.Item>
		{/if}

		<DropdownMenu.Separator />

		{#if publication.bibtex}
			<DropdownMenu.Item onclick={() => copyToClipboard(publication.bibtex!, `${pubId}-bibtex`)}>
				{#if copiedStates[`${pubId}-bibtex`]}
					<Check class="mr-2 h-4 w-4 text-green-600" />
					Copied!
				{:else}
					<Copy class="mr-2 h-4 w-4" />
					Copy BibTeX
				{/if}
			</DropdownMenu.Item>
		{/if}

		<DropdownMenu.Item
			onclick={() => copyToClipboard(generateCitation(publication, 'apa'), `${pubId}-cite`)}
		>
			{#if copiedStates[`${pubId}-cite`]}
				<Check class="mr-2 h-4 w-4 text-green-600" />
				Copied!
			{:else}
				<Quote class="mr-2 h-4 w-4" />
				Copy Citation
			{/if}
		</DropdownMenu.Item>

		{#if publication.doi}
			<DropdownMenu.Item
				onclick={() => copyToClipboard(`https://doi.org/${publication.doi}`, `${pubId}-doi`)}
			>
				{#if copiedStates[`${pubId}-doi`]}
					<Check class="mr-2 h-4 w-4 text-green-600" />
					Copied!
				{:else}
					<LinkIcon class="mr-2 h-4 w-4" />
					Copy DOI Link
				{/if}
			</DropdownMenu.Item>
		{/if}

		<DropdownMenu.Separator />

		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>
				<Share2 class="mr-2 h-4 w-4" />
				Share
			</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.Item onclick={shareTwitter}>Twitter</DropdownMenu.Item>
				<DropdownMenu.Item onclick={shareLinkedIn}>LinkedIn</DropdownMenu.Item>
				<DropdownMenu.Item onclick={shareEmail}>Email</DropdownMenu.Item>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
	</DropdownMenu.Content>
</DropdownMenu.Root>
