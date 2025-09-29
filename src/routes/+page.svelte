<script lang="ts">
	import type { PageProps } from './$types'
	import { resolve } from '$app/paths'
	import { Button } from '$lib/components/ui/button/index.js'

	let { data }: PageProps = $props()
</script>

<h1>Posts</h1>
<ul>
	{#each data.posts as post}
		<li>
			<h2>{post.title}</h2>
			<p>{post.summary}</p>
			<Button variant='link' href={resolve(`/posts/${post.slug}/`)}>Read more</Button>
		</li>
	{/each}
</ul>
