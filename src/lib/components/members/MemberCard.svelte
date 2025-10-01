<script lang="ts">
	import type { MemberWithTag } from '../../../members/data'
	import * as Card from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import { cn } from '$lib/utils'
	import { ChevronRight } from 'lucide-svelte'

	type Props = {
		member: MemberWithTag
		index: number
		isSelected: boolean
		onclick: () => void
	}

	let { member, index, isSelected, onclick }: Props = $props()
</script>

<button
	{onclick}
	class="group relative"
	style="animation: floatIn 0.5s ease-out {index * 0.03}s backwards;"
>
	<!-- Glow effect on hover -->
	<div
		class="pointer-events-none absolute -inset-1 z-0 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 group-hover:duration-200 dark:from-pink-500 dark:via-purple-500 dark:to-blue-500 dark:group-hover:opacity-40"
	></div>

	<Card.Root
		class={cn(
			'relative h-full cursor-pointer overflow-visible bg-card transition-all duration-300 group-hover:z-10 group-hover:border-transparent group-hover:shadow-2xl dark:group-hover:shadow-purple-500/10',
			member.isAlumni && 'opacity-60',
			isSelected &&
				'ring-4 ring-purple-500 ring-offset-2 ring-offset-background dark:ring-purple-400'
		)}
	>
		<!-- Animated gradient background -->
		<div
			class="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-blue-400/10"
		></div>

		<!-- Decorative corner elements -->
		<div
			class="absolute top-0 right-0 h-16 w-16 scale-0 transform rounded-bl-full bg-gradient-to-br from-pink-400/10 to-purple-400/10 transition-transform duration-300 group-hover:scale-100 dark:from-pink-400/15 dark:to-purple-400/15"
		></div>
		<div
			class="absolute bottom-0 left-0 h-12 w-12 scale-0 transform rounded-tr-full bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 transition-transform delay-75 duration-300 group-hover:scale-100 dark:from-blue-400/15 dark:to-cyan-400/15"
		></div>

		<!-- Alumni badge -->
		{#if member.isAlumni}
			<div class="absolute top-2 right-2 z-10">
				<Badge
					class="bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-white shadow-lg dark:from-amber-400 dark:to-orange-400"
				>
					🎓
				</Badge>
			</div>
		{/if}

		<div class="relative flex flex-col items-center gap-2 overflow-visible p-4 text-center">
			<!-- Avatar section -->
			<div class="group/avatar relative">
				<!-- Outer rotating ring -->
				<div
					class="absolute -inset-2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				>
					<div
						class="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400"
					></div>
					<div class="absolute inset-[2px] rounded-full bg-card"></div>
				</div>

				<!-- Middle glow layer -->
				<div
					class="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 blur-md transition-all duration-500 group-hover:opacity-60 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 dark:group-hover:opacity-40"
				></div>

				<!-- Avatar image -->
				<div class="relative">
					<img
						src={member.imagePath}
						alt={member.name}
						class="relative h-20 w-20 transform rounded-full border-2 border-border object-cover shadow-xl transition-transform duration-500 group-hover:scale-110"
					/>

					<!-- Shine effect overlay -->
					<div
						class="shine-animation absolute inset-0 -translate-x-full transform rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:translate-x-full group-hover:opacity-100 dark:from-transparent dark:via-white/10 dark:to-transparent"
					></div>
				</div>

				<!-- Tag badge -->
				{#if member.tag && !member.isAlumni}
					<div class="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 transform">
						<Badge
							class="border border-card bg-gradient-to-r from-blue-600 to-cyan-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg dark:from-blue-500 dark:to-cyan-500"
						>
							{member.tag}
						</Badge>
					</div>
				{/if}
			</div>

			<!-- Name section -->
			<div class="mt-1 w-full space-y-0.5">
				<h3
					class="line-clamp-2 min-h-[2rem] px-1 text-xs leading-tight font-black break-words text-foreground transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:from-purple-400 dark:group-hover:to-pink-400"
				>
					{member.name}
				</h3>
				<p
					class="truncate font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-foreground/70"
				>
					@{member.login}
				</p>
			</div>

			<!-- Role badge -->
			{#if member.role && member.role.length > 0}
				<div class="relative w-full">
					<Badge
						class="relative w-full justify-center overflow-hidden border-0 py-1 text-[10px] font-bold text-white shadow-md"
						style="background: linear-gradient(135deg, 
							hsl({(member.login.charCodeAt(0) * 37) % 360}, 65%, 45%), 
							hsl({(member.login.charCodeAt(0) * 37 + 60) % 360}, 65%, 55%));"
						title={member.role[0]}
					>
						<span class="relative z-10 block truncate px-2 drop-shadow-md">
							{member.role[0]}
						</span>
						<!-- Shimmer effect -->
						<div
							class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full dark:via-white/20"
						></div>
					</Badge>
				</div>
			{/if}

			<!-- Interactive hover indicator -->
			<div
				class="pointer-events-none absolute top-full -right-4 -left-4 z-30 mt-2 opacity-0 transition-all duration-300 group-hover:opacity-100"
			>
				<div
					class="rounded-lg border-2 border-purple-500/30 bg-card px-3 py-2 shadow-2xl dark:border-purple-400/40 dark:shadow-purple-500/10"
				>
					<div
						class="flex items-center justify-center gap-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400"
					>
						<span>View Profile</span>
						<ChevronRight class="animate-bounce-x h-3 w-3" />
					</div>

					<!-- Stat preview dots -->
					{#if member.stat && member.stat.length > 0}
						<div class="mt-1.5 flex justify-center gap-1 border-t border-border pt-1.5">
							{#each member.stat.slice(0, 4) as stat, idx}
								<div
									class="h-1.5 w-1.5 animate-pulse rounded-full shadow-sm"
									style="background: hsl({(idx * 80) % 360}, 70%, 60%); animation-delay: {idx *
										100}ms; box-shadow: 0 0 4px hsl({(idx * 80) % 360}, 70%, 60%);"
									title={stat.name}
								></div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Bottom accent line -->
		<div
			class="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-transform duration-500 group-hover:scale-x-100 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400"
		></div>
	</Card.Root>
</button>

<style>
	@keyframes floatIn {
		from {
			opacity: 0;
			transform: translateY(30px) scale(0.9) rotateX(20deg);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1) rotateX(0deg);
		}
	}

	:global(.animate-spin-slow) {
		animation: spin-slow 3s linear infinite;
	}

	:global(.animate-bounce-x) {
		animation: bounce-x 1s ease-in-out infinite;
	}

	.shine-animation {
		transition:
			transform 0.8s ease-in-out,
			opacity 0.5s;
	}

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes bounce-x {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4px);
		}
	}
</style>
