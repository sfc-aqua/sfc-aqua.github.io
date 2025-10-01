import type { PageLoad } from './$types'
import { allPages, allMembers, allPublications } from 'content-collections'
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

	let members = allMembers

	members = members.map((member) => {
		let content = member.content

		content = content.replace(
			/(<img[^>]*\ssrc=["'])\/members\/([^"']+)(["'][^>]*>)/gi,
			(match, before, imagePath, after) => {
				const assetPath = asset(`/${imagePath}`)
				const resolvedPath = `${before}${assetPath}${after}`
				return resolvedPath
			}
		)

		let imagePath = asset(`/${member.imagePath.slice(1)}`)
		// console.log(imagePath)

		return {
			...member,
			content: content,
			imagePath: imagePath,
		}
	})

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

	// Process each pages to transform image paths
	return {
		pages,
		members: members,
		publications: publications,
	}
}

export const prerender = true
export const trailingSlash = 'always'
