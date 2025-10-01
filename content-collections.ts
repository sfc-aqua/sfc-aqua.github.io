import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'
import { compileMarkdown } from '@content-collections/markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { memberSchema, calculateMemberTag } from './src/members/data'
import { prePublicationSchema } from './src/publications/data'

const posts = defineCollection({
	name: 'posts',
	directory: 'src/posts',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
	}),
	transform: async (doc, context) => {
		const content = await compileMarkdown(context, doc, {
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		})

		return {
			...doc,
			slug: doc.title.toLowerCase().replace(/ /g, '-'),
			content,
		}
	},
})

const pages = defineCollection({
	name: 'pages',
	directory: 'src/pages',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
	}),
	transform: async (document, context) => {
		const content = await compileMarkdown(context, document, {
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		})
		return {
			...document,
			slug: document.title.toLowerCase().replace(/ /g, '-'),
			content,
		}
	},
})

const members = defineCollection({
	name: 'member',
	directory: 'src/members/profiles',
	include: '**/*.md',
	schema: memberSchema,
	transform: async (document, context) => {
		const content = await compileMarkdown(context, document, {
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		})

		return {
			...document,
			content,
			...calculateMemberTag(document),
		}
	},
})

const publications = defineCollection({
	name: 'publication',
	directory: 'src/publications',
	include: '**/*.md',
	schema: prePublicationSchema,
	transform: async (document, context) => {
		const content = await compileMarkdown(context, document, {
			remarkPlugins: [remarkGfm, remarkMath],
			rehypePlugins: [rehypeKatex],
		})
		return {
			...document,
			content,
		}
	},
})

export default defineConfig({
	collections: [posts, pages, members, publications],
})
