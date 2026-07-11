import { z } from 'zod'
import { type TPublication } from '../../publications/data'

export const memberSchema = z.object({
	name: z.string(),
	login: z.string(), // This serves as the nickname/username
	role: z.string().array(),
	imagePath: z.string(),
	description: z.string(),
	quote: z.string().optional(),
	joinAt: z.coerce.date().optional(),
	level: z.enum(['doctoral', 'master', 'bachelor', 'faculty']).optional(),
	extend: z.boolean().default(false).optional(),
	content: z.string().optional(),

	links: z
		.object({
			name: z.string(),
			url: z.string(),
		})
		.array(),

	stats: z
		.discriminatedUnion('type', [
			z.object({
				type: z.literal('continuous'),
				name: z.string(),
				value: z.number(),
				min: z.number().default(0).optional(),
				max: z.number(),
				color: z.string().optional(),
				unit: z.string().optional(),
			}),
			z.object({
				type: z.literal('discrete'),
				name: z.string(),
				value: z.string(),
				options: z.string().array(),
			}),
			z.object({
				type: z.literal('list'),
				name: z.string(),
				items: z.string().array(),
			}),
			z.object({
				type: z.literal('boolean'),
				name: z.string(),
				value: z.boolean(),
			}),
		])
		.array()
		.optional(),
})

export type Member = z.infer<typeof memberSchema>

// types/links.ts
import type { Component } from 'svelte'
import {
	Github,
	Linkedin,
	Twitter,
	Mail,
	Globe,
	GraduationCap,
	BookOpen,
	Fingerprint,
	Microscope,
	FileText,
	Youtube,
	Facebook,
	Instagram,
	MessageCircle,
	Code,
	Gitlab,
	Link,
	Building,
	FlaskConical,
	ScrollText,
} from 'lucide-svelte'

export const linkIconMap: Record<string, any> = {
	// Code repositories
	github: Github,
	gitlab: Gitlab,
	bitbucket: Code,

	// Academic/Research
	'google scholar': GraduationCap,
	scholar: GraduationCap,
	orcid: Fingerprint,
	researchgate: Microscope,
	arxiv: FileText,
	pubmed: BookOpen,
	'semantic scholar': BookOpen,
	dblp: ScrollText,

	// Social Media
	linkedin: Linkedin,
	twitter: Twitter,
	x: Twitter,
	facebook: Facebook,
	instagram: Instagram,
	youtube: Youtube,
	discord: MessageCircle,
	telegram: MessageCircle,

	// Professional
	email: Mail,
	website: Globe,
	homepage: Globe,
	portfolio: Globe,
	'personal website': Globe,
	'lab website': Building,
	lab: FlaskConical,

	// Default fallback
	default: Link,
}

// Helper function to get icon (case-insensitive)
export function getLinkIcon(linkName: string): Component {
	const normalizedName = linkName.toLowerCase().trim()
	return linkIconMap[normalizedName] || linkIconMap['default']
}

// Optional: Link color map for styling
export const linkColorMap: Record<string, string> = {
	github: '#181717',
	gitlab: '#FC6D26',
	linkedin: '#0A66C2',
	twitter: '#1DA1F2',
	x: '#000000',
	facebook: '#1877F2',
	instagram: '#E4405F',
	youtube: '#FF0000',
	'google scholar': '#4285F4',
	orcid: '#A6CE39',
	researchgate: '#00D0AF',
	email: '#EA4335',
	website: '#6366F1',
}

export function getLinkColor(linkName: string): string | undefined {
	const normalizedName = linkName.toLowerCase().trim()
	return linkColorMap[normalizedName]
}

export type CoAuthor = {
	login: string
	publications: number
	member?: Member
}

export type MemberWithStats = Member & {
	publications: number
	coAuthors: CoAuthor[]
	recentPublications: TPublication[]
	topKeywords: { keyword: string; count: number }[]
}

/**
 * Calculate total publications for a member
 */
export function getMemberPublicationCount(
	memberLogin: string,
	publications: TPublication[]
): number {
	return publications.filter((pub) => pub.logins.includes(memberLogin)).length
}

