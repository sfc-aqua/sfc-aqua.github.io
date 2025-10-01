import type { PageLoad } from './$types'
import { allPosts } from 'content-collections'

export const load: PageLoad = async () => {
	// Fetch all posts from the content collection and filter or sort (optional)
	let posts = allPosts

	return {
		posts,
	}
}
