<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	let width = 16;
	// bookmark has URL and list of tags
	let style = `padding-left: ${width + 1.5}rem`;
	function onchange(w) {
		width = w.detail.width;
		style = `padding-left: ${width + 1.5}rem`;
	}
</script>

<svelte:head>
	<title>Console - Soros Bot</title>
</svelte:head>

<Header />

<Sidebar on:change={onchange} />

<div {style}>
	<slot />
</div>

<style>
	:root {
		@apply bg-gray-50;
	}
</style>
