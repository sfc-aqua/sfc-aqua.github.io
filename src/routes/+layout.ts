import type { PageLoad } from './$types'
import { allPages, allMembers } from 'content-collections'
import { asset } from '$app/paths'

export const load: PageLoad = async () => {
	// Fetch all pages from the content collection and filter or sort (optional)
	let pages = allPages

	pages = pages.map((post) => {
		let content = post.content

		content = content.replace(
			/(<img[^>]*\ssrc=["'])\/blog_img\/([^"']+)(["'][^>]*>)/gi,
			(match, before, imagePath, after) => {
				const assetPath = asset(`/${imagePath}`)
				const resolvedPath = `${before}${assetPath}${after}`
				return resolvedPath
			}
		)

		return {
			...post,
			content: content,
		}
	})

	// Process each pages to transform image paths
	return {
		pages,
		members: allMembers,
	}
}

export const prerender = true
export const trailingSlash = 'always'
