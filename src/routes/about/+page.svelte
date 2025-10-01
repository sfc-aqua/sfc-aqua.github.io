<script lang="ts">
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const content = $derived(data.pcontent)
</script>

<div class="container mx-auto prose px-4 dark:prose-invert">
	{@html content.content}
</div>
