import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import { allPages, allPublications } from 'content-collections'
import { asset } from '$app/paths'

export const load: PageLoad = async ({ route, parent }) => {
	const { members } = await parent()

	const pcontent = allPages.find((page) => '/' + page.slug == route.id)
	if (!pcontent) {
		error(404, `Could not find ${route.id}`)
	}

	let publications = allPublications

	publications = publications.map((publication) => {
		let content = publication.content

		content = content.replace(
			/(<img[^>]*\ssrc=["'])\/publications\/([^"']+)(["'][^>]*>)/gi,
			(match, before, imagePath, after) => {
				const assetPath = asset(`/publications/${imagePath}`)
				const resolvedPath = `${before}${assetPath}${after}`
				// console.log(resolvedPath)
				return resolvedPath
			}
		)

		content = content.replace(
			/(<a[^>]*\shref=["'])\/publications\/([^"']+)(["'][^>]*>)/gi,
			(match, before, filePath, after) => {
				const assetPath = asset(`/publications/${filePath}`)
				// const assetPath = filePath
				const resolvedPath = `${before}${assetPath}${after}`
				// console.log(resolvedPath)
				return resolvedPath
				// return "assetPath"
			}
		)

		// console.log(content)

		return {
			...publication,
			content: content,
		}
	})

	return {
		pcontent: pcontent,
		publications: publications,
		members: members,
	}
}
