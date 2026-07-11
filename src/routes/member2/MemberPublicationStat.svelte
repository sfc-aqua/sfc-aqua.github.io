<!-- lib/components/PublicationWidget.svelte -->
<script lang="ts">
	import type { MemberWithStats } from './mock'
	import { BookOpen } from 'lucide-svelte'
	import { resolve } from '$app/paths'
	import * as Avatar from '$lib/components/ui/avatar/index.js'

	let { member }: { member: MemberWithStats } = $props()

	function getAvatarSize(rank: number): number {
		if (rank === 1) return 80
		if (rank === 2) return 70
		if (rank === 3) return 60
		if (rank === 4) return 50
		return 45
	}

	const positions = [
		{ top: '25%', left: '20%' },
		{ top: '20%', left: '65%' },
		{ top: '50%', left: '50%' },
		{ top: '70%', left: '25%' },
		{ top: '75%', left: '70%' },
	]
</script>

<div class="flex flex-col gap-3 rounded-2xl bg-white p-4">
	<!-- Publications Header -->
	<div class="flex items-start justify-between">
		<div>
			<p class="text-5xl leading-none font-bold text-gray-900">
				{member.publications}
			</p>
			<p class="mt-1 text-xs text-gray-600">Publications</p>
		</div>

		<a
			href={resolve(`/research/`)}
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition-transform hover:scale-110"
			aria-label="View publications"
		>
			<BookOpen size={20} />
		</a>
	</div>

	<!-- Co-Authors Section -->
	{#if member.coAuthors.length > 0}
		<div class="flex flex-col justify-between pt-2">
			<div class="relative h-48 w-full overflow-hidden">
				{#each member.coAuthors.slice(0, 5) as coauthor, index}
					{@const size = getAvatarSize(index + 1)}
					{@const position = positions[index]}

					<div
						class="group absolute transition-transform hover:z-10 hover:scale-110"
						style="
							top: {position.top};
							left: {position.left};
							width: {size}px;
							height: {size}px;
							transform: translate(-50%, -50%);
						"
					>
						<div class="relative h-full w-full">
							<Avatar.Root class="h-full w-full">
								<Avatar.Image src={coauthor.member?.imagePath} alt={coauthor.member?.login} />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>

							{#if index < 3}
								<div
									class="absolute -right-0.5 -bottom-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white ring-2 ring-white"
								>
									{index + 1}
								</div>
							{/if}
						</div>

						<div
							class="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							{coauthor.member?.name || coauthor.login}
							<span class="ml-1 text-pink-400">({coauthor.publications})</span>
						</div>
					</div>
				{/each}
			</div>
			<p class="mb-2 text-xs text-gray-600">Top in house Co-Authors</p>
		</div>
	{/if}
</div>
