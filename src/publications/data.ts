import { z } from 'zod'

export const prePublicationSchema = z.object({
	logins: z.string().array(),
	keywords: z.string().array(),
	category: z.string(),
	// Add these fields:
	title: z.string().optional(),
	year: z.number().nullable(),
	month: z.number().optional(),
	venue: z.string().optional(), // Journal/Conference name
	doi: z.string().optional(),
	url: z.string().optional(), // Link to paper/PDF
	citations: z.number().default(0).optional(), // Citation count
	views: z.number().default(0).optional(), // Page views
	featured: z.boolean().default(false).optional(), // Highlight important papers
	abstract: z.string().optional(),
	bibtex: z.string().optional(),
})

export type TPrePublication = z.infer<typeof prePublicationSchema>

export const publicationSchema = prePublicationSchema.extend({
	content: z.string(),
})

export type TPublication = z.infer<typeof publicationSchema>
