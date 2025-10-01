<script lang="ts">
	import type { PageProps } from './$types'
	import * as Card from '$lib/components/ui/card/index.js'
	import { Badge } from '$lib/components/ui/badge/index.js'
	import { asset } from '$app/paths'
	import MemberModal from './member-modal.svelte'
	import { cn } from '$lib/utils'

	let { data }: PageProps = $props()

	let selectedMember = $state<any>(null)
	let modalOpen = $state(false)

	function openMemberModal(member: any) {
		selectedMember = member
		modalOpen = true
	}
</script>

<div class="container mx-auto py-8">
	<h1
		class="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent"
	>
		Team Members
	</h1>

	<div class="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each data.members as member, i}
			<button
				onclick={() => openMemberModal(member)}
				class="group"
				style="animation: floatIn 0.4s ease-out {i * 0.05}s backwards;"
			>
				<Card.Root
					class={cn("relative h-full transform cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl", member.isAlumni && "opacity-75")}
				>
					{#if member.isAlumni}
						<div class="absolute top-2 right-2 z-10">
							<Badge
								class="bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white shadow-lg"
							>
								🎓
							</Badge>
						</div>
					{/if}

					<div class="flex flex-col items-center gap-3 p-4 text-center">
						<!-- Compact Avatar -->
						<div class="relative">
							<div
								class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-75"
							></div>
							<img
								src={asset(member.imagePath)}
								alt={member.login}
								class="relative h-20 w-20 rounded-full border-2 border-white object-cover shadow-md transition-all group-hover:border-4"
							/>

							{#if member.tag && !member.isAlumni}
								<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 transform">
									<Badge
										class="bg-gradient-to-r from-blue-600 to-cyan-600 px-2 py-0.5 text-xs font-bold text-white shadow-md"
									>
										{member.tag}
									</Badge>
								</div>
							{/if}
						</div>

						<!-- Compact Info -->
						<div class="w-full space-y-1">
							<h3
								class="line-clamp-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-sm font-bold text-transparent"
							>
								{member.name}
							</h3>
							<p class="font-mono text-xs text-muted-foreground">@{member.login}</p>
						</div>

						<!-- Primary Role Badge -->
						{#if member.role && member.role.length > 0}
							<Badge
								variant="secondary"
								class="w-full truncate text-xs"
								style="background: linear-gradient(135deg, hsl(270, 70%, 60%), hsl(300, 70%, 70%));"
							>
								{member.role[0]}
							</Badge>
						{/if}

						<!-- Hover indicator -->
						<div
							class="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
						>
							Click for details →
						</div>
					</div>
				</Card.Root>
			</button>
		{/each}
	</div>
</div>

<!-- Modal -->
{#if selectedMember}
	<MemberModal
		member={selectedMember}
		bind:open={modalOpen}
		onOpenChange={(open) => (modalOpen = open)}
	/>
{/if}

<style>
	@keyframes floatIn {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
