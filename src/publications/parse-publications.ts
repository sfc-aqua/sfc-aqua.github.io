// parse-publications.ts
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { memberData } from '../members/order'

interface Publication {
	authors: string[]
	title: string
	venue: string
	date: string
	content: string
	contentWithoutNumber: string
	logins: string[]
}

// Create name variations for matching
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

// Build lookup map
const nameToLogin = new Map<string, string>()
memberData.forEach(({ login, name }) => {
	const variations = createNameVariations(name)
	variations.forEach((variation) => {
		nameToLogin.set(variation.toLowerCase(), login)
	})
})

// Additional manual mappings
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

	// Collapse multiple lines into one and normalize whitespace
	let content = match[1]
		.replace(/\n\s*/g, ' ') // Replace newlines and following whitespace with a single space
		.replace(/\s+/g, ' ') // Replace multiple spaces with single space
		.trim()

	// Fix relative links to absolute links
	content = content.replace(/\]\(publications\//g, '](/publications/')

	const parts = content.split('**')
	if (parts.length < 3) {
		console.log('⚠️  Skipping - no title found in:', content.substring(0, 50) + '...')
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

// PASTE YOUR PUBLICATION LIST HERE
const publicationText = `
1.  Rodney Van Meter and Shota Nagayama for the WIDE AQUA group members,
    **AQUA: Advancing Quantum Architecture Annual Report 2010**
    [WIDE Project](http://www.wide.ad.jp/) working group report. Brief intro into "Why quantum?" and a snapshot of work going on not just at SFC but in the WIDE Project at large. Dec. 2010.
2.  Donna Dodson, Mikio Fujiwara, Philippe Grangier, Masahito Hayashi, Kentaro Imafuku, Ken-ichi Kitayama, Prem Kumar, Christian Kurtsiefer, Gaby Lenhart, Norbert Luetkenhaus, Tsutomu Matsumoto, William J. Munro, Tsuyoshi Nishioka, Momtchil Peev, Masahide Sasaki, Yutaka Sata, Atsushi Takada, Masahiro Takeoka, Kiyoshi Tamaki, Hidema Tanaka, Yasuhiro Tokura, Akihisa Tomita, Morio Toyoshima, Rodney van Meter, Atsuhiro Yamagishi, Yoshihisa Yamamoto, Akihiro Yamamura,
    **Updating Quantum Cryptography Report ver. 1,**
    available from the [arXiv](http://arxiv.org/) as [quant-ph:0905.4325](http://arxiv.org/abs/0905.4325).
`

function generateMarkdownFile(pub: Publication, index: number) {
	const slug = pub.title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.substring(0, 50)

	const filename = `${String(index).padStart(3, '0')}-${slug}.md`

	const frontmatter = `---
logins: [${pub.logins.map((l) => `"${l}"`).join(', ')}]
keywords: []
---

`

	const content = frontmatter + pub.contentWithoutNumber

	return { filename, content }
}

// Main execution
// Replace the "Main execution" section with this:

console.log('Starting parsing...')
console.log(`Publication text length: ${publicationText.length} characters`)

// Split by the pattern "number." at the start of a line to group multi-line publications
const publicationBlocks = publicationText
	.split(/(?=^\d+\.\s+)/m)
	.filter((block) => block.trim().length > 0)

console.log(`Found ${publicationBlocks.length} publication blocks`)

const outputDir = './src/publications/committee-and-working-group-reports'
try {
	mkdirSync(outputDir, { recursive: true })
} catch (e) {
	// Directory exists
}

const publications = publicationBlocks
	.map(parsePublicationLine)
	.filter((pub): pub is Publication => pub !== null)

console.log(`\nSuccessfully parsed: ${publications.length} publications\n`)

publications.forEach((pub, index) => {
	const { filename, content } = generateMarkdownFile(pub, index + 1)
	const filepath = join(outputDir, filename)

	writeFileSync(filepath, content, 'utf-8')

	console.log(`✓ Created: ${filename}`)
	console.log(`  Authors: ${pub.authors.join(', ')}`)
	console.log(`  Logins: ${pub.logins.length > 0 ? pub.logins.join(', ') : '❌ NONE'}`)
	console.log('')
})

console.log(`\n✅ Generated ${publications.length} markdown files in ${outputDir}/`)
