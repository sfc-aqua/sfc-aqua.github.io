<!-- MemberModal.svelte -->
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js'
	import { Badge } from '$lib/components/ui/badge/index.js'
	import { Button } from '$lib/components/ui/button/index.js'
	import { asset } from '$app/paths'

	type Props = {
		member: any
		open: boolean
		onOpenChange: (open: boolean) => void
	}

	let { member, open = $bindable(), onOpenChange }: Props = $props()
</script>

<Dialog.Root {open} onOpenChange={onOpenChange}>
	<Dialog.Content class="max-w-4xl max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title class="sr-only">{member.name}</Dialog.Title>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Header Section -->
			<div class="flex flex-col md:flex-row gap-6 items-center justify-center">
				<!-- Avatar -->
				<div class="relative flex-shrink-0">
					<div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 rounded-full animate-spin-slow blur-md opacity-75 dark:opacity-50"></div>
					<img
						src={asset(member.imagePath)}
						alt={member.login}
						class="relative w-32 h-32 rounded-full object-cover border-4 border-card shadow-lg"
					/>
					{#if member.tag && !member.isAlumni}
						<div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
							<Badge class="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white font-bold shadow-lg">
								{member.tag}
							</Badge>
						</div>
					{/if}
					{#if member.isAlumni}
						<div class="absolute -top-2 -right-2">
							<Badge class="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 text-white font-bold shadow-lg">
								🎓 Alumni
							</Badge>
						</div>
					{/if}
				</div>

				<!-- Info -->
				<div class="flex-1 space-y-3">
					<div>
						<h2 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
							{member.name} ✨
						</h2>
						<p class="text-sm font-mono text-muted-foreground mt-1">@{member.login}</p>
					</div>

					<!-- Roles -->
					<div class="flex flex-wrap gap-2">
						{#each member.role as role, idx}
							<Badge
								class="text-xs font-bold text-white shadow-sm"
								style="background: linear-gradient(135deg, 
									hsl({(idx * 60) % 360}, 70%, 60%), 
									hsl({(idx * 60 + 30) % 360}, 70%, 70%));"
							>
								{role}
							</Badge>
						{/each}
					</div>

					<!-- Elegant Quote -->
					<figure class="relative py-4 px-2">
						<svg class="absolute top-0 left-0 w-6 h-6 text-purple-200 dark:text-purple-800 opacity-50" fill="currentColor" viewBox="0 0 32 32">
							<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
						</svg>
						<blockquote class="relative text-center">
							<p class="text-sm leading-relaxed italic text-muted-foreground font-serif px-6">
								{member.description}
							</p>
						</blockquote>
						<svg class="absolute bottom-0 right-0 w-6 h-6 text-purple-200 dark:text-purple-800 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 32 32">
							<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
						</svg>
					</figure>
				</div>
			</div>

			<!-- Stats Section -->
			{#if member.stat && member.stat.length > 0}
				<div class="space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
					<h3 class="text-lg font-bold flex items-center gap-2 text-foreground">
						<span class="text-xl">📊</span>
						Power Stats
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each member.stat as stat, idx}
							<div class="space-y-2">
								<div class="flex justify-between text-sm font-semibold">
									<span class="flex items-center gap-2 text-foreground">
										<span class="w-3 h-3 rounded-full animate-pulse" 
											style="background: hsl({(idx * 80) % 360}, 70%, 60%); box-shadow: 0 0 8px hsl({(idx * 80) % 360}, 70%, 60%);"></span>
										{stat.name}
									</span>
									<span class="tabular-nums font-mono bg-card border border-border px-2 py-1 rounded text-xs text-foreground shadow-sm">
										{stat.value}/{stat.max}
									</span>
								</div>
								<div class="relative h-4 bg-muted rounded-full overflow-hidden shadow-inner">
									<div 
										class="absolute inset-0 rounded-full transition-all duration-1000 ease-out shadow-lg"
										style="width: {(stat.value / stat.max) * 100}%; 
											background: linear-gradient(90deg, 
												hsl({(idx * 80) % 360}, 70%, 60%), 
												hsl({(idx * 80 + 40) % 360}, 70%, 70%));
											box-shadow: 0 0 10px hsl({(idx * 80) % 360}, 70%, 60%, 0.5);
											animation: shimmer 2s infinite;"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Content Section (from markdown) -->
			{#if member.content}
				<div class="prose prose-sm dark:prose-invert max-w-none bg-card p-6 rounded-xl border border-border shadow-sm">
					{@html member.content}
				</div>
			{/if}

			<!-- Links Section -->
			{#if member.links && member.links.length > 0}
				<div class="space-y-3">
					<h3 class="text-lg font-bold flex items-center gap-2 text-foreground">
						<span class="text-xl">🔗</span>
						Links
					</h3>
					<div class="flex flex-wrap gap-2">
						{#each member.links as link}
							<Button
								variant="outline"
								size="sm"
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs font-semibold transform transition-all hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 dark:hover:from-purple-400 dark:hover:to-pink-400 hover:text-white hover:border-transparent"
							>
								{link.name}
							</Button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes shimmer {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	:global(.animate-spin-slow) {
		animation: spin-slow 3s linear infinite;
	}
</style>