/**
 * Get all co-authors for a member with publication counts
 */
export function getMemberCoAuthors(
	memberLogin: string,
	publications: TPublication[],
	allMembers: Member[]
): CoAuthor[] {
	const coAuthorMap = new Map<string, number>()

	// Find all publications by this member
	const memberPubs = publications.filter((pub) => pub.logins.includes(memberLogin))

	// Count co-authors
	memberPubs.forEach((pub) => {
		pub.logins.forEach((login) => {
			if (login !== memberLogin) {
				coAuthorMap.set(login, (coAuthorMap.get(login) || 0) + 1)
			}
		})
	})

	// Convert to array and sort by publication count
	const coAuthors: CoAuthor[] = Array.from(coAuthorMap.entries())
		.map(([login, count]) => ({
			login,
			publications: count,
			member: allMembers.find((m) => m.login === login),
		}))
		.sort((a, b) => b.publications - a.publications)

	return coAuthors
}

/**
 * Get recent publications for a member
 */
export function getMemberRecentPublications(
	memberLogin: string,
	publications: TPublication[],
	limit = 5
): TPublication[] {
	return (
		publications
			.filter((pub) => pub.logins.includes(memberLogin))
			// .sort((a, b) => b.year - a.year)
			.slice(0, limit)
	)
}

/**
 * Get top keywords for a member
 */
