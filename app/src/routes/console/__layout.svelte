<script context="module" lang="ts">
	import type { Load, Page } from '@sveltejs/kit';
	export const load: Load = async ({ page }) => {
		return {
			props: { page }
		};
	};
</script>

<script lang="ts">
	import Console from '$lib/template/Console.svelte';
	export let page: Page;
</script>

<Console {page}>
	<slot />
</Console>
