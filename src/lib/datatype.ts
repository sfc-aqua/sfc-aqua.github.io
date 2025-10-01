import { z } from 'zod'

export const postSchema = z.object({
	title: z.string(),
	summary: z.string(),
})

export const postClientSchema = postSchema.extend({
	slug: z.string(),
	content: z.string(),
})

// Infer type from postSchema
export type Post = z.infer<typeof postClientSchema>
