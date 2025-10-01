// +page.ts
import type { PageLoad } from './$types'
// import { memberSchema } from './schema' // adjust path as needed
import { type TMember as Member } from '../../members/data'
import { memberOrder } from '../../members/order'

// type Member = z.infer<typeof memberSchema>
type MemberWithTag = Member & { tag: string | null; isAlumni: boolean }

function calculateMemberTag(
	member: Member,
	currentDate: Date = new Date()
): { tag: string | null; isAlumni: boolean } {
	if (!member.level || !member.joinAt) {
		return { tag: null, isAlumni: false }
	}

	const joinDate = new Date(member.joinAt)

	// Calculate academic year for join date
	let joinAcademicYear = joinDate.getFullYear()
	const joinMonth = joinDate.getMonth()

	if (joinMonth < 9) {
		joinAcademicYear -= 1
	}

	// Calculate current academic year
	let currentAcademicYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth()

	if (currentMonth < 9) {
		currentAcademicYear -= 1
	}

	// Calculate which year they're in
	const yearNumber = currentAcademicYear - joinAcademicYear + 1

	// Define max years before becoming alumni
	const maxYears: Record<string, number> = {
		bachelor: member.extend ? Infinity : 4,
		master: member.extend ? Infinity : 2,
		doctoral: member.extend ? Infinity : 3,
		faculty: Infinity,
	}

	// Check if should be alumni
	const isAlumni = yearNumber > maxYears[member.level]

	if (isAlumni) {
		return { tag: 'Alumni', isAlumni: true }
	}

	// Generate tag based on level
	if (member.level === 'faculty') {
		return { tag: 'Faculty', isAlumni: false }
	}

	const levelPrefix: Record<string, string> = {
		bachelor: 'B',
		master: 'M',
		doctoral: 'D',
	}

	return {
		tag: `${levelPrefix[member.level]}${yearNumber}`,
		isAlumni: false,
	}
}

// Sort members by the predefined order
function sortMembersByOrder(members: MemberWithTag[]): MemberWithTag[] {
	// Create a map for O(1) lookup
	const orderMap = new Map(memberOrder.map((login, index) => [login, index]))

	return members.sort((a, b) => {
		const indexA = orderMap.get(a.login)
		const indexB = orderMap.get(b.login)

		// If both are in the order list, sort by their position
		if (indexA !== undefined && indexB !== undefined) {
			return indexA - indexB
		}

		// If only a is in the list, a comes first
		if (indexA !== undefined) {
			return -1
		}

		// If only b is in the list, b comes first
		if (indexB !== undefined) {
			return 1
		}

		// If neither is in the list, sort alphabetically by login
		return a.login.localeCompare(b.login)
	})
}

export const load: PageLoad = async ({ parent }) => {
	// Load your members data here
	const { members } = await parent() // your data loading logic

	// Preprocess members with tags
	const membersWithTags: MemberWithTag[] = members.map((member) => ({
		...member,
		...calculateMemberTag(member),
	}))

	// Sort by predefined order
	const sortedMembers = sortMembersByOrder(membersWithTags)

	return {
		members: sortedMembers,
	}
}
