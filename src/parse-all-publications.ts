// parse-all-publications.ts
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'fs'
import { join, basename } from 'path'
import { memberData } from './members/order'

interface Publication {
	authors: string[]
	title: string
	venue: string
	date: string
	content: string
	contentWithoutNumber: string
	logins: string[]
}

function createNameVariations(fullName: string): string[] {
	const variations: string[] = [fullName]
	const parts = fullName.replace(/[()]/g, '').split(/\s+/)

	if (parts.length > 0) {
		variations.push(parts[parts.length - 1])
	}

	if (parts.length >= 2) {
		const initial = parts[0][0]
		const lastName = parts[parts.length - 1]
		variations.push(`${initial} ${lastName}`)
		variations.push(`${initial}. ${lastName}`)
	}

	if (parts.length >= 2) {
		variations.push(`${parts[0]} ${parts[parts.length - 1]}`)
	}

	return variations
}

const nameToLogin = new Map<string, string>()
memberData.forEach(({ login, name }) => {
	const variations = createNameVariations(name)
	variations.forEach((variation) => {
		nameToLogin.set(variation.toLowerCase(), login)
	})
})

const manualMappings: Record<string, string> = {
	'r van meter': 'rdv',
	'rodney van meter': 'rdv',
	'van meter': 'rdv',
	'm hajdušek': 'michal',
	'michal hajdušek': 'michal',
	hajdušek: 'michal',
	'n benchasattabuse': 'whit3z',
	benchasattabuse: 'whit3z',
	'naphan benchasattabuse': 'whit3z',
	's nagayama': 'shota',
	'shota nagayama': 'shota',
	nagayama: 'shota',
	'p pathumsoot': 'poramet',
	'poramet pathumsoot': 'poramet',
	pathumsoot: 'poramet',
	't satoh': 'satoh',
	'takahiko satoh': 'satoh',
	's metwali': 'sara',
	'sara metwalli': 'sara',
	's nishio': 'parton',
	'shin nishio': 'parton',
	't oka': 'takafumi',
	's suzuki': 'shigeya',
	'shigeya suzuki': 'shigeya',
	'b sane': 'bernard',
	'bernard sane': 'bernard',
	'bernard ousmane sane': 'bernard',
}

Object.entries(manualMappings).forEach(([name, login]) => {
	nameToLogin.set(name.toLowerCase(), login)
})

function matchAuthorToLogin(authorName: string): string | null {
	const normalized = authorName.toLowerCase().trim()
	return nameToLogin.get(normalized) || null
}

function parsePublicationLine(block: string): Publication | null {
	const trimmed = block.trim()
	const match = trimmed.match(/^\d+\.\s+(.+)$/s)
	if (!match) return null

	let content = match[1].replace(/\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

	content = content.replace(/\]\(publications\//g, '](/publications/')

	const parts = content.split('**')
	if (parts.length < 3) {
		return null
	}

	const authorsPart = parts[0].trim().replace(/,$/, '')
	const title = parts[1].trim()
	const rest = parts[2].trim()

	const venueMatch = rest.match(/\[([^\]]+)\]/)
	const venue = venueMatch ? venueMatch[1] : ''

	const dateMatch = rest.match(/\)\s+(.+)$/)
	const date = dateMatch ? dateMatch[1].trim() : ''

	const authorNames = authorsPart.split(',').map((a) => a.trim())
	const logins = authorNames
		.map(matchAuthorToLogin)
		.filter((login): login is string => login !== null)

	return {
		authors: authorNames,
		title,
		venue,
		date,
		content: trimmed,
		contentWithoutNumber: content,
		logins,
	}
}

function generateMarkdownFile(pub: Publication, index: number, category: string) {
	const slug = pub.title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.substring(0, 50)

	const filename = `${String(index).padStart(3, '0')}-${slug}.md`

	const frontmatter = `---
logins: [${pub.logins.map((l) => `"${l}"`).join(', ')}]
keywords: []
category: "${category}"
---

`

	const content = frontmatter + pub.contentWithoutNumber

	return { filename, content }
}
function processFile(filepath: string, outputBaseDir: string) {
	const filename = basename(filepath, '.mdx')
	console.log(`\n📄 Processing: ${filename}.mdx`)

	const fileContent = readFileSync(filepath, 'utf-8')

	const publicationBlocks = fileContent
		.split(/(?=^\d+\.\s+)/m)
		.filter((block) => block.trim().length > 0)

	console.log(`   Found ${publicationBlocks.length} publication blocks`)

	const publications = publicationBlocks
		.map(parsePublicationLine)
		.filter((pub): pub is Publication => pub !== null)

	console.log(`   Successfully parsed: ${publications.length} publications`)

	if (publications.length === 0) {
		console.log(`   ⚠️  No publications found, skipping...`)
		return
	}

	const outputDir = join(outputBaseDir, filename)
	mkdirSync(outputDir, { recursive: true })

	publications.forEach((pub, index) => {
		const { filename: mdFilename, content } = generateMarkdownFile(pub, index + 1, filename) // Pass filename as category
		const filepath = join(outputDir, mdFilename)

		writeFileSync(filepath, content, 'utf-8')
	})

	console.log(`   ✅ Created ${publications.length} files in ${outputDir}/`)
}

// Main execution
const publicationsDir = './old-publications'
const outputBaseDir = './publications'

// Get all .mdx files in the publications directory
const mdxFiles = readdirSync(publicationsDir)
	.filter((file) => file.endsWith('.mdx'))
	.map((file) => join(publicationsDir, file))

console.log(`Found ${mdxFiles.length} .mdx files to process\n`)
console.log('='.repeat(60))

mdxFiles.forEach((file) => {
	processFile(file, outputBaseDir)
})

console.log('\n' + '='.repeat(60))
console.log(`\n🎉 All done! Processed ${mdxFiles.length} files.`)
