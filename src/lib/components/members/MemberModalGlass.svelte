<!-- src/lib/components/members/MemberModalGlass.svelte -->
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog'
	import type { MemberWithTag } from '../../../members/data'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import {
		X,
		Mail,
		Github,
		Linkedin,
		ExternalLink,
		BookOpen,
		Award,
		Users,
		Calendar,
		MapPin,
	} from 'lucide-svelte'
	import { cn } from '$lib/utils'

	type Props = {
		member: MemberWithTag | null
		open: boolean
		onOpenChange: (open: boolean) => void
	}

	let { member, open, onOpenChange }: Props = $props()

	// Mock publications data
	const mockPublications = [
		{
			title: 'Quantum Error Correction in Distributed Systems',
			year: 2024,
			venue: 'Nature Quantum Information',
			citations: 42,
			featured: true,
		},
		{
			title: 'Scalable Quantum Network Architecture',
			year: 2023,
			venue: 'IEEE Quantum Computing',
			citations: 28,
			featured: false,
		},
		{
			title: 'Entanglement Distribution Protocols',
			year: 2023,
			venue: 'Physical Review A',
			citations: 35,
			featured: false,
		},
	]

	const gradientHue = $derived(member ? (member.login.charCodeAt(0) * 37) % 360 : 0)
