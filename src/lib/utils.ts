import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type TPublication } from '../publications/data'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }

// Helper function to create consistent IDs
export function createPublicationId(pub: TPublication): string {
	if (pub.title) {
		return pub.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
	}

	// Fallback to content or DOI
	if (pub.doi) {
		return `pub-${pub.doi.replace(/[^a-z0-9]+/g, '-')}`
	}

	return pub.content
		.slice(0, 50)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export function scrollToPublication(id: string): void {
	const offset = 200
	const element = document.getElementById(id)
	if (!element) {
		console.warn(`❌ Publication element with id "${id}" not found`)
		return
	}

	console.log('📍 Scrolling to:', id)
	const elementPosition = element.getBoundingClientRect().top
	const offsetPosition = elementPosition + window.scrollY - offset

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth',
	})

	// Add highlight effect
	element.classList.add('highlight-pulse')
	setTimeout(() => {
		element.classList.remove('highlight-pulse')
	}, 2000)
}

export function findPublicationById(publications: TPublication[], id: string): TPublication | null {
	const found = publications.find((pub) => createPublicationId(pub) === id)
	if (found) {
		console.log('✅ Found publication:', {
			id,
			title: found.title || found.content.slice(0, 50),
			category: found.category,
		})
	} else {
		console.warn('❌ Publication not found for id:', id)
	}
	return found || null
}

export async function waitForElement(
	id: string,
	maxAttempts: number = 50
): Promise<HTMLElement | null> {
	console.log(`⏳ Waiting for element: ${id} (max ${maxAttempts} attempts)`)

	for (let i = 0; i < maxAttempts; i++) {
		const element = document.getElementById(id)
		if (element) {
			console.log(`✅ Element found after ${i + 1} attempts`)
			return element
		}
		await new Promise((resolve) => setTimeout(resolve, 100))
	}

	console.error(`❌ Element not found after ${maxAttempts} attempts`)
	return null
}
