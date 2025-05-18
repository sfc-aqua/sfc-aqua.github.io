<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './button.svelte';
	import { fn } from '@storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'ui/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['default', 'sm', 'lg', 'icon']
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
			}
		},
		args: {
			onClick: fn()
		}
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ variant: 'default' }}>
  {#snippet children()}
    Test
  {/snippet}
</Story>

<!-- <Story name="Secondary" args={{ label: 'Button' }} />

<Story name="Large" args={{ size: 'large', label: 'Button' }} />

<Story name="Small" args={{ size: 'small', label: 'Button' }} /> -->
