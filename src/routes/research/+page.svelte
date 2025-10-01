<script lang="ts">
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const content = $derived(data.pcontent)
</script>

<div class="container mx-auto prose px-4 dark:prose-invert">
	{@html content.content}
</div>

<div class="container mx-auto prose mt-16 px-4 dark:prose-invert">
	<h1>Our publications</h1>

	{#each data.publications as publication}
		{@html publication.content}
	{/each}
</div>
