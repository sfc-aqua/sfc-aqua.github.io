<script lang="ts">
	import Button from '$lib/ui/button.svelte';
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button
	variant="default"
	onclick={() => {
		console.log('Hello');
	}}
>
	🌸 Unlimited
</Button>

<Button
	variant="link"
	href="demo/paraglide"
>
	Demo page
</Button>