</script>

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Portal>
		<!-- Backdrop with blur -->
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/40 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
		/>

		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
		>
			{#if member}
				<div
					class="max-h-[90vh] overflow-hidden overflow-y-auto rounded-[2rem] border border-white/40 bg-white/80 shadow-2xl backdrop-blur-2xl dark:border-gray-800/40 dark:bg-gray-900/80"
				>
					<!-- Header with gradient -->
					<div class="relative h-48 overflow-hidden">
						<!-- Animated gradient background -->
						<div
							class="absolute inset-0"
							style="background: linear-gradient(135deg, 
								hsl({gradientHue}, 80%, 85%) 0%, 
								hsl({(gradientHue + 60) % 360}, 80%, 90%) 50%,
								hsl({(gradientHue + 120) % 360}, 80%, 85%) 100%);"
						></div>

						<!-- Decorative shapes -->
						<div class="absolute top-8 right-8 h-32 w-32 rounded-full bg-white/20 blur-2xl"></div>
						<div class="absolute bottom-4 left-8 h-40 w-40 rounded-full bg-white/20 blur-2xl"></div>

						<!-- Close button -->
						<button
							onclick={() => onOpenChange(false)}
							class="absolute top-6 right-6 rounded-full border border-white/60 bg-white/80 p-2 shadow-lg backdrop-blur-md transition-transform hover:scale-110 dark:border-gray-700/60 dark:bg-gray-900/80"
						>
							<X class="h-5 w-5" />
						</button>

						<!-- Avatar -->
						<div class="absolute bottom-0 left-8 translate-y-1/2">
							<div class="relative">
								<!-- Glow ring -->
								<div
									class="absolute -inset-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-60 blur-lg"
								></div>

								<img
									src={member.imagePath}
									alt={member.name}
									class="relative h-32 w-32 rounded-full object-cover shadow-2xl ring-8 ring-white dark:ring-gray-900"
								/>

								<!-- Status -->
								{#if !member.isAlumni}
									<div
										class="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg ring-4 ring-white dark:ring-gray-900"
									>
										<div class="absolute inset-2 animate-pulse rounded-full bg-green-500"></div>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Content -->
					<div class="p-8 pt-20">
						<!-- Name and role -->
						<div class="mb-6">
							<div class="mb-2 flex items-start justify-between">
								<div>
									<h2 class="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
										{member.name}
									</h2>
									<p class="font-mono text-sm text-gray-600 dark:text-gray-400">
										@{member.login}
									</p>
								</div>

								{#if member.tag && !member.isAlumni}
									<div
										class="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md"
									>
										{member.tag}
									</div>
								{/if}
							</div>

							{#if member.role && member.role.length > 0}
								<div class="flex flex-wrap gap-2">
									{#each member.role as role}
										<div
											class="rounded-full border border-white/60 bg-white/60 px-3 py-1.5 backdrop-blur-md dark:border-gray-700/60 dark:bg-gray-800/60"
										>
											<span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
												{role}
											</span>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Description -->
						{#if member.description}
							<div
								class="mb-6 rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-6 backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
							>
								<p class="leading-relaxed text-gray-700 dark:text-gray-300">
									{member.description}
								</p>
							</div>
						{/if}

						<!-- Stats -->
						<div class="mb-6 grid grid-cols-4 gap-4">
							<div
								class="rounded-2xl border border-white/40 bg-gradient-to-br from-pink-100/60 to-pink-50/40 p-4 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-pink-900/30 dark:to-pink-800/20"
							>
								<BookOpen class="mx-auto mb-2 h-6 w-6 text-pink-600 dark:text-pink-400" />
								<div class="text-2xl font-bold text-gray-900 dark:text-white">
									{mockPublications.length}
								</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Publications</div>
							</div>

							<div
								class="rounded-2xl border border-white/40 bg-gradient-to-br from-purple-100/60 to-purple-50/40 p-4 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-purple-900/30 dark:to-purple-800/20"
							>
								<Award class="mx-auto mb-2 h-6 w-6 text-purple-600 dark:text-purple-400" />
								<div class="text-2xl font-bold text-gray-900 dark:text-white">
									{mockPublications.reduce((sum, pub) => sum + pub.citations, 0)}
								</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Citations</div>
							</div>

							<div
								class="rounded-2xl border border-white/40 bg-gradient-to-br from-blue-100/60 to-blue-50/40 p-4 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-blue-900/30 dark:to-blue-800/20"
							>
								<Users class="mx-auto mb-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
								<div class="text-2xl font-bold text-gray-900 dark:text-white">
									{Math.floor(Math.random() * 15) + 5}
								</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Collaborators</div>
							</div>

							<div
								class="rounded-2xl border border-white/40 bg-gradient-to-br from-green-100/60 to-green-50/40 p-4 text-center backdrop-blur-md dark:border-gray-700/40 dark:from-green-900/30 dark:to-green-800/20"
							>
								<Calendar class="mx-auto mb-2 h-6 w-6 text-green-600 dark:text-green-400" />
								<div class="text-2xl font-bold text-gray-900 dark:text-white">
									{new Date().getFullYear() - 2018}
								</div>
								<div class="text-xs text-gray-600 dark:text-gray-400">Years Active</div>
							</div>
						</div>

						<!-- Links -->
						{#if member.links && member.links.length > 0}
							<div
								class="mb-6 rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-6 backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
							>
								<h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Connect</h3>
								<div class="flex flex-wrap gap-3">
									{#each member.links as link}
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											class="group flex items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/60 dark:hover:bg-gray-700"
										>
											<ExternalLink
												class="h-4 w-4 text-gray-600 group-hover:text-primary dark:text-gray-400"
											/>
											<span
												class="text-sm font-medium text-gray-700 group-hover:text-primary dark:text-gray-300"
											>
												{link.name}
											</span>
										</a>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Recent Publications (Mock Data) -->
						<div
							class="rounded-2xl border border-white/40 bg-gradient-to-br from-white/50 to-white/30 p-6 backdrop-blur-md dark:border-gray-700/40 dark:from-gray-800/50 dark:to-gray-800/30"
						>
							<h3
								class="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white"
							>
								<BookOpen class="h-5 w-5" />
								Recent Publications
							</h3>
							<div class="space-y-3">
								{#each mockPublications as pub}
									<div
										class="group cursor-pointer rounded-xl border border-white/40 bg-white/40 p-4 backdrop-blur-md transition-all hover:bg-white/60 dark:border-gray-700/40 dark:bg-gray-800/40 dark:hover:bg-gray-800/60"
									>
										<div class="flex items-start gap-3">
											<div class="flex-1">
												<div class="mb-1 flex items-center gap-2">
													<h4
														class="font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-white"
													>
														{pub.title}
													</h4>
													{#if pub.featured}
														<Badge
															class="bg-gradient-to-r from-yellow-400 to-orange-400 text-xs text-white"
														>
															Featured
														</Badge>
													{/if}
												</div>
												<p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
													{pub.venue} • {pub.year}
												</p>
												<div
													class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500"
												>
													<span class="flex items-center gap-1">
														<Award class="h-3 w-3" />
														{pub.citations} citations
													</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
