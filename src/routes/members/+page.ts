// +page.ts
import type { PageLoad } from './$types'
import { type MemberWithTag } from '../../members/data'
import { memberOrder } from '../../members/order'

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
	// Sort by predefined order
	const sortedMembers = sortMembersByOrder(members)

	return {
		members: sortedMembers,
	}
}
