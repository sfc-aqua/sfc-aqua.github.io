<script lang="ts">
	import type { PageProps } from './$types'
	import {
		member1 as member,
		memberSchema,
		getLinkIcon,
		publications,
		enrichMemberWithStats,
		allMembers,
	} from './mock'
	import { Button } from '$lib/components/ui/button'
	import { Badge } from '$lib/components/ui/badge'
	import MemberImage from './MemberImage.svelte'
	import MemberPublicationStat from './MemberPublicationStat.svelte'

	let { data }: PageProps = $props()
</script>

{#snippet aqualogo()}
	<div
		class="relative isolate flex h-14 w-14 items-center justify-center overflow-hidden rounded-full"
	>
		<!-- Background circle -->
		<div class="absolute h-14 w-14 rounded-full bg-slate-200"></div>

		<!-- Wave emoji (absolutely positioned) -->
		<span
			class="absolute -top-[21px] -left-[18px] z-10 flex h-[84px] w-[92px] items-center justify-center text-[64px] leading-[80%] font-bold text-black"
		>
			🌊
		</span>
	</div>
{/snippet}

{#snippet continuous({
	name,
	value,
	unit,
	color,
	min,
	max,
}: {
	name: string
	value: number
	unit: string
	color: string
	min: number
	max: number
})}
	{@const percentage = ((value - min) / (max - min)) * 100}
	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<p class="text-sm font-medium text-gray-900">{name}</p>
			<p class="text-sm text-gray-600">{value}{unit}</p>
		</div>
		<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
			<div
				class="h-full rounded-full transition-all duration-500"
				style="width: {percentage}%; background-color: {color}"
			></div>
		</div>
	</div>
{/snippet}

