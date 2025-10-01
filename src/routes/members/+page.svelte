<script lang="ts">
	import type { PageProps } from './$types'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import MemberHeader from '$lib/components/members/MemberHeader.svelte'
	import MemberGrid from '$lib/components/members/MemberGrid.svelte'
	import MemberModal from '$lib/components/members/MemberModal.svelte'

	let { data }: PageProps = $props()

	let memberFromUrl: string | null = $state(null)
	$effect.pre(() => {
		memberFromUrl = page.url.searchParams.get('member')
	})

	// Derive selected member from URL params
	let selectedMemberLogin = $derived(memberFromUrl)
	let selectedMember = $derived(
		selectedMemberLogin ? data.members.find((m) => m.login === selectedMemberLogin) : null
	)
	let modalOpen = $derived(!!selectedMember)

	function openMemberModal(member: any) {
		const url = new URL(page.url)
		url.searchParams.set('member', member.login)
		goto(url, { replaceState: false, noScroll: true, keepFocus: true })
	}

	function closeModal() {
		const url = new URL(page.url)
		url.searchParams.delete('member')
		goto(url, { replaceState: false, noScroll: true, keepFocus: true })
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			closeModal()
		}
	}
</script>

<div class="container mx-auto py-8">
	<MemberHeader />

	<MemberGrid members={data.members} {selectedMemberLogin} onMemberClick={openMemberModal} />
</div>

<!-- Modal -->
{#if selectedMember}
	<MemberModal member={selectedMember} open={modalOpen} onOpenChange={handleOpenChange} />
{/if}
