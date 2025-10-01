// src/lib/stores/search.svelte.ts
import { type MemberWithTag } from '../../members/data'

class SearchState {
	commandOpen = $state(false)
	selectedMember = $state<MemberWithTag | null>(null)
	modalOpen = $state(false)

	openCommand() {
		this.commandOpen = true
	}

	closeCommand() {
		this.commandOpen = false
	}

	toggleOpen() {
		this.commandOpen = !this.commandOpen
	}

	selectMember(member: MemberWithTag) {
		this.selectedMember = member
		this.modalOpen = true
		this.commandOpen = false
	}

	closeModal() {
		this.modalOpen = false
		this.selectedMember = null
	}
}

export const searchState = new SearchState()
