<script lang="ts">
	import type { MemberWithTag } from '../../../members/data'
	import MemberCard from './MemberCard.svelte'

	type Props = {
		members: MemberWithTag[]
		selectedMemberLogin: string | null
		onMemberClick: (member: MemberWithTag) => void
	}

	let { members, selectedMemberLogin, onMemberClick }: Props = $props()
</script>

<div class="grid grid-cols-2 gap-6 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
	{#each members as member, i}
		<MemberCard
			{member}
			index={i}
			isSelected={selectedMemberLogin === member.login}
			onclick={() => onMemberClick(member)}
		/>
	{/each}
</div>
