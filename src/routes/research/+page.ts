import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { allPages, allPublications } from 'content-collections'
import { asset } from '$app/paths'

export const load: PageLoad = async ({ route, parent }) => {
	const { members, publications } = await parent()

	const pcontent = allPages.find((page) => '/' + page.slug == route.id)
	if (!pcontent) {
		error(404, `Could not find ${route.id}`)
	}

	return {
		pcontent: pcontent,
		publications: publications,
		members: members,
	}
}
