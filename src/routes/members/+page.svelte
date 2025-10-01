<script lang="ts">
	import type { PageProps } from './$types'
	import * as Card from '$lib/components/ui/card/index.js'
	import { Badge } from '$lib/components/ui/badge/index.js'
	import { asset } from '$app/paths'
	import { cn } from '$lib/utils'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import MemberModal from './member-modal.svelte'
	import { Sparkles, ChevronRight } from 'lucide-svelte'

	let { data }: PageProps = $props()
	
	// Derive selected member from URL params
	let selectedMemberLogin = $derived(page.url.searchParams.get('member'))
	let selectedMember = $derived(
		selectedMemberLogin 
			? data.members.find(m => m.login === selectedMemberLogin) 
			: null
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
	<div class="text-center mb-12 space-y-4">
		<h1 class="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient">
			Team Members
		</h1>
		<p class="text-muted-foreground flex items-center justify-center gap-2">
			<Sparkles class="w-4 h-4" />
			Click any card to explore
			<Sparkles class="w-4 h-4" />
		</p>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
		{#each data.members as member, i}
			<button
				onclick={() => openMemberModal(member)}
				class="group relative"
				style="animation: floatIn 0.5s ease-out {i * 0.03}s backwards;"
			>
				<!-- Glow effect on hover -->
				<div class="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-500 dark:via-purple-500 dark:to-blue-500 rounded-2xl opacity-0 group-hover:opacity-60 dark:group-hover:opacity-40 blur-xl transition-all duration-500 group-hover:duration-200 pointer-events-none z-0"></div>
				
				<Card.Root 
					class={cn(
						'relative h-full cursor-pointer overflow-visible bg-card transition-all duration-300 group-hover:border-transparent group-hover:z-10 group-hover:shadow-2xl dark:group-hover:shadow-purple-500/10',
						member.isAlumni && 'opacity-60',
						selectedMemberLogin === member.login && 'ring-4 ring-purple-500 dark:ring-purple-400 ring-offset-2 ring-offset-background'
					)}
				>
					<!-- Animated gradient background -->
					<div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
					
					<!-- Decorative corner elements -->
					<div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-purple-400/10 dark:from-pink-400/15 dark:to-purple-400/15 rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
					<div class="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 dark:from-blue-400/15 dark:to-cyan-400/15 rounded-tr-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75"></div>

					{#if member.isAlumni}
						<div class="absolute top-2 right-2 z-10">
							<Badge class="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-white font-bold text-xs shadow-lg">
								🎓
							</Badge>
						</div>
					{/if}

					<div class="relative p-4 flex flex-col items-center gap-2 text-center overflow-visible">
						<!-- Stylish Avatar with multiple layers -->
						<div class="relative group/avatar">
							<!-- Outer rotating ring -->
							<div class="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
								<div class="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 animate-spin-slow"></div>
								<div class="absolute inset-[2px] rounded-full bg-card"></div>
							</div>
							
							<!-- Middle glow layer -->
							<div class="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 rounded-full blur-md opacity-0 group-hover:opacity-60 dark:group-hover:opacity-40 transition-all duration-500"></div>
							
							<!-- Avatar image -->
							<div class="relative">
								<img
									src={asset(member.imagePath)}
									alt={member.login}
									class="relative w-20 h-20 rounded-full object-cover border-2 border-border shadow-xl transform group-hover:scale-110 transition-transform duration-500"
								/>
								
								<!-- Shine effect overlay -->
								<div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent dark:from-transparent dark:via-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full shine-animation"></div>
							</div>
							
							{#if member.tag && !member.isAlumni}
								<div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-10">
									<Badge class="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white font-bold text-[10px] px-2 py-0.5 shadow-lg border border-card">
										{member.tag}
									</Badge>
								</div>
							{/if}
						</div>

						<!-- Name with gradient on hover -->
						<div class="space-y-0.5 w-full mt-1">
							<h3 class="font-black text-xs leading-tight line-clamp-2 min-h-[2rem] text-foreground transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 dark:group-hover:from-purple-400 dark:group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent break-words px-1">
								{member.name}
							</h3>
							<p class="text-[10px] font-mono text-muted-foreground group-hover:text-foreground/70 transition-colors truncate">
								@{member.login}
							</p>
						</div>

						<!-- Role badge with shimmer effect -->
						{#if member.role && member.role.length > 0}
							<div class="relative w-full">
								<Badge
									class="relative w-full justify-center text-[10px] font-bold shadow-md border-0 text-white overflow-hidden py-1"
									style="background: linear-gradient(135deg, 
										hsl({(member.login.charCodeAt(0) * 37) % 360}, 65%, 45%), 
										hsl({(member.login.charCodeAt(0) * 37 + 60) % 360}, 65%, 55%));"
									title={member.role[0]}
								>
									<span class="relative z-10 drop-shadow-md truncate block px-2">
										{member.role[0]}
									</span>
									<!-- Shimmer effect -->
									<div
										class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/20"
									></div>
								</Badge>
							</div>
						{/if}

						<!-- Interactive hover indicator -->
						<div class="absolute -left-4 -right-4 top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
							<div class="bg-card border-2 border-purple-500/30 dark:border-purple-400/40 rounded-lg px-3 py-2 shadow-2xl dark:shadow-purple-500/10">
								<div class="flex items-center justify-center gap-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
									<span>View Profile</span>
									<ChevronRight class="w-3 h-3 animate-bounce-x" />
								</div>
								
								<!-- Stat preview dots -->
								{#if member.stat && member.stat.length > 0}
									<div class="flex gap-1 justify-center mt-1.5 pt-1.5 border-t border-border">
										{#each member.stat.slice(0, 4) as stat, idx}
											<div 
												class="w-1.5 h-1.5 rounded-full animate-pulse shadow-sm"
												style="background: hsl({(idx * 80) % 360}, 70%, 60%); animation-delay: {idx * 100}ms; box-shadow: 0 0 4px hsl({(idx * 80) % 360}, 70%, 60%);"
												title={stat.name}
											></div>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Bottom accent line -->
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
				</Card.Root>
			</button>
		{/each}
	</div>
</div>

<!-- Modal -->
{#if selectedMember}
	<MemberModal 
		member={selectedMember} 
		open={modalOpen} 
		onOpenChange={handleOpenChange} 
	/>
{/if}

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

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes bounce-x {
		0%, 100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4px);
		}
	}

	@keyframes gradient {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(.animate-spin-slow) {
		animation: spin-slow 3s linear infinite;
	}

	:global(.animate-bounce-x) {
		animation: bounce-x 1s ease-in-out infinite;
	}

	:global(.animate-gradient) {
		background-size: 200% 200%;
		animation: gradient 3s ease infinite;
	}

	.shine-animation {
		transition: transform 0.8s ease-in-out, opacity 0.5s;
	}
</style>
