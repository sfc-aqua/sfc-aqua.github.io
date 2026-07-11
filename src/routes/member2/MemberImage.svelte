<!-- lib/components/MemberImage.svelte -->
<script lang="ts">
	let {
		src,
		alt,
		size = 'md',
		class: className = '',
	}: { src: string; alt: string; size?: 'sm' | 'md' | 'lg' | 'xl'; class?: string } = $props()

	const sizeClasses = {
		sm: 'w-16 h-16', // 64px - for co-author thumbnails
		md: 'w-32 h-32', // 128px - for list view
		lg: 'w-64 h-64', // 256px - for profile preview
		xl: 'w-full h-full', // full size - for main card
	}

	let imageError = $state(false)
	const fallbackSrc = '/members/placeholder.jpg'

	function handleError() {
		imageError = true
	}
</script>

<img
	src={imageError ? fallbackSrc : src}
	{alt}
	class="object-cover {sizeClasses[size]} {className}"
	onerror={handleError}
/>