export function getMemberTopKeywords(
	memberLogin: string,
	publications: TPublication[],
	limit = 5
): { keyword: string; count: number }[] {
	const keywordMap = new Map<string, number>()

	publications
		.filter((pub) => pub.logins.includes(memberLogin))
		.forEach((pub) => {
			pub.keywords.forEach((keyword) => {
				keywordMap.set(keyword, (keywordMap.get(keyword) || 0) + 1)
			})
		})

	return Array.from(keywordMap.entries())
		.map(([keyword, count]) => ({ keyword, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, limit)
}

/**
 * Enrich a member with publication statistics
 */
export function enrichMemberWithStats(
	member: Member,
	publications: TPublication[],
	allMembers: Member[]
): MemberWithStats {
	return {
		...member,
		publications: getMemberPublicationCount(member.login, publications),
		coAuthors: getMemberCoAuthors(member.login, publications, allMembers),
		recentPublications: getMemberRecentPublications(member.login, publications),
		topKeywords: getMemberTopKeywords(member.login, publications),
	}
}

/**
 * Enrich all members with publication statistics
 */
export function enrichAllMembers(
	members: Member[],
	publications: TPublication[]
): MemberWithStats[] {
	return members.map((member) => enrichMemberWithStats(member, publications, members))
}

/**
 * Get collaboration matrix between members
 */
export function getCollaborationMatrix(
	members: Member[],
	publications: TPublication[]
): Map<string, Map<string, number>> {
	const matrix = new Map<string, Map<string, number>>()

	members.forEach((member) => {
		matrix.set(member.login, new Map())
	})

	publications.forEach((pub) => {
		// For each pair of authors in this publication
		for (let i = 0; i < pub.logins.length; i++) {
			for (let j = i + 1; j < pub.logins.length; j++) {
				const login1 = pub.logins[i]
				const login2 = pub.logins[j]

				if (matrix.has(login1)) {
					const row = matrix.get(login1)!
					row.set(login2, (row.get(login2) || 0) + 1)
				}

				if (matrix.has(login2)) {
					const row = matrix.get(login2)!
					row.set(login1, (row.get(login1) || 0) + 1)
				}
			}
		}
	})

	return matrix
}

export const member1: Member = {
	name: 'Poramet Pathumsoot',
	login: 'poramet',
	role: ['Homesicker', 'Research Assistant'],
	imagePath: '/members/poramet.jpg',
	description: 'To boldly go where no one has gone before',
	quote: "Life is beautiful, isn't it?",
	joinAt: new Date('2022-10-07'),
	level: 'doctoral',
	extend: true,
	content: 'In our endeavor to venture forth into the unknown...',
	links: [
		{ name: 'Github', url: 'https://github.com/PorametPat' },
		{ name: 'Google Scholar', url: 'https://scholar.google.com/poramet' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/poramet' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'Strength',
			value: 20,
			max: 100,
			color: '#3B82F6',
		},
		{
			type: 'continuous',
			name: 'Agility',
			value: 30,
			max: 100,
			color: '#10B981',
		},
		{
			type: 'continuous',
			name: 'Intelligence',
			value: 50,
			max: 100,
			color: '#8B5CF6',
		},
		{
			type: 'continuous',
			name: 'Luck',
			value: 10,
			max: 100,
			color: '#FF4B8B',
		},
		{
			type: 'discrete',
			name: 'Python',
			value: 'Intermediate',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'discrete',
			name: 'Machine Learning',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Listed',
			items: ['Test', 'Ultimate'],
		},
		{
			type: 'list',
			name: 'Certifications',
			items: ['AWS Certified', 'TensorFlow Developer'],
		},
		{
			type: 'boolean',
			name: 'Available for Collaboration',
			value: true,
		},
	],
}

export const member2: Member = {
	name: 'Sarah Chen',
	login: 'sarah_chen',
	role: ['AI Researcher', 'Teaching Assistant'],
	imagePath: '/members/sara.JPG',
	description: 'Exploring the intersection of NLP and computer vision',
	quote: 'The best way to predict the future is to invent it.',
	joinAt: new Date('2023-01-15'),
	level: 'master',
	extend: false,
	links: [
		{ name: 'Github', url: 'https://github.com/sarahchen' },
		{ name: 'Twitter', url: 'https://twitter.com/sarahchen_ai' },
		{ name: 'Google Scholar', url: 'https://scholar.google.com/sarah' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'Research Productivity',
			value: 75,
			max: 100,
			color: '#EC4899',
		},
		{
			type: 'continuous',
			name: 'Code Quality',
			value: 85,
			max: 100,
			color: '#06B6D4',
		},
		{
			type: 'discrete',
			name: 'PyTorch',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'discrete',
			name: 'React',
			value: 'Intermediate',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Research Areas',
			items: ['NLP', 'Computer Vision', 'Multimodal Learning'],
		},
		{
			type: 'boolean',
			name: 'Seeking PhD Position',
			value: true,
		},
	],
}

export const member3: Member = {
	name: 'Michael Wong',
	login: 'michael_wong',
	role: ['Principal Investigator', 'Associate Professor'],
	imagePath: '/members/michal.png',
	description: 'Leading research in deep learning and AI ethics',
	quote: 'Science is not only a disciple of reason but also one of romance and passion.',
	joinAt: new Date('2018-08-01'),
	level: 'faculty',
	extend: true,
	links: [
		{ name: 'Github', url: 'https://github.com/michaelwong' },
		{ name: 'Google Scholar', url: 'https://scholar.google.com/michaelwong' },
		{ name: 'Lab Website', url: 'https://lab.university.edu/wong' },
		{ name: 'ORCID', url: 'https://orcid.org/0000-0001-2345-6789' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'h-index',
			value: 42,
			max: 100,
			color: '#F59E0B',
		},
		{
			type: 'continuous',
			name: 'Leadership',
			value: 95,
			max: 100,
			color: '#8B5CF6',
		},
		{
			type: 'discrete',
			name: 'Teaching Load',
			value: 'Medium',
			options: ['Light', 'Medium', 'Heavy'],
		},
		{
			type: 'list',
			name: 'Current Projects',
			items: ['NSF Grant AI-2024', 'Industry Collaboration', 'EU Horizon'],
		},
		{
			type: 'list',
			name: 'Editorial Boards',
			items: ['JMLR', 'NeurIPS', 'ICML'],
		},
		{
			type: 'boolean',
			name: 'Accepting Students',
			value: true,
		},
	],
}

export const member4: Member = {
	name: 'Priya Kumar',
	login: 'priya_kumar',
	role: ['Undergraduate Researcher'],
	imagePath: '/members/whit3z.png',
	description: 'Passionate about robotics and reinforcement learning',
	quote: 'Every expert was once a beginner.',
	joinAt: new Date('2024-03-10'),
	level: 'bachelor',
	links: [
		{ name: 'Github', url: 'https://github.com/priyakumar' },
		{ name: 'Portfolio', url: 'https://priyakumar.dev' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/priyakumar' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'GPA',
			value: 3.8,
			min: 0,
			max: 4.0,
			color: '#14B8A6',
		},
		{
			type: 'continuous',
			name: 'Enthusiasm',
			value: 95,
			max: 100,
			color: '#F59E0B',
		},
		{
			type: 'discrete',
			name: 'C++',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'discrete',
			name: 'ROS',
			value: 'Intermediate',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Interests',
			items: ['Robotics', 'RL', 'Simulation'],
		},
		{
			type: 'boolean',
			name: 'Available for Internship',
			value: true,
		},
	],
}

export const member5: Member = {
	name: 'James Lee',
	login: 'james_lee',
	role: ['PhD Candidate', 'Lab Manager'],
	imagePath: '/members/bob.jpg',
	description: 'Researching explainable AI and model interpretability',
	quote: 'Understanding is the key to trust.',
	joinAt: new Date('2020-09-01'),
	level: 'doctoral',
	extend: true,
	links: [
		{ name: 'Github', url: 'https://github.com/jameslee' },
		{ name: 'Google Scholar', url: 'https://scholar.google.com/james' },
		{ name: 'Twitter', url: 'https://twitter.com/jameslee_ai' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'Publications',
			value: 18,
			max: 50,
			color: '#8B5CF6',
			unit: '',
		},
		{
			type: 'continuous',
			name: 'Mentoring',
			value: 80,
			max: 100,
			color: '#10B981',
		},
		{
			type: 'discrete',
			name: 'TensorFlow',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Focus Areas',
			items: ['XAI', 'Model Interpretability', 'Fairness in AI'],
		},
		{
			type: 'boolean',
			name: 'Defense Scheduled',
			value: true,
		},
	],
}

export const member6: Member = {
	name: 'Emma Garcia',
	login: 'emma_garcia',
	role: ['Postdoctoral Researcher'],
	imagePath: '/members/banknatchapol.jpg',
	description: 'Investigating neural architecture search and AutoML',
	quote: 'Automate the automation.',
	joinAt: new Date('2023-06-01'),
	level: 'faculty',
	links: [
		{ name: 'Github', url: 'https://github.com/emmagarcia' },
		{ name: 'Google Scholar', url: 'https://scholar.google.com/emma' },
		{ name: 'ResearchGate', url: 'https://researchgate.net/emma' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'Citations',
			value: 450,
			max: 1000,
			color: '#EF4444',
			unit: '',
		},
		{
			type: 'continuous',
			name: 'Innovation',
			value: 90,
			max: 100,
			color: '#F59E0B',
		},
		{
			type: 'discrete',
			name: 'JAX',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Expertise',
			items: ['NAS', 'AutoML', 'Meta-Learning'],
		},
		{
			type: 'boolean',
			name: 'Looking for Faculty Position',
			value: true,
		},
	],
}

export const member7: Member = {
	name: 'Alex Thompson',
	login: 'alex_thompson',
	role: ['Master Student', 'Data Scientist'],
	imagePath: '/members/cocori.png',
	description: 'Bridging theory and practice in machine learning applications',
	joinAt: new Date('2023-09-01'),
	level: 'master',
	links: [
		{ name: 'Github', url: 'https://github.com/alexthompson' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/alexthompson' },
	],
	stats: [
		{
			type: 'continuous',
			name: 'Industry Experience',
			value: 3,
			max: 10,
			color: '#3B82F6',
			unit: ' yrs',
		},
		{
			type: 'discrete',
			name: 'SQL',
			value: 'Advanced',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'discrete',
			name: 'Docker',
			value: 'Intermediate',
			options: ['Beginner', 'Intermediate', 'Advanced'],
		},
		{
			type: 'list',
			name: 'Tech Stack',
			items: ['Python', 'Spark', 'Kubernetes'],
		},
		{
			type: 'boolean',
			name: 'Remote Work',
			value: true,
		},
	],
}

// Export all members
export const allMembers: Member[] = [member1, member2, member3, member4, member5, member6, member7]

export const publications: TPublication[] = [
	{
		logins: ['poramet', 'sarah_chen', 'michael_wong'],
		keywords: ['Deep Learning', 'Computer Vision', 'Object Detection'],
		category: 'Computer Vision',
		title: 'Efficient Object Detection in Low-Light Conditions',
		year: 2024,
		month: 3,
		venue: 'CVPR 2024',
		doi: '10.1109/CVPR.2024.12345',
		citations: 15,
		views: 234,
		featured: true,
		abstract: 'We propose a novel approach to object detection...',
		content: '',
	},
	{
		logins: ['poramet', 'james_lee', 'michael_wong'],
		keywords: ['Explainable AI', 'Model Interpretability', 'Deep Learning'],
		category: 'Explainable AI',
		title: 'Understanding Deep Neural Networks Through Layer-wise Analysis',
		year: 2023,
		month: 11,
		venue: 'NeurIPS 2023',
		doi: '10.5555/neurips.2023.678',
		citations: 42,
		views: 567,
		featured: true,
		content: '',
	},
	{
		logins: ['sarah_chen', 'poramet', 'emma_garcia'],
		keywords: ['NLP', 'Transformers', 'Multimodal Learning'],
		category: 'Natural Language Processing',
		title: 'Cross-Modal Attention Mechanisms for Vision-Language Tasks',
		year: 2024,
		month: 1,
		venue: 'ACL 2024',
		doi: '10.18653/v1/2024.acl-long.123',
		citations: 8,
		views: 145,
		content: '',
	},
	{
		logins: ['michael_wong', 'james_lee', 'emma_garcia'],
		keywords: ['AI Ethics', 'Fairness', 'Bias Detection'],
		category: 'AI Ethics',
		title: 'Detecting and Mitigating Bias in Large Language Models',
		year: 2023,
		month: 8,
		venue: 'FAccT 2023',
		doi: '10.1145/facct.2023.456',
		citations: 67,
		views: 892,
		featured: true,
		content: '',
	},
	{
		logins: ['priya_kumar', 'poramet', 'james_lee'],
		keywords: ['Robotics', 'Reinforcement Learning', 'Sim-to-Real'],
		category: 'Robotics',
		title: 'Sim-to-Real Transfer for Robotic Manipulation Tasks',
		year: 2024,
		month: 5,
		venue: 'ICRA 2024',
		doi: '10.1109/ICRA.2024.789',
		citations: 5,
		views: 89,
		content: '',
	},
	{
		logins: ['emma_garcia', 'michael_wong', 'alex_thompson'],
		keywords: ['AutoML', 'Neural Architecture Search', 'Efficiency'],
		category: 'AutoML',
		title: 'Hardware-Aware Neural Architecture Search for Edge Devices',
		year: 2023,
		month: 6,
		venue: 'ICML 2023',
		doi: '10.5555/icml.2023.234',
		citations: 91,
		views: 1234,
		featured: true,
		content: '',
	},
	{
		logins: ['alex_thompson', 'sarah_chen'],
		keywords: ['MLOps', 'Production Systems', 'Monitoring'],
		category: 'Machine Learning Systems',
		title: 'Best Practices for ML Model Monitoring in Production',
		year: 2024,
		month: 2,
		venue: 'MLSys 2024',
		citations: 12,
		views: 456,
		content: '',
	},
	{
		logins: ['poramet', 'michael_wong', 'sarah_chen', 'james_lee'],
		keywords: ['Transfer Learning', 'Few-Shot Learning', 'Meta-Learning'],
		category: 'Machine Learning',
		title: 'Meta-Learning Approaches for Few-Shot Image Classification',
		year: 2023,
		month: 10,
		venue: 'ICCV 2023',
		doi: '10.1109/ICCV.2023.567',
		citations: 35,
		views: 678,
		content: '',
	},
]
