import { z } from 'zod'

export const publicationSchema = z.object({
	logins: z.string().array(),
	keywords: z.string().array(),
	category: z.string()
})

export type TPublication = z.infer<typeof publicationSchema>
