import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { allPages } from 'content-collections'

export const load: PageLoad = async ({ route }) => {
	const pcontent = allPages.find((page) => '/' + page.slug == route.id)
	if (!pcontent) {
		error(404, `Could not find ${route.id}`)
	}

	return {
		pcontent: pcontent,
	}
}
