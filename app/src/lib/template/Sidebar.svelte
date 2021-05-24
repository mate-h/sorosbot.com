<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import { page as pageStore } from '$app/stores';
	import type { Page } from '@sveltejs/kit';

	let width = 16;
	// bookmark has URL and list of tags
	let style = `padding-left: ${width}rem`;
	function onchange(w) {
		width = w.detail.width;
		style = `padding-left: ${width}rem`;
	}
	export let page: Page;
	let currentPage = page;
	pageStore.subscribe((p) => {
		currentPage = p;
	});
</script>

<Sidebar page={currentPage} on:change={onchange}>
	<slot name="context" />
</Sidebar>

<div {style}>
	<slot />
</div>