{#snippet discrete({ name, value, options }: { name: string; value: string; options: string[] })}
	<div class="space-y-2">
		<p class="text-sm font-medium text-gray-900">{name}</p>
		<div class="flex gap-1 rounded-full bg-slate-200">
			{#each options as option}
				<button
					class="rounded-full px-3 py-1.5 text-xs font-medium transition-all"
					class:bg-primary={option === value}
					class:text-white={option === value}
					class:bg-slate-200={option !== value}
					class:text-gray-700={option !== value}
					disabled
				>
					{option}
				</button>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet list({ name, items }: { name: string; items: string[] })}
	<div class="space-y-2">
		<p class="text-sm font-medium text-gray-900">{name}</p>
		<div class="flex flex-wrap gap-2">
			{#each items as item}
				<span
					class="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
				>
					{item}
				</span>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet boolean({ name, value }: { name: string; value: boolean })}
	<div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
		<p class="text-sm font-medium text-gray-900">{name}</p>
		<div class="flex items-center gap-2">
			<span class="text-xs text-gray-600">{value ? 'Yes' : 'No'}</span>
			<div
				class="h-5 w-9 rounded-full transition-all"
				class:bg-primary={value}
				class:bg-gray-300={!value}
			>
				<div
					class="h-5 w-5 rounded-full bg-white shadow transition-transform"
					class:translate-x-4={value}
					class:translate-x-0={!value}
				></div>
			</div>
		</div>
	</div>
{/snippet}

<div class="flex h-[80vh] flex-col gap-2 overflow-y-scroll bg-background p-2 sm:flex-row">
	<!-- Left Sidebar -->
	<div
		class="flex h-18 w-full flex-shrink-0 items-center gap-2 rounded-[60px] bg-slate-200 p-2 sm:h-full sm:w-18 sm:flex-col"
	>
		<!-- Logo Section -->
		{@render aqualogo()}

		<!-- Links Section -->
		<div
			class="flex h-full flex-1 items-center gap-3 rounded-[60px] bg-white px-4 sm:w-full sm:flex-col sm:py-4"
		>
			{#each member.links as social}
				{@const Icon = getLinkIcon(social.name)}
				<Button variant="ghost" size="icon" href={social.url} class="rounded-full text-primary">
					<Icon />
				</Button>
			{/each}
		</div>
	</div>

	<!-- Main Content Area -->
	<div class="flex flex-1 items-center justify-center">
		<div
			class="relative h-[50vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-gray-900 sm:h-full"
		>
			<div
				class="relative flex h-full flex-col items-end justify-between bg-cover bg-center p-3"
				style="background-image: url('{member.imagePath}');"
			>
				<!-- Gradient Overlay -->
				<div
					class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"
				></div>

				<div class="flex h-14 w-full justify-center">
					<div
						class="flex w-min items-center rounded-[60px] bg-white/20 px-10 font-lobster text-xl text-nowrap text-white backdrop-blur-md"
					>
						{member.quote}
					</div>
				</div>

				<div
					class="flex w-min flex-col justify-end gap-3 rounded-3xl bg-white/20 p-4 backdrop-blur-md"
				>
					<!-- Texts Row (Date + Name) -->
					<div class="flex w-min flex-row items-center justify-between gap-4">
						<!-- Date Section -->
						{#if member.joinAt}
							<div class="flex flex-col text-white/80">
								<p class="text-[11px] tracking-wider uppercase">
									{member.joinAt.toLocaleDateString('en-US', {
										month: 'short',
										year: 'numeric',
									})}
								</p>
								<p class="text-5xl leading-none font-bold">
									{member.joinAt.getDate().toString().padStart(2, '0')}
								</p>
							</div>
						{/if}

						<!-- Name Section -->
						<div class="flex flex-col items-center">
							<h2 class="font-lobster text-5xl leading-none text-primary italic">
								{member.name.split(' ')[0]}
							</h2>
							<h3 class="text-xl leading-tight font-bold tracking-wide text-white uppercase">
								{member.name.split(' ').pop()}
							</h3>
						</div>
					</div>

					<!-- Tags Row -->
					<div class="gap-1 text-wrap">
						{#each [member.level && member.level.slice(0, 2), member.login.toLowerCase(), ...member.role] as role, idx}
							<Badge
								variant={idx === 0 ? 'stylist' : idx === 1 ? 'default' : 'secondary'}
								class="mx-1"
							>
								{role}
							</Badge>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Right Sidebar (Skills/Stats) -->
	<div class="flex h-full w-full flex-shrink-0 flex-col gap-2 rounded-2xl bg-slate-200 p-2 sm:w-80">
		<div class="flex h-full flex-col gap-2 overflow-y-scroll rounded-2xl bg-white p-6">
			<h3 class="text-xl font-bold text-primary">SKILL</h3>

			<!-- Stats -->
			{#if member.stats && member.stats.length > 0}
				<div class="space-y-4">
					{#each member.stats as stat}
						{#if stat.type === 'continuous'}
							{@render continuous({
								name: stat.name,
								value: stat.value,
								max: stat.max,
								min: stat.min || 0,
								color: stat.color || '#fff',
								unit: stat.unit || '',
							})}
						{:else if stat.type === 'discrete'}
							{@render discrete({
								name: stat.name,
								value: stat.value,
								options: stat.options,
							})}
						{:else if stat.type === 'list'}
							{@render list({
								name: stat.name,
								items: stat.items,
							})}
						{:else if stat.type === 'boolean'}
							{@render boolean({
								name: stat.name,
								value: stat.value,
							})}
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-sm text-gray-500">No stats available</p>
			{/if}
		</div>

		<div class="flex flex-col gap-2 rounded-2xl bg-white p-6">
			<!-- Publications -->
			<!-- <div class="mt-auto">
				<p class="text-6xl font-bold">73</p>
				<p class="text-gray-600">Publications</p>
			</div> -->

			<!-- Co-authors -->
			<!-- <div>
				<p class="mb-2 text-sm font-medium text-gray-600">Top Co-Authors</p>
				<div class="flex -space-x-2">
					<div class="h-10 w-10 rounded-full bg-gray-300 ring-2 ring-white"></div>
					<div class="h-10 w-10 rounded-full bg-gray-400 ring-2 ring-white"></div>
					<div class="h-10 w-10 rounded-full bg-gray-500 ring-2 ring-white"></div>
				</div>
			</div> -->
			<MemberPublicationStat
				member={enrichMemberWithStats(member, publications, allMembers)}
			/>
		</div>
	</div>
</div>
