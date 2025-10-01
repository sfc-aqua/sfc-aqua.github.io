import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { allPosts } from 'content-collections'
import type { EntryGenerator } from './$types'

export const load: PageLoad = async ({ params }) => {
	const post = allPosts.find((post) => post.slug + '/' == params.slug)
	if (!post) {
		error(404, `Could not find ${params.slug}`)
	}

	return {
		post,
	}
}

export const entries: EntryGenerator = () => {
	return [{ slug: 'hello-world' }]
}
