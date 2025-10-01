<script lang="ts">
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const post = $derived(data.post)
</script>

<div class="container mx-auto prose px-4 dark:prose-invert">
	{@html post.content}
</div>
