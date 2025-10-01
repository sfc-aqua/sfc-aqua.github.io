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

<Dialog.Root {open} {onOpenChange}>
	<Dialog.Content class="max-h-[90vh] max-w-4xl overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title class="sr-only">{member.name}</Dialog.Title>
		</Dialog.Header>

		<div class="space-y-6">
			<!-- Header Section -->
			<div class="flex flex-col items-center justify-center gap-6 md:flex-row">
				<!-- Avatar -->
				<div class="relative flex-shrink-0">
					<div
						class="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 blur-md dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 dark:opacity-50"
					></div>
					<img
						src={asset(member.imagePath)}
						alt={member.login}
						class="relative h-32 w-32 rounded-full border-4 border-card object-cover shadow-lg"
					/>
					{#if member.tag && !member.isAlumni}
						<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
							<Badge
								class="bg-gradient-to-r from-blue-600 to-cyan-600 font-bold text-white shadow-lg dark:from-blue-500 dark:to-cyan-500"
							>
								{member.tag}
							</Badge>
						</div>
					{/if}
					{#if member.isAlumni}
						<div class="absolute -top-2 -right-2">
							<Badge
								class="bg-gradient-to-r from-amber-500 to-orange-500 font-bold text-white shadow-lg dark:from-amber-400 dark:to-orange-400"
							>
								🎓 Alumni
							</Badge>
						</div>
					{/if}
				</div>

				<!-- Info -->
				<div class="flex-1 space-y-3">
					<div>
						<h2
							class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400"
						>
							{member.name} ✨
						</h2>
						<p class="mt-1 font-mono text-sm text-muted-foreground">@{member.login}</p>
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
					<figure class="relative px-2 py-4">
						<svg
							class="absolute top-0 left-0 h-6 w-6 text-purple-200 opacity-50 dark:text-purple-800"
							fill="currentColor"
							viewBox="0 0 32 32"
						>
							<path
								d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
							/>
						</svg>
						<blockquote class="relative text-center">
							<p class="px-6 font-serif text-sm leading-relaxed text-muted-foreground italic">
								{member.description}
							</p>
						</blockquote>
						<svg
							class="absolute right-0 bottom-0 h-6 w-6 rotate-180 text-purple-200 opacity-50 dark:text-purple-800"
							fill="currentColor"
							viewBox="0 0 32 32"
						>
							<path
								d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
							/>
						</svg>
					</figure>
				</div>
			</div>

			<!-- Stats Section -->
			{#if member.stat && member.stat.length > 0}
				<div
					class="space-y-3 rounded-xl border border-purple-200/50 bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:border-purple-800/30 dark:from-purple-950/30 dark:to-pink-950/30"
				>
					<h3 class="flex items-center gap-2 text-lg font-bold text-foreground">
						<span class="text-xl">📊</span>
						Power Stats
					</h3>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each member.stat as stat, idx}
							<div class="space-y-2">
								<div class="flex justify-between text-sm font-semibold">
									<span class="flex items-center gap-2 text-foreground">
										<span
											class="h-3 w-3 animate-pulse rounded-full"
											style="background: hsl({(idx * 80) %
												360}, 70%, 60%); box-shadow: 0 0 8px hsl({(idx * 80) % 360}, 70%, 60%);"
										></span>
										{stat.name}
									</span>
									<span
										class="rounded border border-border bg-card px-2 py-1 font-mono text-xs text-foreground tabular-nums shadow-sm"
									>
										{stat.value}/{stat.max}
									</span>
								</div>
								<div class="relative h-4 overflow-hidden rounded-full bg-muted shadow-inner">
									<div
										class="absolute inset-0 rounded-full shadow-lg transition-all duration-1000 ease-out"
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
				<div
					class="prose prose-sm max-w-none rounded-xl border border-border bg-card p-6 shadow-sm dark:prose-invert"
				>
					{@html member.content}
				</div>
			{/if}

			<!-- Links Section -->
			{#if member.links && member.links.length > 0}
				<div class="space-y-3">
					<h3 class="flex items-center gap-2 text-lg font-bold text-foreground">
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
								class="transform text-xs font-semibold transition-all hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg dark:hover:from-purple-400 dark:hover:to-pink-400"
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
		0%,
		100% {
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
