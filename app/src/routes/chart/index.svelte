<script context="module" lang="ts">
	import type { Load, Page } from '@sveltejs/kit';
	export const load: Load = async ({ page }) => {
		return {
			props: { page }
		};
	};
</script>

<script lang="ts">
	import Sidebar from '$lib/template/Sidebar.svelte';
	export let page: Page;
</script>

<Sidebar {page}>
	<slot />
</Sidebar>
