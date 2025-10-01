// migrate.ts
import fs from 'fs'
import path from 'path'
import { members } from './data'

type TMember = {
	name: string
	login: string
	role: string[]
	imagePath: string
	description: string
	joinAt?: string
	level?: 'doctoral' | 'master' | 'bachelor' | 'faculty'
	links: Array<{ name: string; url: string }>
	stat?: Array<{ name: string; value: number; max: number }>
}

// Helper function to escape YAML special characters
function escapeYaml(str: string): string {
	// If string contains special characters, wrap in quotes
	if (str.match(/[:#\[\]{}|>@`"'!%&*]/) || str.includes('\n')) {
		return `"${str.replace(/"/g, '\\"')}"`
	}
	return str
}

// Helper function to convert array to YAML format
function arrayToYaml(arr: string[], indent: number = 0): string {
	const spaces = ' '.repeat(indent)
	return arr.map((item) => `${spaces}- ${escapeYaml(item)}`).join('\n')
}

// Helper function to convert object array to YAML format
function objectArrayToYaml(arr: Array<Record<string, any>>, indent: number = 0): string {
	const spaces = ' '.repeat(indent)
	return arr
		.map((obj) => {
			const keys = Object.keys(obj)
			const first = keys[0]
			let yaml = `${spaces}- ${first}: ${escapeYaml(String(obj[first]))}\n`
			for (let i = 1; i < keys.length; i++) {
				const key = keys[i]
				yaml += `${spaces}  ${key}: ${escapeYaml(String(obj[key]))}\n`
			}
			return yaml.trimEnd()
		})
		.join('\n')
}

// Generate markdown content for a member
function generateMarkdown(member: TMember): string {
	let frontmatter = '---\n'
	frontmatter += `name: ${escapeYaml(member.name)}\n`
	frontmatter += `login: ${escapeYaml(member.login)}\n`

	// Roles
	frontmatter += `role:\n${arrayToYaml(member.role, 2)}\n`

	frontmatter += `imagePath: ${escapeYaml(member.imagePath)}\n`
	frontmatter += `description: ${escapeYaml(member.description)}\n`

	// Optional fields
	if (member.joinAt) {
		frontmatter += `joinAt: ${member.joinAt}\n`
	}

	if (member.level) {
		frontmatter += `level: ${member.level}\n`
	}

	// Links
	frontmatter += `links:\n${objectArrayToYaml(member.links, 2)}\n`

	// Stats (optional)
	if (member.stat && member.stat.length > 0) {
		frontmatter += `stat:\n${objectArrayToYaml(member.stat, 2)}\n`
	}

	frontmatter += '---\n\n'

	// Add description as markdown content body
	const body = `# ${member.name}\n\n${member.description}\n`

	return frontmatter + body
}

// Main migration function
async function migrate() {
	const outputDir = path.join(process.cwd(), 'profiles/') // Adjust path as needed

	// Create directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true })
		console.log(`✅ Created directory: ${outputDir}`)
	}

	// Generate markdown file for each member
	for (const member of members) {
		const filename = `${member.login}.md`
		const filepath = path.join(outputDir, filename)
		const content = generateMarkdown(member)

		try {
			fs.writeFileSync(filepath, content, 'utf-8')
			console.log(`✅ Generated: ${filename}`)
		} catch (error) {
			console.error(`❌ Failed to generate ${filename}:`, error)
		}
	}

	console.log(`\n🎉 Migration complete! Generated ${members.length} files.`)
}

// Run migration
migrate().catch((error) => {
	console.error('Migration failed:', error)
	process.exit(1)
})
