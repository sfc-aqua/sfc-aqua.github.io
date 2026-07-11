<!-- src/lib/components/members/MemberCardGlass.svelte -->
<script lang="ts">
	import type { MemberWithTag } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import { Heart, Star, TrendingUp } from 'lucide-svelte'
	import { cn } from '$lib/utils'

	type Props = {
		member: MemberWithTag
		index?: number
		onclick?: () => void
	}

	let { member, index = 0, onclick }: Props = $props()

	// Mock data for now
	const mockStats = {
		publications: Math.floor(Math.random() * 20) + 5,
		citations: Math.floor(Math.random() * 500) + 50,
		collaborations: Math.floor(Math.random() * 15) + 3,
	}

	// Generate gradient based on member
	const gradientHue = $derived((member.login.charCodeAt(0) * 37) % 360)
</script>

<button
	{onclick}
	class="group relative block w-full"
	style="animation: floatIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) {index * 0.05}s backwards;"
>
	<!-- Hover glow effect -->
	<div
		class="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"
	></div>

	<!-- Main card with glassmorphism -->
	<div
		class="group-hover:shadow-3xl relative overflow-hidden rounded-[1.75rem] border border-white/40 bg-white/70 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 dark:border-gray-800/40 dark:bg-gray-900/70"
	>
		<!-- Top gradient overlay -->
		<div
			class="absolute top-0 right-0 left-0 h-32 opacity-50"
			style="background: linear-gradient(135deg, 
				hsl({gradientHue}, 80%, 90%) 0%, 
				hsl({(gradientHue + 60) % 360}, 80%, 95%) 100%);"
		></div>

		<!-- Decorative blur circles -->
		<div class="absolute top-4 right-4 h-20 w-20 rounded-full bg-pink-300/30 blur-2xl"></div>
		<div class="absolute bottom-8 left-4 h-24 w-24 rounded-full bg-blue-300/30 blur-2xl"></div>

		<!-- Alumni badge -->
		{#if member.isAlumni}
			<div class="absolute top-4 right-4 z-10">
				<div
					class="rounded-full border border-white/60 bg-white/80 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-900/80"
				>
					<span
						class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-xs font-bold text-transparent"
					>
						🎓 Alumni
					</span>
				</div>
			</div>
		{/if}

		<!-- Content -->
		<div class="relative p-6 pt-8">
			<!-- Avatar section -->
			<div class="mb-5 flex flex-col items-center">
				<div class="relative mb-4">
					<!-- Rotating gradient ring -->
					<div
						class="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
					>
						<div class="absolute inset-[2px] rounded-full bg-white dark:bg-gray-900"></div>
					</div>

					<!-- Avatar -->
					<img
						src={member.imagePath}
						alt={member.name}
						class="relative h-24 w-24 rounded-full object-cover shadow-xl ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-110 dark:ring-gray-800/80"
					/>

					<!-- Online status -->
					{#if !member.isAlumni}
						<div
							class="absolute right-0 bottom-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg ring-4 ring-white dark:ring-gray-900"
						>
							<div class="absolute inset-1 animate-pulse rounded-full bg-green-500"></div>
						</div>
					{/if}

					<!-- Tag -->
					{#if member.tag && !member.isAlumni}
						<div class="absolute -bottom-3 left-1/2 -translate-x-1/2">
							<div
								class="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-md"
							>
								{member.tag}
							</div>
						</div>
					{/if}
				</div>

				<!-- Name -->
				<h3 class="mb-1 text-center text-lg font-bold text-gray-900 dark:text-white">
					{member.name}
				</h3>
				<p class="mb-3 font-mono text-xs text-gray-600 dark:text-gray-400">
					@{member.login}
				</p>

				<!-- Role badge -->
				{#if member.role && member.role.length > 0}
					<div
						class="rounded-full border border-white/60 bg-white/60 px-3 py-1.5 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-800/60"
					>
						<span class="text-xs font-semibold text-gray-700 dark:text-gray-300">
							{member.role[0]}
						</span>
					</div>
				{/if}
			</div>

			<!-- Mock stats -->
			<div class="mb-4 grid grid-cols-3 gap-2">
				<div
					class="rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-3 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
				>
					<div class="text-lg font-bold text-gray-900 dark:text-white">
						{mockStats.publications}
					</div>
					<div class="text-[10px] font-medium text-gray-600 dark:text-gray-400">Papers</div>
				</div>

				<div
					class="rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-3 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
				>
					<div class="text-lg font-bold text-gray-900 dark:text-white">
						{mockStats.citations}
					</div>
					<div class="text-[10px] font-medium text-gray-600 dark:text-gray-400">Citations</div>
				</div>

				<div
					class="rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-3 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
				>
					<div class="text-lg font-bold text-gray-900 dark:text-white">
						{mockStats.collaborations}
					</div>
					<div class="text-[10px] font-medium text-gray-600 dark:text-gray-400">Collabs</div>
				</div>
			</div>

			<!-- Action buttons -->
			<div class="flex justify-center gap-2">
				<div
					class="cursor-pointer rounded-xl border border-white/40 bg-pink-500/90 p-2.5 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-pink-500"
				>
					<Heart class="h-4 w-4 text-white" />
				</div>
				<div
					class="cursor-pointer rounded-xl border border-white/40 bg-yellow-500/90 p-2.5 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-yellow-500"
				>
					<Star class="h-4 w-4 text-white" />
				</div>
				<div
					class="cursor-pointer rounded-xl border border-white/40 bg-blue-500/90 p-2.5 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-blue-500"
				>
					<TrendingUp class="h-4 w-4 text-white" />
				</div>
			</div>
		</div>

		<!-- Bottom accent -->
		<div
			class="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
	</div>
</button>

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
